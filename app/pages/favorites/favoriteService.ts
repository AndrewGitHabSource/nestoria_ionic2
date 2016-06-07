import { Injectable }    from '@angular/core';
import { property } from "../../common/objects";


@Injectable()
export class favoriteService {
    public favorites:Array<property>;

    constructor() {
        this.favorites = [];
        this.getFavorites();
    }

    public compareFavorite(favorite):any{
        this.getFavorites();

        if(this.favorites.length){
            for(var i = 0; i < this.favorites.length; i++){
                let title = this.favorites[i]["title"];
                let longitude = this.favorites[i]["longitude"];
                let latitude = this.favorites[i]["latitude"];

                if(title == favorite["title"] && longitude == favorite["longitude"] && latitude == favorite["latitude"]){
                    return i;
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

    public deleteFavorite(index:number):void{
        this.favorites.splice(index, 1);
        this.saveFavorites();
    }

    public saveFavorite(favorite) {
        this.favorites.push(favorite);
        localStorage.setItem('favoriteStorage', JSON.stringify(this.favorites));
    }

    public saveFavorites():void{
        localStorage.setItem('favoriteStorage', JSON.stringify(this.favorites));
    }
}