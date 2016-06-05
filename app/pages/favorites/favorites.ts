import {Page, NavController, NavParams} from 'ionic-angular';
import {favoriteService} from './favoriteService';
import {property} from '../../common/objects';
import {detailsPage} from '../details/details';


@Page({
    templateUrl: 'build/pages/favorites/favorites.html'
})
export class favoritesPage {
    public favorites:Array<property>;
    constructor(private nav: NavController, navParams: NavParams, private service: favoriteService) {
        this.favorites = service.getFavorites();
    }

    showProperty(event, item) {
        this.nav.push(detailsPage, {
            item: item
        });
    }

}