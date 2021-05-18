const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

// parse aplication json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// definisikan route index
app.use("/auth", require("./middleware"));
// panggil route
var routes = require("./routes");
routes(app);

app.listen(3000, () => {
  console.log(`Server started on port`);
});
