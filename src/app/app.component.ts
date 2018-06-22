import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor()
  {
    localStorage.removeItem('userDetails');
    localStorage.removeItem("menu-config");
    
  }
}
