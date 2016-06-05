import {Page, NavController, NavParams} from 'ionic-angular';
import {propertiesService} from '../../services/propertiesService';
import {JSONP_PROVIDERS}  from '@angular/http';
import {Observable}       from 'rxjs/Observable';
import {EventEmitter, Input, Output} from '@angular/core';

import { classRecentSearches } from "../common/recentSearches";

import {detailsPage} from '../details/details';

import {property} from '../../common/objects';
import {parameters} from "../../common/parameters";
import {headers} from "../../common/headers";


@Page({
    templateUrl: 'build/pages/search/template.html'
})
export class search {
    @Input()
    searchRequest:string;

    properties:Array<property>;
    recentSearches:Array<classRecentSearches>;
    showRecentSearches: boolean = true;
    error:any;

    constructor(private rest:propertiesService, private nav: NavController, navParams: NavParams) {
        this.recentSearches = rest.getRecentSearches();
        console.log(this.recentSearches);
    }

    searchObjects(request: string) {
        request = request || this.searchRequest;
        this.rest.getPropertiesOnServer(request)
            .then(response => {
                this.properties = response;
                this.showRecentSearches = false;
            });
    }

    showProperty(event, item) {
        this.nav.push(detailsPage, {
            item: item
        });
    }

}

