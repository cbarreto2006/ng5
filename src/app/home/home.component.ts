import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
//import animmations
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true} ),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset:0 }),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))
        ]), {optional: true} ) ,//fecha 2a query
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset:0 }),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1 })
          ]))
        ]), {optional: true} )
      ]) //fecha transition
    ])
  ]


})
export class HomeComponent implements OnInit {

  itemCount: number; 
  btnText: string = "Adicionar"; 
  goalText: string = "My first life goal";
  goals= [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';

    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  removeItem(index) {
    this.goals.splice(index, 1);
    this._data.changeGoal(this.goals);
  }

}
