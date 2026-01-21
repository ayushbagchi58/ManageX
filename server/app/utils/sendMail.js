const resend = require("./emailConfig");

const sendEmployeeCredentials = async (email, empId, password) => {
  await resend.emails.send({
    from: "ManageX <no-reply@resend.dev>",
    to: email,
    subject: "Your Employee Login Credentials",
    html: `
      <h2>Welcome to Company</h2>
      <p><b>Employee ID:</b> ${empId}</p>
      <p><b>Temporary Password:</b> ${password}</p>
      <p>Login URL: ${process.env.FRONTEND_URL}/employee/login</p>
      <p style="color:red">Please change password after first login.</p>
    `,
  });
};

module.exports = sendEmployeeCredentials;
