import {PipeTransform, Pipe, Injectable} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Injectable()
@Pipe({
    name: 'sanitizeHtml',
    pure: false // required to update the value when the promise is resolved
})
export class SanitizeHtml implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer){}

    transform(v: string) : SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(v);
    }
}