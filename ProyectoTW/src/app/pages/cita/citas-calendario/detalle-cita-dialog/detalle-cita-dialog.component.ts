import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-cita-dialog',
  templateUrl: './detalle-cita-dialog.component.html',
  styleUrls: ['./detalle-cita-dialog.component.css']
})
export class DetalleCitaDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Datos recibidos en diálogo:', data);
  }
}




