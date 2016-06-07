import {Page, NavController, NavParams} from 'ionic-angular';
import {property} from '../../common/objects';
import {detailsPage} from '../details/details';
import {favoriteService} from '../favorites/favoriteService';


@Page({
    templateUrl: 'build/pages/favorites/favorites.html'
})
export class favoritesPage {
    public favorites:Array<property>;
    
    emptyFavorites: boolean;

    constructor(private nav:NavController, navParams:NavParams, private service:favoriteService) {
        this.favorites = service.getFavorites();

        this.checkEmptyFavorites();
    }

    checkEmptyFavorites(){
        this.emptyFavorites = this.favorites.length ? false : true;
    }

    showProperty(event, item) {
        this.nav.push(detailsPage, {
            item: item,
            typeFavorite: true
        });
    }

    deleteFavorite(i){
        this.service.deleteFavorite(i);
        this.checkEmptyFavorites();
    }
}