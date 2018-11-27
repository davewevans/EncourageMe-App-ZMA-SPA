import { Injectable } from '@angular/core';
import { PaginationModel } from '../shared/models/pagination.model';
import { PageEvent } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private paginationModel: PaginationModel;

  get page(): number {
    return this.paginationModel.pageIndex;
  }

  get pageSize(): number {
    return this.paginationModel.pageSize;
  }

  get selectItemsPerPage(): number[] {
    return this.paginationModel.selectItemsPerPage;
  }

  constructor() {
    this.paginationModel = new PaginationModel(); 
  }

  resetPageIndex(){
    this.paginationModel.pageIndex = 1;
  }
  
  change(pageEvent: PageEvent) {
    this.paginationModel.pageIndex = pageEvent.pageIndex + 1;
    this.paginationModel.pageSize = pageEvent.pageSize;
  }
}
