import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})

export class ReversePipe implements PipeTransform {
  transform(inputString: any): any {
    if(inputString === ''){
      return inputString;
    }

    // Step 1. Use the split() method to return a new array
    let splitString = inputString.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    let reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
  }
}
