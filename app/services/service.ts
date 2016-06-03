import { Injectable }    from '@angular/core';
import { Headers, Http, HTTP_PROVIDERS, URLSearchParams,JSONP_PROVIDERS, Jsonp } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { property } from "../common/objects";

@Injectable()
export class restService {

    private url = 'http://api.nestoria.co.uk/api?callback=JSONP_CALLBACK';

    private searchParams = new URLSearchParams();
    private headers = new Headers();

    public properties: Array<any>;

    constructor(private jsonp: Jsonp) {

        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');

        this.searchParams.set('country', 'uk');
        this.searchParams.set('pretty', '1');
        this.searchParams.set('action', 'search_listings');
        this.searchParams.set('encoding', 'json');
        this.searchParams.set('listing_type', '1');
        this.searchParams.set('page', '1');
        this.searchParams.set('place_name', '');
        this.searchParams.set('centre_point', '');

    }


    getProperties() {
        return this.properties;
    }

    getPropertiesOnServer(searchProperties): Promise<property[]> {
        this.searchParams.set('place_name', searchProperties);
        
        return this.jsonp.get(this.url, {search: this.searchParams}, {headers: this.headers})
            .toPromise()
            .then(response => {
                this.properties = response.json().response.listings;
                return this.properties;
            })
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}