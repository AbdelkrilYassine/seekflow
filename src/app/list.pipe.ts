import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

    transform(value: string, etat: string): string {
        if (etat.toLowerCase() == 'done') {
            return "GG" + value;
        }
        else {
            return "Bad" + value;
        }

  }
  }
