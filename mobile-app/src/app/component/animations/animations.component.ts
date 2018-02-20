import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  animations: [

    trigger('goals', [
      transition('* => *', [

        query('h1', style({opacity: 0, color:"red"}), {optional: true}),

        query('h1', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class AnimationsComponent implements OnInit {

  goals = ['My first life goal', 'I want to climb a mountain', 'Go ice skiing'];

  constructor() {
  }

  ngOnInit() {

  }
}
