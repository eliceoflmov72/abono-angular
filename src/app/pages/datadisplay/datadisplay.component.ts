import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/pass_crud.service';
import { Data } from '../../services/pass.model';

@Component({
  selector: 'app-datadisplay',
  templateUrl: './datadisplay.component.html',
  styleUrls: ['./datadisplay.component.scss'],
})
export class DatadisplayComponent implements OnInit {
  data: Data[] = [];

  constructor(private dataService: CrudService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (data: Data[]) => {
        this.data = data;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      },
    );
  }
}
