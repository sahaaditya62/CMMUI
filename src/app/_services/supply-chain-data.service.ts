import { Injectable,EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ApplicationSettings } from '../app.constants'

@Injectable()
export class SupplyChainDataService {
 public spinner:EventEmitter<boolean>=null;

    constructor(private http: Http ) {
        this.spinner = new EventEmitter<boolean>();
    }
    /**
     * Create new shipment
     */
    createNewShipment(requstObject: any): Observable<number> {
        this.spinner.emit(true);
        return this.http.post(ApplicationSettings.API_ENDPOINT+'api/scmdata/createNewShipment', JSON.stringify(requstObject))
            .map((response: Response) => {
                 
                let serviceResponse = response.json();
                console.log(JSON.stringify(serviceResponse));
                if (serviceResponse && serviceResponse.status == 0) {
                    console.log('New Shipment created successfully')
                    return serviceResponse.status;
                }
                else {
                    console.log('New Shipment could not be created')
                    throw Observable.throw(serviceResponse.message);
                }
            }).catch(this.handleError).finally(()=>{
                this.spinner.emit(false);
            });
    }
    /**
     * Updated shipment
     */
    updateShipment(requstObject: any): Observable<number> {
        this.spinner.emit(true);
        return this.http.post(ApplicationSettings.API_ENDPOINT+'api/scmdata/updateShipmentRecord', JSON.stringify(requstObject))
            .map((response: Response) => {
                 
                let serviceResponse = response.json();
                console.log(JSON.stringify(serviceResponse));
                if (serviceResponse && serviceResponse.status == 0) {
                    console.log('Shipment updated successfully')
                    return serviceResponse.status;
                }
                else {
                    console.log('Shipment could not be updated')
                    throw Observable.throw(serviceResponse.message);
                }
            }).catch(this.handleError).finally(()=>{
                this.spinner.emit(false);
            });
    }
    /**
     * Retrive shipments by status
     */
    getShipmentByStatus(status: string): Observable<string> {
        this.spinner.emit(true);
        return this.http.get(ApplicationSettings.API_ENDPOINT+'api/scmdata/shipmentListByStatus?status='+status)
            .map((response: Response) => {
                 let serviceResponse = response.json();
                console.log(JSON.stringify(serviceResponse));
                if (serviceResponse && serviceResponse.status == 0) {
                    console.log('Retrived the shipments  created successfully')
                    return JSON.stringify(serviceResponse.payload.Payload);
                }
                else {
                    console.log('Retrived the shipments could not be retrieved')
                    throw Observable.throw(serviceResponse.message);
                }
            }).catch(this.handleError).finally(()=>{
                this.spinner.emit(false);
            });
    }
    /** 
    * Handle error messages raising out of http error
    * 
    */
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        console.log("Error message received" + JSON.stringify(error));
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
