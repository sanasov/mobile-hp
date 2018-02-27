import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger, state} from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  animations: [

    trigger('turnOn', [
      state('true', style({  'background-color': 'white' })),
      transition('false => true', [

        query('h1', style({opacity: 0, color: "red"}), {optional: true}),

        query('h1', stagger('300ms', [
          animate('3s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 0.31}),
            style({height: '100px', offset: 0.5}),
            style({height: '30px', offset: 0.7}),
            style({color: 'red', offset: 1.0}),
          ]))
        ]), {optional: true}),

      ])
    ])

  ]
})
export class AnimationsComponent implements OnInit {

  turnOn: boolean = false;

  constructor() {
  }

  animate() {
    this.turnOn = !this.turnOn;
  }

  ngOnInit() {

  }
}
