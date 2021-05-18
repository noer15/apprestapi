const connection = require("../db/koneksi");
const mysql = require("mysql");
const md5 = require("md5");
const response = require("../res");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const ip = require("ip");
const { query } = require("../db/koneksi");
const conn = require("../db/koneksi");

// controller untuk register
exports.registrasi = function (req, res) {
  const post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date(),
  };

  const check = "SELECT email FROM ?? WHERE ??";
  const table = ["user", "email", post.email];

  query = mysql.format(check, table);
  connection.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        const query = "INSERT INTO ?? SET ??";
        const table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, function (error, result) {
          if (error) {
            console.log(error);
          } else {
            response.ok("berhasil menambahkan user baru", res);
          }
        });
      } else {
        response.ok("email sudah terdaftar");
      }
    }
  });
};
