import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abs'
})
export class AbsPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): number {
    return Math.abs(value);
  }

}
