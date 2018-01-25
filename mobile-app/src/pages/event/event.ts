import {Component, OnDestroy} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage implements OnDestroy {

  events: Array<{ title: string, date: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    storage.get('events').then((result) => {
      this.events = result;
    });
  }

  ngOnDestroy() {
    this.save();
  }

  addEvent() {
    this.events.push({title: "", date: ""});
  }

  preRemoveSwipe($event, event) {
    if (!event.title && !event.title) {
      this.remove(event);
      return;
    }
    event.preClose = !event.preClose;
  }

  remove(event) {
    this.events.splice(this.events.indexOf(event), 1);
    this.save();
  }


  save() {
    this.storage.set('events', this.events);
  }

}
