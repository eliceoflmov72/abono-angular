import { Component, AfterViewInit, HostListener } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pass } from '../../services/pass.model';
import { PassCrudService } from '../../services/pass_crud.service';
import { Refill } from '../../services/refill.model';
import { RefillCrudService } from '../../services/refill_crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map?: L.Map;
  private permaMarks: L.Marker[] = [];
  private temporaryMarkers: L.Marker[] = [];
  private currentMarker?: L.Marker;
  cityName: string = '';
  searchResults: any[] = [];

  private defaultIcon = L.icon({
    iconUrl: '../../assets/Map-Pin.png',
    iconSize: [60, 60],
    iconAnchor: [25, 51],
    popupAnchor: [0, -51],
  });

  private passHouse = L.icon({
    iconUrl: '../../assets/pass-house-pin.webp',
    iconSize: [51, 51],
    iconAnchor: [25, 51],
    popupAnchor: [0, -51],
  });

  private refillIcon = L.icon({
    iconUrl: '../../assets/recharge-pin.webp',
    iconSize: [51, 51],
    iconAnchor: [25, 51],
    popupAnchor: [0, -51],
  });

  private passRefill = L.icon({
    iconUrl: '../../assets/pass-refill-pin.webp',
    iconSize: [51, 51],
    iconAnchor: [25, 51],
    popupAnchor: [0, -51],
  });

  constructor(
    private http: HttpClient,
    private crudService: PassCrudService,
    private refillCrudService: RefillCrudService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      attributionControl: false,
      center: [40.416775, -3.70379],
      zoom: 6,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    );

    tiles.addTo(this.map);
  }

  private loadMarkers(): void {
    const passMarkers: { [key: string]: Pass } = {};
    const refillMarkers: { [key: string]: Refill } = {};

    this.crudService.getPass().subscribe(
      (passData: Pass[]) => {
        passData.forEach((passItem) => {
          passItem.coordinates.forEach((coord) => {
            if (this.isValidCoordinate(coord.latitude, coord.longitude)) {
              const key = `${coord.latitude},${coord.longitude}`;
              passMarkers[key] = passItem;
            }
          });
        });

        this.refillCrudService.getAllRefills().subscribe(
          (refillData: Refill[]) => {
            refillData.forEach((refillItem) => {
              refillItem.coordinates.forEach((coord) => {
                if (this.isValidCoordinate(coord.latitude, coord.longitude)) {
                  const key = `${coord.latitude},${coord.longitude}`;
                  refillMarkers[key] = refillItem;
                }
              });
            });

            this.addMarkersToMap(passMarkers, refillMarkers);
          },
          (error) => {
            console.error('Error al acceder a los markers de Refill:', error);
          },
        );
      },
      (error: any) => {
        console.error('Error al acceder a los markers de Pass:', error);
      },
    );
  }

  private addMarkersToMap(
    passMarkers: { [key: string]: Pass },
    refillMarkers: { [key: string]: Refill },
  ): void {
    const keys = new Set([
      ...Object.keys(passMarkers),
      ...Object.keys(refillMarkers),
    ]);
    const buttonStyle = `
      background-color: var(--red-icon);
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 0.5rem;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;
    `;
    const hoverStyle = `
      background-color: var(--color-combine);
    `;

    keys.forEach((key) => {
      const [lat, lon] = key.split(',').map(parseFloat);
      if (!isNaN(lat) && !isNaN(lon)) {
        let popupContent = '';
        let id = '';

        if (passMarkers[key] && refillMarkers[key]) {
          id = passMarkers[key].id ?? '';
          popupContent = `
            <strong>${passMarkers[key].name} & ${refillMarkers[key].name}</strong><br>
            ${passMarkers[key].description}<br><br><br>
            <strong>Información del lugar de recarga.</strong><br><br>${refillMarkers[key].description}<br>
            <strong>Precio:</strong> ${passMarkers[key].price}€<br>
            <button 
              style="${buttonStyle}" 
              onclick="window.dispatchEvent(new CustomEvent('moreInfo', { detail: { type: 'both', id: '${id}' } }))">
              Más información
            </button>
          `;
          L.marker([lat, lon], { icon: this.passRefill })
            .addTo(this.map!)
            .bindPopup(popupContent);
        } else if (passMarkers[key]) {
          id = passMarkers[key].id ?? '';
          popupContent = `
            <strong>${passMarkers[key].name}</strong><br><br>
            ${passMarkers[key].description}<br><br>
            <strong>Precio:</strong> ${passMarkers[key].price}€<br>
            <button 
              style="${buttonStyle}" 
              onclick="window.dispatchEvent(new CustomEvent('moreInfo', { detail: { type: 'pass', id: '${id}' } }))">
              Más información
            </button>
          `;
          L.marker([lat, lon], { icon: this.passHouse })
            .addTo(this.map!)
            .bindPopup(popupContent);
        } else if (refillMarkers[key]) {
          id = refillMarkers[key].passId ?? '';
          popupContent = `
            ${refillMarkers[key].name}<br>
            ${refillMarkers[key].description}<br>
            <button 
              style="${buttonStyle}" 
              onclick="window.dispatchEvent(new CustomEvent('moreInfo', { detail: { type: 'refill', id: '${id}' } }))">
              Más información
            </button>
          `;
          L.marker([lat, lon], { icon: this.refillIcon })
            .addTo(this.map!)
            .bindPopup(popupContent);
        }

        this.permaMarks.push(L.marker([lat, lon]));
      }
    });

    window.addEventListener('moreInfo', (event: any) => {
      this.onMoreInfo(event.detail);
    });
  }

  private isValidCoordinate(lat: string, lon: string): boolean {
    return !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon));
  }

  private onMoreInfo(detail: { type: string; id: string }): void {
    this.router.navigate(['/datadisplay', detail.id]);
  }

  searchCity(): void {
    if (this.cityName) {
      this.http
        .get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${this.cityName}`,
        )
        .subscribe(
          (data: any) => {
            this.searchResults = data;
          },
          (error) => {
            alert('No se encuentran resultados para esta ciudad');
          },
        );
    } else {
      this.searchResults = [];
    }
  }

  selectCity(city: any): void {
    const lat = parseFloat(city.lat);
    const lon = parseFloat(city.lon);
    this.map?.setView([lat, lon], 12);

    // Eliminar los marcadores temporales
    this.temporaryMarkers.forEach((marker) => this.map?.removeLayer(marker));
    this.temporaryMarkers = [];

    // Añadir nuevo marcador
    const newMarker = L.marker([lat, lon], { icon: this.defaultIcon })
      .addTo(this.map!)
      .bindPopup(`${city.display_name}`)
      .openPopup();
    this.temporaryMarkers.push(newMarker);
    this.currentMarker = newMarker;

    // Limpiar la lista de resultados después de la selección
    this.searchResults = [];
    this.cityName = city.display_name;

    // Escucha de eventos de click en el mapa para limpiar el marcador
    this.map?.on('click', this.onMapClick.bind(this));
  }

  onMapClick(event: L.LeafletMouseEvent): void {
    if (this.currentMarker) {
      this.map?.removeLayer(this.currentMarker);
      this.currentMarker = undefined;
    }
  }

  onMapContainerClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
