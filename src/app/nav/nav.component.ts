import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterModule, CommonModule], // Add CommonModule here
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  private navigationSubscription: any;
  isSidebarActive = false;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeSidebar();
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (sidebar.classList.contains('active')) {
        this.renderer.removeClass(sidebar, 'active');
        this.isSidebarActive = false;
      } else {
        this.renderer.addClass(sidebar, 'active');
        this.isSidebarActive = true;
      }
    }
  }

  private closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('active')) {
      this.renderer.removeClass(sidebar, 'active');
      this.isSidebarActive = false;
    }
  }
}
