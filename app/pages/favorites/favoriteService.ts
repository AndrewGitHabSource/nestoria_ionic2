import { Injectable }    from '@angular/core';
import { property } from "../../common/objects";


@Injectable()
export class favoriteService {
    public favorites:Array<property>;

    constructor() {
        this.favorites = [];
        this.getFavorites();
    }

    public compareFavorite(favorite):boolean{
        if(this.favorites.length){
            for(var i = 0; i <= this.favorites.length; i++){
                if(this.favorites[i]["title"] == favorite["title"] &&
                    this.favorites[i]["longitude"] == favorite["longitude"] &&
                    this.favorites[i]["latitude"] == favorite["latitude"]){
                    return true;
                }
            }
        }
        return false;
    }

    public getFavorites() {
        if (localStorage.getItem('favoriteStorage')) {
            this.favorites = JSON.parse(localStorage.getItem('favoriteStorage'));
        }
        return this.favorites;
    }

    public saveFavorite(favorite) {
        this.favorites.push(favorite);
        localStorage.setItem('favoriteStorage', JSON.stringify(this.favorites));
    }
}