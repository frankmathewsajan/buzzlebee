import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { verify } from 'hcaptcha';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Store OTPs temporarily (in production, use a database)
const otpStore = new Map();

export async function POST(request) {
  try {
    const { email, captcha } = await request.json();

    // Verify reCAPTCHA
    const captchaVerification = await verify(process.env.RECAPTCHA_SECRET_KEY, captcha);
    if (!captchaVerification.success) {
      return NextResponse.json(
        { message: 'Invalid CAPTCHA' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore.set(email, {
      otp,
      timestamp: Date.now(),
      attempts: 0
    });

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Contact Form OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your OTP for Contact Form</h2>
          <p>Your OTP is: <strong>${otp}</strong></p>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    });

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { message: 'Failed to send OTP' },
      { status: 500 }
    );
  }
} 