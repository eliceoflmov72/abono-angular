import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { Data } from '../../services/data_crud.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listcomponent',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listcomponent.component.html',
  styleUrls: ['./listcomponent.component.scss']
})
export class ListcomponentComponent implements OnInit {
  data: Data[] = [];

  constructor(private crudService: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.crudService.getData().subscribe(
      (data: Data[]) => {
        this.data = data;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  onSelect(item: Data): void {
    this.router.navigate(['/detailcomponent', item._id]);
  }
}
