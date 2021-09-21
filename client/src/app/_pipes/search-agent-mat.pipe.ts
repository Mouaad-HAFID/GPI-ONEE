import { Pipe, PipeTransform } from '@angular/core';
import { Agent } from '../_models/agent';

@Pipe({
  name: 'searchAgentMat',
})
export class SearchAgentMatPipe implements PipeTransform {
  transform(items: Agent[], searchTxt: string): any[] {
    if (!items || !items.length) return items;
    if (!searchTxt || !searchTxt.length) return items;
    return items.filter((item) => {
      return (
        item.matricule
          .toString()
          .toLowerCase()
          .indexOf(searchTxt.toLowerCase()) > -1
      );
    });
  }
}
