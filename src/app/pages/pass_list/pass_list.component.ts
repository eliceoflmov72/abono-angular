import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { PassCrudService } from '../../services/pass_crud.service';
import { Pass } from '../../services/pass.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pass-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pass_list.component.html',
  styleUrls: ['./pass_list.component.scss'],
})
export class PassListComponent implements OnInit {
  passes: Pass[] = [];
  filteredData: Pass[] = [];
  searchTerm: string = '';

  constructor(
    private crudService: PassCrudService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.crudService.getPass().subscribe(
      (data: Pass[]) => {
        this.passes = data;
        this.filteredData = data; // Inicialmente, los datos filtrados son todos los datos
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      },
    );
  }

  onSelect(item: Pass): void {
    this.router.navigate(['/pass_detail', item.id]);
  }

  onCreateNew(): void {
    this.router.navigate(['/pass_detail', 'new']);
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredData = this.passes; // Si no hay término de búsqueda, muestra todos los datos
    } else {
      this.filteredData = this.passes.filter((item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    }
  }
}
