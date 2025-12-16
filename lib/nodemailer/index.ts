import nodemailer from "nodemailer";
import {
  WELCOME_EMAIL_TEMPLATE,
  NEWS_SUMMARY_EMAIL_TEMPLATE,
} from "@/lib/nodemailer/templates";

const FROM_EMAIL = `"Signalist" <${process.env.NODEMAILER_EMAIL}>`;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// optional but recommended (remove after testing)
transporter.verify().then(() => {
  console.log("SMTP connection verified");
}).catch(console.error);

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData): Promise<void> => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE
    .replace("{{name}}", name)
    .replace("{{intro}}", intro);

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: email,
    subject: "Welcome to Signalist 🚀",
    text: "Thanks for joining Signalist",
    html: htmlTemplate,
  });
};

export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}): Promise<void> => {
  const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
    .replace("{{date}}", date)
    .replace("{{newsContent}}", newsContent);

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: email,
    subject: `📈 Market News Summary - ${date}`,
    text: `Today's market news summary`,
    html: htmlTemplate,
  });
};
