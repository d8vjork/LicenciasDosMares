import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateModelPage } from './create-model';

@NgModule({
  declarations: [
    CreateModelPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateModelPage),
  ],
})
export class CreateModelPageModule {}
