import * as geolocation from "nativescript-geolocation";
import * as fs from "file-system";
import * as frame from "ui/frame";
import {Observable, EventData} from "data/observable";
import {ObservableArray} from "data/observable-array";
import {Page} from "ui/page";

export class ViewModel extends Observable {
    private _status: string;

    public get status(): string {
        return this._status;
    }

    public set status(value: string) {
        if (this._status !== value) {
            this._status = value;
            this.notifyPropertyChange('status', value)
        }
    }

    private _locations: ObservableArray<geolocation.Location>;

    public get locations(): ObservableArray<geolocation.Location> {
        if (!this._locations) {
            this._locations = new ObservableArray<geolocation.Location>();
        }
        return this._locations;
    }

    public set locations(value: ObservableArray<geolocation.Location>) {
        if (this._locations !== value) {
            this._locations = value;
            this.notifyPropertyChange('locations', value)
        }
    }
}

var page: Page;
var model = new ViewModel();

export function pageLoaded(args: EventData) {
    page = <Page>args.object;
	page.bindingContext = model;
}

export function enableLocationTap(args: EventData) {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}

export function buttonGetLocationTap(args: EventData) {
    var location = geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
        then(function (loc) {
            if (loc) {
                model.locations.push(loc);
            }
        }, function (e) {
            console.log("Error: " + e.message);
        });
}

var watchId;

export function buttonStartTap(agrs: EventData) {
    watchId = geolocation.watchLocation(
        function (loc) {
            if (loc) {
                model.locations.push(loc);
            }
        },
        function (e) {
            console.log("Error: " + e.message);
        },
        { desiredAccuracy: 3, updateDistance: 10, minimumUpdateTime: 1000 * 20 }); // should update every 20 sec according to google documentation this is not so sure.
}

export function buttonStopTap(agrs: EventData) {
    if (watchId) {
        geolocation.clearWatch(watchId);
    }
}

export function showOnMap(args: EventData) {
    var topmost = frame.topmost();
    var mapPageModel = new Observable({location: model.locations.getItem(model.locations.length - 1)});
    topmost.navigate({
        moduleName: "views/mapPage",
        context: mapPageModel
    });
}