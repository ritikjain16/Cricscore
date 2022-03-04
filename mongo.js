const mongoose = require('mongoose')

const conn_url = process.env.MONGOOSE_URL

mongoose
  .connect(conn_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(`no connection `));