import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'yellow';
  @HostBinding('style.backgroundColor') backgroundColor: string;

//   constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
  //   this.renderer.setStyle(this.elementRef.nativeElement,'background-color', 'yellow')
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event){
    // this.renderer.setStyle(this.elementRef.nativeElement,'background-color', this.highlightColor)
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
    // this.renderer.setStyle(this.elementRef.nativeElement,'background-color', this.defaultColor)
    this.backgroundColor = this.defaultColor;
  }
}
