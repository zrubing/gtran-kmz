"use strict";

var JSZip = require("jszip");
var kml = require("gtran-kml");
var promiseLib = require("./promise.js");

var Promise, writeFile;

exports.setPromiseLib = setPromiseLib;

exports.fromGeoJson = function (geojson, fileName, options) {
  if (!Promise) {
    setPromiseLib();
  }

  return kml.fromGeoJson(geojson, undefined, options).then(function (file) {
    var zip = new JSZip();
    zip.file("doc.kml", file.data);

    var buffer = zip.generate({ type: "nodebuffer" });
    if (fileName) {
      var fileNameWithExt = fileName;
      if (fileNameWithExt.indexOf(".kmz") === -1) {
        fileNameWithExt += ".kmz";
      }

      writeFile(fileNameWithExt, buffer).then((_) => {
        return Promise.resolve(fileNameWithExt);
      });
    } else {
      return Promise.resolve({
        data: buffer,
        format: "kmz",
      });
    }
  });
};

function setPromiseLib(lib) {
  Promise = promiseLib.set(lib);
  writeFile = promiseLib.promisify(require("fs").writeFile);

  kml.setPromiseLib(lib);
}
