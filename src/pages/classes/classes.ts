import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DesktopsPage } from '../desktops/desktops';

@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html'
})
export class ClassesPage {
  SearchQuery: string = ''
  showSearch: boolean = false
  items: Object[]

  constructor(public navCtrl: NavController) {
    this.initializeItems()
  }

  initializeItems() {
    this.items = [
      {
        title: 'Aula004',
        desktops: [
          115, 116, 117
        ]
      },
      {
        title: 'Aula007',
        desktops: [
          210, 211, 212, 213
        ]
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
        return (v.title.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }
  }

  goDesktopPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(DesktopsPage)
  }

}
