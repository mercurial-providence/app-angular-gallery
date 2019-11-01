import { Directive, Input, ElementRef } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
@Directive({
  selector: '[appParallax]'
})

/* 
USAGE: <div appParallax [ratio]="-0.2">---content---</div>
 */

export class ParallaxDirective {

  el: HTMLElement;
  initialTop: number = 0;

  @Input('ratio')
  parallaxRatio: number = .2;

  constructor(
    readonly elRef: ElementRef,
    private readonly scroll: ScrollDispatcher,
  ) {
    this.el = elRef.nativeElement;
    this.initialTop = this.el.getBoundingClientRect().top;
    this.el.style.position = 'relative';

    this.scroll.scrolled().subscribe(x => this.onScroll(x || undefined));
    // this.scroll.ancestorScrolled(elRef).subscribe(() => console.log('ancestor scroll'));
  }

  onScroll(scrollable?: CdkScrollable) {

    if (!scrollable) {
      return;
    }

    const scrolledElem: HTMLElement = scrollable.getElementRef().nativeElement;
    const scrollY = scrolledElem.scrollTop;

    const parallax = this.initialTop + scrollY * this.parallaxRatio;

    this.el.style.top = `${parallax}px`;
  }

}