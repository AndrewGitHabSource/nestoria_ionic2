import {Injectable}    from '@angular/core';
import {Headers, URLSearchParams, Jsonp} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {parameters} from "../common/parameters";
import {headers} from "../common/headers";
import {property} from "../common/objects";
import {classRecentSearches} from "../common/recentSearches";

@Injectable()
export class propertiesService {
    private url = 'http://api.nestoria.co.uk/api?callback=JSONP_CALLBACK';
    private searchParams = new URLSearchParams();
    private headers = new Headers();
    private countSearchResult = 3;

    public properties:Array<property>;
    public recentSearches:Array<classRecentSearches>;

    constructor(private jsonp:Jsonp) {
        this.setParameters(parameters);
        this.setHeaders(headers);
    }
    
    public getProperties() {
        return this.properties;
    }

    private setProperties(properties:Array<property>) {
        this.properties = properties;
    }

    public getPropertiesOnServer(searchProperties:string, page) {
        page = page || 1;
        this.searchParams.set('place_name', searchProperties);
        this.searchParams.set('page', page);

        return this.jsonp.get(this.url, {search: this.searchParams}, {headers: this.headers})
            .toPromise()
            .then((response) => response.json())
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

    private handleError(error:any) {
        return Promise.reject(error.message || error);
    }
    
    /* begin recent searches */

    public getRecentSearches() {
        this.recentSearches = localStorage.getItem("recentSearches") ? JSON.parse(localStorage.getItem("recentSearches")) : [];
        return this.recentSearches;
    }

    public saveRecentSearches(count: number, searchRequest: string):void {
        var length = 0;

        this.getRecentSearches();

        if (count) {
            length = count;
        }

        if (this.recentSearches.length < this.countSearchResult) {
            this.recentSearches.push({
                'request': searchRequest,
                'length': length
            });
        }
        else {
            this.recentSearches.unshift({
                'request': searchRequest,
                'length': length
            });
            this.recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
    }
}