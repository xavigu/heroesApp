import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-445d2.firebaseio.com';

  constructor(private http: HttpClient) { }

  createHero(heroe: HeroeModel){

    return this.http.post(`${this.url}/heroes.json`, heroe)
            .pipe(
              map ( (resp: any) => {
                heroe.id = resp.name;
                return heroe;
              })
            );
  }


  updateHero(heroe: HeroeModel){

    const heroeTemp = { //objeto copia del heroe que se utilizará para hacer la actualización del heroe sin mandar el id del heroe como otro campo en la base de datos
      ...heroe //Para añadir todos los campos del objeto heroe
    }

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);

  }

}
