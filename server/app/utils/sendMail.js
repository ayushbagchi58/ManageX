const transporter = require('./emailConfig');

const sendEmployeeCredentials = async (email, empId, password) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Employee Login Credentials",
    html: `
      <h2>Welcome to Company</h2>
      <p><b>Employee ID:</b> ${empId}</p>
      <p><b>Temporary Password:</b> ${password}</p>
      <p>Login URL: http://localhost:5173/employee/login</p>
      <p style="color:red">Please change password after first login.</p>
    `
  });
};

module.exports = sendEmployeeCredentials;
