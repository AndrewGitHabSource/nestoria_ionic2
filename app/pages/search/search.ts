import {Page, NavController, NavParams} from 'ionic-angular';
import { restService } from '../../services/service';
import { JSONP_PROVIDERS }  from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { EventEmitter, Input, Output } from '@angular/core';

import { property } from '../../common/objects.ts';



@Page({
    templateUrl: 'build/pages/search/template.html'
})
export class search {
    @Input() searchRequest: string;

    properties: Array<property>;
    error: any;

    constructor(private rest: restService) {

    }

    searchObjects(): void{
        this.getProperties(this.searchRequest);
    }

    getProperties(searchRequest: string): void {
        this.rest.getPropertiesOnServer(searchRequest).then(response => {
            console.log(response);
            this.properties = response;
        });
    }
}

