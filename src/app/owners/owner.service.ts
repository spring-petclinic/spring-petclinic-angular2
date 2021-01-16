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
import {Owner} from './owner';
import {catchError} from 'rxjs/internal/operators';
import { BaseService } from 'app/services/base.service';

export class OwnerService extends BaseService {

  protected getURI() { return '/owners'; }

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.entityUrl)
      .pipe(
        catchError(this.handlerError('getOwners', []))
      );
  }

  getOwnerById(ownerId: string): Observable<Owner> {
    return this.http.get<Owner>(this.entityUrl + '/' + ownerId)
      .pipe(
          catchError(this.handlerError('getOwnerById', {} as Owner))
      );
  }

  addOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.entityUrl, owner)
      .pipe(
        catchError(this.handlerError('addOwner', owner))
      );
  }

  updateOwner(ownerId: string, owner: Owner): Observable<{}> {
    return this.http.put<Owner>(this.entityUrl + '/' + ownerId, owner)
      .pipe(
        catchError(this.handlerError('updateOwner', owner))
      );
  }

  deleteOwner(ownerId: string): Observable<{}> {
    return this.http.delete<Owner>(this.entityUrl + '/' + ownerId)
      .pipe(
         catchError(this.handlerError('deleteOwner', [ownerId]))
      );
  }


}
