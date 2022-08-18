import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(120),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
    confirm_password: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
  });

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;


    const { email, password } = this.registerForm.value;

    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email as string,
        password as string
      );
      await this.db.collection('users').add({
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        age: this.registerForm.value.age,
        phoneNumber: this.registerForm.value.phoneNumber,
      })

    } catch (error) {
      console.error(error);

      this.alertMsg = 'An unexpected error has occurred. Please try again later.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Success! Your account has been created!';
    this.alertColor = 'green';
  }
}
