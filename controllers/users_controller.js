const User = require("../models/user");

// render user profile page
module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "User Profile",
    profile_user: req.user,
  });
};

// updates user details
module.exports.update = async function (req, res) {
  try {
    const user = await User.findById(req.user.id); // find the user by its ID
    const { username, password, confirm_password } = req.body; // get the new user details from the request body

    // check if new password matches the confirm password
    if (password != confirm_password) {
      req.flash("error", "New password and Confirm password are not same!"); // flash an error message if passwords don't match
      return res.redirect("back"); // redirect back to the previous page
    }

    // if user doesn't exist
    if (!user) {
      req.flash("error", "User does not exist!"); // flash an error message
      return res.redirect("back"); // redirect back to the previous page
    }

    // update user's username and password
    user.username = username;
    user.password = password;

    user.save(); // save the user
    req.flash("success", "profile updated!"); // flash a success message
    return res.redirect("back"); // redirect back to the previous page
  } catch (err) {
    req.flash("error", err); // flash an error message
    console.log(err);
    return res.redirect("back"); // redirect back to the previous page
  }
};

// render the Sign In page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    // if the user is already authenticated, redirect to profile page
    return res.redirect("/profile");
  }
  return res.render("user_signin", {
    // render the Sign In page
    title: "Student Placement cell",
  });
};

// render the Sign Up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    // if the user is already authenticated, redirect to profile page
    return res.redirect("/profile");
  }
  return res.render("user_register", {
    // render the Sign Up page
    title: "Student Placement cell",
  });
};

// get Sign Up data
module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    // Extracting user input data from request object
    const { username, email, password, confirm_password } = req.body;

    // if password doesn't match
    if (password != confirm_password) {
      // Redirecting the user back to sign up page with error message
      req.flash("error", "Password and Confirm password are not same");
      return res.redirect("back");
    }

    // check if user already exist
    User.findOne({ email }, async (err, user) => {
      if (err) {
        console.log("Error in finding user in signing up");
        return;
      }

      // If user doesn't exist, create a new user in database
      if (!user) {
        await User.create(
          {
            email,
            password,
            username,
          },
          (err, user) => {
            if (err) {
              req.flash("error", "Couldn't sign Up");
            }
            req.flash("success", "Account created!");
            return res.redirect("/");
          }
        );
      } else {
        // If user already exists, redirect back to sign up page with error message
        req.flash("error", "Email already registed!");
        return res.redirect("back");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
  // Display a success message to the user on successful login
  req.flash("success", "Login succesfull");
  // Redirecting the user to admin page
  let data = res.redirect("/admin");
  return data;
};

// clears the cookie
module.exports.destroySession = (req, res) => {
  // Logout the user session and display success message on successful logout
  req.logout((err) => {
    if (err) {
      // Display error message if there's an error during logout
      let data = next(err);
      return data;
    } else {
      req.flash("success", "Logged out successfully!");
      // Redirect the user to the home page on successful logout
      let data = res.redirect("/");
      return data;
    }
  });
};
