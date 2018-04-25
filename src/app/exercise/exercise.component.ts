import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  reactiveForm:FormGroup;  

  constructor() { }

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      projectName: new FormControl('test', Validators.required, this.asyncProjectNameValidator.bind(this)),
      mail: new FormControl('test', [Validators.required, Validators.email]),
      status: new FormControl('critical')
    });
  }

  syncProjectNameValidator(formControl:FormControl): { [s:string] : boolean } {
    if(formControl.value == 'Test'){
      return {
        isTest : true
      }
    }
    else
    {
      return null;
    }    
  }

  asyncProjectNameValidator(formControl:FormControl) : Observable<{ [s:string] : boolean }> | Promise<{ [s:string] : boolean }>{
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(formControl.value== 'Test'){
          resolve({
            isTest : true
          });
        }
        else{
          resolve(null);
        }
      },2000)
    })
  }

  formSubmitted()
  {
    console.log(this.reactiveForm);
  }

}
