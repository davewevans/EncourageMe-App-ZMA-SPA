import { Component, OnInit } from '@angular/core';
import { MemberDataSource} from '../../services/member.datasource';
import { Member } from 'src/app/models/member';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-members-grid',
  templateUrl: './members-grid.component.html',
  styleUrls: ['./members-grid.component.scss']
})
export class MembersGridComponent implements OnInit {

  members$: Observable<Member[]>;
  dataSource: MemberDataSource;

  constructor(private dataService: DataService) { }

  // tiles: Tile[] = [
  //   {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
  //   {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
  //   {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  //   {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  // ];

  ngOnInit() {
    this.dataSource = new MemberDataSource(this.dataService);
    this.dataSource.loadMembers();
    //members$ = this.dataSource.membersSubject.asObservable();
    
    console.info(this.dataSource.membersSubject.value);
  }
}

// export interface Tile {
//   color: string;
//   cols: number;
//   rows: number;
//   text: string;
// }
