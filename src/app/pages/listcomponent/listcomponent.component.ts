import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CrudService } from '../../services/pass_crud.service';
import { Data } from '../../services/pass.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listcomponent',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listcomponent.component.html',
  styleUrls: ['./listcomponent.component.scss'],
})
export class ListcomponentComponent implements OnInit {
  data: Data[] = [];
  filteredData: Data[] = [];
  searchTerm: string = '';

  constructor(
    private crudService: CrudService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.crudService.getData().subscribe(
      (data: Data[]) => {
        this.data = data;
        this.filteredData = data; // Inicialmente, los datos filtrados son todos los datos
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      },
    );
  }

  onSelect(item: Data): void {
    this.router.navigate(['/detailcomponent', item.id]);
  }

  onCreateNew(): void {
    this.router.navigate(['/detailcomponent', 'new']);
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredData = this.data; // Si no hay término de búsqueda, muestra todos los datos
    } else {
      this.filteredData = this.data.filter((item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    }
  }
}
