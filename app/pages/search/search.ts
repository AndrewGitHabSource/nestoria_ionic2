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
    showRecentSearches:boolean = true;
    error:any;
    index = 1;
    processLoad = false;

    constructor(private rest:propertiesService, private nav:NavController, navParams:NavParams) {
        this.recentSearches = rest.getRecentSearches();
    }

    searchObjects(request:string, page:string) {
        this.processLoad = true;
        request = request || this.searchRequest;
        page = page || 1;
        this.rest.getPropertiesOnServer(request, page)
            .then(response => {
                this.properties = response;
                if (page <= 1) {
                    this.rest.saveRecentSearches(this.properties, request);
                }
                this.showRecentSearches = false;
                this.processLoad = false;
            });
    }

    showProperty(event, item) {
        this.nav.push(detailsPage, {
            item: item
        });
    }

    goOnRequest(request:string) {
        this.searchRequest = request;
        this.searchObjects(this.searchRequest, this.index);
    }

    next() {
        this.index++;
        this.searchObjects(this.searchRequest, this.index);
    }

    prev() {
        if (this.index > 1) {
            this.index--;
            this.searchObjects(this.searchRequest, this.index);
        }
    }
}