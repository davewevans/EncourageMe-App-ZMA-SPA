import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// import { MemberDataSource } from '../../services/member.datasource';
import { Member } from 'src/app/members/models/member.model';
import { DataService } from '../../services/data.service';
import { Observable, of, BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { catchError, finalize, tap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { PaginationService } from '../../services/pagination.service';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SendMessageDialogComponent } from 'src/app/messages/send-message-dialog/send-message-dialog.component';
import { SendMessageFormData } from 'src/app/messages/models/send-message-form-data.model';

@Component({
  selector: 'app-members-grid',
  templateUrl: './members-grid.component.html',
  styleUrls: ['./members-grid.component.scss'],
  providers: [DataService, PaginationService]
})
export class MembersGridComponent implements OnInit, AfterViewInit {

  members: Member[];
  membersSubject = new Subject();
  // dataSource: MemberDataSource;
  totalCount = 50;
  counter = 1;

  // app spinner config
  color = 'accent';
  mode = 'indeterminate';
  value = 50;  

  // membersSubject = new BehaviorSubject<Member[]>([]);
  private loadingMembers = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingMembers.asObservable();

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private dataService: DataService,
    private paginationService: PaginationService, private dialog: MatDialog) { }

  ngOnInit() {
    // this.dataSource = new MemberDataSource(this.dataService);

    this.loadMembers();
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginationService.resetPageIndex();
          this.loadMembers();
        })
      )
      .subscribe();
  }

  loadMembers(filter: string = '', sortDirection: string = 'asc') {

    this.loadingMembers.next(true);

    // If filter param empty, get the value in the search box
    filter = filter === '' ? this.searchInput.nativeElement.value : filter;

    console.log('filter: ' + filter);
    // console.info("page: " + this.paginationService.page);
    // console.info("pageCount: " + this.paginationService.pageSize);

    this.dataService.getMembers(filter, sortDirection,
      this.paginationService.page, this.paginationService.pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingMembers.next(false)),
      )
      .subscribe((resp: HttpResponse<Member[]>) => {
        this.members = resp.body;
        this.totalCount = JSON.parse(resp.headers.get('X-Pagination')).totalCount;

        console.log('totalCount: ' + this.totalCount);
      });
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.loadMembers();

    console.log('switchPage event: ' + (this.counter));
    this.counter++;
  }

  openSendMessageDialog(member: Member) {

    console.log(member.firstName + ' ' + member.lastName);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '450px';
    // dialogConfig.height = '450px';
    dialogConfig.data = {
      memberId: member.memberId,
      firstName: member.firstName,
      lastName: member.lastName,
      profilePhotoUri: member.profilePhotoUri,
      title: 'Send Encouraging Message',
      message: ''
    };

    const dialogRef = this.dialog.open(SendMessageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        if (result.sendMessage) {
          this.sendMessage(result);
        }

        console.log(result);
      });
  }

  sendMessage(result: SendMessageFormData) {
      console.log('toMemberId: ' + result.memberId);
      console.log('message: ' + result.message);
      this.dataService.sendMessage(result).subscribe();
  }

  getGenderPronoun(gender) {
    if (gender === 0) {
      return 'him';
    } else if (gender === 1) {
      return 'her';
    } else {
      return '';
    }
  }
}

