import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PassCrudService } from '../../services/pass_crud.service';
import { RefillCrudService } from '../../services/refill_crud.service';
import { Pass } from '../../services/pass.model';
import { Refill } from '../../services/refill.model';
import { UserHistoryService } from '../../services/user_history.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-datadisplay-detail',
  templateUrl: './datadisplay_detail.component.html',
  styleUrls: ['./datadisplay_detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [PassCrudService, RefillCrudService, UserHistoryService],
})
export class DatadisplayDetailComponent implements OnInit {
  data: Pass | null = null;
  refills: Refill[] = [];
  userId: string | null = null;
  isPassDataFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private passService: PassCrudService,
    private refillService: RefillCrudService,
    private userHistoryService: UserHistoryService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.passService.getPassById(id).subscribe(
        (data: Pass) => {
          this.data = data;
          if (data.id) {
            this.loadAllRefills(data.id);
            this.checkFavorite(data.id);
          }
        },
        (error) => {
          console.error('Error al obtener los datos del pass:', error);
        },
      );
    }
  }

  loadAllRefills(passId: string): void {
    this.refillService.getAllRefills().subscribe(
      (refills: Refill[]) => {
        this.refills = refills.filter((refill) => refill.passId === passId);
      },
      (error) => {
        console.error('Error al obtener los refills:', error);
      },
    );
  }

  checkFavorite(passId: string): void {
    if (this.userId) {
      this.userHistoryService
        .getUserHistory(this.userId)
        .subscribe((history) => {
          this.isPassDataFavorite = history.passIds.includes(passId);
        });
    }
  }

  setFavorite(): void {
    if (this.data && this.userId) {
      const passId = this.data.id ?? '';
      if (this.isPassDataFavorite) {
        this.userHistoryService
          .removePassFromHistory(this.userId, passId)
          .subscribe(
            () => {
              this.isPassDataFavorite = false;
              this.cdr.detectChanges();
            },
            (error) => {
              console.error('Error eliminando el pass de favoritos:', error);
            },
          );
      } else {
        this.userHistoryService.addPassToHistory(this.userId, passId).subscribe(
          () => {
            this.isPassDataFavorite = true;
            this.cdr.detectChanges();
            console.log('Pass añadido a favoritos');
          },
          (error) => {
            console.error('Error añadiendo el pass a favoritos:', error);
          },
        );
      }
    }
  }
}
