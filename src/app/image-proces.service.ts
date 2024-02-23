import { Injectable } from '@angular/core';
import { product } from './_model/product.model';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class ImageProcesService {

  constructor(private domsanitzer:DomSanitizer) { }


  public createimage(product: product) {
    const productImages: any[] = product.productImages;

    const productImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];

      const imageBlob = this.DataUriToBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

      const finalFileHandle :FileHandle = {
        file: imageFile,
        url: this.domsanitzer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandle;
    return product;

  }








  public DataUriToBlob(picBytes:any,imageType:any){
const byteString = window.atob(picBytes);
const arrayBuffer = new ArrayBuffer(byteString.length)
const intarray = new Uint8Array(arrayBuffer);
for (var i = 0; i < byteString.length; i++) {
  intarray[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob ([intarray],{type:imageType})
  return blob;
  }

}
