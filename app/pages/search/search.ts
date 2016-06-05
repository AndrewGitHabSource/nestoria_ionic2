import {Page, NavController, NavParams} from 'ionic-angular';
import {restService} from '../../services/propertiesService';
import {JSONP_PROVIDERS}  from '@angular/http';
import {Observable}       from 'rxjs/Observable';
import {EventEmitter, Input, Output} from '@angular/core';

import {detailsPage} from '../details/details';

import {property} from '../../common/objects';
import { parameters } from "../../common/parameters";
import { headers } from "../../common/headers";


@Page({
    templateUrl: 'build/pages/search/template.html'
})
export class search {
    @Input()
    searchRequest:string;

    properties:Array<property>;
    error:any;

    constructor(private rest:restService, private nav: NavController, navParams: NavParams) {
    }

    searchObjects() {
        this.rest.getPropertiesOnServer(this.searchRequest)
            .then(response => {
                this.properties = response;
            });
    }

    showProperty(event, item) {
        this.nav.push(detailsPage, {
            item: item
        });
    }

}

