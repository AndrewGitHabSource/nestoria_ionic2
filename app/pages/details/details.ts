import {Page, NavController, NavParams} from 'ionic-angular';
import {property} from '../../common/objects';
import {favoriteService} from '../favorites/favoriteService';


@Page({
    templateUrl: 'build/pages/details/details.html'
})
export class detailsPage {
    objectDetails: property;

    constructor(private nav: NavController, navParams: NavParams, private service: favoriteService) {
        this.objectDetails = navParams.get('item');
    }

    addToFavorites(object){
        this.service.saveFavorite(object);
    }
}
