import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Member} from "../models/member";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import { map} from 'rxjs/operators';

@Injectable()
export class MembersResolver implements Resolve<Member[]> {

    BASE_URL = "http://localhost:57544/api";

    constructor(private http: HttpClient) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Member[]> {

        return this.http.get(this.BASE_URL)
            .pipe(map(res => res['payload']));
    }
}