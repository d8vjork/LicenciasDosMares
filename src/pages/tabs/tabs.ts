import { Component } from '@angular/core'

import { ModelsPage } from '../models/models'
import { LicensesPage } from '../licenses/licenses'
import { ClassesPage } from '../classes/classes'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LicensesPage
  tab2Root = ClassesPage
  tab3Root = ModelsPage

  constructor() {

  }
}
