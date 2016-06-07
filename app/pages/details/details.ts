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
    title: string;

    constructor(private nav: NavController, navParams: NavParams, private service: favoriteService) {
        this.objectDetails = navParams.get('item');
        this.typeFavorite = navParams.get('typeFavorite');

        this.checkTitle();
        this.checkObject();
    }
    
    checkTitle():void{
        if(this.typeFavorite){
            this.title = "Item favorite";
        }
        else{
            this.title = "Item details";
        }
    }

    checkObject():void{
        if(this.service.compareFavorite(this.objectDetails) !== false){
            this.toggleText = "Delete Favorite";
        }
        else{
            this.toggleText = "Add Favorite";
        }
    }

    toggleFavorite(object):void{
        let result = this.service.compareFavorite(object);

        if(result !== false){
            this.service.deleteFavorite(result);
        }
        else{
            this.service.saveFavorite(object);
        }

        this.checkObject();
    }
}