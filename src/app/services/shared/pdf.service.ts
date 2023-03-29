import { ElementRef, Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePDF = (tableid) => {
    const pdf = new jsPDF();
    autoTable(pdf, { html: tableid })
    return pdf;
  }
}