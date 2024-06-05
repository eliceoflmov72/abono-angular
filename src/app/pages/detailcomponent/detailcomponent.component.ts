import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../services/pass_crud.service';
import { Data } from '../../services/pass.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailcomponent',
  templateUrl: './detailcomponent.component.html',
  styleUrls: ['./detailcomponent.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [CrudService],
})
export class DetailcomponentComponent implements OnInit {
  data: Data | null = null;
  isNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isNew = true;
      this.data = {
        company: '',
        coordinates: [{ latitude: '', longitude: '' }],
        name: '',
        description: '',
        valid_period: { start_date: '', end_date: '' },
        price: 0,
        image: '',
        type: '',
      };
    } else if (id) {
      this.crudService.getDataById(id).subscribe(
        (data: Data) => {
          this.data = data;
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        },
      );
    }
  }

  onSave(): void {
    if (this.isNew && this.data) {
      this.crudService.createData(this.data).subscribe(
        () => {
          this.router.navigate(['/listcomponent']);
        },
        (error) => {
          console.error('Error al crear los datos:', error);
        },
      );
    } else if (this.data && this.data.id) {
      this.crudService.updateData(this.data.id, this.data).subscribe(
        () => {
          this.router.navigate(['/listcomponent']);
        },
        (error) => {
          console.error('Error al actualizar los datos:', error);
        },
      );
    }
  }

  onDelete(): void {
    if (this.data && this.data.id) {
      this.crudService.deleteData(this.data.id).subscribe(
        () => {
          this.router.navigate(['/listcomponent']);
        },
        (error) => {
          console.error('Error al eliminar los datos:', error);
        },
      );
    }
  }

  onBack(): void {
    this.router.navigate(['/listcomponent']);
  }
}
