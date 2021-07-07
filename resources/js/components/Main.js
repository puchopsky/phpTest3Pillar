import React from "react";
import ReactDOM from "react-dom";

import Login from "./Login";
import ImageManger from "./ImageManger";
import "bootstrap/dist/css/bootstrap.min.css";

if (document.getElementById("appRoot")) {
    ReactDOM.render(<Login />, document.getElementById("appRoot"));
}

if (document.getElementById("imageManager")) {
    ReactDOM.render(<ImageManger />, document.getElementById("imageManager"));
}
