"use strict";

var response = require("../res");
var connection = require("../db/koneksi");

exports.index = function (req, res) {
  response.ok("Berjalan dengan normal", res);
};

// show all
exports.tampilMahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (err, result) {
    if (err) {
      connection.log(err);
    }
    response.ok(result, res);
  });
};

// show id
exports.mahasiswaId = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id = ?",
    [id],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        response.ok(result, res);
      }
    }
  );
};
