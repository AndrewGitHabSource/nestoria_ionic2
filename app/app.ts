import {ViewChild} from '@angular/core';
import {App, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {search} from './pages/search/search';
import {favoritesPage} from './pages/favorites/favorites';
import {detailsPage} from './pages/details/details';
import { JSONP_PROVIDERS, Jsonp } from '@angular/http';
import { propertiesService } from './services/propertiesService';
import { favoriteService } from './pages/favorites/favoriteService';




@App({
  templateUrl: 'build/app.html',
  providers: [
    JSONP_PROVIDERS,
    propertiesService,
    favoriteService
  ],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = search;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'PropertyCross', component: search },
      { title: 'Favorites', component: favoritesPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}