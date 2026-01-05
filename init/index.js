const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://localhost:27017/wanderlust';

main()
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.error(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "693f8de5f45abbb1fdb0aa08"}));
    await Listing.insertMany(initData.data)
    console.log("data was initialized.");
}

initDB();