
## Placement cell 

Training and placement cell provides the students with the opportunity to be involved in team-based working which increases group discussion skills and enhances decision-making skills as well. Employees can sign in and add details of the students and their placement details.
This placement cell web application  created for employees to manage interviews of students, and allocate students the companies and schedule a interview. This project is to keeps records of students and schedule interviews with different companies. 


This web application is built using EJS, Node.Js, MongoDB, ExpressJs.
## Features
- User authentication (registration, login, logout)
- Student profiles (personal information, academic details)
Company profiles (company information, job openings)
Job application (students can apply to job openings posted by companies)
Recruitment drive scheduling (companies can schedule recruitment drives, and students can register for them)
Placement statistics (view overall placement statistics)


## Dependencies
The following are the dependencies required for this application:

- aos: "^2.3.4" - AOS is a small library that allows you to animate elements as you scroll down, and up the page.
- aos-animations: "0.0.7" - Additional animations for the AOS library.
- bcrypt: "^5.1.0" - Library to hash passwords.
- bcryptjs: "^2.4.3" - Another library to hash passwords.
- body: "^5.1.0" - Middleware for parsing incoming request bodies.
- connect-flash: "^0.1.1" - Middleware to store flash messages.
- connect-mongo: "^4.6.0" - MongoDB session store for Express.
- cookie-parser: "^1.4.6" - Middleware for parsing cookies.
- dotenv: "^16.0.3" - Loads environment variables from a .env file.
- ejs: "^3.1.8" - Template engine for rendering HTML pages.
- express: "^4.18.2" - Web framework for Node.js.
- express-ejs-layouts: "^2.5.1" - Layout support for EJS templates.
- express-session: "^1.17.3" - Session middleware for Express.
- fast-csv: "^4.3.6" - Library for parsing and generating CSV files.
- fs: "^0.0.1-security" - Library for working with the filesystem.
- json2csv: "^5.0.7" - Library to convert JSON data to CSV format.
- mongodb: "^4.13.0" - MongoDB driver for Node.js.
- mongoose: "^6.8.4" - MongoDB object modeling tool.
- node: "^19.3.0" - The Node.js runtime.
- nodemon: "^2.0.20" - Utility that automatically restarts the server when changes are made to the code.
- passport: "^0.6.0" - Authentication middleware for Node.js.
- passport-jwt: "^4.0.1" - Passport strategy for authenticating with JSON Web Tokens.
- passport-local: "^1.0.0" - Passport strategy for authenticating with a username and password.
## Installation
To install the application, follow these steps:

- Clone this repository to your local machine using Git or a similar tool.
- Navigate to the root directory of the project.
- Run npm install to install the required dependencies.
- Create a .env file in the root directory and set the following variables:
- MONGO_URI - the URI of your MongoDB database.
- SESSION_SECRET - a secret string used to sign session cookies.
- JWT_SECRET - a secret string used to sign JSON Web Tokens.
- Run the application using npm start or nodemon.

## Future Improvements
Future improvements for the Placement Cell Management System:

- **Automated interview scheduling**: Currently, the application allows for scheduling interviews but requires manual input from the placement cell staff. In the future, it could be improved to automate this process by integrating with a scheduling software or service.

 - **Integration with job portals :** The application currently allows for creating and managing job postings within the system. In the future, it could be improved by integrating with external job portals, allowing the placement cell to reach a larger audience of potential candidates.

- **Analytics and reporting:** The application currently tracks the progress of each applicant, but there is room for improvement in the area of analytics and reporting. The system could be improved to provide more detailed insights into the hiring process, such as the number of applicants per job posting, the average time to hire, and the success rate of job offers.

- **Improved user experience:** While the application is functional, there is always room for improvement in the area of user experience. In the future, the interface could be improved to be more intuitive, user-friendly, and visually appealing.

- **Integration with other campus systems:** The application could be improved by integrating with other campus systems, such as the student information system or alumni network, to provide a more seamless and integrated experience for students and employers.
## Features
The application includes the following features:

- Authentication using Passport-JWT - Users can log in to the application using their email address and password, which are authenticated using Passport-JWT.
- User management - Users can  add Student and Manage the iinterview 
- Job posting and management - Admin users can scheduled and assign to any Student. 
**Application tracking