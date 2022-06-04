import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeWhile } from 'rxjs/operators';
import { NoteModel } from 'src/app/models/note.model';
import { AlertService } from 'src/app/shared/notification/alert.service';
import { ModalService } from 'src/app/shared/service/modal/modal.service';
import { NoteService } from 'src/app/shared/service/note/note.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss']
})
export class AllNotesComponent implements OnInit, AfterViewInit {
  @ViewChild('paginateNotes', { static: true }) paginateNotes!: MatPaginator;
  @ViewChild('sortNotes', { static: false }) sortNotes!: MatSort;

  dataSource!: MatTableDataSource<NoteModel>;
  totalNotes!: number
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['CreatedAt', 'Title', 'Content', 'Action'];

  constructor(
    private noteService: NoteService,
    private modalService: ModalService,
    private alert: AlertService,
    private spinner: NgxSpinnerService

  ) {
    this.dataSource = new MatTableDataSource<NoteModel>();
  }

  ngOnInit(): void {
    this.getAllNotes();
    this.refreshNotelist()
  }

  ngAfterViewInit(): void {
    this.setSortAndPaginator(this.dataSource, this.sortNotes, this.paginateNotes)
  }

  getAllNotes(){
    this.noteService.getNote().subscribe((data:any)=>{
      this.dataSource = data.data
      this.totalNotes = data.data.length
    })
  }

  setSortAndPaginator(table: MatTableDataSource<any>, sort: MatSort, paginator: MatPaginator) {
    table.sort = sort;
    table.paginator = paginator;
  }


  addNote(){
    this.modalService.modal().subscribe((res:any)=>{
      if(res && res.data) {
        this.noteService.refresh.next(true);
      }
    })
  }

  editNote(note: any){
    this.modalService.modal(note).subscribe((res:any)=>{
      if(res && res.data) {
        this.noteService.refresh.next(true);
      }
    })
  }

  deleteNote(note:any){
    this.spinner.show();
    this.noteService.deleteNote(note.id).subscribe( (response:any) =>{
      this.alert.showSuccess(response.message, 'Success');
      this.spinner.hide();
      this.getAllNotes()
    }, err =>{
      this.spinner.hide();
      this.alert.showError(err, 'Error');
    })
  }

  refreshNotelist() {
    this.noteService.refresh.pipe(takeWhile(() => true)).subscribe((data:any) =>{
      if(data) {
        this.getAllNotes()
      }
    })
  }
}
