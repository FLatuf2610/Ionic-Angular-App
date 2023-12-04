import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingsComponent } from 'src/app/bookings/create-bookings/create-bookings.component';
import { Subscription, take } from 'rxjs';
import { BookingsService } from 'src/app/bookings/bookings.service';
import { AuthService } from 'src/app/auth/auth.service';




@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  id:string = '';
  private placeSubscription: Subscription;
  public place:Place;
  isBookable:Boolean = true;
  isLoading:Boolean = false;
  public buttons :any = [
    {
      text:'Select Date',
      handler: () => {
        this.onBookPlace('select')
      }
    },
    {
      text:'Random Date',
      handler: () => {
        this.onBookPlace('random')
      }
    },
    {
      text:'Cancel',
      role:'cancel'
    }
  ]
  async onBookPlace(mode :'select' | 'random'){
    console.log(mode)
    const modal = await this.ModalCtrl.create({
      component:CreateBookingsComponent, componentProps:{place:this.place, selectedMode:mode}
    });
    modal.present();
    const {data,role} = await modal.onWillDismiss();
    if (role === 'confirm'){
      const modalData = data.bookingData;
      console.log(modalData)
      this.loadingCtrl.create({
        message:'Creating Your Booking...'
      }).then(loadingEl => {
        loadingEl.present();
        this._BookingsService.addBooking(this.id,this.place.title,this.place.imageUrl,modalData.firstName,modalData.lastName,+modalData.guestsNumber,modalData.dateFrom,modalData.dateTo).subscribe(()=>{
        loadingEl.dismiss();
        this.NavCtrl.navigateBack('bookings')
        })

      })
    }
  }
  
  constructor(private router:Router, private NavCtrl:NavController, private route:ActivatedRoute, private _PlacesService:PlacesService, private ModalCtrl:ModalController, private ActionSheetCtrl:ActionSheetController,private _BookingsService:BookingsService,private loadingCtrl:LoadingController,private AuthService:AuthService,private AlertCtrl:AlertController) { }

  ionViewWillEnter() {    
  }

  ngOnInit() {
    this.isLoading = true;
    this.id = this.route.snapshot.params['placeId']
    this.placeSubscription = this._PlacesService.getPlace(this.id).subscribe(place => {
      this.place = place;
      this.isBookable = this.place.userId !== this.AuthService.getUserId();
      this.isLoading = false;
    },
    error => {
      this.presentErrorAlert();
    }
    );
    
    
    
  }

  async presentErrorAlert(){
    const alert = await this.AlertCtrl.create({
      header:'An error ocurred',
      message:'Could not load the place',
      buttons:[{text:'OK',handler: () => this.NavCtrl.navigateBack('')}]
    })
    await alert.present();
  }
  ngOnDestroy(): void {
    if (this.placeSubscription){
      this.placeSubscription.unsubscribe();
    }
  }
}
