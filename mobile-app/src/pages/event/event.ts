import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  events: Array<{ title: string, date: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.events = [
      {title: "Birthday", date: "1991-02-28"},
      {title: "mom's birthday", date: "1960-05-03"},
      {title: "dad's birthday", date: "1960-04-15"},
      {title: "albert's birthday", date: "1983-06-08"}
    ];

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
