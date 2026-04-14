import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email templates
const emailTemplates = {
  verificationEmail: (name: string, verifyLink: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F9FAFB;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="background-color: #2563EB; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Verify Your Email</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #111827; margin: 0 0 20px 0;">Hi ${name},</h2>
                  <p style="color: #6B7280; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                    Thank you for joining! To complete your registration and secure your account, please verify your email address by clicking the securely encrypted verification button below:
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${verifyLink}" style="background-color: #2563EB; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
                      Verify My Email
                    </a>
                  </div>
                  <p style="color: #6B7280; font-size: 14px; margin: 20px 0 0 0;">
                    This link will strictly securely expire in 24 hours. If the button doesn't work, safely copy and paste this link into your browser: <br/><br/>
                    <a href="${verifyLink}" style="color: #2563EB; word-break: break-all;">${verifyLink}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #F9FAFB; padding: 20px 30px; text-align: center;">
                  <p style="color: #6B7280; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} MLM E-commerce Platform. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  otp: (name: string, otp: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F9FAFB;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="background-color: #2563EB; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Verify Your Email</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #111827; margin: 0 0 20px 0;">Hi ${name},</h2>
                  <p style="color: #6B7280; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                    Thank you for registering! Please use the following OTP to verify your email address:
                  </p>
                  <div style="background-color: #EFF6FF; border: 2px solid #2563EB; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                    <p style="color: #2563EB; font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 0;">
                      ${otp}
                    </p>
                  </div>
                  <p style="color: #6B7280; font-size: 14px; margin: 20px 0 0 0;">
                    This OTP will expire in 10 minutes. If you didn't request this, please ignore this email.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #F9FAFB; padding: 20px 30px; text-align: center;">
                  <p style="color: #6B7280; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} MLM E-commerce Platform. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  welcome: (name: string, referralCode: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F9FAFB;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="background-color: #2563EB; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome Aboard!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #111827; margin: 0 0 20px 0;">Hi ${name},</h2>
                  <p style="color: #6B7280; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                    Welcome to our MLM E-commerce Platform! Your account has been successfully created.
                  </p>
                  <div style="background-color: #EFF6FF; border-radius: 8px; padding: 20px; margin: 30px 0;">
                    <p style="color: #111827; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">Your Referral Code:</p>
                    <p style="color: #2563EB; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 0;">
                      ${referralCode}
                    </p>
                  </div>
                  <p style="color: #6B7280; font-size: 16px; line-height: 24px; margin: 20px 0 0 0;">
                    Share this code with your friends and earn commissions when they make purchases!
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #F9FAFB; padding: 20px 30px; text-align: center;">
                  <p style="color: #6B7280; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} MLM E-commerce Platform. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  passwordReset: (name: string, resetLink: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F9FAFB;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="background-color: #2563EB; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Reset Your Password</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #111827; margin: 0 0 20px 0;">Hi ${name},</h2>
                  <p style="color: #6B7280; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                    We received a request to reset your password. Click the button below to create a new password:
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #2563EB; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
                      Reset Password
                    </a>
                  </div>
                  <p style="color: #6B7280; font-size: 14px; margin: 20px 0 0 0;">
                    This link will expire in 1 hour. If you didn't request this, please ignore this email.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #F9FAFB; padding: 20px 30px; text-align: center;">
                  <p style="color: #6B7280; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} MLM E-commerce Platform. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  commissionEarned: (name: string, amount: number, level: number) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Commission Earned</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F9FAFB;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="background-color: #10B981; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎉 Commission Earned!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #111827; margin: 0 0 20px 0;">Hi ${name},</h2>
                  <p style="color: #6B7280; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                    Great news! You've earned a commission from your referral network.
                  </p>
                  <div style="background-color: #ECFDF5; border-radius: 8px; padding: 20px; margin: 30px 0;">
                    <p style="color: #111827; font-size: 14px; margin: 0 0 10px 0;">Commission Amount:</p>
                    <p style="color: #10B981; font-size: 32px; font-weight: bold; margin: 0;">
                      ₹${amount.toFixed(2)}
                    </p>
                    <p style="color: #6B7280; font-size: 14px; margin: 10px 0 0 0;">Level ${level} Commission</p>
                  </div>
                  <p style="color: #6B7280; font-size: 16px; line-height: 24px; margin: 20px 0 0 0;">
                    The amount has been credited to your wallet. You can withdraw it anytime from your dashboard.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #F9FAFB; padding: 20px 30px; text-align: center;">
                  <p style="color: #6B7280; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} MLM E-commerce Platform. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
};

// Send email function
export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

// Email sender functions
export const emailService = {
  async sendOTP(email: string, name: string, otp: string) {
    return sendEmail(email, 'Verify Your Email - OTP', emailTemplates.otp(name, otp));
  },

  async sendWelcome(email: string, name: string, referralCode: string) {
    return sendEmail(email, 'Welcome to MLM E-commerce Platform!', emailTemplates.welcome(name, referralCode));
  },

  async sendPasswordReset(email: string, name: string, resetLink: string) {
    return sendEmail(email, 'Reset Your Password', emailTemplates.passwordReset(name, resetLink));
  },

  async sendVerificationEmail(email: string, name: string, verifyLink: string) {
    return sendEmail(email, 'Securely Verify Your Email Address', emailTemplates.verificationEmail(name, verifyLink));
  },

  async sendCommissionNotification(email: string, name: string, amount: number, level: number) {
    return sendEmail(email, `You Earned ₹${amount.toFixed(2)} Commission!`, emailTemplates.commissionEarned(name, amount, level));
  },
};
