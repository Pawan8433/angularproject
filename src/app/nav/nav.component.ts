import { Component, Renderer2,OnInit, OnDestroy  } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
// import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  private navigationSubscription: any;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    // Listen to route changes
    this.navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeSidebar();
    });
  }

  ngOnDestroy() {
    // Clean up subscription to avoid memory leaks
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (sidebar.classList.contains('active')) {
        this.renderer.removeClass(sidebar, 'active');
      } else {
        this.renderer.addClass(sidebar, 'active');
      }
    }
  }

  private closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('active')) {
      this.renderer.removeClass(sidebar, 'active');
    }
  }
}
