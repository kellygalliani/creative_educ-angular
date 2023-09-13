import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RetrieveProjectsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent  implements AfterViewInit{
  @Input() showAll = false;
  projects: any[] = [];
  @Output() listReady = new EventEmitter<ElementRef>();
  @ViewChild('list') list!: ElementRef;

  constructor(private retrieveProjectsService: RetrieveProjectsService) {}

  ngOnInit() {
    if (this.showAll) {
      this.retrieveProjectsService.getProjects(true).subscribe(projects => {
        this.projects = projects.data;
      });
    } else {
      this.retrieveProjectsService.getProjects().subscribe(projects => {
        this.projects = projects.data;
      });
    }
  }
 
  ngAfterViewInit() {
    this.listReady.emit(this.list);
  }

  openProject(id: string) {
    window.open(`https://editor.trakto.io/presentation/p/${id}`, '_blank');
  }
}
