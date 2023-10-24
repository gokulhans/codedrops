const mongoose = require("mongoose");
const mongoconfig = require('./config/db.config');

mongoose.set("strictQuery", false);

const mongouri = mongoconfig.uri;

run().catch((err) => console.log(err));

async function run() {
    await mongoose.connect(mongouri);
    console.log('Connected to the database');
}