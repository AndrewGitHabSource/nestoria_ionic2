import {Page, NavController, NavParams} from 'ionic-angular';
import {property} from '../../common/objects';


@Page({
    templateUrl: 'build/pages/details/details.html'
})
export class detailsPage {
    objectDetails: property;

    constructor(private nav: NavController, navParams: NavParams) {
        this.objectDetails = navParams.get('item');
    }
}
