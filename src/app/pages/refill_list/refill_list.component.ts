import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RefillCrudService } from '../../services/refill_crud.service';
import { Refill } from '../../services/refill.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-refill-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './refill_list.component.html',
  styleUrls: ['./refill_list.component.scss'],
})
export class RefillListComponent implements OnInit {
  refills: Refill[] = [];
  filteredData: Refill[] = [];
  searchTerm: string = '';

  constructor(
    private crudService: RefillCrudService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.crudService.getAllRefills().subscribe(
      (data: Refill[]) => {
        this.refills = data;
        this.filteredData = data; // Inicialmente, los datos filtrados son todos los datos
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      },
    );
  }

  onSelect(item: Refill): void {
    this.router.navigate(['/refill_detail', item.id]);
  }

  createRefill(): void {
    this.router.navigate(['/refill_detail', 'new']);
  }

  searchRefills(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredData = this.refills; // Si no hay término de búsqueda, muestra todos los datos
    } else {
      this.filteredData = this.refills.filter((item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    }
  }
}
