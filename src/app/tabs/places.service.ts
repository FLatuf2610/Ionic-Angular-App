import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, map, take,concat, filter, tap, delay, switchMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  
  private places: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>(
    [
      /*new Place('p1','Manhattan Mansion','In the heart of New York City','https://secretnyc.co/wp-content/uploads/2021/05/182515642_227247012567070_6620158039323138677_n-1.jpg',149.99, new Date('2023-09-21'),new Date('2024-08-01'),'abc'),
      new Place('p2', 'The Foggy Place','Not your average city trip','data:image/jpeg;base64,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',99.99, new Date('2023-09-21'),new Date('2024-08-01'),'def'),
      new Place('p3',"L'Amour Toujours",'A romantic place in Paris!','https://afar.brightspotcdn.com/dims4/default/e035714/2147483647/strip/true/crop/3580x1790+0+328/resize/1440x720!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.amazonaws.com%2Fbrightspot%2Fe5%2Fd4%2Fb1933d41c93d4e68de651a07299c%2Foriginal-f9557fbf5f4a17ceb18c25f5491acfc0.jpg',189.99, new Date('2023-09-21'),new Date('2024-08-01'),'abc')
    */]
  ) 
  
  fetchPlaces(){
    return this._http.get<{[key:string]:any}>('https://ionic-angular-course-e2e1c-default-rtdb.firebaseio.com/offered-places.json').pipe(map(
      resData => {
        const places = [];
        for (const key in resData) {
          places.push(new Place(key,resData[key].title,resData[key].description,resData[key].imageUrl,resData[key].price,resData[key].availableFrom,resData[key].availableTo,resData[key].userId,resData[key].address))
        }
        return places;
      } 
    ),tap(places => {
      this.places.next(places)
    }))
  }

  getPlaces(){
    return this.places.asObservable()
  }
  getPlace(id:string){
    return this._http.get<any>(`https://ionic-angular-course-e2e1c-default-rtdb.firebaseio.com/offered-places/${id}.json`).pipe(
     map(
        resData => {
          const selectedPlace:Place = new Place(id,resData.title,resData.description,resData.imageUrl,resData.price,new Date(resData.availableFrom),new Date(resData.availableTo),resData.userId,resData.address)
          console.log(selectedPlace)
          return selectedPlace;
        }
     )
    )
    /*return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)}
    }))*/
    //return {...this.places.find(place=> place.id === id)};
  }
  addPlace(title:string,description:string,price:number,dateFrom:Date,dateTo:Date,address:string){
    let generatedId :string = '';
    const newPlace:Place = new Place(generatedId,title,description,'https://secretnyc.co/wp-content/uploads/2021/05/182515642_227247012567070_6620158039323138677_n-1.jpg',price,dateFrom,dateTo,this._AuthService.getUserId(),address);
    return this._http.post<{name:string}>('https://ionic-angular-course-e2e1c-default-rtdb.firebaseio.com/offered-places.json',{...newPlace,id:null})
    .pipe(
      switchMap(resData => {
        console.log(resData)
        generatedId = resData.name
        return this.getPlaces()
      }),
      take(1),
      tap(
        places =>{ 
          newPlace.id = generatedId
          this.places.next(places.concat(newPlace))
        }
      )
    )
    /*return this.getPlaces().pipe(take(1), delay(1500) ,tap(
    (places) => this.places.next(places.concat(newPlace))
   ));*/
  }
  
  editPlace(id:string,title:string,description:string,price:number,dateFrom:Date,dateTo:Date){
    let updatedPlaces:Place[]|undefined;
    return this.places.pipe(
      take(1),switchMap(
        places => {
        if (!places || places.length <= 0){
          return this.fetchPlaces();
        } 
        else {
          return of(places)
        }
        }
      ),
      switchMap(
        places => {
          const placeIndex:number = places.findIndex(place => place.id === id);
          const placesCopy :Place[] = [...places] 
          var placetoUpdate:Place = {...placesCopy[placeIndex]}
          const newPlace:Place = new Place(id,title,description,placetoUpdate.imageUrl,price,dateFrom,dateTo,placetoUpdate.userId,placetoUpdate.placeAddress)
          placesCopy[placeIndex] = newPlace;
          updatedPlaces = placesCopy;
          return this._http.put(`https://ionic-angular-course-e2e1c-default-rtdb.firebaseio.com/offered-places/${id}.json`,{...newPlace,id:null})
        }
      ),
      tap(
        () => {
          this.places.next(updatedPlaces)
        }
      )
    )

   
    /*return this.getPlaces().pipe(take(1),delay(1500),tap(places => {
      const placeIndex:number = places.findIndex(place => place.id === id);
      const placesCopy :Place[] = [...places] 
      var placetoUpdate:Place = {...placesCopy[placeIndex]}
      const newPlace:Place = new Place(id,title,description,placetoUpdate.imageUrl,price,dateFrom,dateTo,placetoUpdate.userId)
      placesCopy[placeIndex] = newPlace;
      this.places.next(placesCopy)
      
    }))*/
  }
  constructor(private _AuthService:AuthService,private _http:HttpClient) {}
}
