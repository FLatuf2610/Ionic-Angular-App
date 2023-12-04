import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  public bookings :Booking[] = [];
  bookingsSubscription :Subscription;
  isBookable :Boolean = true;
  isLoading:Boolean = false;

  onCancelBooking(bookingId :string, slidingItem :IonItemSliding){
    slidingItem.close();
    console.log(bookingId)
    this.loadingCtrl.create({
      message:'Canceling your Booking...'
    }).then(loadingEl => {
      loadingEl.present();
      this._BookingsService.cancelBooking(bookingId).subscribe( () => {
        loadingEl.dismiss();
        
      })
    })
    
  }
  
  constructor(private _BookingsService :BookingsService, private loadingCtrl:LoadingController,private navCtrl:NavController,) { }

  ionViewWillEnter(){
    this.isLoading = true;
    this._BookingsService.fetchBookings().subscribe(
      () => {
        this.isLoading = false;
        console.log(this.bookings)
      }
    )
      
  }

  ngOnInit() {
    this.bookingsSubscription = this._BookingsService.bookings.subscribe(
      bookings => {
        this.bookings = bookings,
        this.bookingsSubscription 
      }
    )
  }

  ngOnDestroy(): void {
    this.bookingsSubscription.unsubscribe()
  }
}
