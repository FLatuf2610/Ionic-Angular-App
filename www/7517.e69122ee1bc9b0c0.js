"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7517],{7517:(M,d,r)=>{r.r(d),r.d(d,{AuthPageModule:()=>v});var h=r(6814),l=r(95),e=r(7027),c=r(3965),t=r(6689),p=r(5148);function m(o,a){1&o&&(t.TgZ(0,"p"),t._uU(1,"Enter a valid Email"),t.qZA())}function f(o,a){1&o&&(t.TgZ(0,"p"),t._uU(1,"Password should have at least 6 characters long"),t.qZA())}function A(o,a){if(1&o){const i=t.EpF();t.TgZ(0,"ion-row")(1,"ion-col",4)(2,"ion-button",10),t.NdJ("click",function(){t.CHM(i);const s=t.oxw();return t.KtG(s.switchAuthMode())}),t._uU(3),t.qZA(),t.TgZ(4,"ion-button",11),t.NdJ("click",function(){t.CHM(i);const s=t.oxw();return t.KtG(s.logIn())}),t._uU(5),t.qZA()()()}if(2&o){const i=t.oxw(),n=t.MAs(6);t.xp6(3),t.hij("Switch to ",i.isLogIn?"Sign Up":"Log In",""),t.xp6(1),t.Q6J("disabled",!n.valid),t.xp6(1),t.hij(" ",i.isLogIn?"Log In":"Sign Up"," ")}}const _=[{path:"",component:(()=>{var o;class a{logIn(){this.isLoading=!0,this._AuthService.logIn(),this.loadingCtrl.create({message:"Logging in "}).then(n=>{n.present(),setTimeout(()=>{this.isLoading=!1,n.dismiss(),this.router.navigateByUrl("")},1500)})}switchAuthMode(){this.isLogIn=!this.isLogIn}onSubmit(n){n.valid&&console.log(n.value.Email,n.value.Password)}constructor(n,s,u){this._AuthService=n,this.router=s,this.loadingCtrl=u,this.isLogIn=!0,this.isLoading=!1}ngOnInit(){}}return(o=a).\u0275fac=function(n){return new(n||o)(t.Y36(p.e),t.Y36(c.F0),t.Y36(e.HT))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-auth"]],decls:19,vars:4,consts:[["color","primary"],[1,"ion-padding"],[3,"ngSubmit"],["f","ngForm"],["sizeSm","6","offsetSm","3"],["ngModel","","name","Email","shape","round","label","E-Mail","label-placement","floating","fill","outline","type","email","required","","email",""],["EmailCtrl","ngModel"],[4,"ngIf"],["ngModel","","minlength","6","name","Password","shape","round","label","Password","type","password","labelPlacement","floating","fill","outline","required","","color","primary"],["PasswordCtrl","ngModel"],["fill","clear","color","primary","expand","block",3,"click"],["shape","round","expand","block","type","submit",3,"disabled","click"]],template:function(n,s){if(1&n){const u=t.EpF();t.TgZ(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),t._uU(3),t.qZA()()(),t.TgZ(4,"ion-content",1)(5,"form",2,3),t.NdJ("ngSubmit",function(){t.CHM(u);const w=t.MAs(6);return t.KtG(s.onSubmit(w))}),t.TgZ(7,"ion-grid")(8,"ion-row")(9,"ion-col",4),t._UZ(10,"ion-input",5,6),t.YNc(12,m,2,0,"p",7),t.qZA()(),t.TgZ(13,"ion-row")(14,"ion-col",4),t._UZ(15,"ion-input",8,9),t.YNc(17,f,2,0,"p",7),t.qZA()(),t.YNc(18,A,6,3,"ion-row",7),t.qZA()()()}if(2&n){const u=t.MAs(11),g=t.MAs(16);t.xp6(3),t.Oqu(s.isLogIn?"Log In":"Sign Up"),t.xp6(9),t.Q6J("ngIf",!u.valid&&u.touched),t.xp6(5),t.Q6J("ngIf",!g.valid&&g.touched),t.xp6(1),t.Q6J("ngIf",!s.isLoading)}},dependencies:[h.O5,l._Y,l.JJ,l.JL,l.Q7,l.wO,l.on,l.On,l.F,e.YG,e.wI,e.W2,e.jY,e.Gu,e.pK,e.Nd,e.wd,e.sr,e.j9]}),a})()}];let P=(()=>{var o;class a{}return(o=a).\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[c.Bz.forChild(_),c.Bz]}),a})(),v=(()=>{var o;class a{}return(o=a).\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[h.ez,l.u5,e.Pc,P]}),a})()}}]);