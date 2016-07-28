import application = require("application");
import platform = require("platform");
application.mainModule = "views/main-page";
application.cssFile = "./app.css";

application.on(application.launchEvent, function(args) {
    if (platform.device.os === platform.platformNames.ios) {
        GMSServices.provideAPIKey("AIzaSyDQZOuoz1x-bMki_pbb7AYyU9D8Js4ZpKQ");
    }
});

application.start();
