import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphasort'
})
export class AlphaSortPipe implements PipeTransform {
  transform(inputArray: any[]): any {
    if(inputArray.length === 0){
      return inputArray
    }

    return inputArray.sort(( a, b ) => {
      if ( a.instanceType < b.instanceType ){
        return -1;
      }
      if ( a.instanceType > b.instanceType ){
        return 1;
      }
      return 0;
    })

  }
}
