import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  isMobile: boolean = false;

  constructor(private router: Router) {}
  
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }


  

  ngOnInit() {
    this.checkScreenSize();
    if (this.router.url === '/app') {
      this.router.navigate(['/app/inicio']);
    }

  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768; 
    if (!this.isMobile && this.drawer) {
      this.drawer.open(); 
    }
  }

  navigateTo(route: string) {
    if(this.isMobile){
      this.drawer?.close();
    }
    this.router.navigate([route]);
  }
}
