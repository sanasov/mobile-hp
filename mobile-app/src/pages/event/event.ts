import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  events: Array<{ title: string, date: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    storage.get('events').then((result) => {
      this.events = result;
    });
  }

  addEvent() {
    this.events.push({title: "", date: ""});
  }

  preRemoveSwipe($event, event) {
    event.preClose =  !event.preClose;
  }

  remove(event) {
    this.events.splice(this.events.indexOf(event, 0));
  }

}
