import {Component, OnInit} from '@angular/core';
import {Store}             from "@ngxs/store";
import {SetToken}          from "./state/auth.actions";

@Component({
    selector   : 'authentication',
    templateUrl: 'authentication.component.html',
    styles     : []
})
export class AuthenticationComponent implements OnInit {

    isLogin = true;

    constructor(private store: Store) {
    }

    ngOnInit() {
    }

    onLoggedIn({token}: { token: string }) {
        console.log('Logged in!', token);
        this.store.dispatch(new SetToken(token));
    }
}
