import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassCrudService } from '../../services/pass_crud.service';
import { Pass } from '../../services/pass.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pass-detail',
  templateUrl: './pass_detail.component.html',
  styleUrls: ['./pass_detail.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [PassCrudService],
})
export class PassDetailComponent implements OnInit {
  data: Pass | null = null;
  isNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: PassCrudService,
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
      this.crudService.getPassById(id).subscribe(
        (data: Pass) => {
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
      this.crudService.createPass(this.data).subscribe(
        () => {
          this.router.navigate(['/pass_list']);
        },
        (error) => {
          console.error('Error al crear los datos:', error);
        },
      );
    } else if (this.data && this.data.id) {
      this.crudService.updatePass(this.data.id, this.data).subscribe(
        () => {
          this.router.navigate(['/pass_list']);
        },
        (error) => {
          console.error('Error al actualizar los datos:', error);
        },
      );
    }
  }

  onDelete(): void {
    if (this.data && this.data.id) {
      this.crudService.deletePass(this.data.id).subscribe(
        () => {
          this.router.navigate(['/pass_list']);
        },
        (error) => {
          console.error('Error al eliminar los datos:', error);
        },
      );
    }
  }

  onBack(): void {
    this.router.navigate(['/pass_list']);
  }
}
