import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  forbiddenNames=['nikola', 'perica'];

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
        'username': new FormControl('Vladimir', [ Validators.required, this.nameValidator.bind(this) ]),
        'email': new FormControl('pileTatino', [], this.emailValidatiorObserverable.bind(this)),
      }),
      'gender': new FormControl('male')
    });
    //console.log(this.reactiveForm);
    /*const obs1=Observable.create((observer:Observer<{[s:string]:boolean}>)=>{
      setTimeout(()=>{
        if(this.forbiddenNames.indexOf("nikola")==0){      
          observer.next({isForbiddenName: true });
        }
        else
          observer.next(null);
      }, 5000);
    });           
    obs1.subscribe((val:any)=>{console.log(val);})*/

  }

  nameValidator(formControl: FormControl):{[s:string]:boolean}{    
    //console.log(this.forbiddenNames.indexOf(formControl.value));
    if(this.forbiddenNames.indexOf(formControl.value)==0){      
      return { isForbiddenName: true }
    }
    else
      return null;
  }

  emailValidatorPromise(formControl: FormControl) : Observable<{[s:string]:boolean}> | Promise<{[s:string]:boolean}>{  
    return new Promise<{[s:string]:boolean}>((resolve, reject)=>{
      console.log(this.forbiddenNames.indexOf(formControl.value));
      setTimeout(()=>{          
        if(this.forbiddenNames.indexOf(formControl.value)!=-1){            
          resolve( {isForbiddenName: true });        
        }
        else
        {        
          resolve(null);
        }
      }, 2000);
    });
  }

  emailValidatiorObserverable(formControl : FormControl) : Observable<{[s:string]:boolean}> | Promise<{[s:string]:boolean}>{
    return Observable.create((observer:Observer<{[s:string]:boolean}>)=>{
      setTimeout(()=>{
        if(this.forbiddenNames.indexOf(formControl.value)!=-1){      
          observer.next({isForbiddenName: true });
          observer.complete();  
        }
        else
          observer.next(null);          
          observer.complete();
      }, 1000);
    });   
  }

  onFormSubmitted()
  {    
    console.log(this.reactiveForm);  
  }
}
