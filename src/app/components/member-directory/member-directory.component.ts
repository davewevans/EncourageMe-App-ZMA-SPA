import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
// import { Observable, Subject, throwError, of } from 'rxjs';
// import { catchError, retry, map } from 'rxjs/operators';
// import { Member } from '../../models/member';
// import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-member-directory',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './member-directory.component.html',
  styleUrls: ['./member-directory.component.scss']
})
export class MemberDirectoryComponent implements OnInit {

  // members$: Observable<{} | Member[]>;
  // loadingError$ = new Subject<boolean>();
  //columnsToDisplay: string[] = ['firstName', 'lastName', 'email', 'photo'];

  // dataSource = new MatTableDataSource<Member>();

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;   

    // this.members$ = this.dataService.getMembers().pipe(
    //   retry(3),
    //   catchError((error) => {
    //     this.dataService.handleError('error loading the list of members', error);
    //     this.loadingError$.next(true);
    //     return of();
    //   }));
  }
}
