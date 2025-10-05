import { Resend } from 'resend';

// Lazy-load Resend to ensure env vars are loaded first
let resend = null;
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const giftTypeInfo = {
  tree: { icon: '🌳', name: 'Trees', impact: 'Each tree absorbs 48 lbs of CO₂ per year!' },
  cookstove: { icon: '🏡', name: 'Clean Cookstoves', impact: 'Provides clean air for families!' },
  solar: { icon: '☀️', name: 'Solar Panels', impact: 'Powers homes with renewable energy!' },
  ocean: { icon: '🌊', name: 'Ocean Cleanup', impact: 'Removes plastic from our oceans!' },
  coral: { icon: '🪸', name: 'Coral Reef Restoration', impact: 'Rebuilds vital ocean ecosystems!' },
  wildlife: { icon: '🦁', name: 'Wildlife Conservation', impact: 'Protects endangered species!' },
  water: { icon: '💧', name: 'Clean Water Access', impact: 'Provides safe drinking water!' },
  rainforest: { icon: '🌴', name: 'Rainforest Protection', impact: 'Preserves critical biodiversity!' }
};

export async function sendThankYouNotification({ senderEmail, senderName, originalSenderName, giftType, giftQuantity, thankYouMessage, giftUrl }) {
  const resendClient = getResend();
  
  if (!resendClient) {
    console.log('⚠️  Resend not configured, skipping thank you email');
    return;
  }

  const info = giftTypeInfo[giftType] || giftTypeInfo.tree;

  try {
    await resendClient.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: senderEmail || 'hello@giftedair.com',
      subject: `💚 ${senderName} says thank you for your gift!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2D5016 0%, #4a7c28 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .icon { font-size: 60px; margin: 20px 0; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #2D5016; margin: 20px 0; border-radius: 5px; }
            .button { display: inline-block; background: #2D5016; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
            .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💚 You Got a Thank You!</h1>
              <p style="font-size: 18px; margin: 10px 0 0 0;">Someone appreciated your gift</p>
            </div>
            <div class="content">
              <div style="text-align: center;">
                <div class="icon">${info.icon}</div>
                <h2 style="color: #2D5016; margin: 10px 0;">${senderName} sent you thanks!</h2>
                <p style="color: #666; font-size: 16px;">
                  Remember that ${info.name} gift you sent? ${senderName} loved it!
                </p>
              </div>

              <div class="message-box">
                <p style="margin: 0; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Their Message:</p>
                <p style="font-size: 18px; color: #333; margin: 15px 0 0 0; font-style: italic;">
                  "${thankYouMessage}"
                </p>
                <p style="margin: 15px 0 0 0; color: #2D5016; font-weight: bold;">
                  — ${senderName}
                </p>
              </div>

              <div style="text-align: center;">
                <a href="${giftUrl}" class="button">View Your Gift</a>
              </div>

              <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin-top: 30px;">
                <p style="margin: 0; color: #2D5016; font-weight: bold;">
                  💚 Your Impact: ${giftQuantity} ${info.name}
                </p>
                <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
                  ${info.impact}
                </p>
              </div>

              <p style="text-align: center; color: #666; margin-top: 30px;">
                Gifts that create connection and climate action 🌍
              </p>
            </div>
            <div class="footer">
              <p>Gifted Air - Climate Love</p>
              <p>Transforming climate action into meaningful gifts</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('✅ Thank you notification sent successfully');
  } catch (error) {
    console.error('❌ Error sending thank you notification:', error);
  }
}

export async function sendGiftNotification(gift, giftUrl) {
  const resendClient = getResend();
  
  if (!resendClient) {
    console.log('⚠️  Resend not configured. Email not sent.');
    console.log('⚠️  RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'PRESENT' : 'MISSING');
    return { success: false, message: 'Resend not configured' };
  }

  if (!gift.recipientEmail) {
    console.log('⚠️  No recipient email provided. Email not sent.');
    return { success: false, message: 'No recipient email' };
  }

  const giftInfo = giftTypeInfo[gift.type];
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  const emailData = {
    from: `Gifted Air <${fromEmail}>`,
    to: gift.recipientEmail,
    subject: `🌿 ${gift.senderName} sent you a gift of climate love!`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #f0fdf4;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2D5016 0%, #4a7c28 100%); padding: 40px 30px; text-align: center;">
      <div style="font-size: 60px; margin-bottom: 10px;">${giftInfo.icon}</div>
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 900;">You Received a Gift!</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Someone is thinking of you and our planet 🌍</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      
      <!-- Greeting -->
      <div style="text-align: center; margin-bottom: 30px;">
        <p style="font-size: 24px; color: #1f2937; margin: 0 0 10px 0; font-weight: 700;">
          Dear ${gift.recipientName},
        </p>
        <p style="font-size: 16px; color: #6b7280; margin: 0;">
          <strong>${gift.senderName}</strong> has sent you something special!
        </p>
      </div>

      <!-- Gift Box -->
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px; border: 2px solid #86efac;">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 80px; line-height: 1;">${giftInfo.icon}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 48px; font-weight: 900; color: #2D5016; margin-bottom: 5px;">
            ${gift.quantity}
          </div>
          <div style="font-size: 20px; font-weight: 700; color: #15803d; margin-bottom: 10px;">
            ${giftInfo.name}
          </div>
          <div style="font-size: 14px; color: #16a34a; font-weight: 600;">
            ${giftInfo.impact}
          </div>
        </div>
      </div>

      <!-- Message -->
      ${gift.message ? `
      <div style="background: #fef3c7; border-radius: 16px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #f59e0b;">
        <div style="font-size: 32px; text-align: center; margin-bottom: 15px;">💌</div>
        <p style="font-size: 16px; line-height: 1.6; color: #78350f; font-style: italic; margin: 0; text-align: center;">
          "${gift.message}"
        </p>
      </div>
      ` : ''}

      <!-- Location -->
      ${gift.location ? `
      <div style="text-align: center; margin-bottom: 30px;">
        <p style="font-size: 14px; color: #6b7280; margin: 0;">
          📍 Sent from <strong>${gift.location}</strong>
        </p>
      </div>
      ` : ''}

      <!-- CTA Button -->
      <div style="text-align: center; margin: 40px 0;">
        <a href="${giftUrl}" style="display: inline-block; background: linear-gradient(135deg, #2D5016 0%, #4a7c28 100%); color: white; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-size: 18px; font-weight: 700; box-shadow: 0 4px 15px rgba(45, 80, 22, 0.4);">
          View Your Gift ✨
        </a>
      </div>

      <!-- Impact Stats -->
      <div style="background: #f3f4f6; border-radius: 12px; padding: 20px; text-align: center;">
        <p style="font-size: 14px; color: #6b7280; margin: 0 0 10px 0;">
          <strong>Climate Value:</strong> $${gift.totalCost}
        </p>
        <p style="font-size: 12px; color: #9ca3af; margin: 0;">
          This gift represents real climate action that makes a difference! 🌱
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 16px; color: #2D5016; margin: 0 0 10px 0; font-weight: 700;">
        🌿 Gifted Air
      </p>
      <p style="font-size: 14px; color: #6b7280; margin: 0 0 15px 0;">
        A ritual of climate love
      </p>
      <p style="font-size: 12px; color: #9ca3af; margin: 0;">
        Want to send your own climate gift? <a href="https://gifted-air.vercel.app" style="color: #2D5016; text-decoration: none; font-weight: 600;">Visit Gifted Air</a>
      </p>
    </div>

  </div>
</body>
</html>
    `,
    text: `
🌿 GIFTED AIR - You Received a Gift!

Dear ${gift.recipientName},

${gift.senderName} has sent you a gift of climate love!

${giftInfo.icon} ${gift.quantity} ${giftInfo.name}
${giftInfo.impact}

${gift.message ? `\nPersonal Message:\n"${gift.message}"\n` : ''}
${gift.location ? `\nSent from: ${gift.location}\n` : ''}

Climate Value: $${gift.totalCost}

View your gift here:
${giftUrl}

---
Gifted Air - A ritual of climate love
https://gifted-air.vercel.app
    `
  };

  try {
    const data = await resendClient.emails.send(emailData);
    console.log(`✅ Email sent to ${gift.recipientEmail}`, data);
    return { success: true, message: 'Email sent successfully', data };
  } catch (error) {
    console.error('❌ Resend error:', error);
    return { success: false, message: 'Failed to send email', error };
  }
}
