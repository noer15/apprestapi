var mysql = require("mysql");

//buat koneksi database
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dbrestapi",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql terkoneksiii");
});

module.exports = conn;
