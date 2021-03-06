import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy}        from "@nestjs/microservices";
import {AccountEvents}      from "../account.events";
import {first, tap}         from "rxjs/operators";

@Injectable()
export class AccountClient {

    constructor(@Inject('ACCOUNT_CLIENT') private client: ClientProxy) {

    }

    async register(email: string, password: string): Promise<string> {
        return await this.client.send(AccountEvents.REGISTER, {email, password}).pipe(first()).toPromise();
    }

    async login(email: string, password: string): Promise<string> {
        return await this.client.send(AccountEvents.LOGIN, {email, password}).pipe(first()).toPromise();
    }

    updated(id: number, email: string) {
        this.client.emit(AccountEvents.UPDATED, {id, email});
    }

    async getAccount(token: string, ignoreExpiration: boolean) {
        return await this.client.send(AccountEvents.GET, {token, ignoreExpiration}).pipe(first()).toPromise();
    }
}
