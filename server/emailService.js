import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendWelcomeEmail = async (email, fullName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to ExploreKWC!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <div style="text-align: center;">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXByRpWbQkQ4eGK3Kk1UtyOB9mo_FtthdQPImIubJZAmBLJqDzYqxiApNXiGHZa3LsDjEKM6oELp4rrrJqbB9oVz3b-ko4tQ6W4PiPu1alEyuCaJnHg2I-BWSEmcA1aCUr8Frto3qCOIsuxguuxMVVyDkL-Qo19z_05Mq2scBMRe-gnLuRtYLLcIHuqwY/s320/logo-png.png" alt="ExploreKWC Logo" style="width: 100%; max-width: 200px; margin-bottom: 20px;">
                </div>
                <h2 style="color: #1A73E8;">Welcome to ExploreKWC, ${fullName}!</h2>
                <p style="font-size: 16px;">Thank you for signing up for ExploreKWC, your go-to event booking website. We’re excited to have you on board!</p>
                <p style="font-size: 16px;">Explore our events and find the perfect one for you. If you have any questions, feel free to reach out to our support team.</p>
                <p style="font-size: 16px;">Best regards,<br>Your ExploreKWC Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw new Error('Failed to send welcome email');
    }
};

export const sendResetCodeEmail = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <div style="text-align: center;">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXByRpWbQkQ4eGK3Kk1UtyOB9mo_FtthdQPImIubJZAmBLJqDzYqxiApNXiGHZa3LsDjEKM6oELp4rrrJqbB9oVz3b-ko4tQ6W4PiPu1alEyuCaJnHg2I-BWSEmcA1aCUr8Frto3qCOIsuxguuxMVVyDkL-Qo19z_05Mq2scBMRe-gnLuRtYLLcIHuqwY/s320/logo-png.png" alt="ExploreKWC Logo" style="width: 100%; max-width: 200px; margin-bottom: 20px;">
                </div>
                <h2 style="color: #1A73E8;">Password Reset Code</h2>
                <p style="font-size: 16px;">Hello,</p>
                <p style="font-size: 16px;">Your password reset code is: <strong>${code}</strong></p>
                <p style="font-size: 16px;">If you did not request a password reset, please ignore this email.</p>
                <p style="font-size: 16px;">Best regards,<br>Your ExploreKWC Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset code sent successfully');
    } catch (error) {
        console.error('Error sending reset code:', error);
        throw new Error('Failed to send reset code');
    }
};
