import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { NewOfferPageRoutingModule } from './new-offer-routing.module';

import { NewOfferPage } from './new-offer.page';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NewOfferPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewOfferPage,LocationModalComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NewOfferPageModule {}
