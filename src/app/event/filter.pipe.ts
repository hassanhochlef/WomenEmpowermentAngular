import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string) {
    if (value.length === 0)
    {
      return value;
    }
    const Event = [];
    for (const event of value){
      if (event[''] === filterString){
        Event.push(event);
      }
    }
    return Event;
  }

}
