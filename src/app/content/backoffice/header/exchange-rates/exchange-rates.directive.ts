import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appExchangeRates]'
})
export class ExchangeRatesDirective implements OnInit {

  @Input('appExchangeRatesFrom')
  public rates: { value: number, currency: string }[];

  @Input('appExchangeRatesAutoplay')
  public set playAuto(mode: 'on' | 'off') {
    if (!mode) {
      return;
    }
    this.mode = mode;
  }

  public mode: 'on' | 'off' = 'on';
  public context;
  private index = 0;
  private intervalId: number;

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
  ) {
  }

  public ngOnInit(): void {
    this.context = {
      $implicit: this.rates[this.index],
      controller: {
        next: () => this.next(),
        prev: () => this.prev(),
      }
    };

    this.vcr.createEmbeddedView(this.tpl, this.context);
    this.resetInterval();
  }

  private prev(): void {
    this.resetInterval();
    this.index--;
    if (this.index < 0) {
      this.index = this.rates.length - 1;
    }
    this.context.$implicit = this.rates[this.index];
  }

  private next(): void {
    this.resetInterval();
    this.index++;
    if (this.index >= this.rates.length) {
      this.index = 0;
    }
    this.context.$implicit = this.rates[this.index];
  }

  private resetInterval(): void {
    if (this.mode !== 'on') {
      return;
    }
    this.clearInterval()
      .initInterval();
  }

  private initInterval(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 2000);
  }

  private clearInterval(): this {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    return this;
  }

}
