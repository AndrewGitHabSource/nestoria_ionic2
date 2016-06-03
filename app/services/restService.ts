import { Injectable }    from '@angular/core';
import { Headers, Http, HTTP_PROVIDERS, URLSearchParams,JSONP_PROVIDERS, Jsonp } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { parameters } from "../common/parameters";
import { headers } from "../common/headers";
import { property } from "../common/objects";

@Injectable()
export class restService {
    private url = 'http://api.nestoria.co.uk/api?callback=JSONP_CALLBACK';
    private searchParams = new URLSearchParams();
    private headers = new Headers();

    public properties: Array<any>;

    constructor(private jsonp: Jsonp) {
        this.setParameters(parameters);
        this.setHeaders(headers);
    }


    getProperties() {
        return this.properties;
    }

    setProperties(properties) {
        this.properties = properties;
    }

    getPropertiesOnServer(searchProperties): Promise<property[]> {
        this.searchParams.set('place_name', searchProperties);

        return this.jsonp.get(this.url, {search: this.searchParams}, {headers: this.headers})
            .toPromise()
            .then(response => {
                // this.properties = response.json().response.listings;
                this.setProperties(response.json().response.listings);
                return this.properties;
            })
            .catch(this.handleError);
    }

    private setParameters(parameters:any):void {
        for (let key in parameters) {
            this.searchParams.set(key, parameters[key]);
        }
    }

    private setHeaders(headers:any):void {
        for (let key in headers) {
            this.headers.append(key, headers[key]);
        }
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}