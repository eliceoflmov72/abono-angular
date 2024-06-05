import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefillCrudService } from '../../services/refill_crud.service';
import { Refill, Coordinate } from '../../services/refill.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refill-detail',
  templateUrl: './refill_detail.component.html',
  styleUrls: ['./refill_detail.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [RefillCrudService],
})
export class RefillDetailComponent implements OnInit {
  data: Refill | null = null;
  isNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: RefillCrudService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isNew = true;
      this.data = {
        passId: '',
        company: '',
        coordinates: [{ latitude: '', longitude: '' }],
        name: '',
        description: '',
        image: '',
        type: '',
      };
    } else if (id) {
      this.crudService.getRefillById(id).subscribe(
        (data: Refill) => {
          this.data = data;
        },
        (error) => {
          console.error('Error al obtener los datos del refill:', error);
        },
      );
    }
  }

  onSave(): void {
    if (this.isNew && this.data) {
      this.crudService.createRefill(this.data).subscribe(
        () => {
          this.router.navigate(['/refill_list']);
        },
        (error) => {
          console.error('Error al crear el refill:', error);
        },
      );
    } else if (this.data && this.data.id) {
      this.crudService.updateRefill(this.data.id, this.data).subscribe(
        () => {
          this.router.navigate(['/refill_list']);
        },
        (error) => {
          console.error('Error al actualizar el refill:', error);
        },
      );
    }
  }

  onDelete(): void {
    if (this.data && this.data.id) {
      this.crudService.deleteRefill(this.data.id).subscribe(
        () => {
          this.router.navigate(['/refill_list']);
        },
        (error) => {
          console.error('Error al eliminar el refill:', error);
        },
      );
    }
  }

  onBack(): void {
    this.router.navigate(['/refill_list']);
  }
}
