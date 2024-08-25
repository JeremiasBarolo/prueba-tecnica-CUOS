import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empecemos-button',
  templateUrl: './empecemos-button.component.html',
  styleUrls: ['./empecemos-button.component.css']
})
export class EmpecemosButtonComponent {
  constructor(private router: Router) {}


  navigateTo() {
    this.router.navigate(['app/table-view']);
  }
}
