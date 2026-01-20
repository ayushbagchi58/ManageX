const transporter = require("./emailConfig");

const sendEmployeeCredentials = async (email, empId, password) => {
  try {
    console.log("📧 Sending email to:", email);
    console.log("👤 Using email user:", process.env.EMAIL_USER);

    const info = await transporter.sendMail({
      from: `"ManageX HR" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Employee Login Credentials",
      html: `
        <h2>Welcome to Company</h2>
        <p><b>Employee ID:</b> ${empId}</p>
        <p><b>Temporary Password:</b> ${password}</p>
        <p>Login URL: ${process.env.FRONTEND_URL}/employee/login</p>
        <p style="color:red">Please change password after first login.</p>
      `
    });

    console.log("✅ Email sent successfully. Message ID:", info.messageId);

  } catch (err) {
    console.error("❌ Email sending failed:", err.message || err);
  }
};

module.exports = sendEmployeeCredentials;
