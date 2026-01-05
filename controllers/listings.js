const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const { search } = req.query;
    let allListings;

    // helper to escape user input for regex
    const escapeRegex = (text) => {
        return text.replace(/[-\\/\\^$*+?.()|[\]{}]/g, "\\$&");
    };

    if (search && search.trim()) {
        const q = escapeRegex(search.trim());
        const regex = new RegExp(q, 'i');
        allListings = await Listing.find({
            $or: [
                { title: regex },
                { location: regex },
                { country: regex },
                { category: regex }
            ]
        });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", { allListings, searchQuery: search || '' });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs"); 
};

module.exports.showListing = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
        }
        console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    listing.image.url = listing.image.url.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing});
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect(`/listings`);
};