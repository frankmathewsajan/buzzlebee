import { NextResponse } from 'next/server';
import { verify } from 'hcaptcha';
import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const { name, email, subject, message, otp, captcha } = await request.json();

    // Verify reCAPTCHA
    const captchaVerification = await verify(process.env.RECAPTCHA_SECRET_KEY, captcha);
    if (!captchaVerification.success) {
      return NextResponse.json(
        { message: 'Invalid CAPTCHA' },
        { status: 400 }
      );
    }

    // Verify OTP
    const storedData = otpStore.get(email);
    if (!storedData) {
      return NextResponse.json(
        { message: 'OTP not found. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Check if OTP is expired (10 minutes)
    if (Date.now() - storedData.timestamp > 10 * 60 * 1000) {
      otpStore.delete(email);
      return NextResponse.json(
        { message: 'OTP has expired. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Check if OTP matches
    if (storedData.otp !== parseInt(otp)) {
      storedData.attempts++;
      if (storedData.attempts >= 3) {
        otpStore.delete(email);
      }
      return NextResponse.json(
        { message: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `
    });

    // Clear OTP after successful submission
    otpStore.delete(email);

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    );
  }
} 