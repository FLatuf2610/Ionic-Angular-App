import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject, delay, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private _bookings:BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([
    
  ]);

  
  public get bookings() {
    return this._bookings.asObservable();
  }

  fetchBookings(){
    return this.http.get<{key:string}>(`https://ionic-angular-course-e2e1c-default-rtdb.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this._AuthService.getUserId()}"`)
    .pipe(map(
      bookings => {
        const bookingsArray:Booking[] = []
        for (const key in bookings) {
          bookingsArray.push(new Booking(key,bookings[key].placeId,bookings[key].userId,bookings[key].placeTitle,bookings[key].placeImage,bookings[key].firstName,bookings[key].lastName,bookings[key].guestNumber,bookings[key].bookedFrom,bookings[key].bookedTo))
        }
        return bookingsArray
      }
    ),
    tap(
      bookings => {
        this._bookings.next(bookings)
      }
    ))
  }

  addBooking(placeId:string,placeTitle:string,placeImg:string,firstName:string,lastName:string,guestsNumber:number,dateFrom:Date,dateTo:Date){
    let generatedId:string | undefined;
    const newBooking :Booking = new Booking(Math.random().toString(),placeId,this._AuthService.getUserId(),placeTitle,placeImg,firstName,lastName,guestsNumber,dateFrom,dateTo)
    return this.http.post<{name:string}>('https://ionic-angular-course-e2e1c-default-rtdb.firebaseio.com/bookings.json',{...newBooking, id:null})
    .pipe(switchMap(
      resData => {
        generatedId = resData.name
        return this.bookings
      }
    ),
    take(1),
    tap(
      bookings => {
        newBooking.id = generatedId
        this._bookings.next(bookings.concat(newBooking))
      }
    ))
    
   /*return this.bookings.pipe(take(1),delay(1500),tap(
    bookings => this._bookings.next(bookings.concat(newBooking))
   ))*/
  }

  cancelBooking(bookingId:string){
    return this.http.delete(`https://ionic-angular-course-e2e1c-default-rtdb.firebaseio.com/bookings/${bookingId}.json`)
    .pipe(
      switchMap(()=>{
        return this.bookings
      }),
      take(1),
      tap(
        bookings => {
          this._bookings.next(
            bookings.filter(booking => {
              booking.id != bookingId
            })
          )
        }
      )
    )
    
    return this.bookings.pipe(take(1),delay(1500),tap(
      bookings => this._bookings.next(bookings.filter(booking => booking.id !== bookingId))
    ))
  }
  
  constructor(private _AuthService:AuthService,private http:HttpClient) { }
}
