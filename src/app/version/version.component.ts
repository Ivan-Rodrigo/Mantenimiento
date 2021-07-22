import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  articulos:any;
  
  art={
    idSE:null,
    id:null,
    entrada:null,
    tipop:null,
    salidae:null,
    descripcion:null,
    version:null,
    identidicador:null,
  }

  constructor(protected dashService: UsersService) { }

  
  ngOnInit(): void {
    
  }

  recuperarVersion(version) {
    this.dashService.seleccionarVersion(version).subscribe(result => this.articulos = result);
  }

  generatePdf() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Datos de la tabla.pdf');
    });
  }

}
