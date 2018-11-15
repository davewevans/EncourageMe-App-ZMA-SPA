// import { Injectable } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';


// export type HandleError = <T>(operation?: string, result?: T) => 
//     (error: HttpErrorResponse) => Observable<T>;

// /** Handles HttpClient errors */
// @Injectable()
// export class HttpErrorHandler{
//     constructor(private errorService: ErrorService){ }
//     /** Create handleError function that already knows the service name */
//     createHandleError = (serviceName = '') => <T>
//         (operation = 'operation', result = {}asT) => 
//         this.handleError(serviceName, operation, result);
//     /**
//     * @param serviceName: name of the data service
//     * @param operation: name of the failed operation
//     * @param result: optional value to return as the observable result
//     */
//     handleError<T>(serviceName = '', operation = 'operation', result = {}asT){
//         return (error: HttpErrorResponse): Observable<T> => {

//             // Todo -> Send the error to remote logging infrastructure

//             console.error(error); // log to console instead

//             constmessage = (error.error instanceofErrorEvent)?
//             error.error.message:
//             `{error code:${error.status},body:"${error.message}"}`;

//             // -> Return a safe result.
//             return of(result);
//         };
//     }
// }