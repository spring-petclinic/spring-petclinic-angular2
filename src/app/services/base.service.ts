import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../error.service';
import { AppConfigService } from 'app/config/appconfig.service'

const API = "/petclinic/api"

@Injectable()
export abstract class BaseService {
    
    entityUrl: any;

    protected readonly handlerError: HandleError;

    constructor(
        protected http: HttpClient, 
        private httpErrorHandler: HttpErrorHandler, 
        private appConfigService: AppConfigService) {
            this.handlerError = httpErrorHandler.createHandleError(`Service : ${this.getURI()}`);
            this.entityUrl = `${this.appConfigService.settings.URL}${API}${this.getURI()}`;
    }

    protected abstract getURI() : String;

}
