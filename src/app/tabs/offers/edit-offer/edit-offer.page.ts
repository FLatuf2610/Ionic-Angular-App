import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  id:string;
  place:Place;
  isLoading:Boolean = false;
  public form:FormGroup;
  today = new Date().toJSON().split('T')[0];
  placeSubscription:Subscription;

  constructor(private route:ActivatedRoute, private _PlacesService:PlacesService,private loadingCtrl:LoadingController,private ionicRouter:NavController,private alertCtrl:AlertController,private router:Router) {
   }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.isLoading = true
    this.route.params.subscribe(params => this.id = params['placeId'])
    this._PlacesService.getPlace(this.id).subscribe(place => {
      this.place = place
      this.form = new FormGroup({
        title: new FormControl(this.place.title,{
          updateOn:'change',
          validators:[Validators.required]
        }),
        description: new FormControl(this.place.description,{
          updateOn:'change',
          validators:[Validators.required]
        }),
        price: new FormControl(this.place.price,{
          updateOn:'change',
          validators:[Validators.required,Validators.min(1)]
        }),
        dateFrom: new FormControl(this.today,{
          updateOn:'change',
          validators:[Validators.required]
        }),
        dateTo: new FormControl(this.today,{
          updateOn:'change',
          validators:[Validators.required]
        })
      })
      this.isLoading = false
    })
    error => {
      this.alertCtrl.create({
        header:'An error ocured',
        message:'Something went wrong, please try again later',
        buttons:[{text:'OK', handler: () => {
          this.router.navigateByUrl('/tabs/offers')
        }}]
      }).then(alert => alert.present())
    };
  }

  ngOnDestroy(): void {
    if (this.placeSubscription) {
      this.placeSubscription.unsubscribe();
    }
  }

  onEditOffer(){
    console.log(this.form)
    this.loadingCtrl.create({
      message:'Updating your place...'
    }).then(loadingEl => {
      loadingEl.present();
      this._PlacesService.editPlace(this.id,this.form.value.title,this.form.value.description,this.form.value.price,this.form.value.dateFrom,this.form.value.dateTo).subscribe(() => {
        this.loadingCtrl.dismiss();
        this.form.reset();
        this.ionicRouter.navigateBack('/tabs/offers');
      })
    })
    
  }
}
