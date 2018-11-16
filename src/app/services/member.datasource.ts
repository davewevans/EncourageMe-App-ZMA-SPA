import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subject, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, retry, map, finalize, tap } from 'rxjs/operators';
import { Member } from '../models/member';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';

export class MemberDataSource extends DataSource<any>{

    public membersSubject = new BehaviorSubject<Member[]>([]);
    private loadingMembers = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingMembers.asObservable(); 
    public    
  
    constructor(private dataService: DataService) {
      super();
    }
  
    connect(collectionViewer: CollectionViewer): Observable<Member[]> {
      return this.membersSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer) {
      this.loadingMembers.complete();
      this.membersSubject.complete();
    }
  
    loadMembers(filter: string = '', sortDirection: string = 'asc',
      pageIndex: number = 0, pageSize: number = 10) {
  
      this.loadingMembers.next(true);
  
      this.dataService.getMembers(filter, sortDirection,
        pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingMembers.next(false))
        ).subscribe(members => this.membersSubject.next(members));
    }
  }