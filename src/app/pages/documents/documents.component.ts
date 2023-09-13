import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  list!: ElementRef;

  onListReady(list: ElementRef) {
    this.list = list;
  }

  scrollList(direction: number) {
    this.list.nativeElement.scrollBy({ left: direction * 800, behavior: 'smooth' });
  }
}
