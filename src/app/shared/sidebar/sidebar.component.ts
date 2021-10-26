import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent{

  get historial(){
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { }

  searchFromSidebar(valueToSearch : string){
    this.gifsService.buscarGifs(valueToSearch);
  }
}
