import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64encode'
})
export class Base64encodePipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    return btoa(value);
  }
 


// function utf8_to_b64(str) {
//   return window.btoa(unescape(encodeURIComponent(str)));
// }

// function b64_to_utf8(str) {
//   return decodeURIComponent(escape(window.atob(str)));
// }





}
