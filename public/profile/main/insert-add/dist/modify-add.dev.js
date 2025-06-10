"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.btn = void 0;
var btn = null;
exports.btn = btn;
document.addEventListener("DOMContentLoaded", function () {
  exports.btn = btn = document.getElementById("modifica-btn-123");

  if (btn) {
    btn.addEventListener('click', function () {
      console.log("clicked");
    });
  }
});