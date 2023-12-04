import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit{
  startDate:Date;
  endDate:Date;
  today = new Date().toJSON().split('T')[0];
  placeAdress:string;
  form:FormGroup;
  constructor(private AlertCtrl:AlertController, private _PlacesService:PlacesService,private router:Router,private loadingCtrl:LoadingController, private modalCtrl:ModalController, private http:HttpClient) { 
    
    this.form = new FormGroup({
      title: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required]
      }),
      description: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required, Validators.maxLength(150)]
      }),
      price: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required]
      }),
      dateTo: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required]
      }),
      address: new FormControl(null,
        {
          updateOn:'change',
          validators:[Validators.required]
        })
    })
  }

  validDate(){
    return this.endDate > this.startDate;
  }

  ngOnInit() {
    console.log(this.today)
  }



  onCreateOffer(){
    console.log(this.form)
    this.loadingCtrl.create({
    message:'Adding your offer to our servers...'
   }).then(lodaingEl => {
    lodaingEl.present();
    this._PlacesService.addPlace(this.form.value.title, this.form.value.description, this.form.value.price,this.form.value.dateFrom,this.form.value.dateTo,this.form.value.address).subscribe( () => {
      this.form.reset()
      this.router.navigateByUrl('/tabs/offers')
      lodaingEl.dismiss()
    })
   });
   
  }

  async onPickLocation(){
    const modal = await this.modalCtrl.create({
      component:LocationModalComponent
    });
    modal.present();
    const modalData = await modal.onWillDismiss();
    const coordinate = modalData.data.coordinate
    this.getAddress(coordinate);
  }

  getAddress(coordinate:{lat:number,lng:number}){
    this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.lat},${coordinate.lng}&key=${environment.googleMapsAPIKey}`).subscribe(resData => {
      this.placeAdress = resData.results[0].formatted_address
      console.log(this.placeAdress);
      this.form.patchValue({adress:this.placeAdress})
      console.log(this.form.value.address)
    })
  }


}
