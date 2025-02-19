const { Verification_Email_Template,Welcome_Email_Template} =require("./EmailTemplate.js");

const {transporter} =require("./Email.config.js");
 const SendVerificationCode=async(email,verificationCode)=>{
    try{
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" bhartiwadhwa025@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Verify your email", // Subject line
        text: "Verify your email", // plain text body
        html: Verification_Email_Template.replace("{verificationCode}",
        verificationCode), // html body
      });
      console.log("Email sent succesfully")
    }
    catch(err){
        console.log(err);
    }
}

const WelcomeEmail=async(email,name)=>{
  try{
  const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" bhartiwadhwa025@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Verify your email", // Subject line
      text: "Verify your email", // plain text body
      html: Welcome_Email_Template.replace("{name}",
      name), // html body
    });
    console.log("Email sent succesfully")
  }
  catch(err){
      console.log(err);
  }
}

module.exports={SendVerificationCode,WelcomeEmail};