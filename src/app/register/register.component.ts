import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm : FormGroup;
  movies: any;
  data : any = null;
  allFormData: any = [];

  constructor(public encryptService : EncryptionService, public router : Router, private formBuilder : FormBuilder) {
    this.registrationForm = formBuilder.group({
      personName : ['',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z\\s]*'),Validators.maxLength(30)]],
      emailText : ['',[Validators.required,Validators.email,Validators.maxLength(30)]],
      addressText : ['',[Validators.required,Validators.maxLength(50)]],
      phoneNumber : ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      passwordText : ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{1,20}')]],
      confirmPasswordText : ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{1,20}')]]
    },{
      validators:this.passwordMatchValidator
    });
   }

   passwordMatchValidator(f:FormGroup):{[s:string]:boolean} {
    return f.controls['passwordText'].value === f.controls['confirmPasswordText'].value ? {} : { 'mismatch': true }
  }

  ngOnInit(): void {
  }
  

  dosubmit() {
    let object;
    let result: HTMLElement | null;
    result = document.getElementById('registration-result');
    this.data = localStorage.getItem('form-data')!;
    if(this.data != null) {
      this.encryptService.decryptData(this.data).forEach((element: string) => {
        this.allFormData.push(element);
      });
    }
    this.allFormData.push(this.registrationForm.value);
    localStorage.setItem('form-data', this.encryptService.encryptData(this.allFormData));
    result!.innerHTML = "Registration Successfull....";
    result!.setAttribute("style","color : blue;");
  }

}
