import { Component, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type Cb = (checked: boolean) => void;

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SwitcherComponent,
    multi: true
  }]
})
export class SwitcherComponent implements ControlValueAccessor {

  public checked = false;
  private onChangeCb: Cb;

  @HostListener('click')
  public toggle(): void {
    this.checked = !this.checked;
    this.onChangeCb(this.checked);
  }

  public writeValue(checked: boolean): void {
    this.checked = checked;
  }

  public registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }


  public registerOnTouched(fn: any): void {
  }

}
