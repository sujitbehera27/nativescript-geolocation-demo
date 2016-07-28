import * as geolocation from "nativescript-geolocation";
import {Page, NavigatedData} from "ui/page";

export function onNavigatedTo(args: NavigatedData) {
    (<Page>args.object).bindingContext = args.context;
}