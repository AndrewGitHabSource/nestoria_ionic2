import {Page, NavController, NavParams} from 'ionic-angular';
import {propertiesService} from '../../services/propertiesService';
import {Input} from '@angular/core';
import { classRecentSearches } from "../../common/recentSearches";
import {detailsPage} from '../details/details';
import {property} from '../../common/objects';


@Page({
    templateUrl: 'build/pages/search/template.html'
})
export class search {
    @Input()
        searchRequest:string;

    private properties:Array<property>;
    private recentSearches:Array<classRecentSearches>;
    private showRecentSearches:boolean = true;
    private index: number = 1;
    private processLoad: boolean = false;

    constructor(private rest:propertiesService, private nav:NavController, navParams:NavParams) {
        this.recentSearches = rest.getRecentSearches();
    }

    searchObjects(request:string, page:number) {
        this.processLoad = true;
        page = page || 1;
        this.rest.getPropertiesOnServer(request, page)
            .then(response => {
                this.properties = response;
                if (page == 1) {
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
        this.index = 1;
        this.searchRequest = request;
        this.searchObjects(this.searchRequest, this.index);
    }

    find(){
        this.index = 1;
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