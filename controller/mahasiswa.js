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

// menambahkan data
exports.addMahasiswa = function (req, res) {
  const { nim, nama, jurusan } = req.body;
  connection.query(
    "INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?,?,?)",
    [nim, nama, jurusan],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Data berhasil di input", res);
      }
    }
  );
};

// update data
exports.updateMahasiswa = function (req, res) {
  const { id, nim, nama, jurusan } = req.body;
  connection.query(
    "UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id=?",
    [nim, nama, jurusan, id],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Data berhasil di ubah", res);
      }
    }
  );
};

// delete data
exports.deleteMahasiswa = function (req, res) {
  var id = req.body.id;
  connection.query(
    "DELETE FROM mahasiswa WHERE id=?",
    [id],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      response.ok("Data berhasil dihapus", res);
    }
  );
};
