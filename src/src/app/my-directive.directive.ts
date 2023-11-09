import { Directive,ElementRef,Inject,AfterViewInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DOCUMENT } from"@angular/common";
import {fromEvent,filter, Subscription} from "rxjs";
@Directive({
  // selector: '[appMyDirective]'
selector:'[clickOutside]'
})
export class MyDirectiveDirective implements AfterViewInit,OnDestroy{
@Output() clickOutside=new EventEmitter<void>();
documentClickSubscription:Subscription | undefined;  
constructor(
    private element:ElementRef,
    @Inject(DOCUMENT) private document:Document)
  {}
 
 
  isInside(elementToCheck:HTMLElement):boolean{
    return elementToCheck === this.element.nativeElement ||this.element.nativeElement.contains(elementToCheck);
  }
  ngAfterViewInit():void{
 this.documentClickSubscription=fromEvent(this.document,'click').pipe(
  filter((event)=>{
  return !this.isInside(event.target as HTMLElement)
 })
 ).subscribe(()=>{
this.clickOutside.emit();
 });
}
ngOnDestroy(): void {
  this.documentClickSubscription?.unsubscribe();
}
}
