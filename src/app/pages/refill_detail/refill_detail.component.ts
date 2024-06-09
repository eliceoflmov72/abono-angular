import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RefillCrudService } from '../../services/refill_crud.service';
import { Refill } from '../../services/refill.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-refill-detail',
  templateUrl: './refill_detail.component.html',
  styleUrls: ['./refill_detail.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterLink,
  ],
  providers: [RefillCrudService, ConfirmationService, MessageService],
})
export class RefillDetailComponent implements OnInit {
  data: Refill | null = null;
  isNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: RefillCrudService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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

  saveThisRefill(): void {
    if (this.isNew && this.data) {
      this.crudService.createRefill(this.data).subscribe(
        () => {
          this.router.navigate(['/refill_list']);
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Refill creado con éxito',
          });
        },
        (error) => {
          console.error('Error al crear el refill:', error);
        },
      );
    } else if (this.data && this.data.id) {
      this.crudService.updateRefill(this.data.id, this.data).subscribe(
        () => {
          this.router.navigate(['/refill_list']);
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Refill actualizado con éxito',
          });
        },
        (error) => {
          console.error('Error al actualizar el refill:', error);
        },
      );
    }
  }

  confirmDeleteRefill(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Está seguro de que desea eliminar este refill?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.deleteThisRefill();
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

  deleteThisRefill(): void {
    if (this.data && this.data.id) {
      this.crudService.deleteRefill(this.data.id).subscribe(
        () => {
          this.router.navigate(['/refill_list']);
          this.messageService.add({
            severity: 'info',
            summary: 'Eliminado',
            detail: 'Refill eliminado con éxito',
          });
        },
        (error) => {
          console.error('Error al eliminar el refill:', error);
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
