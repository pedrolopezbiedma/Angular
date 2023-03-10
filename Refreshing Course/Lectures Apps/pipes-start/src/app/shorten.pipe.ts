import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(input: string, limit:number): any {
    if(input.length > limit) {
      return input.substring(0, limit) + ' ...';
    }
    return input;
  }
}
