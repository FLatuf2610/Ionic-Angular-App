import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  filter = 'all'
  places:Place[] = [];
  placesShown:Place[] = [];
  placesSubscription:Subscription;
  isLoading:Boolean = false;
  constructor(private _PlacesService:PlacesService, private _AuthService:AuthService) { }

  onFilterUpdate(event:CustomEvent){
    console.log(event.detail.value);
    this.filter = event.detail.value
    console.log(this.filter)
    this.changeTab(this.filter)
  }

  changeTab(selectedSegment:string){
    if (selectedSegment === 'bookablePlaces') {
      this.placesShown = this.places.filter(place => place.userId != this._AuthService.getUserId())
    }
    else{
      this.placesShown = this.places;
    }
  }

  ionViewWillEnter(){
    
    this.isLoading = true
    this._PlacesService.fetchPlaces().subscribe({
      next: () => {
        this.isLoading = false
      }
    })
  }

  ngOnInit() {
   this.placesSubscription = this._PlacesService.getPlaces().subscribe({
      next: places => {
        this.places = places
        this.placesShown = places
        this.changeTab(this.filter)
      }
    });
  }

  ngOnDestroy(): void {
    if (this.placesSubscription){
      this.placesSubscription.unsubscribe()
    }
  }

}
