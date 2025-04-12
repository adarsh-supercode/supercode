"use server";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const POST = async (req) => {
  try {
    const { inputValues } = await req.json();
    const {
      companyemail,
      companyname,
      userEmail,
      name,
      newsletter,
      phoneno,
      message,
    } = inputValues;
    const subject = userEmail
      ? "Resouces Email submit"
      : companyname
      ? `Contact Us Message from ${companyname}`
      : "";
    const msg = {
      to: ["info@supercode.in", "sooryajith.ak@supercode.in"],
      from: userEmail || companyemail,
      subject: subject,
      text: ` ${name ? `Name: ${name}` : ""}\n ${
        phoneno ? `Phone: ${phoneno}` : ""
      }\n ${newsletter ? `Newsletter: ${newsletter}` : ""}\n ${
        message ? `Message:${message}` : ""
      } \n`,
      html: `
       <div >
      ${message ? `<p style=" margin: 0 0 20px;">${message}</p>` : ""}
      ${name ? `<p style=" margin: 0 0 5px;"> ${name}</p>` : ""}
      ${phoneno ? `<p style=" margin: 0 0 5px;"> ${phoneno}</p>` : ""}
      ${companyname ? `<p style=" margin: 0 0 5px;"> ${companyname}</p>` : ""}
      ${userEmail ? `<p style=" margin: 0 0 5px;"> ${userEmail}</p>` : ""}
      ${companyemail ? `<p style="margin: 0 0 5px;">${companyemail}</p>` : ""}
    </div>
      `,
    };

    await sgMail.send(msg);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
};
