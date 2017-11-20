import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-licenses',
  templateUrl: 'licenses.html'
})
export class LicensesPage {
  licenses: string = 'available'
  available: Object[]
  unavailable: Object[]

  constructor(public navCtrl: NavController) {
    this.initializeItems()
  }

  initializeItems() {
    this.available = [
      {
        license: 'MQJHC-R7K2T-VVV3H-62R88-Y64RF',
        product: 'Win7'
      }
    ]

    this.unavailable = [
      {
        license: 'QZMHP-R722S-QSV3H-6AA08-Y12WF',
        product: 'Win10'
      },
      {
        license: 'MQJHC-R7K2T-VVV3H-62R88-Y612A',
        product: 'Win10'
      },
      {
        license: 'MQJHC-R7K2T-VVV3H-62R88-Y64AQ',
        product: 'Win10'
      }
    ]
  }

}
