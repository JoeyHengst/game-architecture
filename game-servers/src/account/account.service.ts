import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository}                                     from "@nestjs/typeorm";
import {Account}                                              from "./entities/account";
import {Repository}                                           from "typeorm";
import {RpcException}                                         from "@nestjs/microservices";
import {JwtService}                                           from "@nestjs/jwt";

@Injectable()
export class AccountService {


    constructor(
        @InjectRepository(Account) private repo: Repository<Account>,
        private jwt: JwtService
    ) {

    }

    async register(email: string, password: string) {
        let exists = await this.repo.findOne({email});
        if (exists) {
            throw new RpcException(new ConflictException("Email Already Taken"));
        }
        let account      = this.repo.create();
        account.email    = email;
        account.password = password;
        account.hashPassword();
        await this.repo.save(account, {reload: true});
        return this.jwt.sign({
            username: email,
            sub     : account.id
        });
    }

    async login(email: string, password: string) {
        let account = await this.repo.findOne({email});
        if (!account || !account.verifyPassword(password)) {
            throw new RpcException(new UnauthorizedException("Invalid Email or Password"));
        }
        return this.jwt.sign({
            username: email,
            sub     : account.id
        });
    }

    async getAccountByToken(token: string) {
        let data   = this.jwt.verify(token);
        let exists = await this.repo.findOne(parseInt(data.sub));
        if (!exists) {
            throw new RpcException(new UnauthorizedException("Invalid or Expired Token"));
        }
        return {
            id   : data.sub,
            email: exists.email
        };
    }
}
