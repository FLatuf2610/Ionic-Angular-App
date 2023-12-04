import { Component, OnInit,ViewChild,ElementRef, OnDestroy } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent  implements OnInit, OnDestroy {

  @ViewChild('map')mapRef: ElementRef;
  map:GoogleMap;
  lat:number;
  long:number;
  currentLocationMarker:Marker;
  
  constructor(private modalCtrl:ModalController, private actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {
    this.setCurrentPosition();
  }

  ngOnDestroy(): void {
    this.map.removeAllMapListeners();
  }

  async setCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition()
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude;
    console.log(this.lat,this.long);
    console.log(coordinates);
  }

  onCancel(){
    this.modalCtrl.dismiss();
  }

  ionViewDidEnter(){
    this.createMap()

  }
  async createMap(){
    //await this.setCurrentPosition();
    this.map = await GoogleMap.create({
      id: 'map-new-offer',
      apiKey: 'AIzaSyB15wOLV2ljzGSrLxNlznx2evBOs0qo8bs',
      config: {
        center: {
          lat: this.lat,
          lng: this.long
        },
        zoom: 14
      },
      element: this.mapRef.nativeElement,
      forceCreate:true
    })
    let markers:Marker[] = []
    let markerid:string = undefined;
    this.map.setOnMapClickListener( (event) => {
      let coordinates = {lat:event.latitude, lng:event.longitude}
      let marker = {coordinate:coordinates}

      if (markers.length === 0) {
        this.map.addMarker(marker).then(markerId => {
          markerid = markerId
          markers.push(marker);
          console.log(markers)
        })
      }
      else {
        this.map.removeMarker(markerid);
        markers.pop();
        this.map.addMarker(marker).then(markerId =>{
          markers.push(marker)
          markerid = markerId
        })
        console.log(markers);
      }
      this.actionSheetCtrl.create({
        buttons:[
          {
            text:'Confirm Location',
            role:'confirm',
            handler : () => {
              this.modalCtrl.dismiss(marker);
            }
          },
          {
            text:'Cancel',
            role:'cancel'
          }
        ]
      }).then(actionSheet => actionSheet.present())
    });

  }

}
