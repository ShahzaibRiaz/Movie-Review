const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const EmailVerificationTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  expiresAfter: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

/** ------------------------------ */
/** PRE HOOKS */
/** ------------------------------ */
EmailVerificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }
  next();
});

/** ------------------------------ */
/** CUSTOM METHOD */
/** ------------------------------ */
EmailVerificationTokenSchema.methods.compareToken = async function (token) {
  return await bcrypt.compare(token, this.token);
};

const EmailVerificationTokenModel = mongoose.model(
  "EmailVerificationToken",
  EmailVerificationTokenSchema
);

module.exports = EmailVerificationTokenModel;
