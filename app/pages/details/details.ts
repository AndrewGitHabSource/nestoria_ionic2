import {Page, NavController, NavParams} from 'ionic-angular';
import {property} from '../../common/objects';
import {favoriteService} from '../favorites/favoriteService';


@Page({
    templateUrl: 'build/pages/details/details.html'
})
export class detailsPage {
    objectDetails: property;
    typeFavorite: boolean = false;
    toggleText: string;

    constructor(private nav: NavController, navParams: NavParams, private service: favoriteService) {
        this.objectDetails = navParams.get('item');
        this.typeFavorite = navParams.get('typeFavorite');

        if(this.service.compareFavorite(navParams.get('item'))){
            this.toggleText = "Delete Favorite";
        }
        else{
            this.toggleText = "Add Favorite";
        }
    }

    toggleFavorite(object){
        this.service.saveFavorite(object);
    }
}
