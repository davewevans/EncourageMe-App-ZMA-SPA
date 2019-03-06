/*
  Bypasses the built-in security that sanitizes html. Only use with
  html that is guaranteed to be safe.
*/
import { Pipe, PipeTransform, SecurityContext  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
