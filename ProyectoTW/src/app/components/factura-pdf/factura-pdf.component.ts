import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-factura-pdf',
  templateUrl: './factura-pdf.component.html',
  styleUrls: ['./factura-pdf.component.css']
})
export class FacturaPdfComponent {
  fecha = new Date();

  items = [
    {
      servicio: 'Cambio de neumáticos',
      repuesto: 'Neumáticos Michelin',
      cantidad: 4,
      precioUnitario: 100,
      subtotal: 400
    },
    {
      servicio: 'Alineación',
      repuesto: 'Servicio Alineación',
      cantidad: 1,
      precioUnitario: 50,
      subtotal: 50
    }
  ];

  get total() {
    return this.items.reduce((acc, item) => acc + item.subtotal, 0);
  }

  generatePDF() {
    const data = document.getElementById('factura');
    if (!data) {
      alert('No se encontró la factura');
      return;
    }

    html2canvas(data).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('factura.pdf');
    });
  }
}
