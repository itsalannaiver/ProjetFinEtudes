const express = require("express");
const usersRoute = require("./api/userApi");
const courseRouter = require("./api/courseApi");
const exerciseRouter = require("./api/exerciseApi");
const groupsRouter = require("./api/groupsApi");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

require("./config/passport")(passport);
const app = express();

// CORS
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// Body-Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session
app.use(
  session({
    secret: "secret key",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000, httpOnly: false },
  })
);

// PassPort
app.use(passport.initialize());
app.use(passport.session());

// API's
app.use("/users", usersRoute);
app.use("/course", courseRouter);
app.use("/groups", groupsRouter);
app.use("/exercise", exerciseRouter);

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("server started on http://localhost:" + port);
});
