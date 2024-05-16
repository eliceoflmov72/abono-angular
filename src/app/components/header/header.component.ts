import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TabMenuModule, RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Dashboard', icon: 'pi pi-home' },
          { label: 'Transactions', icon: 'pi pi-chart-line' },
          { label: 'Products', icon: 'pi pi-list' },
          { label: 'Messages', icon: 'pi pi-inbox' }
      ]
  }
}