import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city= '';
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  getWeather(): void {
    this.weatherService.getWeather(this.city).subscribe(response => {
        Object.assign(response[1],{cityName : this.city});
        this.weatherData = response[1];
      });
  }
}
