import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "leaflet/dist/leaflet.css";

// work-around react-leaftlet icon issues, see https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387
delete (window as any).L.Icon.Default.prototype._getIconUrl;
(window as any).L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
