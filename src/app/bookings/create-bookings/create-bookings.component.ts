import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/tabs/place.model';
import { BookingsService } from '../bookings.service';



@Component({
  selector: 'app-create-bookings',
  templateUrl: './create-bookings.component.html',
  styleUrls: ['./create-bookings.component.scss'],
})
export class CreateBookingsComponent  implements OnInit {
  today = new Date().toJSON().split('T')[0];

  @Input () place:Place;
  @Input () selectedMode: 'select' | 'random';
  form:FormGroup;
  startDate:string;
  endDate:string;
  

  onBook(){
    this.ModalCtrl.dismiss({bookingData:{
      firstName:this.form.value.firstName,
      lastName:this.form.value.lastName,
      guestsNumber:this.form.value.guestsNumber,
      dateFrom:this.form.value.dateFrom,
      dateTo:this.form.value.dateTo
    }},'confirm')
    console.log(this.form)
  }

  onCancel(){
    this.ModalCtrl.dismiss(null,'cancel');   
  }

  datesValid(){
    return this.endDate > this.startDate;
  }
  constructor(private ModalCtrl:ModalController) {
  }

  ngOnInit() {
    console.log(this.place)
    const availableFrom:Date = new Date(this.place.availableFrom);
    const availableTo:Date = new Date(this.place.availableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(availableFrom.getTime() + Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())
      ).toISOString()

      this.endDate = new Date( new Date(this.startDate).getTime() + Math.random() * (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())
      ).toISOString()
    }
    this.form = new FormGroup({
      firstName: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required]
      }),
      lastName: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required]
      }),
      guestsNumber: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required,Validators.min(1)]
      }),
      dateFrom: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required]
      }),
      dateTo: new FormControl(null,{
        updateOn:'change',
        validators:[Validators.required]
      })
    })
  }

}
