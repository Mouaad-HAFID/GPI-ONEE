import { Pipe, PipeTransform } from '@angular/core';
import { Equipement } from '../_models/equipement';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: Equipement[], searchTxt: string): any[] {
    if (!items || !items.length) return items;
    if (!searchTxt || !searchTxt.length) return items;
    return items.filter((item) => {
      return (
        (item.codeONE.toLowerCase().indexOf(searchTxt.toLowerCase()) &&
          item.serieConstructeur
            .toLowerCase()
            .indexOf(searchTxt.toLowerCase())) > -1
      );
    });
  }
}
