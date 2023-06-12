import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, mergeMap } from 'rxjs/operators';
import { of,zip} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor(private http: HttpClient) {}

  getCoordinates(city:string) {

    return this.http.get("https://geocoding-api.open-meteo.com/v1/search?name="+city).pipe(
      map((res: any) => {
        var coordinates = {
          latitude : "",
          longitude : ""
        };

        for(var i =0, results=res.results; i < results.length ; i++)
        {
          if(results[i].country_code === "US")
          {
            coordinates = {
              latitude : results[i].latitude,
              longitude : results[i].longitude
            }
            break;
          }
        }
        return coordinates;
      })
    )
  }

  getForecast(coordinates:any) {
    console.log("coordinates");
    console.log(coordinates.latitude+" : "+coordinates.longitude);
    
    return this.http.get("https://api.open-meteo.com/v1/gfs?latitude="+coordinates.latitude+"&longitude="+coordinates.longitude+"&current_weather="+true).pipe(
      map(response=>{
        return response;
      })
    )
  }
  getWeather(city: string){
    return this.getCoordinates(city).pipe(
      mergeMap((responses)=>
        zip(
          of(responses),
          this.getForecast(responses)
        )
      )
    )
  }
}
