import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }]
const adminUsers = [{ id: 2, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User' }]
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(delay(500))
        .pipe(dematerialize());

    function handleRoute() {
        switch (true) {
            case url.endsWith('/users/authenticate') && method === 'POST':
                return authenticate();
            case url.endsWith('/users') && method === 'GET':
                return getUsers();
            case url.endsWith('/adminUsers/adminAuthenticate') && method === 'POST':
                return adminAuthenticate();
            case url.endsWith('/adminUsers') && method === 'GET':
                return getAdminUsers();
            default:
                // pass through any requests not handled above
                return next.handle(request);
        }    
    }

    // route functions

    function authenticate() {
        const { username, password } = body;
        const user = users.find(x => x.username === username && x.password === password);
        if (!user) return error('Username or password is incorrect');
        return ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
        })
    }
    function adminAuthenticate() {
        const { username, password } = body;
        const adminUser = adminUsers.find(x => x.username === username && x.password === password);
        if (!adminUser) return error('Username or password is incorrect');
        return ok({
            id: adminUser.id,
            username: adminUser.username,
            firstName: adminUser.firstName,
            lastName: adminUser.lastName,
            token: 'fake-jwt-token'
        })
    }

    function getUsers() {
        if (!isLoggedIn()) return unauthorized();
        return ok(users);
    }
    function getAdminUsers() {
        if (!isLoggedIn()) return unauthorized();
        return ok(adminUsers);
    }

    // helper functions

    function ok(body?) {
        return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
        return throwError({ error: { message } });
    }

    function unauthorized() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
        return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}
export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};