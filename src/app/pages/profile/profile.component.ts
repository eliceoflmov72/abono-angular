import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PassCrudService } from '../../services/pass_crud.service';
import { AuthService } from '../../auth/auth.service';
import { UserHistoryService } from '../../services/user_history.service';
import { Pass } from '../../models/pass.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username: string | null = '';
  name: string | null = '';
  createdAt: string | null = '';
  favoritePasses: Pass[] = [];
  comments: any[] = [];

  constructor(
    private authService: AuthService,
    private userHistoryService: UserHistoryService,
    private passCrudService: PassCrudService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    this.username = this.authService.getUsername();

    if (userId) {
      this.authService.getUserById(userId).subscribe((user) => {
        this.name = user.name;
        this.createdAt = user.createdAt;
      });

      this.userHistoryService.getUserHistory(userId).subscribe((history) => {
        const passIds = history.passIds;
        this.comments = history.comments;

        passIds.forEach((passId: string) => {
          if (passId) {
            this.passCrudService.getPassById(passId).subscribe((pass) => {
              this.favoritePasses.push(pass);
            });
          }
        });
      });
    }
  }

  public onSelectPass(passId: string | undefined): void {
    if (passId) {
      this.router.navigate(['/datadisplay', passId]);
    } else {
      console.error('Pass id inválido');
    }
  }
}
