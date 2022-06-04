import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NoteModel } from 'src/app/models/note.model';
import { AlertService } from '../notification/alert.service';
import { NoteService } from '../service/note/note.service';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {

  info: any
  title = "Create Note"
  btn = "Create"
  createNoteForm!: FormGroup;
  public submitted = false;
  NoteModelObj: NoteModel = new NoteModel();
 


  constructor(
    private router: Router,
    public fb: FormBuilder,
    private note: NoteService,
    private alert: AlertService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ActionModalComponent>,

  ) { }

  ngOnInit() {
    this.createNoteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    }) 
    if(this.info) {
      this.createNoteForm.patchValue(this.info);
      this.title = "Update Note"
      this.btn = "Update"
    }
  }

  get formControl() {
    return this.createNoteForm.controls;
  }

  createNote(){
    this.submitted = true;
    if(this.createNoteForm.invalid){
      return;
    }else{
      this.spinner.show();
      this.NoteModelObj.title = this.createNoteForm.value.title
      this.NoteModelObj.content = this.createNoteForm.value.content
      if(this.info){
        this.note.updateNote(this.NoteModelObj, this.info.id).subscribe(res =>{
          this.alert.showSuccess(res.message, 'Success');
          this.spinner.hide();
          this.closeModal(true)
        })
      }else{
        this.spinner.show();
        this.note.createNote(this.NoteModelObj)
        .subscribe((res:any)  =>{
          this.spinner.hide();
          this.alert.showSuccess(res.message, 'Success');
          this.closeModal(true)
        }, err =>{
          this.spinner.hide();
          this.alert.showError(err, 'Error');
        })
      }
    }
  }

  cancel(){
    this.closeModal(true)
  }

  closeModal(val?:boolean) {
    this.dialogRef.close({ data: val });
  }
}
