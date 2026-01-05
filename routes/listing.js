const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingsController = require("../controllers/listings.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage: storage });

router
    .route("/")
    .get(wrapAsync(listingsController.index)) //index route
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingsController.createListing)); //create route


//New & Create Routes
router.get("/new", isLoggedIn, listingsController.renderNewForm);

//Edit Routes 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm));

router.route("/:id")
    .get(wrapAsync(listingsController.showListing)) //show & read route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingsController.updateListing)) //Update Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing)); //Destroy Route


module.exports = router;
