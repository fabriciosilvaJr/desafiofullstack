
import {Pipe} from '@angular/core';
 
@Pipe({
    name: 'currencyFormat'
})
export class CurrencyGlobalPipe {
    transform(value: number,
        currencySign: string ='R$ ',
        decimalLength: number = 2, 
        chunkDelimiter: string = '.', 
        decimalDelimiter:string = ',',
        chunkLength: number = 3): string {

        let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' :'$') + ')';
        let num = value.toFixed(Math.max(0, ~~decimalLength));
        return currencySign+(decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
    }
}

