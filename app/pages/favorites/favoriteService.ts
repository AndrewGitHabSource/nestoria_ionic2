import { Injectable }    from '@angular/core';
import { property } from "../../common/objects";


@Injectable()
export class favoriteService {
    public favorites:Array<property>;

    constructor() {
        this.favorites = [];
        this.getFavorites();
    }

    public getFavorites() {
        if (localStorage.getItem('favoriteStorage')) {
            this.favorites = JSON.parse(localStorage.getItem('favoriteStorage'));
        }
        return this.favorites;
    }

    public saveFavorite(favorite) {
        this.getFavorites();
        this.favorites.push(favorite);
        localStorage.setItem('favoriteStorage', JSON.stringify(this.favorites));
    }

}