const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const EmailVerificationToken = require("../models/email-verification-token.model");
const userModel = require("../models/user.model");
const { isValidObjectId } = require("mongoose");

exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userInDB = await User.findOne({ email });
  if (userInDB) {
    return res
      .status(401)
      .json({ error: "Email already in use. Please try another one!" });
  }
  const newUser = new User({ name, email, password });
  await newUser.save();

  // After saving User to DB create token and store it to DB and send email-verficatiton to user with OTP.
  // 1 - Generate OTP & save it to DB
  let Token = "";
  for (let i = 0; i <= 5; i++) {
    Token += Math.floor(Math.random() * 9);
  }
  const emailVerificationToken = new EmailVerificationToken({
    token: Token,
    user: newUser._id,
  });
  await emailVerificationToken.save();

  // 2 - Trigger Email to user's email address with OTP.

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e72a761b3d8819",
      pass: "2b6b70738b7cd2",
    },
  });
  transport.sendMail({
    from: "Verification@MovieReview.com",
    to: newUser.email,
    subject: "Email Verificatiton",
    html: `
      <p>Your Verification OTP.</p>
      <h1>${Token}</h1>
    `,
  });

  return res.status(201).json({
    message:
      "Please verify your email address, OTP has been sent out to your email address.",
  });
};

exports.verifyEmail = async (req, res, next) => {
  const { otp, userID } = req.body;
  if (!isValidObjectId(userId)) {
    return res.status(404).json({ error: "Invalid user!" });
  }
  const user = await User.findById(userID);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  if (user.isVerified) {
    return res.json({ error: "User email address already verified." });
  }
  const token = await EmailVerificationTokenModel.findOne({
    user: userId,
  });
  if (!token) {
    return res.json({ error: "token not found or expired." });
  }

  const isMatched = await token.compareToken(otp);
  if (!isMatched) {
    return res
      .status(401)
      .json({ error: "Invalid token, please submit valid token." });
  }

  // Update the user's isVerified property to TRUE

  user.isVerified = true;
  await user.save();

  // Delete the document or TOKEN from DB;

  await EmailVerificationToken.findByIdAndDelete(userId);
  // Send mail to the client
};

exports.signIn = (req, res, next) => {
  return res.send("Sign IN");
};
