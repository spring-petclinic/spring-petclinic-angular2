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
import {Pet} from './pet'
import {catchError} from 'rxjs/internal/operators';
import { BaseService } from 'app/services/base.service';

export class PetService extends BaseService {

  protected getURI() { return '/pets'; }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.entityUrl)
      .pipe(
        catchError(this.handlerError('getPets', []))
      );
  }

  getPetById(petId: string): Observable<Pet> {
    return this.http.get<Pet>(this.entityUrl + '/' + petId)
      .pipe(
        catchError(this.handlerError('getPetById', {} as Pet))
      );
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.entityUrl, pet)
      .pipe(
        catchError(this.handlerError('addPet', pet))
      );
  }

  updatePet(petId: string, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(this.entityUrl + '/' + petId, pet)
      .pipe(
        catchError(this.handlerError('updatePet', pet))
      );
  }

  deletePet(petId: string): Observable<number> {
    return this.http.delete<number>(this.entityUrl + '/' + petId)
      .pipe(
        catchError(this.handlerError('deletePet', 0))
      );
  }

}
