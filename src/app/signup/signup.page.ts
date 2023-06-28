import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../home/localstorage.service';
import { ServiceNameService } from '../service-name.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userData: any = [];
  SignForm: FormGroup;
  indexdata: any;
  userinfo: any;
  save_user: any = [];
  constructor(
    private storage: LocalService,
    private service: ServiceNameService,
    private route: Router,
    private router: ActivatedRoute
  ) {


    this.userinfo = this.route.getCurrentNavigation()?.extras?.state;
    console.log('pro:', this.userinfo);

    this.SignForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      Mobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      Gender: new FormControl(""),
      skills: new FormControl("")

    });
  }

  ngOnInit() {
    this.indexdata = this.router.snapshot.paramMap.get('id');
    console.log(this.indexdata);
    if (this.userinfo != null) {
      this.SignForm.controls['firstName'].setValue(this.userinfo.firstName);
      this.SignForm.controls['lastName'].setValue(this.userinfo.lastName);
      this.SignForm.controls['address'].setValue(this.userinfo.address);
      this.SignForm.controls['Mobile'].setValue(this.userinfo.Mobile);
      this.SignForm.controls['email'].setValue(this.userinfo.email);
      this.SignForm.controls['password'].setValue(this.userinfo.password);
      this.SignForm.controls['Gender'].setValue(this.userinfo.Gender);
      this.SignForm.controls['skills'].setValue(this.userinfo.skills);
    }
  }

  OnSubmit(value: any) {
    console.log(value);
    this.save_user = JSON.parse(this.storage.getData('addUser') as string);
    console.log('data:', this.save_user);
    if (this.save_user != null) {
      let index = this.save_user.findIndex((element: any) => element.email == value.email);
      console.log(index);
      if (index > -1) {
        this.save_user[index] = value;
      } else {
        this.save_user.push(value);     
      }
      this.storage.saveData('addUser', JSON.stringify(this.save_user));
      this.SignForm.reset();
      this.service.presentAlert("Registered successfully.");
      this.route.navigate(['/']);
    } else {
      this.userData.push(value);
      this.storage.saveData('addUser', JSON.stringify(this.userData));
      this.SignForm.reset();
      this.service.presentAlert("Registered successfully.");
      this.route.navigate(['/']);
    }
  }

}
