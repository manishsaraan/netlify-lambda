/* code from functions/todos-create.js */
let EmailModel = require("./models/email");
const mongoose = require("mongoose");
mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true }
);

console.log("--------process.env.FAUNADB_SECRET", process.env.DB_URI);

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  const todoItem = {
    data: data
  };
  console.log(
    "data*********************************************************todoItem",
    data
  );
  let msg = new EmailModel({
    email: data.email
  });
  console.log(
    "Function**********************************************************e` invoked",
    msg
  );

  console.log("--------process.env.FAUNADB_SECRET", process.env.DB_URI);

  try {
    const data = await msg.save();
    console.log("------------------------data", data);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    });
  } catch (e) {
    return callback("erorror occured");
  }
};
