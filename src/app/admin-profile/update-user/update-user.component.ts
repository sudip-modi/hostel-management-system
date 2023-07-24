import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserService } from 'src/app/update-user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  male = [
    'Balaji Hostel',
    'Ranichak Hostel',
    'P1 Hostel',
    'P2 Hostel',
    'P3 Hostel',
  ];
  female = [
    'BR Hostel',
    'Tamalika Ponda Seth Hall of Residence',
    'Matangini Hall of Residence',
  ];
  userSelectedHostelList = [];
  getUserSelection() {
    if (this.updateUserForm.value.selectedGender == 'male') {
      this.userSelectedHostelList = this.male;
    } else {
      this.userSelectedHostelList = this.female;
    }
  }

  constructor(
    private uus: UpdateUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  updateUserForm: FormGroup;

  ngOnInit(): void {
    // ID OF THE USER
    var uid = this.route.snapshot.params['id'];

    // GET ONE USER'S DATA
    this.uus.getCurrentData(uid).subscribe({
      next: (result) => {
        console.log("RESULT");
        console.log(result);

        result = result[0];

        const year = result['selectedYear'] == 'one' ? '1st' : result['selectedYear'] == 'two' ? '2nd' : result['selectedYear'] == 'three' ? '3rd' : result['selectedYear'] == 'four' ? '4th' : '1st';


        if (result['selectedGender'] == 'male') {
            this.userSelectedHostelList = this.male;
          } else {
            this.userSelectedHostelList = this.female;
          }

        this.updateUserForm = new FormGroup({
            id: new FormControl(result['id']),
          username: new FormControl(result['username'], [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-Z\s]+$/),
          ]),
          hostel_id: new FormControl(result['hostel_id']),
          student_id: new FormControl(result['student_id'], [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(7),
            Validators.pattern('^[a-zA-Z0-9]+$'),
          ]),
          dob: new FormControl(result['dob']),
          email: new FormControl(result['email']),
          contactno: new FormControl(result['contactno']),
          roomno: new FormControl(result['roomno']),
          city: new FormControl(result['city']),
          street: new FormControl(result['street']),
          pincode: new FormControl(result['pincode']),
          selectedGender: new FormControl(result['selectedGender'], [
            Validators.required,
          ]),
          selectedYear: new FormControl(year, [
            Validators.required,
          ]),
          selectedHostel: new FormControl(result['selectedHostel'], [
            Validators.required,
          ]),
          roomtype: new FormControl(result['roomtype'], [Validators.required]),
        });
      },
      error: (error) => {
        console.log(error);
        console.log(this.route.snapshot.params['id']);
      },
    });

    this.updateUserForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      hostel_id: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{3}$'),
      ]),
      student_id: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
      dob: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      contactno: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{10}$'),
      ]),
      roomno: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{3}$'),
      ]),

      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      pincode: new FormControl(null, [Validators.required]),

      selectedGender: new FormControl(null, [Validators.required]),
      selectedYear: new FormControl(null, [Validators.required]),
      selectedHostel: new FormControl('', [Validators.required]),

      roomtype: new FormControl(null, [Validators.required]),
    });
  }

  get selectedGender() {
    return this.updateUserForm.get('selectedGender');
  }

  hasErrorselectedGender() {
    return (
      this.selectedGender.invalid &&
      (this.selectedGender.dirty || this.selectedGender.touched)
    );
  }

  get selectedYear() {
    return this.updateUserForm.get('selectedYear');
  }
  hasErrorselectedYear() {
    return (
      this.selectedYear.invalid &&
      (this.selectedYear.dirty || this.selectedYear.touched)
    );
  }

  get selectedHostel() {
    return this.updateUserForm.get('selectedHostel');
  }

  has2Error() {
    return (
      this.updateUserForm.get('selectedHostel').invalid &&
      this.updateUserForm.get('selectedHostel').touched
    );
  }

  get username() {
    return this.updateUserForm.get('username');
  }
  hasErrorusername() {
    return (
      this.username.invalid && (this.username.dirty || this.username.touched)
    );
  }

  get roomtype() {
    return this.updateUserForm.get('roomtype');
  }
  hasErrorroomtype() {
    return (
      this.roomtype.invalid && (this.roomtype.dirty || this.roomtype.touched)
    );
  }

  get hostel_id() {
    return this.updateUserForm.get('hostel_id');
  }
  hasErrorhostel_id() {
    return (
      this.hostel_id.invalid && (this.hostel_id.dirty || this.hostel_id.touched)
    );
  }
  get student_id() {
    return this.updateUserForm.get('student_id');
  }
  hasErrorstudent_id() {
    return (
      this.student_id.invalid &&
      (this.student_id.dirty || this.student_id.touched)
    );
  }

  get dob() {
    return this.updateUserForm.get('dob');
  }
  hasErrordob() {
    return this.dob.invalid && (this.dob.dirty || this.dob.touched);
  }

  get roomno() {
    return this.updateUserForm.get('roomno');
  }
  hasErrorroom() {
    return this.roomno.invalid && (this.roomno.dirty || this.roomno.touched);
  }
  get contactno() {
    return this.updateUserForm.get('contactno');
  }
  hasErrorcontactno() {
    return (
      this.contactno.invalid && (this.contactno.dirty || this.contactno.touched)
    );
  }

  get email() {
    return this.updateUserForm.get('email');
  }
  hasErroremail() {
    return this.email.invalid && (this.email.dirty || this.email.touched);
  }

  get city() {
    return this.updateUserForm.get('city');
  }
  hasErrorcity() {
    return this.city.invalid && (this.city.dirty || this.city.touched);
  }

  get street() {
    return this.updateUserForm.get('street');
  }
  hasErrorstreet() {
    return this.street.invalid && (this.street.dirty || this.street.touched);
  }

  get pincode() {
    return this.updateUserForm.get('pincode');
  }
  hasErrorpincode() {
    return this.pincode.invalid && (this.pincode.dirty || this.pincode.touched);
  }

  onFormSubmit() {
    if (this.updateUserForm.valid) {
      this.uus
        .updateUser(this.route.snapshot.params['id'], this.updateUserForm.value)
        .subscribe({
          next: (result) => {
            console.log('error is ', result);
            this.router.navigate(['admin-profile/admin/view-users']);
          },

          error: (err) => {
            console.log('erroe is ', err);
          },
        });
    } else {
      console.log('form is invalid');
    }
  }
}
