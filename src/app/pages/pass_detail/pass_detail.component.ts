import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PassCrudService } from '../../services/pass_crud.service';
import { Pass } from '../../services/pass.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-pass-detail',
  templateUrl: './pass_detail.component.html',
  styleUrls: ['./pass_detail.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterLink,
  ],
  providers: [PassCrudService, ConfirmationService, MessageService],
})
export class PassDetailComponent implements OnInit {
  data: Pass | null = null;
  isPassNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: PassCrudService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isPassNew = true;
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

  savePass(): void {
    if (this.isPassNew && this.data) {
      this.crudService.createPass(this.data).subscribe(
        () => {
          this.router.navigate(['/pass_list']);
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Pass creado con éxito',
          });
        },
        (error) => {
          console.error('Error al crear los datos:', error);
        },
      );
    } else if (this.data && this.data.id) {
      this.crudService.updatePass(this.data.id, this.data).subscribe(
        () => {
          this.router.navigate(['/pass_list']);
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Pass actualizado con éxito',
          });
        },
        (error) => {
          console.error('Error al actualizar los datos:', error);
        },
      );
    }
  }

  confirmDeletePass(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Está seguro de que desea eliminar este abono?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.onDelete();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rechazado',
          detail: 'Ha cancelado la eliminación',
        });
      },
    });
  }

  onDelete(): void {
    if (this.data && this.data.id) {
      this.crudService.deletePass(this.data.id).subscribe(
        () => {
          this.router.navigate(['/pass_list']);
          this.messageService.add({
            severity: 'info',
            summary: 'Eliminado',
            detail: 'Pass eliminado con éxito',
          });
        },
        (error) => {
          console.error('Error al eliminar los datos:', error);
        },
      );
    }
  }

  confirmDeleteCoor(event: Event, index: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Está seguro de que desea eliminar esta coordenada?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.removeCoor(index);
        this.messageService.add({
          severity: 'info',
          summary: 'Eliminado',
          detail: 'Coordenada eliminada con éxito',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rechazado',
          detail: 'Ha cancelado la eliminación',
        });
      },
    });
  }

  removeCoor(index: number): void {
    if (this.data) {
      this.data.coordinates.splice(index, 1);
    }
  }

  addCoor(): void {
    if (this.data) {
      this.data.coordinates.push({ latitude: '', longitude: '' });
    }
  }
}
