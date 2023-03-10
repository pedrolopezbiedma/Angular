import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(inputArray: any[], filterTerm: string, propertyToFilter: string): any {
    if(inputArray.length === 0 || filterTerm === ''){
      return inputArray;
    }

    let resultArray = [];
    inputArray.forEach((input:any) => {
      if(input[propertyToFilter] === filterTerm){
        resultArray.push(input);
      }
    })

    return resultArray;
  }
}
