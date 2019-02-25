import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageReceived } from '../models/message-received.model';
import { Status } from '../models/status.enum';
import { MatDialog, MatDialogConfig, MatSnackBarConfig } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ConfirmData } from 'src/app/confirm-dialog/confirm-model';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, finalize, catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-received-messages',
  templateUrl: './received-messages.component.html',
  styleUrls: ['./received-messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReceivedMessagesComponent implements OnInit {

  messages: MessageReceived[];
  messages$: Observable<MessageReceived[]>;
  selectedMessage: MessageReceived;
  panelOpenState = false;
  showListbox = false;

  // app spinner config
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  private loadingMessages = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingMessages.asObservable();

  constructor(private msgService: MessagesService,
    private auth: AuthService, private dialog: MatDialog,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {

    this.loadingMessages.next(true);
    // console.log('isLoggedIn: ' + this.auth.isLoggedIn());

    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.msgService.getReceivedMessages().pipe(
      map(
        (response: MessageReceived[]) => {
          this.messages = response;
          this.messages.forEach(element => {
            // PrimeNG listbox requires a 'value' and 'icon' property
            element.value = element.messageId;
            element.icon = element.fromMemberPicUri;
          });
          return this.messages;
        }),
      catchError(() => of([])),
      finalize(() => this.loadingMessages.next(false)
      ),
    // subscribe instead of async pipe to not show listbox during progress spinner
    ).subscribe();
  }

  openMessage(message: MessageReceived) {
    message.messageOpen = true;
    message.messageHasOpened = true;
    message.status = Status.Read;
  }

  closeMessage(message: MessageReceived) {
    message.messageOpen = false;
  }

  showNotReadIcon(message: MessageReceived) {
    return message.status !== Status.Read
      && message.status !== Status.Archived;
  }

  showArchiveIcon(message: MessageReceived) {
    return message.status > 1;
  }

  getArchiveIconClass(memberId: number) {
    if (memberId === +this.selectedMessage) {
      return 'fa fa-archive archive-icon-selected';
    } else {
      return 'fa fa-archive archive-icon-unselected';
    }
  }

  showFlagIcon(message: MessageReceived) {
    return message.status > 1;
  }

  handleListChange(event) {
    console.log('onchange event triggered');
    console.log(this.selectedMessage);

  }

  getNotReadClass(memberId: number) {
    if (memberId === +this.selectedMessage) {
      return 'fa fa-envelope read-status-icon-selected';
    } else {
      return 'fa fa-envelope read-status-icon-unselected';
    }
  }

  getReadClass(memberId: number) {
    if (memberId === +this.selectedMessage) {
      return 'fa fa-envelope-open read-status-icon-selected';
    } else {
      return 'fa fa-envelope-open read-status-icon-unselected';
    }
  }

  changeReadStatus(message: MessageReceived, status: Status) {
    message.status = status;

    // open if delivered and is not opened
    if (message.status > 1 && !message.messageOpen) {
      this.openMessage(message);
    } else if (message.status < 2 && message.messageOpen) {
      this.closeMessage(message);
    }
    this.msgService.updateMessageReceived(message).subscribe();
  }

  archiveMessage(message: MessageReceived) {
    const confirmData: ConfirmData = {
      header: 'Are you sure?',
      message: 'Archive message.',
      icon: 'fa fa-archive',
      accept: false
    };

    this.confirm(confirmData).subscribe(
      confirmation => {
        if (confirmation) {
          if (message.status !== Status.Archived) {
            message.status = Status.Archived;
            this.msgService.updateMessageReceived(message).subscribe();
            this.openSnackBar('archive message').subscribe(
              () => {
                console.log('undo action clicked');
                message.status = Status.Read;
                this.msgService.updateMessageReceived(message).subscribe();
              }
            );
          }
        }
      });
  }

  flagMessage(message: MessageReceived) {
    const confirmData: ConfirmData = {
      header: 'Are you sure?',
      message: 'Flag message as inappropriate.',
      icon: 'fa fa-flag',
      accept: false
    };

    this.confirm(confirmData).subscribe(
      confirmation => {
        if (confirmation) {
          if (!message.flagged) {
            message.flagged = true;
            this.msgService.updateMessageReceived(message).subscribe();
            this.openSnackBar('message flagged as inappropriate').subscribe(
              () => {
                console.log('undo action clicked');
                message.flagged = false;
                this.msgService.updateMessageReceived(message).subscribe();
              }
            );
          }
        }
      }
    );
  }

  confirm(confirmData: ConfirmData) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      header: confirmData.header,
      message: confirmData.message,
      icon: confirmData.icon
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    return dialogRef.afterClosed().pipe(
      map(
        (result: ConfirmData) => {
          if (result !== undefined) {
            return result.accept;
          } else { return false; }
        }));
  }

  openSnackBar(msg) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.horizontalPosition = 'center';
    config.panelClass = 'custom-snack-bar';
    const snackBarRef = this.snackBar.open(msg, 'undo', config);
    return snackBarRef.onAction();
  }
}
