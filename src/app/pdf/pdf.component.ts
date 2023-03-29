import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import { PdfDataModel } from './dataModel';
const htmlToPdfmake = require("html-to-pdfmake");
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() pdfData: any
  @Output() outputData = new EventEmitter()
  @ViewChild('pdfElemt', { static: false }) pdfElement: ElementRef

  data: PdfDataModel;


  // public dataSub: Subject<any>;

  constructor() { }
  ngOnDestroy(): void {
    this.data = null;
    this.outputData = null;
    this.pdfData = null;
    console.log("PDF component destroyed successfully..!")
  }


  ngOnInit(): void {
    console.log("Inside pdfcomponent")
    console.log(this.pdfData)

    this.data = this.populatePdfDataModel(this.pdfData);

  }

  ngAfterViewInit(): void {
    this.genratePdfandSave();
  }


  populatePdfDataModel = (data) => {
    let pdfDataModel = {
      contactNumber: data.contactNumber,
      email: data.email,
      name: data.name,
      paymentMethod: data.paymentMethod,
      totalAmount: data.totalAmount,
      productDetails: JSON.parse(data.productDetails)
    }
    return pdfDataModel;
  }

  genratePdfandSave() {
    try {
      const pdfTable = this.pdfElement.nativeElement;
      var html = htmlToPdfmake(pdfTable.innerHTML);
      
      const documentDefinition = { content: html };
      const pdfDocGenerator =pdfMake.createPdf(documentDefinition)
      pdfDocGenerator.download(`${new Date().toDateString()}`+'.pdf')
      this.outputData.emit({ message:"Pdf created successfully" })
    
    } catch (err) {
      this.outputData.emit({ error: err })
    }
  }

}
