// Vercel API Route for contact form
// This would typically send emails via a service like SendGrid, Mailgun, etc.

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'subject', 'message']
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // In a real implementation, you would send the email here
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'rafihermawan.dev@gmail.com',
      from: 'noreply@rafi-hermawan.vercel.app',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await sgMail.send(msg);
    */

    // For now, just log the contact attempt
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...', // Truncate for logs
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        name,
        email,
        subject,
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Contact API error:', error);

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to send message. Please try again later.'
    });
  }
}