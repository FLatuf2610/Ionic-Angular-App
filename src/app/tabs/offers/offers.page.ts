import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements  OnInit, OnDestroy {
  offers:Place[] = [];
  isLoading :Boolean = false;
  private placesSubscription :Subscription;
  constructor(private _PlacesService:PlacesService,private router:Router) { }

  ionViewWillEnter() {
    this.isLoading = true
    this._PlacesService.fetchPlaces().subscribe(
      () => this.isLoading = false
    )
  }

  ngOnInit() {
    this.placesSubscription = this._PlacesService.getPlaces().subscribe({
      next: places => {this.offers = places}
    });
  }

  ngOnDestroy(): void {
    if (this.placesSubscription){
      this.placesSubscription.unsubscribe();
    }
    
  }

  onEdit(id:string,slidingOffer:IonItemSliding){
    slidingOffer.close();
    this.router.navigate(['tabs','offers','edit-offer',id])
  }
}
