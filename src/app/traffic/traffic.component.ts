import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type TLColor = 'red' | 'yellow' | 'green';

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TrafficComponent),
    multi: true
  }]
})
export class TrafficComponent implements ControlValueAccessor {

  private _colors: TLColor[] = ['red', 'yellow', 'green'];
  private _currentColor: TLColor;

  propagateChange = (color: TLColor) => {};
  propagateTouch = (color: TLColor) => {};

  writeValue(color: TLColor): void {
    this.currentColor = color;
  }

  get currentColor() {
    return this._currentColor;
  }

  set currentColor(color: TLColor) {
    this._currentColor = color;
    this.propagateChange(color);
    this.propagateTouch(color);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  toggleDown() {
    this.currentColor = this._colors[(this._colors.indexOf(this.currentColor) + 1) % 3];
  }

  toggleUp() {
    this.currentColor = this._colors[(this._colors.indexOf(this.currentColor) + 2) % 3];
  }

  switchColor(color: TLColor) {
    this.currentColor = color;
  }

}
