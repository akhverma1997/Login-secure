import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  movies: any;

  constructor(public decryptService : EncryptionService, public router : Router, private formBuilder : FormBuilder) {
    this.loginForm = formBuilder.group({
      emailText : ['',[Validators.required,Validators.email,Validators.maxLength(30)]],
      passwordText : ['',[Validators.required,Validators.pattern('[0-9a-zA-Z]{1,20}')]]
    });
   }

  ngOnInit(): void {
  }
  
  
  dosubmit() {
    let result = document.getElementById('login-result');
    const data = localStorage.getItem('form-data')!;
    if (data !=null) {
      console.log(this.decryptService.decryptData(data));
      this.decryptService.decryptData(data).forEach((element: any) => {
        if(element['emailText'] === this.loginForm.value.emailText && 
          element['passwordText'] === this.loginForm.value.passwordText.toString()) {
            result!.innerHTML = "Login Successfull....";
            result!.setAttribute("style","color : blue;");
        } else {
          result!.innerHTML = "User doesn't exist. Try Again!"
          result!.setAttribute("style","color : red;");
        }
      });
    }
  }
}
