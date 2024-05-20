import { Component } from '@angular/core';
import { PassesService } from '../../services/passes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datadisplay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datadisplay.component.html',
  styleUrl: './datadisplay.component.scss'
})

export class DatadisplayComponent {
  locations: any[] = [];
  genericBus: any[] = [];
  selectedBusId: string = '664b3b455a61746da9fcbbf0'; // ID específico

  constructor(private dataService: PassesService) { }

  ngOnInit(): void {
    this.loadLocations();
    this.loadGenericBus();
  }

  loadLocations(): void {
    this.dataService.getLocations().subscribe(data => {
      this.locations = data;
    });
  }

  loadGenericBus(): void {
    this.dataService.getGenericBusById(this.selectedBusId).subscribe(data => {
      this.genericBus = this.transformGenericBus(data);
    });
  }

  transformGenericBus(data: any): any[] {
    const transformedData: any[] = [];
    if (data.generic_bus) {
      data.generic_bus.forEach((provider: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => {
        for (const key in provider) {
          if (provider.hasOwnProperty(key)) {
            transformedData.push({
              providerName: key,
              routes: provider[key]
            });
          }
        }
      });
    }
    return transformedData;
  }
}