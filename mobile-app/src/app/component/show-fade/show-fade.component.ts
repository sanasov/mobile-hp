import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'show-fade',
  templateUrl: './show-fade.component.html',
})
export class ShowFadeComponent implements OnInit {

  @Input() turnOn: boolean = false;
  @Input() delay: number = 0;
  @Input() slow: boolean = false;

  @Output() clicked: EventEmitter<number> = new EventEmitter<number>();

  inited: boolean = false;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => this.inited = true, this.delay);
  }
}
