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

    return this.http.post(`${this.url}/heroes.json`, heroe) //como estamos usando el recipe de Firebase hay que poner .json a la petición
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

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
            .pipe(
              map(this.arrayHeroes) //el map sirve para transformar la respuesta obtenida en otra cosa y al hacer un subscribe en otro componente realmente se subscribe a esa transformación con el map
                                    //ademas no hay que ponerle por parametro la resp puesto que la introduce directamente
            );
  }

  private arrayHeroes(heroesObj: object){
      const heroes: HeroeModel[] = []; //array de heroes
      console.log(heroesObj);

      if (heroesObj === null) { return []; }

      Object.keys(heroesObj).forEach(key =>{ //recorre el objeto que se recoge del get a través de las keys
        const heroe: HeroeModel = heroesObj[key]; //crea una variable heroe de tipo heroeModel y se le asigna el objeto de X key que posteriormente se pushea en el array de HeroeModels
        heroe.id = key;
        heroes.push(heroe);
      })

      return heroes
  }

}
