import { Component, OnInit } from '@angular/core';
import { PassCrudService } from '../../services/pass_crud.service';
import { Pass } from '../../services/pass.model';

@Component({
  selector: 'app-datadisplay',
  templateUrl: './datadisplay.component.html',
  styleUrls: ['./datadisplay.component.scss'],
})
export class DatadisplayComponent implements OnInit {
  data: Pass[] = [];

  constructor(private dataService: PassCrudService) {}

  ngOnInit(): void {
    this.dataService.getPass().subscribe(
      (data: Pass[]) => {
        this.data = data;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      },
    );
  }
}
