import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  id:string = ''
  place:Place;
  placeSubscription:Subscription;
  constructor(private route:ActivatedRoute, private _PlacesService:PlacesService) { }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.route.params
    .subscribe({
      next: params => {
        this.id = params['placeId']
      }
    })
    this._PlacesService.getPlace(this.id).subscribe(place => this.place = place);
    console.log(this.place)
  }

  ngOnDestroy(): void {
  if(this.placeSubscription){
    this.placeSubscription.unsubscribe();
  }    
  }

}
