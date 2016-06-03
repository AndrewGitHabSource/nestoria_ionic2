import {Page, NavController, NavParams} from 'ionic-angular';
import { restService } from '../../services/service';
import { JSONP_PROVIDERS }  from '@angular/http';
import { Observable }       from 'rxjs/Observable';



@Page({
    templateUrl: 'build/pages/search/template.html'
})
export class search {

    constructor(private rest: restService) {
        this.getProperties();
    }

    error: any;

    getProperties() {
        this.rest.getPropertiesOnServer().then(res => {
            console.log(res);
        });
    }
}

