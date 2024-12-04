import nodemailer from 'nodemailer';

export async function sendOrderConfirmationEmail(customer, orderDetails) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'felipe.braun@ethereal.email',
        pass: 'pYV3Mk5gYN92cdkMN3',
      },
    });

    const mailOptions = {
      from: '"Krispy Kreme" <no-reply@krispykreme.com>',
      to: customer.email,
      subject: 'Order Confirmation',
      text: `Hello ${customer.name},\n\nThank you for your order!\n\nOrder Details:\n${orderDetails}`,
      html: `
        <h1>Hello ${customer.name},</h1>
        <p>Thank you for your order!</p>
        <h2>Order Details:</h2>
        <pre>${orderDetails}</pre>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl(info);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send order confirmation email.');
  }
}