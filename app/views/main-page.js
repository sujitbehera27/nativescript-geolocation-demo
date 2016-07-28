"use strict";
var geolocation = require("nativescript-geolocation");
var frame = require("ui/frame");
var enums_1 = require("ui/enums");
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ViewModel.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            if (this._status !== value) {
                this._status = value;
                this.notifyPropertyChange('status', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "locations", {
        get: function () {
            if (!this._locations) {
                this._locations = new observable_array_1.ObservableArray();
            }
            return this._locations;
        },
        set: function (value) {
            if (this._locations !== value) {
                this._locations = value;
                this.notifyPropertyChange('locations', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
var page;
var model = new ViewModel();
function pageLoaded(args) {
    page = args.object;
    page.bindingContext = model;
}
exports.pageLoaded = pageLoaded;
function enableLocationTap(args) {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}
exports.enableLocationTap = enableLocationTap;
function buttonGetLocationTap(args) {
    var location = geolocation.getCurrentLocation({ desiredAccuracy: enums_1.Accuracy.high, updateDistance: 0.1, maximumAge: 100, timeout: 20000 }).
        then(function (loc) {
        if (loc) {
            model.locations.push(loc);
        }
    }, function (e) {
        console.log("Error: " + e.message);
    });
}
exports.buttonGetLocationTap = buttonGetLocationTap;
var watchId;
function buttonStartTap(agrs) {
    watchId = geolocation.watchLocation(function (loc) {
        if (loc) {
            model.locations.push(loc);
        }
    }, function (e) {
        console.log("Error: " + e.message);
    }, { desiredAccuracy: enums_1.Accuracy.high, updateDistance: 0.1, minimumUpdateTime: 100 });
}
exports.buttonStartTap = buttonStartTap;
function buttonStopTap(agrs) {
    if (watchId) {
        geolocation.clearWatch(watchId);
    }
}
exports.buttonStopTap = buttonStopTap;
function showOnMap(args) {
    var topmost = frame.topmost();
    var mapPageModel = new observable_1.Observable({ location: model.locations.getItem(model.locations.length - 1) });
    topmost.navigate({
        moduleName: "views/mapPage",
        context: mapPageModel
    });
}
exports.showOnMap = showOnMap;
function buttonClearTap(agrs) {
    model.locations.splice(0, model.locations.length);
}
exports.buttonClearTap = buttonClearTap;
//# sourceMappingURL=main-page.js.map