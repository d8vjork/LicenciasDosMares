import { Component } from '@angular/core';

import { ModelsPage } from '../models/models';
import { DesktopsPage } from '../desktops/desktops';
import { LicensesPage } from '../licenses/licenses';
import { ClassesPage } from '../classes/classes'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LicensesPage;
  tab2Root = DesktopsPage;
  tab3Root = ModelsPage;
  tab4Root = ClassesPage;

  constructor() {

  }
}
