const Student = require("../models/student");
const Interview = require("../models/interview");

// ************************render add student page******************************
module.exports.addStudent = (req, res) => {
  if (req.isAuthenticated()) {
  // Render add student form if user is authenticated
  let data= res.render("add_student", {
  title: "Add Student",
  });
  return data;
  }
  
  // Redirect to home page if user is not authenticated
  let data= res.redirect("/");
  return data;
  };
  
  // *****************************render edit student page****************************
  module.exports.editStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (req.isAuthenticated()) {
  // Render edit student form if user is authenticated and student exists
  let data = res.render("edit_student", {
  title: "Edit Student",
  student_details: student,
  });
  return data;
  }
  
  // Redirect to home page if user is not authenticated
  let data= res.redirect("/");
  return data;
  };

// This function creates a new student record in the database with the data received from the request body.
module.exports.create = async (req, res) => {
  try {
    const {
      name,
      email,
      batch,
      college,
      placement_status,
      dsa_score,
      react_score,
      webdev_score,
    } = req.body;

    // check if student already exists
    Student.findOne({ email }, async (err, student) => {
      if (err) {
        return;
      }

      if (!student) {
        // create new student record if student doesn't exist
        await Student.create(
          {
            name,
            email,
            college,
            batch,
            dsa_score,
            react_score,
            webdev_score,
            placement_status,
          },
          (err, student) => {
            if (err) {
              req.flash("error", "Couldn't add student!");
              let data= res.redirect("back");
              return data;
            }
            // success message is flashed if student record is created successfully
            req.flash("success", "Student added!");
            let data= res.redirect("back");
            return data;
          }
        );
      } else {
        // error message is flashed and user is redirected back if student already exists
        req.flash("error", "Student already exist!");
        let data= res.redirect("back");
        return data
      }
    });
  } catch (err) {
    // catch any errors that may occur during execution
  }
};

// ********************************Deletion of student********************************
module.exports.destroy = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      req.flash("error", "Couldn't find student");
      return;
    }

    const interviewsOfStudent = student.interviews;
    if (interviewsOfStudent.length > 0) {
      for (let interview of interviewsOfStudent) {
        await Interview.findOneAndUpdate(
          { company: interview.company },
          { $pull: { students: { student: studentId } } }
        );
      }
    }

    student.remove();
    req.flash("success", "Student deleted!");
    return res.redirect("back");
  } catch (err) {
    console.log("error", err);
    return;
  }
};

//*********************************** */ update student details****************************
module.exports.update = async (req, res) => {
  try {
    // Find the student to be updated by ID
    const student = await Student.findById(req.params.id);
    // Extracting updated data from the request body
    const {
      name,
      college,
      batch,
      dsa_score,
      react_score,
      webdev_score,
      placement_status,
    } = req.body;

    // If the student exists, update the student data in the database
    if (student) {
      student.name = name;
      student.college = college;
      student.batch = batch;
      student.dsa_score = dsa_score;
      student.react_score = react_score;
      student.webdev_score = webdev_score;
      student.placement_status = placement_status;

      // Save the updated student data in the database
      student.save();
      // Display a success message to the user on successful update
      req.flash("success", "Student updated!");
      // Redirecting the user to admin page
      return res.redirect("/admin");
    }
    // If the student doesn't exist, display an error message to the user and redirect to the previous page
    req.flash("error", "Student does not exist!");
    let data= res.redirect("back");
    return data;

  } catch (err) {
    // Display an error message to the user if there's an error during the update process
    req.flash("error", err);
    // Redirecting the user to the previous page
    let data=res.redirect("back");
    return data;
  }
};
