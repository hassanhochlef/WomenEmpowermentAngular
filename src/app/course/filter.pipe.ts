import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class filterPipe1 implements PipeTransform {
    transform(value: any, searchTerm: any): any {
        // tslint:disable-next-line:only-arrow-functions
        return value.filter(function(search){
            return search.courseName.indexOf(searchTerm) > -1; }); }
}
