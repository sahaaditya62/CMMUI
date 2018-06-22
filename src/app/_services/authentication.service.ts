import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { UserDetails } from '../_model/user-details.model'
import { ApplicationSettings} from '../app.constants'



@Injectable()
export class AuthenticationService {

    constructor(private http: Http) { }
    authenticate(model: any): Observable<UserDetails> {

        return this.http.post(ApplicationSettings.API_ENDPOINT+'api/auth/authenticate', JSON.stringify(model))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let serviceResponse = response.json();
                console.log(JSON.stringify(serviceResponse));
                if (serviceResponse && serviceResponse.status == 0) {
                    console.log('login success')
                    return serviceResponse.payload;
                }
                else {
                    console.log('login failure')
                    throw Observable.throw(serviceResponse.message);
                }
            }).catch(this.handleError);;
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        console.log("Error message received"+ JSON.stringify(error));
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `Error in communicating to server`;
        } else {
            errMsg = error.error ? error.error : "Server returned exception";
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
