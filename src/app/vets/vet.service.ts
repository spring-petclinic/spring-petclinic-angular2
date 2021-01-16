/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {Observable} from 'rxjs';
import {Vet} from './vet';
import {catchError} from 'rxjs/internal/operators';
import { BaseService } from 'app/services/base.service';

export class VetService extends BaseService {

  protected getURI() { return '/vets'; }

  getVets(): Observable<Vet[]> {
    return this.http.get<Vet[]>(this.entityUrl)
      .pipe(
        catchError(this.handlerError('getVets', []))
      );
  }

  getVetById(vetId: string): Observable<Vet> {
    return this.http.get<Vet>((this.entityUrl + '/' + vetId))
      .pipe(
        catchError(this.handlerError('getVetById', {} as Vet))
      );
  }

  updateVet(vetId: string, vet: Vet): Observable<Vet> {
    return this.http.put<Vet>(this.entityUrl + '/' + vetId, vet)
      .pipe(
        catchError(this.handlerError('updateVet', vet))
      );
  }

  addVet(vet: Vet): Observable<Vet> {
    return this.http.post<Vet>(this.entityUrl, vet)
      .pipe(
        catchError(this.handlerError('addVet', vet))
      );
  }

  deleteVet(vetId: string): Observable<number> {
    return this.http.delete<number>(this.entityUrl + '/' + vetId)
      .pipe(
        catchError(this.handlerError('deleteVet', 0))
      );
  }

}
