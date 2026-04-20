const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: `AIRAVAT AI <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Verification Code for AIRAVAT',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 20px; border-radius: 10px; border: 1px solid #FFD700;">
                <h2 style="color: #FFD700;">Verification Code</h2>
                <p>Hello,</p>
                <p>Use the following code to log in to AIRAVAT AI platform:</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #FFD700; background: #111; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    ${otp}
                </div>
                <p>This code is valid for 5 minutes.</p>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <br>
                <p>Stay Creative,<br>The AIRAVAT Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email Error:', error);
        return false;
    }
};

module.exports = { sendOTPEmail };
