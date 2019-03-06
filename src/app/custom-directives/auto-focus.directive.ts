import { Directive, AfterContentInit, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

  @Input() public appAutoFocus: boolean;

  public constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
      setTimeout(() => {
          this.el.nativeElement.focus();
      }, 500);
  }

}
