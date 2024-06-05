import { Component, AfterViewInit, HostListener } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pass } from '../../services/pass.model';
import { PassCrudService } from '../../services/pass_crud.service';
import { Refill } from '../../services/refill.model';
import { RefillCrudService } from '../../services/refill_crud.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map?: L.Map;
  private permanentMarkers: L.Marker[] = [];
  private temporaryMarkers: L.Marker[] = [];
  private currentMarker?: L.Marker;
  cityName: string = '';
  searchResults: any[] = [];

  private defaultIcon = L.icon({
    iconUrl: '../../assets/Map-Pin.png',
    iconSize: [49, 49],
    iconAnchor: [12, 41],
    popupAnchor: [12, -34],
    shadowSize: [41, 41],
  });

  private passHouse = L.icon({
    iconUrl: '../../assets/pass-house-pin.webp',
    iconSize: [49, 49],
    iconAnchor: [12, 41],
    popupAnchor: [12, -34],
    shadowSize: [41, 41],
  });

  private refillIcon = L.icon({
    iconUrl: '../../assets/recharge-pin.webp',
    iconSize: [49, 49],
    iconAnchor: [12, 41],
    popupAnchor: [12, -34],
    shadowSize: [41, 41],
  });

  constructor(
    private http: HttpClient,
    private crudService: PassCrudService,
    private refillCrudService: RefillCrudService,
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadPassMarkers();
    this.loadRefillMarkers();
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

  private loadPassMarkers(): void {
    this.crudService.getPass().subscribe(
      (data: Pass[]) => {
        data.forEach((item) => {
          item.coordinates.forEach((coord) => {
            const lat = parseFloat(coord.latitude);
            const lon = parseFloat(coord.longitude);
            const marker = L.marker([lat, lon], { icon: this.passHouse })
              .addTo(this.map!)
              .bindPopup(
                `${item.name}<br>${item.description}<br>${item.price}€`,
              );
            this.permanentMarkers.push(marker);
          });
        });
      },
      (error: any) => {
        console.error('Error loading markers:', error);
      },
    );
  }

  private loadRefillMarkers(): void {
    this.refillCrudService.getAllRefills().subscribe(
      (data: Refill[]) => {
        data.forEach((item) => {
          item.coordinates.forEach((coord) => {
            const lat = parseFloat(coord.latitude);
            const lon = parseFloat(coord.longitude);
            const marker = L.marker([lat, lon], { icon: this.refillIcon })
              .addTo(this.map!)
              .bindPopup(`${item.name}<br>${item.description}`);
            this.permanentMarkers.push(marker);
          });
        });
      },
      (error) => {
        console.error('Error loading refill markers:', error);
      },
    );
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
            alert('Error en la búsqueda de la ciudad');
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

    // Anadir nuevo marcador
    const newMarker = L.marker([lat, lon], { icon: this.defaultIcon })
      .addTo(this.map!)
      .bindPopup(`${city.display_name}`)
      .openPopup();
    this.temporaryMarkers.push(newMarker);
    this.currentMarker = newMarker;

    // Limpiar la lista de resultados despues de la seleccion
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const searchBox = document.querySelector('.search-box');
    const mapFrame = document.querySelector('.map-frame');

    // Verificar si el click esta fuera de la caja de busqueda y el map frame
    if (
      searchBox &&
      !searchBox.contains(target) &&
      mapFrame &&
      !mapFrame.contains(target)
    ) {
      this.searchResults = [];
      if (this.currentMarker) {
        this.map?.removeLayer(this.currentMarker);
        this.currentMarker = undefined;
      }
    }
  }

  onMapContainerClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
