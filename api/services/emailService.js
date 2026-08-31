import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

const brandColors = {
  roseNoir: '#21080C',
  velvetRed: '#981B2B',
  antiqueGold: '#C49445',
  warmIvory: '#FFF8ED',
};

const emailWrapper = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:${brandColors.warmIvory};font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${brandColors.warmIvory};padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:2px solid ${brandColors.antiqueGold};border-radius:8px;">
        <tr><td style="background:${brandColors.roseNoir};padding:24px;text-align:center;">
          <h1 style="color:${brandColors.antiqueGold};margin:0;font-size:24px;">Red Rose Photo Booth LLC</h1>
          <p style="color:${brandColors.warmIvory};margin:8px 0 0;font-size:14px;">Capturing Your Story, One Celebration at a Time</p>
        </td></tr>
        <tr><td style="padding:32px 24px;color:#333;font-size:15px;line-height:1.6;">
          ${content}
        </td></tr>
        <tr><td style="background:${brandColors.roseNoir};padding:20px;text-align:center;color:${brandColors.warmIvory};font-size:13px;">
          <p style="margin:0;">Roger Marionneaux | (916) 287-0870</p>
          <p style="margin:4px 0 0;">Roger@redrosephotobooth.com | www.redrosephotobooth.com</p>
          <p style="margin:4px 0 0;">Serving the Bay Area &amp; Northern California</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Red Rose Photo Booth" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html: emailWrapper(html),
  });
};

export const sendOrderCustomerEmail = async (order) => {
  const isBooking = order.orderType === 'booking';
  const ref = order.orderNumber;

  let detailsHtml = '';
  if (isBooking && order.eventDetails) {
    const e = order.eventDetails;
    detailsHtml = `
      <h3 style="color:${brandColors.velvetRed};">Event Details</h3>
      <p><strong>Event Type:</strong> ${e.eventType || 'N/A'}</p>
      <p><strong>Date:</strong> ${e.eventDate ? new Date(e.eventDate).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Time:</strong> ${e.startTime || 'N/A'}</p>
      <p><strong>Duration:</strong> ${e.duration || 'N/A'}</p>
      <p><strong>Venue:</strong> ${e.venueName || 'N/A'}</p>
      <p><strong>Address:</strong> ${e.venueAddress || 'N/A'}</p>
      <p><strong>Guests:</strong> ${e.guestCount || 'N/A'}</p>
      <p><strong>Service:</strong> ${e.serviceName || 'N/A'}</p>
      ${e.additionalNotes ? `<p><strong>Notes:</strong> ${e.additionalNotes}</p>` : ''}
    `;
  } else if (order.items?.length) {
    detailsHtml = `
      <h3 style="color:${brandColors.velvetRed};">Order Items</h3>
      <ul>${order.items.map((i) => `<li>${i.name} x${i.quantity} — $${(i.price * i.quantity).toFixed(2)}</li>`).join('')}</ul>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
    `;
  }

  const html = `
    <p>Dear ${order.customer.fullName},</p>
    <p>Thank you for choosing Red Rose Photo Booth LLC! We have received your ${isBooking ? 'booking request' : 'order'}.</p>
    <p><strong>Reference Number:</strong> ${ref}</p>
    <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
    ${detailsHtml}
    <p style="margin-top:24px;">Our team will review your submission and contact you shortly. ${isBooking ? 'Please note that your date is pending confirmation.' : 'Payment will be arranged upon confirmation.'}</p>
    <p>If you have questions, call us at (916) 287-0870 or email Roger@redrosephotobooth.com.</p>
    <p>With gratitude,<br>Red Rose Photo Booth LLC</p>
  `;

  await sendEmail({
    to: order.customer.email,
    subject: `Red Rose Photo Booth — ${isBooking ? 'Booking Request' : 'Order'} ${ref}`,
    html,
  });
};

export const sendOrderAdminEmail = async (order) => {
  const isBooking = order.orderType === 'booking';
  let details = '';

  if (isBooking && order.eventDetails) {
    const e = order.eventDetails;
    details = `
      Event: ${e.eventType} | ${e.eventDate ? new Date(e.eventDate).toLocaleDateString() : ''}
      Venue: ${e.venueName} — ${e.venueAddress}
      Service: ${e.serviceName}
      Notes: ${e.additionalNotes || 'None'}
    `;
  } else if (order.items?.length) {
    details = order.items.map((i) => `${i.name} x${i.quantity}`).join(', ');
  }

  const html = `
    <h2 style="color:${brandColors.velvetRed};">New ${isBooking ? 'Booking Request' : 'Order'}</h2>
    <p><strong>Order #:</strong> ${order.orderNumber}</p>
    <p><strong>Type:</strong> ${order.orderType}</p>
    <p><strong>Customer:</strong> ${order.customer.fullName}</p>
    <p><strong>Email:</strong> ${order.customer.email}</p>
    <p><strong>Phone:</strong> ${order.customer.phone || 'N/A'}</p>
    <p><strong>Details:</strong> ${details}</p>
  `;

  await sendEmail({
    to: process.env.ADMIN_NOTIFICATION_EMAIL,
    subject: `[Admin] New ${order.orderType} — ${order.orderNumber}`,
    html,
  });
};

export const sendContactEmails = async ({ name, email, phone, eventType, eventDate, message }) => {
  const customerHtml = `
    <p>Dear ${name},</p>
    <p>Thank you for reaching out to Red Rose Photo Booth LLC. We have received your message and will respond within 24–48 hours.</p>
    <p><strong>Your message:</strong><br>${message}</p>
    <p>Warm regards,<br>Red Rose Photo Booth LLC</p>
  `;

  await sendEmail({
    to: email,
    subject: 'Thank You for Contacting Red Rose Photo Booth',
    html: customerHtml,
  });

  const adminHtml = `
    <h2 style="color:${brandColors.velvetRed};">New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
    <p><strong>Event Type:</strong> ${eventType || 'N/A'}</p>
    <p><strong>Preferred Date:</strong> ${eventDate || 'N/A'}</p>
    <p><strong>Message:</strong><br>${message}</p>
  `;

  await sendEmail({
    to: process.env.ADMIN_NOTIFICATION_EMAIL,
    subject: `[Contact] Message from ${name}`,
    html: adminHtml,
  });
};

export const sendStatusUpdateEmail = async (order) => {
  const html = `
    <p>Dear ${order.customer.fullName},</p>
    <p>Your ${order.orderType === 'booking' ? 'booking request' : 'order'} <strong>${order.orderNumber}</strong> has been updated.</p>
    <p><strong>New Status:</strong> ${order.status.toUpperCase()}</p>
    <p>If you have any questions, please contact us at (916) 287-0870.</p>
    <p>Red Rose Photo Booth LLC</p>
  `;

  await sendEmail({
    to: order.customer.email,
    subject: `Status Update — ${order.orderNumber}`,
    html,
  });
};
