import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { Data } from '../../services/data_crud.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailcomponent',
  templateUrl: './detailcomponent.component.html',
  styleUrls: ['./detailcomponent.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [CrudService]
})
export class DetailcomponentComponent implements OnInit {
  data: Data | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', id); // Verificar ID
    if (id) {
      this.crudService.getDataById(id).subscribe(
        (data: Data) => {
          this.data = data;
          console.log('Data received:', data); // Verificar datos recibidos
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    }
  }

  onUpdate(): void {
    if (this.data && this.data._id) {
      this.crudService.updateData(this.data._id, this.data).subscribe(
        () => {
          this.router.navigate(['/listcomponent']);
        },
        (error) => {
          console.error('Error al actualizar los datos:', error);
        }
      );
    }
  }

  onDelete(): void {
    if (this.data && this.data._id) {
      this.crudService.deleteData(this.data._id).subscribe(
        () => {
          this.router.navigate(['/listcomponent']);
        },
        (error) => {
          console.error('Error al eliminar los datos:', error);
        }
      );
    }
  }
}
