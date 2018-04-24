import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];

  public reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder){}  

  ngOnInit(){
    //using formBuilder
    /*
    this.reactiveForm = this.formBuilder.group({
      'userData' : this.formBuilder.group({
        name: '',
        email: ''
      }),
      'gender': ''
    });
    */
    this.reactiveForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl('Vladimir'),
        'password': new FormControl('pileTatino')
      }),
      'gender': new FormControl('male')
    });
    console.log(this.reactiveForm);
  }
}
