import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUpperCase]',
})
export class UpperCaseDirective {

  lastValue: string;

  constructor(public ref: ElementRef) {
  }

  @HostListener('input', ['$event']) onInput(event) {
    const resEventValue = event.target.value.toUpperCase();
    if (!this.lastValue || (this.lastValue && event.target.value.length > 0 && this.lastValue !== resEventValue)) {
      this.lastValue = this.ref.nativeElement.value = resEventValue;
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('input', false, true);
      event.target.dispatchEvent(evt);
    }
  }

}
