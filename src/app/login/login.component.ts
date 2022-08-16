import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private user:UserserviceService ,private router:Router) { }


  form!: FormGroup;
  ngOnInit(): void {

    this.form = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

status:any;
  login(){

    debugger
if(this.form.invalid){
  alert('Please enter Credentials')
}

this.user.login(this.form.value).subscribe((res:any)=>{

  this.status = res
  console.log('lolll',this.status)
  if(this.status.status === 1){
    alert(this.status.message)
  localStorage.setItem('token',res.token)
  this.router.navigate(['dash'])
}
})
  }


  get email(){
    return this.form.get('email')
  }

  get password(){
    return this.form.get('password')
  }

}