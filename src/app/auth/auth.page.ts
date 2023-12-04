import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogIn :Boolean = true;
  isLoading :Boolean = false;
  logIn() {
    this.isLoading = true;
    this._AuthService.logIn();
    this.loadingCtrl.create({message:'Logging in '})
    .then(loadingEl => {
      loadingEl.present()
      setTimeout(()=>{
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('');
      } ,1500)
    })


  }

  switchAuthMode() :void {
    this.isLogIn = !this.isLogIn;
  }

  onSubmit(f:NgForm){
    if (!f.valid) {
      return
    }
    const email :string = f.value.Email;
    const password :string = f.value.Password;
    console.log(email,password);

    if (this.isLogIn) {
      //http request to log in
    }
    else {
      //http to sign up
    }
    
  }
  
  constructor(private _AuthService:AuthService, private router:Router, private loadingCtrl:LoadingController) { }

  ngOnInit() {
  }

}
