import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable, Subject, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, retry, map, finalize, tap } from 'rxjs/operators';
import { Member } from '../../models/member';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MemberDataSource } from 'src/app/services/member.datasource';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss']
})
export class MemberTableComponent implements AfterViewInit, OnInit {

  members: Member[];
  dataSource: MemberDataSource;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'photo'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    var data = this.route.snapshot.data;
    console.info("this.route.snapshot.data", data);

    this.dataSource = new MemberDataSource(this.dataService);
    this.dataSource.loadMembers();
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
                tap(() => this.loadMembersPage())
            ).subscribe();
  }

  onRowClicked(row: Member) {
    console.log('Row clicked: ', row.firstName);
  }

  loadMembersPage() {
    this.dataSource.loadMembers('', 'asc',
      this.paginator.pageIndex, this.paginator.pageSize);
  }
}

// export class MemberDataSource extends DataSource<any>{

//   private membersSubject = new BehaviorSubject<Member[]>([]);
//   private loadingMembers = new BehaviorSubject<boolean>(false);
//   public loading$ = this.loadingMembers.asObservable();

//   constructor(private dataService: DataService) {
//     super();
//   }

//   connect(collectionViewer: CollectionViewer): Observable<Member[]> {
//     return this.membersSubject.asObservable();
//   }

//   disconnect(collectionViewer: CollectionViewer) {
//     this.loadingMembers.complete();
//     this.membersSubject.complete();
//   }

//   loadMembers(filter: string = '', sortDirection: string = 'asc',
//     pageIndex: number = 0, pageSize: number = 10) {

//     this.loadingMembers.next(true);

//     this.dataService.getMembers(filter, sortDirection,
//       pageIndex, pageSize).pipe(
//         catchError(() => of([])),
//         finalize(() => this.loadingMembers.next(false))
//       ).subscribe(members => this.membersSubject.next(members));
//   }
// }
