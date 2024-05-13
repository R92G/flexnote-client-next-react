import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = new Resend("re_MoBSHPZh_PNs8U9gbepkonSWHNaMzj5W9");

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Flexnote | Authentication <auth@flexnote.io>",
    to: email,
    subject: "2FA Code",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { width: 80%; margin: 20px auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; }
        .button { background-color: #007BFF; color: #ffffff; padding: 10px 20px; text-align: center; display: inline-block; border-radius: 5px; text-decoration: none; }
        h2 { color: #444; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Uw 2FA Code</h2>
        <p>Beste gebruiker,</p>
        <p>Hier is uw tweefactorauthenticatie code:</p>
        <p><strong>${token}</strong></p>
        <p>Voer deze code in op de website om uw identiteit te bevestigen.</p>
      </div>
    </body>
    </html>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Flexnote | Authentication <auth@flexnote.io>",
    to: email,
    subject: "Reset your password",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { width: 80%; margin: 20px auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; }
        .button { background-color: #444; color: #ffffff; padding: 10px 20px; text-align: center; display: inline-block; border-radius: 5px; text-decoration: none; }
        h2 { color: #444; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Reset your password</h2>
        <p>U made a request to reset your password. Click the button below to reset it:</p>
        <p><a href="${resetLink}" class="button">Reset wachtwoord</a></p>
        <p>If you didn't request a change, ignore this e-mail.</p>
      </div>
    </body>
    </html>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Flexnote | Authentication <auth@flexnote.io>",
    to: email,
    subject: "Confirm your email",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { width: 80%; margin: 20px auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; }
        .button { background-color: #17a2b8; color: #ffffff; padding: 10px 20px; text-align: center; display: inline-block; border-radius: 5px; text-decoration: none; }
        h2 { color: #444; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Confirm your e-mail</h2>
        <p>Click the button below to confirm your e-mail:</p>
        <p><a href="${confirmLink}" class="button">Confirm e-mail</a></p>
        <p>Thank you for using Flexnote!</p>
      </div>
    </body>
    </html>
    `,
  });
};

export const sendScriptTag = async (email: string, websiteId: string) => {
  const code = `
  <pre>
    &lt;script id="Notify"&gt;
    (function() {
      const id = ${websiteId}; 
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://noti-widget.vercel.app/assets/index.js';
      scriptElement.setAttribute('websiteId', id);
      scriptElement.type = 'module';
      document.body.appendChild(scriptElement);
    })();
    &lt;/script&gt;
  </pre>`;

  await resend.emails.send({
    from: "Flexnote | Flexible Notifications <info@flexnote.io>",
    to: email,
    subject: "Flexnote | Script Tag",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { width: 80%; margin: 20px auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; }
        .code { background-color: #e9ecef; padding: 10px; border-radius: 5px; font-family: 'Courier New', Courier, monospace; }
        h2 { color: #444; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Flexnote | Script Tag for website integration</h2>
        <p>Hi,</p>
        <p>Please copy the following code and place it in your script tag.</p>
        <div class="code">
          <pre>&lt;script id="Notify"&gt;
    (function() {
      const id = '${websiteId}';
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://noti-widget.vercel.app/assets/index.js';
      scriptElement.setAttribute('websiteId', id);
      scriptElement.type = 'module';
      document.body.appendChild(scriptElement);
    })();
    &lt;/script&gt;</pre>
        </div>
        <p>Thank you for using Flexnote!</p>
      </div>
    </body>
    </html>
    `,
  });
};

export const createResendContact = async (email: string) => {
  const firstName = "DEMO";
  const audienceId = "8361e527-1987-44c6-8537-1e4a4f734b23";
  await resend.contacts.create({
    email,
    firstName,
    audienceId,
    unsubscribed: false,
  });

  await resend.emails.send({
    from: "Flexnote | Flexible Notifications <info@flexnote.io>",
    to: "robinlaurentius@gmail.com",
    subject: "NEW DEMO REQUEST",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { width: 80%; margin: 20px auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; }
        .highlight { color: #007BFF; }
        h2 { color: #444; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Nieuwe Demo Aanvraag Ontvangen!</h2>
        <p>Beste team,</p>
        <p>We hebben een nieuwe demo-aanvraag ontvangen van <span class="highlight">${email}</span>. Hier zijn de details van de aanvraag:</p>
        <ul>
          <li>Emailadres: <strong>${email}</strong></li>
          <li>Aangevraagd op: <strong>${new Date().toLocaleDateString()}</strong></li>
        </ul>
        <p>Gelieve contact op te nemen met de aanvrager om verdere stappen te bespreken en een demo-sessie te plannen.</p>
        <p>Bedankt voor jullie snelle actie!</p>
      </div>
    </body>
    </html>
    `,
  });
};
