import { Component, ViewChild } from "@angular/core";
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from "@angular/google-maps";
import { RouterOutlet } from '@angular/router'; 

import { GpsServiceService } from '../gps-service.service';

import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard-working-group-ff',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule, FormsModule],
  templateUrl: './dashboard-working-group-ff.component.html',
  styleUrl: './dashboard-working-group-ff.component.css'
})
export class DashboardWorkingGroupFFComponent {
  title = 'Dashboard Working Group FF';
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: 13.736717, lng: 100.523186 }, //BKK -> Lat,Lng
    zoom: 8
  };
  nzLocations: any[] = [
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -39.927193, lng: 175.053218 }
  ];
  // auLocations: any[] = [
  //   { lat: -31.56391, lng: 147.154312 },
  //   { lat: -33.718234, lng: 150.363181 },
  //   { lat: -33.727111, lng: 150.371124 },
  //   { lat: -33.848588, lng: 151.209834 }
  // ];

  arrayTms = [];
  arrayRealTime = [];
  arrayOnTmsRealtime: any[] = [
    { lat: 13.736717, lng: 100.523186 }
  ];
  arrayOnTmsRealtimeRender: any[] = [
    { lat: 13.736717, lng: 100.523186 }
  ];
 
  //Next version.
  // arrayWorkcode = [];
  // arrayStartName = [];
  // arrayEndName = [];
  
  public listWorkCode = [];
  public listLicense = [];
  public listOrderNumber = [];

  public listStartName = [];
  public listEndName = [];
  
  public listShipmentType = [
    { key: -1, display: "ทั้งหมด"},
    { key: 1, display: "SO"},
    { key: 2, display: "STO"}
  ];

  public modeFilter = false;
  public listResultFilter: any[] = [];
  inputWorkCode = '';
  inputLicense = '';
  inputOrderNumber = '';
  inputStartName = '';
  inputEndName = '';
  inputShipmentType = -1;

  //For tab ข้อมูลงาน
  workInfoWorkCode = '';
  workInfoStartDpName = '';
  workInfoEndDpName = '';
  workInfoDescription = '';
  workInfoShipmentType = '';
  workInfoOrderNumber = '';
  workInfoCustomerRef = '';

  workInfoShipmentStatus = '';
  workInfoStartTime = '';
  workInfoEndTime = '';
  workInfoEstimateTime = '';
  workInfoDelayTime = '';

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(private gpsService: GpsServiceService) { 
    this.clearArrayOnTmsRealtime();  
    this.clearArrayOnTmsRealtimeRender();
  }

  clearArrayOnTmsRealtime(){
    //Clear data on Map
    while (this.arrayOnTmsRealtime.length > 0) {
      this.arrayOnTmsRealtime.pop();
    } // Fastest
  }
  clearArrayOnTmsRealtimeRender(){
    while (this.arrayOnTmsRealtimeRender.length > 0) {
      this.arrayOnTmsRealtimeRender.pop();
    } // Fastest
  }
  ngOnInit() {
  
    // const parser = new DOMParser();
    // // this is an SVG string of a house icon, but feel free to use whatever SVG icon you'd like
    // const svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5733" stroke="#FFFFFF" viewBox="0 0 24 24">
    //                   <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
    //                   </svg>`;
    // this.nzLocations.forEach((location) => {
    //   location.content = parser.parseFromString(svgString, "image/svg+xml").documentElement;
    // });
                  
    // we will be using Google's beach flag image as an example, but feel free to use any image you'd like
    // const beachFlag = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    // this.auLocations.forEach((location) => {
    //   let imgTag = document.createElement("img");
    //   imgTag.src = beachFlag;
    //   location.content = imgTag;
    // });
    this.inputShipmentType = -1;
    this.onLoadData();
    this.onIntervalRender(); //close this for prepare post API calls
    
  } 

  onIntervalRender(){
      let iSetMilliseconds = 10000;
      setInterval(() => {
        console.log("render marker with time interval ",iSetMilliseconds, " ms");
        this.onLoadData();
      }, iSetMilliseconds);
  }
  onMarkerClick(marker: MapAdvancedMarker, license: string, workcode: string) {
      // this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, marker.advancedMarker.title);
      this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, workcode);
      this.loadWorkInfo(workcode);
  }

  async loadWorkInfo(workcode: string){
    let req = {
      tbname: 'tmswork',
      shipmentid: workcode
    };
    let resW = await this.gpsService.postData(req);
    // console.log('show work info', resW.data);
    if(resW.data && resW.data[0]['workcode'] == workcode){
      //render info
      this.workInfoWorkCode = resW.data[0]['workcode'];
      this.workInfoStartDpName = resW.data[0]['startdpname'];
      this.workInfoEndDpName = resW.data[0]['enddpname'];
      this.workInfoDescription = resW.data[0]['description'];
      this.workInfoShipmentType = resW.data[0]['shipmenttype'];
      this.workInfoOrderNumber = resW.data[0]['ordernumber'];
      this.workInfoCustomerRef = resW.data[0]['customerref'];
    
      this.workInfoShipmentStatus = resW.data[0]['shipstatusname'];
      this.workInfoStartTime = resW.data[0]['starttime'];
      this.workInfoEndTime = resW.data[0]['endtime'];
      this.workInfoEstimateTime = resW.data[0]['estimatetime'];
      this.workInfoDelayTime = resW.data[0]['delaytime'];
    }else{
      //render info
      this.workInfoWorkCode = '';
      this.workInfoStartDpName = '';
      this.workInfoEndDpName = '';
      this.workInfoDescription = '';
      this.workInfoShipmentType = '';
      this.workInfoOrderNumber = '';
      this.workInfoCustomerRef = '';
    
      this.workInfoShipmentStatus = '';
      this.workInfoStartTime = '';
      this.workInfoEndTime = '';
      this.workInfoEstimateTime = '';
      this.workInfoDelayTime = '';
    }

    
  
  }

  async onLoadData(){
    // this.post = await this.gpsService.getData();
    // console.log('show service',this.post);
    let req = {
      tbname: 'tmsworkdata',
      body: ''
    };
    let resTms = await this.gpsService.postData(req);
    // console.log('show res working list',resTms);
    if(resTms){
      this.arrayTms = resTms.data; //save into memory.
      let data: [] = resTms.data;
      this.listWorkCode = [];
      this.listLicense = [];
      this.listStartName = [];
      this.listEndName = [];

      data.forEach( e => {
        this.listWorkCode.push(e['workcode']);
        this.listStartName.push(e['startdpname']);
        this.listEndName.push(e['enddpname']);
        this.listLicense.push(e['licence']);
        
        // console.log('Show workcode:', e['workcode']);
        // console.log('Show carriercode:', e['carriercode']);
        // console.log('Show licence:', e['licence']);
        // console.log('Show startdpname:', e['startdpname']);
        // console.log('Show enddpname:', e['enddpname']);
        // console.log('Show statusname:', e['statusname']);
        // console.log('Show shipmenttype:', e['shipmenttype']);
        // console.log('Show description:', e['description']);
        // console.log('Show refercode:', e['refercode']);
      }); 
    }

    this.removerDuplicateList();

    req.tbname = 'realtime'; //List tms shipment that assign to each device or Truck license no of each time.  
    let resRealtime = await this.gpsService.postData(req); //Realtime all devices in system
    // console.log('show res gpsService',resRealtime);
    if(resRealtime){
      this.arrayRealTime = resRealtime.data; //save into memory.
      // let data: [] = resRealtime.data;
      // data.forEach( e => {
      //   console.log('Show license:', e['licence']);
      //   console.log('Show license:', e['deviceid']);
      //   console.log('Show license:', e['lat']);
      //   console.log('Show license:', e['lng']);
      //   console.log('Show license:', e['statusname']);
      // });
    }

    this.clearArrayOnTmsRealtime(); 
    this.arrayTms.forEach( row => {
      let Tmslicense = row['licence'];
      this.arrayRealTime.forEach( e => {
        if(e['licence'] === Tmslicense){
          let d = { lat: e['lat'] , 
                    lng: e['lng'] , 
                    workcode: row['workcode'] , 
                    startdpname: row['startdpname'] , 
                    enddpname: row['enddpname'] ,
                    license: row['licence'] ,
                    statusname: row['statusname'],
                    checkBox: true 
                  };
          this.arrayOnTmsRealtime.push(d);
          // console.log('Show row work that save:',row);
        }
      });
    });

    //Process insert images.
    const parser = new DOMParser();
    // credit https://iconscout.com/free-icon/truck-265    
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 56" id="truck"><path d="m3 28.3 13.1-7.5 47.9 24-14 7z" opacity=".3"></path><path fill="#2D3134" d="M5.3 25v3.8l2.5-1.3v-3.7z"></path><path d="M5.3 25v3.8l2.5-1.3v-3.7z" opacity=".39"></path><path fill="#2D3134" d="M46.2 42.9c-.7-.4-1.4-.4-1.9-.2l-1.4.7c-.6.2-.9.8-.9 1.6 0 1.5 1.3 3.4 2.8 4.2.8.4 1.5.4 2 .2 0 0 1.4-.7 1.5-.8.5-.3.7-.8.7-1.5 0-1.6-1.3-3.5-2.8-4.2z"></path><path d="M46.8 49.3c.2-.1 1.4-.7 1.5-.7.5-.3.7-.8.7-1.5 0-.6-.2-1.3-.5-1.9l-1.4.7c.3.6.5 1.3.5 1.9 0 .7-.3 1.3-.8 1.5z" opacity=".39"></path><path fill="#999" d="M46.9 47.4c0 1.2-.9 1.6-2.1 1s-2.1-2-2.1-3.2.9-1.6 2.1-1 2.1 2 2.1 3.2z"></path><path d="M45 48.4c-1.2-.6-2.1-2-2.1-3.2 0-.6.2-1 .6-1.2-.5.1-.8.6-.8 1.2 0 1.2.9 2.6 2.1 3.2.6.3 1.1.3 1.5.1-.4.2-.8.1-1.3-.1z" opacity=".15"></path><path fill="#2D3134" d="M45.8 46.7c0 .5-.4.7-.9.4-.5-.2-.9-.8-.9-1.3s.4-.7.9-.4c.6.2.9.8.9 1.3z"></path><path d="M45.8 46.7c0 .5-.4.7-.9.4-.5-.2-.9-.8-.9-1.3s.4-.7.9-.4c.6.2.9.8.9 1.3z" opacity=".39"></path><path fill="#2D3134" d="M45.7 46.8c0 .5-.4.7-.9.4-.5-.2-.9-.8-.9-1.3s.4-.7.9-.4c.5.2.9.8.9 1.3z"></path><path d="M47.6 47.8c0 1.5-1.3 2.2-2.8 1.4S42 46.5 42 45s1.3-2.2 2.8-1.4 2.8 2.6 2.8 4.2z" opacity=".06"></path><path fill="#2D3134" d="M9.7 24.6c-.7-.4-1.4-.4-1.9-.2l-1.4.7c-.5.2-.9.8-.9 1.6 0 1.5 1.3 3.4 2.8 4.2.8.4 1.5.4 2 .2 0 0 1.4-.7 1.5-.8.5-.3.7-.8.7-1.5 0-1.5-1.3-3.4-2.8-4.2z"></path><path d="M10.3 31.1c.2-.1 1.4-.7 1.5-.7.5-.3.7-.8.7-1.5 0-.6-.2-1.3-.5-1.9l-1.4.7c.3.6.5 1.3.5 1.9 0 .7-.3 1.2-.8 1.5z" opacity=".39"></path><path fill="#999" d="M10.4 29.2c0 1.2-.9 1.6-2.1 1s-2.1-2-2.1-3.2.9-1.6 2.1-1 2.1 2 2.1 3.2z"></path><path d="M8.5 30.1c-1.2-.6-2.1-2-2.1-3.2 0-.6.2-1 .6-1.2-.5.1-.8.6-.8 1.2 0 1.2.9 2.6 2.1 3.2.6.3 1.1.3 1.5.1-.4.2-.8.2-1.3-.1z" opacity=".15"></path><path fill="#2D3134" d="M9.4 28.5c0 .5-.4.7-.9.4-.5-.2-.9-.8-.9-1.3s.4-.7.9-.4c.5.2.9.8.9 1.3z"></path><path d="M9.4 28.5c0 .5-.4.7-.9.4-.5-.2-.9-.8-.9-1.3s.4-.7.9-.4c.5.2.9.8.9 1.3z" opacity=".39"></path><path fill="#2D3134" d="M9.2 28.5c0 .5-.4.7-.9.4s-.9-.8-.9-1.3.4-.7.9-.4.9.9.9 1.3z"></path><path d="M11.1 29.5c0 1.5-1.3 2.2-2.8 1.4-1.5-.8-2.8-2.7-2.8-4.2s1.3-2.2 2.8-1.4c1.5.8 2.8 2.7 2.8 4.2z" opacity=".06"></path><path fill="#06547A" d="M17 1 3 8v15.3l38 19L55 35V20z"></path><path fill="#2D3134" d="M3 22v2l38 19v-2zM55 34v2l-14 7v-2z"></path><path d="M3 8v16l38 19V27z" opacity=".06"></path><path d="M55 20v16l-14 7V27z" opacity=".39"></path><path fill="#E5E5E5" d="m62 28-6-3-14 7v11.3c0 .3.4.5.7.3 1.2-1 3.3-.3 4.8 1.5.9 1.1 1.3 2.3 1.3 3.3l1.2.6 14-7v-8l-2-6z"></path><path fill="#39C" d="m50.4 40.5-1.7-5c-.1-.2 0-.3.2-.4l12.5-6.2c.2-.1.4 0 .5.2l1.6 4.7c.1.2 0 .3-.2.4l-12.4 6.5c-.2.1-.5 0-.5-.2z"></path><path d="m52.7 33.2 8.6-4.3c.2-.1.4 0 .5.2l1.5 4.4-10.6-.3z" opacity=".15"></path><path fill="#2D3134" d="m63.4 33.8-.1-.3c0 .2 0 .3-.2.4l-12.4 6.5c-.2.1-.4 0-.5-.2l.1.3c.1.2.3.3.5.2l12.4-6.5c.2-.1.3-.2.2-.4z"></path><path fill="#FFF" d="m53.5 40 7-3.5v5.8l-7 3.5z"></path><path fill="#2D3134" d="m54 45 6-3v-4.7l-6 3z"></path><path fill="#2D3134" d="M64 42v-2l-14 7v2zM48 48l2 1v-2l-2-1z"></path><path fill="#FFF" d="M54 45v1l6-3v-1z"></path><path fill="#39C" d="m47.5 35.3-3.8-1.9c-.1-.1-.3 0-.3.2v3c0 .2.1.4.3.4l1.3.7c.1.1.2.1.3.2l1.3 1.6h.1l2.2 1.1c.1.1.3-.1.2-.2l-1.7-5c.2 0 .2-.1.1-.1z"></path><path d="m49.3 40.3-2-1h-.1l-1.3-1.6c-.1-.1-.2-.2-.3-.2l-1.3-.7c-.2-.1-.3-.2-.3-.4v-2.9l-.2-.1c-.1-.1-.3 0-.3.2v3c0 .2.1.4.3.4l1.3.7c.1.1.2.1.3.2l1.3 1.6h.1l2.2 1.1c.2.1.3 0 .3-.3z" opacity=".15"></path><path fill="#FC0" d="M50 45v2l-.5-.2v-2z"></path><path fill="#E5E5E5" d="M54 41v.3l6-3V38zM54 42v.3l6-3V39zM54 43v.3l6-3V40zM54 44v.3l6-3V41z"></path><path fill="#2D3134" d="M43.5 38.3v.5l1 .5v-.5z" opacity=".5"></path><path fill="#FFF" d="m44.5 39.5-1-.5v-.2l1 .5z" opacity=".5"></path><path fill="#2D3134" d="M57.5 33.9c-.1-.1-.2-.1-.3 0l-3.8 4.3c-.1.1-.1.2 0 .3s.2.1.3 0l1-1.2v1h.3V37l2.5-2.9c.1 0 .1-.2 0-.2zM61.1 31.9c-.1-.1-.2-.1-.3 0L57 36.2c-.1.1-.1.2 0 .3.1.1.2.1.3 0l.9-1v1.1h.3v-1.4l2.6-3c.1-.1.1-.2 0-.3z"></path><path fill="#FFF" d="m62 41 2-1v-2l-1 .5c-.6.3-1 .9-1 1.6v.9z"></path><ellipse cx="62.7" cy="39.5" fill="#2D3134" opacity=".3" rx=".8" ry=".5" transform="rotate(129.144 62.714 39.544)"></ellipse><ellipse cx="63.2" cy="39.5" fill="#2D3134" opacity=".3" rx=".8" ry=".5" transform="rotate(129.144 63.215 39.544)"></ellipse><path fill="#FFF" d="m62 41 2-1v-2z" opacity=".3"></path><path fill="#FFF" d="m50 47 2-1v-.9c0-.5-.5-.8-1-.6l-1 .5v2z"></path><ellipse cx="51.2" cy="45.5" fill="#2D3134" opacity=".3" rx=".8" ry=".5" transform="rotate(129.144 51.215 45.544)"></ellipse><ellipse cx="50.7" cy="45.5" fill="#2D3134" opacity=".3" rx=".8" ry=".5" transform="rotate(129.144 50.715 45.544)"></ellipse><path fill="#FFF" d="m50 47 2-1-2-1z" opacity=".3"></path><path d="m48 35-6-3v11.3c0 .3.4.5.7.3 1.2-1 3.3-.3 4.8 1.5.3.3.5.6.6 1L48 46v2l2 1v-8l-2-6z" opacity=".06"></path><path d="m62 28-14 7 2 6v8l14-7v-8z" opacity=".39"></path></svg>`;
    this.arrayOnTmsRealtime.forEach((d) => {
      d.content = parser.parseFromString(svgString, "image/svg+xml").documentElement;
    });

    if(this.modeFilter === false){
      this.arrayOnTmsRealtimeRender = [...this.arrayOnTmsRealtime];
    }else{
      this.arrayOnTmsRealtime.forEach((e) => {
        this.listResultFilter.map( row => {
          if(e.license === row.license && e.workcode === row.workcode){
            row.lat = e.lat;
            row.lng = e.lng;
            row.statusname = e.statusname;
          }
        });
      });

      this.onClickConfirmFilter();
    }
    // console.log('Show arrayOnTmsRealtime:',this.arrayOnTmsRealtime);
  }

  removerDuplicateList(){
    // console.log('show before license',this.listLicense);
    this.listLicense = [...new Set(this.listLicense)];
    this.listStartName = [...new Set(this.listStartName)];
    this.listEndName = [...new Set(this.listEndName)];
  }

  onClickFilter(){
    // console.log('show input text', this.inputWorkCode);
    console.log('show input text', this.inputLicense);
    console.log('show input text', this.inputOrderNumber);
    // console.log('show input text', this.inputStartName);
    // console.log('show input text', this.inputEndName);
    console.log('show input text', this.inputShipmentType);
    
    // this.listResultFilter = this.arrayOnTmsRealtime.filter( e => e.workcode === this.inputWorkCode);
    this.listResultFilter = [...this.arrayOnTmsRealtime];
  }

  onCheckListResultFilter(e:any){
    // console.log('show e', e);
    this.listResultFilter.map( row => {
      if(e.license === row.license && e.workcode === row.workcode){
        row.checkBox = !e.checkBox;
      }
    });
  }

  onClickConfirmFilter(){
    this.modeFilter = true;

    this.clearArrayOnTmsRealtimeRender();
    
    this.arrayOnTmsRealtimeRender = this.listResultFilter.filter( row => row.checkBox === true);
    console.log('Show arrayOnTmsRealtimeRender:',this.arrayOnTmsRealtimeRender);
  }
}
