require("dotenv").config();

const path = require("path");
const express = require("express");
const cookiepraser = require("cookie-parser");
const flash = require('express-flash')
const port = process.env.PORT || 3000;

require("./config/db");
const Contact = require("./models/Contact");
const User = require("./models/User");
//require for session
const session = require("express-session");
const passport = require("passport");
require("./config/passport-local");
const MongoStore = require("connect-mongo");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assects")));
app.use("/uploads", express.static(path.join(__dirname, 'uploads'))); 
app.use(cookiepraser());
app.use(flash());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session configuration
app.use(
  session({
    name: "something",
    secret: process.env.SESSION_SECRET || "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGOURL,
    }),
  })
);

const multer = require('multer');
const File = require("./models/File");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});


const upload = multer({ storage: multerStorage })

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setuser);

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
};

// Routes
app.use("/", require("./routes"));

// form upload stuffs start here

//  {
//   fieldname: 'avatar',
//   originalname: 'steve-jobs--david-paul-morrisbloomberg-via-getty-images.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads',
//   filename: 'files/admin-avatar-1632159110949.jpeg',
//   path: 'uploads\\files\\admin-avatar-1632159110949.jpeg',
//   size: 83952
// } 

app.get("/upload", (req, res) => res.render("upload/index"))

app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.file);
  const { originalname, path, size } = req.file;
  File.create({ originalname, path, size }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    req.flash("success", "file uploaded successfully!")
    res.redirect("back",)
  })
})

app.get("/showImages", (req, res) => {
  File.find({}, (err, doc) => {
    if(err) console.err(err);
    console.log(doc)
    res.render("upload/show", {images: doc})
  })
})

// form upload stuffs end here


app.get("/", function (req, res) {
    return res.render("home", {
        user: req.user // Pass user data to the template
    });
});

app.get("/aboutme2", function (req, res) {
  return res.render("b");
});

app.post("/aboutme", function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect("/signin");
    }

    Contact.create(
        {
            name: req.body.name,
            number: req.body.number,
            user: req.user._id
        },
        function (err, contact_list) {
            if (err) {
                console.log("error found");
                return;
            }
            res.redirect("/contacts");
        }
    );
});

app.get("/delete/:id", function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect("/signin");
    }

    const data = req.params.id;
    Contact.findOneAndDelete({ _id: data, user: req.user._id }, function (err) {
        if (err) {
            console.log("error is coming");
        }
        res.redirect("/contacts");
    });
});

// update contact routes by id
app.get("/update/:id", function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect("/signin");
    }

    const id = req.params.id;
    Contact.findOne({ _id: id, user: req.user._id }, function (err, data) {
        if (err) {
            return res.redirect("/contacts");
        } else {
            return res.render("b", { contact: data });
        }
    });
});

app.get("/updates/:id", function (req, res) {
  const data = req.params.id;
  Contact.findById(data, function (err, sucess) {
    if (err) {
      return res.redirect("/");
    } else {
      return res.render("c", { dbb: sucess });
    }
  });
});

app.post("/update/:id", function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect("/signin");
    }

    const id = req.params.id;
    Contact.findOneAndUpdate(
        { _id: id, user: req.user._id },
        req.body,
        function (err, docs) {
            if (err) {
                console.error(err);
                return res.redirect("/contacts");
            } else {
                return res.redirect("/contacts");
            }
        }
    );
});

app.post("/updates/:id", function (req, res) {
  const data = req.params.id;
  Contact.findByIdAndUpdate(data, req.body, function (err, sucess) {
    if (err) {
      console.log(err);
      return res.redirect("/");
    } else {
      return res.redirect("/");
    }
  });
});
app.get("/framework", passport.authuser, function (req, res) {
  res.render("pro");
});

app.get("/signup", function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/framework");
  }
  return res.render("sign-up");
});

app.post("/signup", function (req, res) {
  if (req.body.password != req.body.conform_password) {
    console.log("your password is incorrect");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error is coming");
      return;
    }
    if (!user) {
      User.create(req.body, function (err) {
        if (err) {
          console.log("error is coming");
          return;
        }
        return res.redirect("/signin");
      });
    }
    if (user) {
      console.log("user is aleady exists ");
    }
  });
});

app.get("/signin", function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/framework");
  }

  return res.render("sign-in");
});
app.post(
  "/createsession",
  passport.authenticate("local", { failureRedirect: "/signin" }),
  function (req, res) {
    return res.redirect("/");
  }
);

app.get("/sign-out", function (req, res) {
  req.logout();
  res.redirect("/");
});

// Add new logout route
app.get("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

app.get("/contacts", isAuthenticated, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.render("contacts", { 
      contact_list: contacts,
      user: req.user,
      success: req.query.success,
      error: req.query.error
    });
  } catch (err) {
    res.render("contacts", { 
      contact_list: [],
      user: req.user,
      error: "Failed to fetch contacts"
    });
  }
});

app.post("/aboutme", isAuthenticated, async (req, res) => {
  try {
    const newContact = new Contact({
      ...req.body,
      user: req.user._id
    });
    await newContact.save();
    res.redirect("/contacts?success=Contact added successfully");
  } catch (err) {
    res.redirect("/contacts?error=Failed to add contact");
  }
});

app.get("/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) {
      return res.redirect("/contacts?error=Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/contacts?success=Contact deleted successfully");
  } catch (err) {
    res.redirect("/contacts?error=Failed to delete contact");
  }
});

app.post("/update/:id", isAuthenticated, async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) {
      return res.redirect("/contacts?error=Contact not found");
    }
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/contacts?success=Contact updated successfully");
  } catch (err) {
    res.redirect("/contacts?error=Failed to update contact");
  }
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }

  console.log("server is working in express", port);
  console.log(process.env.MONGOURL);
});

// Export the Express API
module.exports = app;
