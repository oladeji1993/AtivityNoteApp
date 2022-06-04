import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ActionModalComponent } from '../../action-modal/action-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private matDialog: MatDialog) { }

  modal(info?: any) {
    let dialogRef: MatDialogRef<ActionModalComponent>;
    dialogRef = this.matDialog.open(ActionModalComponent);
    dialogRef.componentInstance.info = info;
    dialogRef.updateSize('450px');
    dialogRef.addPanelClass([
      'animate__animated',
      'animate__zoomIn',
    ]);
    return dialogRef.afterClosed();
  }
}
