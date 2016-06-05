import {Page} from 'ionic-angular';
import {favoriteService} from './favoriteService';
import {property} from '../../common/objects';

@Page({
    templateUrl: 'build/pages/favorites/favorites.html'
})
export class favoritesPage {
    public favorites:Array<property>;
    constructor(private service: favoriteService) {
        this.favorites = service.getFavorites();
    }
}
