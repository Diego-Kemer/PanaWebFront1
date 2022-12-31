import { Component, OnInit } from '@angular/core';
import { UiServiceService } from './services/ui-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private uiServ: UiServiceService){}
  loading$: any;
  title = 'panaderiaWeb';
  
  ngOnInit(): void {
    this.loading$ = this.uiServ.loading$;
  }
}
