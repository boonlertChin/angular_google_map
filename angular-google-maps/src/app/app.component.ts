import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component ,inject} from "@angular/core";

import { GpsServiceService } from './gps-service.service';

import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from "@angular/google-maps";
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule, NavbarComponent, JsonPipe, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { 
  private http = inject(HttpClient);
    post: any;

    constructor(private gpsService: GpsServiceService) {
      // this.connectService(); //move to page dashboard ...
    }

    // async connectService(){
    //   // this.post = await this.gpsService.getData();
    //   // console.log('show service',this.post);
    //   let postData = {
    //     tbname: 'realtime',
    //     body: ''
    //   };
    //   let res = await this.gpsService.postData(postData);
    //   console.log('show res',res);
    // }
}
