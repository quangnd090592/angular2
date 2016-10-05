import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
	constructor(private http: Http) { }
	private heroesUrl = 'app/heroes';  // URL to web api

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}

	// getHeroes(): Promise<Hero[]> {
	//   return Promise.resolve(HEROES);
	// };
	getHeroesSlowly(): Promise<Hero[]> {
	  return new Promise<Hero[]>(resolve =>
	    setTimeout(resolve, 2000)) // delay 2 seconds
	    .then(() => this.getHeroes());
	};
	getHero(id: number): Promise<Hero> {
	  return this.getHeroes()
	             .then(heroes => heroes.find(hero => hero.id === id));
	}
	getHeroes(): Promise<Hero[]> {
	    return this.http.get(this.heroesUrl)
	               .toPromise()
	               .then(response => response.json().data as Hero[])
	               .catch(this.handleError);
	}

	// private headers = new Headers({'Content-Type': 'application/json'});
	// update(hero: Hero): Promise<Hero> {
	//   const url = `${this.heroesUrl}/${hero.id}`;
	//   return this.http
	//     .put(url, JSON.stringify(hero), {headers: this.headers})
	//     .toPromise()
	//     .then(() => hero)
	//     .catch(this.handleError);
	// }

}
