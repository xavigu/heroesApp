import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.heroesService.getHeroes()
        .subscribe( resp => {
          console.log(resp);
          this.heroes = resp;
        });
  }

  deleteHeroeUI(hero: HeroeModel, index: number){
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure that you want delete ${hero.name}?`,
      type: 'question',
      showConfirmButton: true, 
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(index, 1);
        this.heroesService.deleteHero(hero.id)
            .subscribe();     
      }
    })
  }

}
