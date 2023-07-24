import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(value: any[], searchID: string): any[] {
    if (!searchID) {
      return value; // No search name provided, return all values
    }

    searchID = searchID.toLowerCase(); // Convert search name to lowercase for case-insensitive comparison

    return value.filter(userObj => userObj.student_id.toLowerCase().includes(searchID));
  }


}
