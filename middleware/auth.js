const connection = require("../db/koneksi");
const mysql = require("mysql");
const md5 = require("md5");
const response = require("../res");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const ip = require("ip");

// controller untuk register
exports.registrasi = function (req, res) {
  const post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date(),
  };

  var check = "SELECT email FROM ?? WHERE ??=?";
  var table = ["user", "email", post.email];

  query = mysql.format(check, table);
  connection.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, function (error, result) {
          if (error) {
            console.log(error);
          } else {
            response.ok("berhasil menambahkan user baru", res);
          }
        });
      } else {
        response.ok("email sudah terdaftar !!", res);
      }
    }
  });
};

// controller untuk login
exports.login = function (req, res) {
  const post = {
    email: req.body.email,
    password: req.body.password,
  };
  var check = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  var table = ["user", "email", post.email, "password", md5(post.password)];
  query = mysql.format(check, table);
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      if (result.length == 1) {
        var token = jwt.sign({ result }, config.secret, {
          expiresIn: "2400000",
        });

        id_user = result[0].id;

        var data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
        };
        var query = "INSERT INTO ?? SET ?";
        var table = ["akses_token"];
        query = mysql.format(query, table);
        connection.query(query, data, function (error, result) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "Token JWT terintegrasi",
              token: token,
              user: data.id_user,
            });
          }
        });
      } else {
        res.json({
          error: true,
          message: "Email dan password salah",
        });
      }
    }
  });
};
