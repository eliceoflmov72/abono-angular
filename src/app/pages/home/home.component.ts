import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, PanelModule, AvatarModule, ButtonModule, MenubarModule, MenuModule],
  standalone: true
})

export class HomeComponent implements OnInit {
  items: { label?: string; icon?: string; separator?: boolean }[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Refresh', icon: 'pi pi-refresh' },
      { label: 'Search', icon: 'pi pi-search' },
      { separator: true },
      { label: 'Delete', icon: 'pi pi-times' }
    ];
  }
}
