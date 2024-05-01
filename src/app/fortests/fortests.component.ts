import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { ProductService } from '../_Services/product.service';
import { product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcesService } from '../image-proces.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-fortests',
  templateUrl: './fortests.component.html',
  styleUrl: './fortests.component.css'
})
export class FortestsComponent implements OnInit {
  products: product[] = [];
numVisible: number = 3;



  ngOnInit(): void {
    this.getRandomProducts();
  }
  constructor(private productService:ProductService,
    private ImageProcess:ImageProcesService){}

    getRandomProducts(){
      this.productService.getRandomProducts().pipe(
        map((x: product[], i) => x.map((product: product) => this.ImageProcess.createimage(product)))
      ).subscribe({
        next:(resp: product[]) => {
          this.products = resp;
          console.log(this.products);
        },
        error:(error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    }

    chunkArray(array: any[], chunkSize: number): any[][] {
      let results = [];
      while (array.length) {
        results.push(array.splice(0, chunkSize));
      }
      return results;
    }


     getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
          default:
              return 'unknown';
      }
  }
  }
