import mongoose from "mongoose";

const UserShema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "A név megadása kötelező",
  },
  email: {
    type: String,
    trim: true,
    unique: "Az emailcím már használatban van.",
    match: [/.+\@.+\..+/, "Érvényes emailcímet adj meg!"],
    required: "Az email megadása kötelező",
  },
  created: { type: Date, default: Date.now },
  updated: Date,
  hashed_password: { type: String },
  salt: String,
});
UserShema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return cryptio
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

UserShema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserShema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "A jelszó legyen legalább 6 karakter hosszú");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "A jelszó megadása kötelező");
  }
}, null);

export default mongoose.model("User", UserShema);
