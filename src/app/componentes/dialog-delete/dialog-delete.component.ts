import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { ProductoDTO } from '../../dto/producto.dto';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent {

  readonly dialogRef = inject(MatDialogRef<DialogDeleteComponent>);
  readonly data = inject<ProductoDTO>(MAT_DIALOG_DATA);

  public eliminar() {
    this.dialogRef.close(true);
  }

  public cancelar() {
    this.dialogRef.close(false);
  }
}
