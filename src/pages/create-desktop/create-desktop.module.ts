import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDesktopPage } from './create-desktop';

@NgModule({
  declarations: [
    CreateDesktopPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDesktopPage),
  ],
})
export class CreateDesktopPageModule {}
