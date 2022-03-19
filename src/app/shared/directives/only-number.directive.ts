import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  constructor(private el: ElementRef) { }

  @Input() allowMultiLine = false;
  @Input() allowNegative = false;
  @Input() allowDecimal = false;
  @Input() maxLength = 0;
  regex: RegExp;

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    this.validate(event, event.key === 'Enter' ? '\n' : event.key);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: Event) {
    const pastedText = (window as any).clipboardData && (window as any).clipboardData.getData('Text') // If IE, use window
      || event as ClipboardEvent && (event as ClipboardEvent).clipboardData.getData('text/plain'); // Non-IE browsers
    this.validate(event, pastedText);
  }

  @HostListener('cut', ['$event'])
  onCut(event: Event) {
    this.validate(event, '');
  }

  validate(event: Event, text: string) {
    const txtInput = this.el.nativeElement;
    const newValue = (txtInput.value.substring(0, txtInput.selectionStart)
      + text + txtInput.value.substring(txtInput.selectionEnd));
    if (!this.regex) {
      // tslint:disable-next-line: no-eval
      this.regex = eval('/^'
        + (this.allowNegative ? '-?' : '')
        + (this.allowDecimal ? '((\\d+\\.?)|(\\.?))\\d*' : '\\d*')
        + '$/g') as RegExp;
    }
    const lines = this.allowMultiLine ? newValue.split('\n') : [newValue];
    for (const line of lines) {
      const lineText = line.replace('\r', '');
      if (this.maxLength && lineText.length > this.maxLength || !lineText.match(this.regex)) {
        event.preventDefault();
        return;
      }
    }
  }
}
