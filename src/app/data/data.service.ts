import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataService {
    private goals = new BehaviorSubject<any>(['The initial goal','The another goals']);
    goal = this.goals.asObservable();
    constructor(){

    }

    public changeGoal(goal){
        this.goals.next(goal);
    }
}