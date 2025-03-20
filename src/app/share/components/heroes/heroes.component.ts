import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import { EliminarHeroeComponent } from '../eliminarHeroe/eliminarHeroe.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, EliminarHeroeComponent],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public heroes!: Observable<any[]>;
  public hasMoreHeroes = true;

  isModalOpenDelete = false;
  heroIdToDelete: number | null = null;

  constructor(public heroService: HeroService) { }

  ngOnInit() {
    this.heroes = this.heroService.heroes;
    this.heroService.loadHeroes();

    this.heroes.subscribe(heroes => {
      this.hasMoreHeroes = heroes.length < this.heroService.getTotalHeroes();
    });
  }

  loadMore() {
    this.heroService.loadMoreHeroes();
  }

  openModalDelete(heroId: number) {
    this.heroIdToDelete = heroId;
    this.isModalOpenDelete = true;
  }

  closeModalDelete() {
    this.isModalOpenDelete = false;
    this.heroIdToDelete = null;
  }

  onHeroDeleted(heroId: number) {
    this.heroService.fetchUpdatedHeroes();
    this.closeModalDelete();
  }
}
