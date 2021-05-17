"use strict";
module.exports = function (app) {
  var controller = require("./controller/mahasiswa");

  app.route("/").get(controller.index);
  app.route("/mahasiswa").get(controller.tampilMahasiswa);
  app.route("/mahasiswa/:id").get(controller.mahasiswaId);
  app.route("/tambah").post(controller.addMahasiswa);
  app.route("/ubah").put(controller.updateMahasiswa);
  app.route("/hapus/:id").delete(controller.deleteMahasiswa);
};
