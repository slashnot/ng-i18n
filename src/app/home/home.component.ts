import { Machine, interpret } from 'xstate';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { quizStates, services } from './StateMachine/StateMachine'
import { TranslateService } from '@ngx-translate/core';
import { DummyContentComponent } from '../common/dummy-content/dummy-content.component'

const quizMachine = Machine(quizStates, { services })
const quizService = interpret(quizMachine)
quizService.start()

const state$ = from(quizService)

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.scss'] })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    categories = []
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        public translate: TranslateService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        translate.addLangs(['en', 'fr']);
        translate.setDefaultLang('en');
    }

    ngOnInit() {
        state$.subscribe(state => {
            console.log(state.context)
        });
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}