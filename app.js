if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path")
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


// const MONGO_URL = 'mongodb://localhost:27017/wanderlust';
const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

//Mongoose Connection
async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

let store;
try {
    if (MongoStore && typeof MongoStore.create === 'function') {
        store = MongoStore.create({
            mongoUrl: dbUrl,
            crypto: {
                secret: process.env.SECRET
            },
            touchAfter: 24 * 60 * 60
        });
    } else if (typeof MongoStore === 'function') {
        // Older exports (constructor style)
        store = new MongoStore({
            mongoUrl: dbUrl,
            crypto: {
                secret: process.env.SECRET
            },
            touchAfter: 24 * 60 * 60
        });
    } else if (MongoStore && MongoStore.default && typeof MongoStore.default.create === 'function') {
        // Some bundlers put default export
        store = MongoStore.default.create({
            mongoUrl: dbUrl,
            crypto: {
                secret: process.env.SECRET
            },
            touchAfter: 24 * 60 * 60
        });
    } else {
        console.warn('connect-mongo export shape unexpected; sessions will use in-memory store (not recommended for production)');
    }
} catch (e) {
    console.error('Error creating session store:', e);
}

if (store && typeof store.on === 'function') {
    store.on("error", (e) => {
        console.log("Session Store Error", e);
    });
}

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.CurrUser = req.user;
    next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username : "delta-student"
//     });

//     let registeredUser = await User.register(fakeUser, "hello world");
//     res.send(registeredUser);
// })


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {message});
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
}); 

// search: localhost:8080/listings