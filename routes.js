"use strict";
module.exports = function (app) {
  var controller = require("./controller/mahasiswa");

  app.route("/").get(controller.index);
  app.route("/mahasiswa").get(controller.tampilMahasiswa);
  app.route("/mahasiswa/:id").get(controller.mahasiswaId);
};
