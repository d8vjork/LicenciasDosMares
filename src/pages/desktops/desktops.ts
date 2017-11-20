import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-desktops',
  templateUrl: 'desktops.html'
})
export class DesktopsPage {
  SearchQuery: string = ''
  showSearch: boolean = false
  items: string[]

  constructor(public navCtrl: NavController) {
    this.initializeItems()
  }

  initializeItems() {
    this.items = [
      '115', '116', '117'
    ]
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((v) => {
        return (v.indexOf(val) > -1);
      })
    }
  }

}
