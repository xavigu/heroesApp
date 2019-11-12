import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

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

    if (this.heroe.id) {
      this.heroesService.updateHero(this.heroe)
        .subscribe(resp => {
          console.log(resp);
        });      
    } else {      
      this.heroesService.createHero(this.heroe)
        .subscribe (resp => {
          console.log(resp);
        });
    }

  }

}
