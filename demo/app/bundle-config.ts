const VIEWS_DIR = "views";

const registerView = (name: string) => registerModule(`${VIEWS_DIR}/${name}`, `./${VIEWS_DIR}/${name}`);
const registerModule = (name: string, path: string = name) => global.registerModule(name, () => require(path));

if ((<any>global).TNS_WEBPACK) {
    require("tns-core-modules/bundle-entry-points");

    registerView("main-page");
    registerView("map-page");

    // register application modules
    // registerModule("nativescript-geolocation");
}
