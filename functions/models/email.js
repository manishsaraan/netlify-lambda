const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create a schema
const emailSchema = new Schema({
  email: { type: Schema.Types.String }
});

const EmailModel = mongoose.model("Emails", emailSchema);

// make this available to our users in our Node applications
module.exports = EmailModel;
