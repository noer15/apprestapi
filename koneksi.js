var mysql = require("mysql");

// koneksi ke database
const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "",
  database: "dbrestapi",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
