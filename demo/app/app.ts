require("./bundle-config");

import { topmost } from "ui/frame";
import * as application from "application";
import { device, platformNames } from "platform";

application.on(application.launchEvent, function (args) {
    if (device.os === platformNames.ios) {
        GMSServices.provideAPIKey("AIzaSyDQZOuoz1x-bMki_pbb7AYyU9D8Js4ZpKQ");
    }
});

// application.setCssFileName("./app.css");
application.start("views/main-page");
