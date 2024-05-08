import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = new Resend("re_MoBSHPZh_PNs8U9gbepkonSWHNaMzj5W9");

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendScriptTag = async (email: string, websiteId: string) => {
  const code = `
  <pre>
    &lt;script id="Notify"&gt;
    (function() {
      const id = ${websiteId}; 
      const scriptElement = document.createElement('script');
      scriptElement.src = 'http://localhost:5173/src/main.ts';
      scriptElement.setAttribute('websiteId', id);
      scriptElement.type = 'module';
      document.body.appendChild(scriptElement);
    })();
    &lt;/script&gt;
  </pre>`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Notification Script Tag",
    html: `<div><p>Hi,</p><br/><br/><p>Please copy and paste the code at the end of your body tag</p><br/>${code}</div>`,
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
    from: "Acme <onboarding@resend.dev>",
    to: "robinlaurentius@gmail.com",
    subject: "NEW DEMO REQUEST",
    html: `<div>NEW DEMO REQUEST BY ${email}</div>`,
  });
};
