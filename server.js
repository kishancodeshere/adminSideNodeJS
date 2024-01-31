const express = require("express");
const dotEnv = require("dotenv");
const path = require("path");
const ejs = require("ejs");
const tesingRoutes = require("./routes/testing/testing");
const empRoutes = require("./routes/testing/employee");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

const port = 9101;
const app = express();
const connectDatabase = require("./config/db");

dotEnv.config();
connectDatabase();

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());

//-----Flash Messsage ------//

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

//----- End Flash Messsage ------//

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/testing", tesingRoutes);
app.use("/employee", empRoutes);

app.listen(port, () => {
  console.log(`Server is running on port no ${port}`);
});
