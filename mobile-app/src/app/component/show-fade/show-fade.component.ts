import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'show-fade',
  templateUrl: './show-fade.component.html',
})
export class ShowFadeComponent implements OnInit {

    @Input() turnOn: boolean = false;

    @Output() clicked: EventEmitter<number> = new EventEmitter<number>();

    stars: string[] = [];

    constructor() {}

    ngAfterViewInit(){

    }

    ngOnInit() {

    }
}
