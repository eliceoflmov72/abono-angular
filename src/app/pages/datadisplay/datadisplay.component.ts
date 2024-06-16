import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassCrudService } from '../../services/pass_crud.service';
import { Pass } from '../../models/pass.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-datadisplay',
  templateUrl: './datadisplay.component.html',
  styleUrls: ['./datadisplay.component.scss'],
  providers: [PassCrudService],
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true,
})
export class DatadisplayComponent implements OnInit {
  data: Pass[] = [];
  filteredData: Pass[] = [];
  searchWord: string = '';

  constructor(
    private dataService: PassCrudService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dataService.getPass().subscribe(
      (data: Pass[]) => {
        this.data = data;
        this.filteredData = data; // Inicialmente, los datos filtrados son todos los datos
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      },
    );
  }

  onSelect(data: Pass): void {
    this.router.navigate(['/datadisplay', data.id]);
  }

  searchPass(): void {
    if (this.searchWord.trim() === '') {
      this.filteredData = this.data; // Si no hay término de búsqueda, muestra todos los datos
    } else {
      this.filteredData = this.data.filter((data) =>
        data.name.toLowerCase().includes(this.searchWord.toLowerCase()),
      );
    }
  }
}
