import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-desktops',
  templateUrl: 'desktops.html'
})
export class DesktopsPage {
  SearchQuery: string = ''
  showSearch: boolean = false
  items: Array<Object>

  constructor(public navCtrl: NavController) {
    this.initializeItems()
  }

  initializeItems() {
    this.items = [
      {
        name: 'PC001',
        model: 'MSI Negro 2015'
      },
      {
        name: 'PC114',
        model: 'HP APD 2017'
      }
    ]
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems()

    // set val to the value of the searchbar
    let val = ev.target.value

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((v) => {
        return (v.name.indexOf(val) > -1)
      })
    }
  }

}
