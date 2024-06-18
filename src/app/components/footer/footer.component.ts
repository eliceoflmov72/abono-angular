import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MessagesModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})

export class FooterComponent implements OnInit {
  email: string = 'eliceomoreta@gmail.com'; // Correo a copiar
  messages: Message[] = []; // Arreglo mensajes
  
  ngOnInit() {
    this.messages = []; // Inicializa mensajes vacío
  }
  
  copyCreatorEmail() {
    navigator.clipboard.writeText(this.email) // Copia correo al portapapeles
      .then(() => {
        this.messages = [{ severity: 'success', detail: 'Correo copiado con éxito.' }]; // Mensaje éxito
      })
      .catch(err => {
        console.error('Error al copiar el correo: ', err); // Log error consola
        this.messages = [{ severity: 'error', detail: 'No se pudo copiar el correo.' }]; // Mensaje error
      });
  }
}
