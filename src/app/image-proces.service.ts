import { Injectable } from '@angular/core';
import { product } from './_model/product.model';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './_model/user.model';
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

  /* public createUserImage(user: User) {
    const userImageData :any = user.userImage;

    const imageBlob = this.DataUriToBlob(userImageData.picByte, userImageData.type);

    const imageFile = new File([imageBlob], userImageData.name, { type: userImageData.type });

    const finalFileHandle :FileHandle = {
      file: imageFile,
      url: this.domsanitzer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };

    user.userImage = finalFileHandle;
    return user;
  }
 */

  public createUserImage(user: User) {
    if (user.userImage === null || user.userImage === undefined) {
      // Handle the case when user.userImage is null or undefined
      // For example, you can return the user object as is, or set a default image
      return user;
    }

    const userImageData :any = user.userImage;

    const imageBlob = this.DataUriToBlob(userImageData.picByte, userImageData.type);

    const imageFile = new File([imageBlob], userImageData.name, { type: userImageData.type });

    const finalFileHandle :FileHandle = {
      file: imageFile,
      url: this.domsanitzer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };

    user.userImage = finalFileHandle;
    return user;
  }


//converts a data URI (base64-encoded image data) to a blob
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
