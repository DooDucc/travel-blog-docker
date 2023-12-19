const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connect };
