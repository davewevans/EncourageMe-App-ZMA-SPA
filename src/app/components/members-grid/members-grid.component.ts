import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MemberDataSource } from '../../services/member.datasource';
import { Member } from 'src/app/models/member';
import { DataService } from '../../services/data.service';
import { Observable, of, BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { catchError, finalize, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PaginationService } from '../../services/pagination.service';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SendMessageDialogComponent } from '../send-message-dialog/send-message-dialog.component';
import { ISendMessageFormData } from '../../interfaces/ISendMessageFormData';

@Component({
  selector: 'app-members-grid',
  templateUrl: './members-grid.component.html',
  styleUrls: ['./members-grid.component.scss']
})
export class MembersGridComponent implements OnInit {

  members: Member[];
  membersSubject = new Subject();
  dataSource: MemberDataSource;
  totalCount: number = 50;
  counter: number = 1;

  //membersSubject = new BehaviorSubject<Member[]>([]);
  private loadingMembers = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingMembers.asObservable();

  @ViewChild('input') input: ElementRef;

  constructor(private dataService: DataService,
    private paginationService: PaginationService, private dialog: MatDialog) { }

  ngOnInit() {
    //this.dataSource = new MemberDataSource(this.dataService);

    this.loadMembers();
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
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

    filter = filter == '' ? this.input.nativeElement.value : filter;

    console.info("filter: " + filter);
    //console.info("page: " + this.paginationService.page);
    //console.info("pageCount: " + this.paginationService.pageSize);

    this.dataService.getMembers(filter, sortDirection,
      this.paginationService.page, this.paginationService.pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingMembers.next(false)),
      )
      .subscribe((resp: HttpResponse<Member[]>) => {
        this.members = resp.body;
        this.totalCount = JSON.parse(resp.headers.get('X-Pagination')).totalCount;

        console.info("totalCount: " + this.totalCount);
      });
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.loadMembers();

    console.info("switchPage event: " + (this.counter))
    this.counter++;
  }

  openSendMessageDialog(member: Member) {

    console.info(member.firstName + " " + member.lastName);

    const dialogConfig = new MatDialogConfig(); 

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    //dialogConfig.width = '450px';
    //dialogConfig.height = '450px';
    dialogConfig.data = {
      memberId: member.memberId,
      firstName: member.firstName,
      lastName: member.lastName,
      primaryPhotoUri: member.primaryPhotoUri,
      title: 'Send Encouraging Message',
      message: ''
    };

    const dialogRef = this.dialog.open(SendMessageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        this.sendMessage(result);    
      });
  }

  sendMessage(result: ISendMessageFormData){
     console.info("toMemberId: " + result.memberId);
      console.info("message: " + result.message);
      this.dataService.sendMessage(result).subscribe();
  }
}

