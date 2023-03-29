const Interview = require("../models/interview");
const Student = require("../models/student");

// This function renders the "add_interview" page
module.exports.addInterview = (req, res) => {
  if (req.isAuthenticated()) { // Check if the user is authenticated
    return res.render("add_interview", { // Render the "add_interview" view
      title: "Schedule An Interview", // Set the title of the page
    });
  }

  return res.redirect("/"); // Redirect the user to the home page if they are not authenticated
};

// This function creates a new interview
module.exports.create = async (req, res) => {
  try {
    const { company, date } = req.body; // Get the company and date from the request body

    await Interview.create( // Create a new interview
      {
        company,
        date,
      },
      (err, Interview) => { // Handle errors and return a response
        if (err) {
          req.flash("error", "Couldn't add Interview!"); // Set a flash message for the error
          return res.redirect("back"); // Redirect the user to the previous page
        }
        req.flash("success", "Interview added!"); // Set a flash message for the success
        return res.redirect("back"); // Redirect the user to the previous page
      }
    );
  } catch (err) {
    console.log(err); // Log any errors to the console
  }
};

// This function enrolls a student in an interview
module.exports.enrollInInterview = async (req, res) => {
  try {
    let interview = await Interview.findById(req.params.id); // Find the interview by ID
    const { email, result } = req.body; // Get the email and result from the request body

    if (interview) { // Check if the interview exists
      let student = await Student.findOne({ email: email }); // Find the student by email
      if (student) { // Check if the student exists
        // Check if the student is already enrolled
        let alreadyEnrolled = await Interview.findOne({
          "students.student": student.id,
        });

        // Prevent the student from enrolling in the same company more than once
        if (alreadyEnrolled) {
          if (alreadyEnrolled.company === interview.company) {
            req.flash(
              "error",
              `${student.name} already enrolled in ${interview.company} interview!`
            ); // Set a flash message for the error
            return res.redirect("back"); // Redirect the user to the previous page
          }
        }

        let studentObj = {
          student: student.id,
          result: result,
        };

        // Add the newly enrolled student to the interview's "students" field
        await interview.updateOne({
          $push: { students: studentObj },
        });

        // Add the interview to the student's "interviews" field
        let assignedInterview = {
          company: interview.company,
          date: interview.date,
          result: result,
        };
        await student.updateOne({
          $push: { interviews: assignedInterview },
        });

        req.flash(
          "success",
          `${student.name} enrolled in ${interview.company} interview!`
        ); // Set a flash message for the success
        return res.redirect("back"); // Redirect the user to the previous page
      }
      req.flash("error", "Student not found!"); // Set a flash message for the error
      return res.redirect("back"); // Redirect the user to the previous page
    }
    req.flash("error", "Interview not found!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "Error in enrolling interview!");
  }
};

// deallocating students from an interview
module.exports.deallocate = async (req, res) => {
  try {
    const { studentId, interviewId } = req.params;

    // find the interview
    const interview = await Interview.findById(interviewId);

    if (interview) {
      // remove reference of student from interview schema
      await Interview.findOneAndUpdate(
        { _id: interviewId },
        { $pull: { students: { student: studentId } } }
      );

      // remove interview from student's schema using interview's company
      await Student.findOneAndUpdate(
        { _id: studentId },
        { $pull: { interviews: { company: interview.company } } }
      );

      req.flash(
        "success",
        `Successfully deallocated from ${interview.company} interview!`
      );
      return res.redirect("back");
    }

    req.flash("error", "Interview not found");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "Couldn't deallocate from interview");
  }
};
