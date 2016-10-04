import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template:`
  		<h1>{{title}}</h1>
	  	<h2>My Heroes</h2>
		<ul class="heroes">
		  	<li *ngFor="let hero of heroes"
				[class.selected]="hero === selectedHero"
				(click)="onSelect(hero)">
				<span class="badge">{{hero.id}}</span> {{hero.name}}
			</li>
		</ul>
  		<my-hero-detail [hero]="selectedHero"></my-hero-detail>
  	`,
  	providers: [HeroService]
})
export class AppComponent implements OnInit  {
	constructor(private heroService: HeroService) { }

	title = 'Tour of Heroes';
	heroes: Hero[];

	getHeroes(): void {
	    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	    // this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
	};

	selectedHero: Hero;
	onSelect(hero: Hero): void {
	  this.selectedHero = hero;
	};

	ngOnInit(): void {
		this.getHeroes();
  	}
	// myHero = this.heroes[0];
}

