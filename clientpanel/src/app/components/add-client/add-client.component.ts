import { ClientService } from './../../services/client.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
/* import { ToastrService } from 'ngx-toastr'; */
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent {
  client: Client = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalancedOnAdd :boolean= false;
  @ViewChild('clientForm')Form:any;
// private toatrService: ToastrService
  constructor(private clientService: ClientService, private router: Router,
    ) {}

  onSubmit(form: NgForm) {
    this.clientService.newClient(form.value);
  } 
 /*  onSubmit({value,valid}:{value:Client,valid:boolean}) {
   console.log(value,valid);
  } */
}
