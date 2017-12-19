import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

// export interface License { available: boolean; serial: string; product: Object }
// export interface Desktop { name: string }
// export interface Class { name: string, desktops: Observable<Desktop[]> }
// export interface Model { cpu: string; description: string; hdd: string; ram: string; }

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(private http: Http, public afd: AngularFireDatabase) {}

  // Getters
  getModels() {
    return this.afd.list('/models/').valueChanges()
  }

  getLicenses() {
    return this.afd.list('/licenses/').valueChanges()
  }

  getClasses() {
    return this.afd.list('/classes/').valueChanges()
  }

  getDesktops(id: string) {
    return this.afd.list('/classes/'+id+'/desktops/').valueChanges()
  }

  // Setters
  setModel() {}
}
