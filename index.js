if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  productRoute = require("./routes/product.route"),
  userRoute = require("./routes/user.route");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database conected");
    },
    (error) => {
      console.log("cannot connect to database" + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/products", productRoute);
app.use("/user", userRoute);


const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});
