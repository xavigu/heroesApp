import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
  }

  save(form: NgForm){

    if (form.invalid) {
      console.log('Form not valid');
      return;
    }

    Swal.fire({
      title:'Wait',
      text: 'Saving information',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>; //Creamos un observable que recoja la peticion tanto de create como de update y dependiendo de cual sea enviará un mensaje u otro
    let text: string;

    if (this.heroe.id) {
      peticion = this.heroesService.updateHero(this.heroe);
      text = 'Updated correctly in the database';     
    } else {      
      peticion = this.heroesService.createHero(this.heroe);
      text = 'Created correctly in the database';
    }

    peticion.subscribe( resp => {
        Swal.fire({
          title: this.heroe.name,
          text,
          type: 'success'
        });

    });

  }

}
