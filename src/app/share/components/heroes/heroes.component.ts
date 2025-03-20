import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import { EliminarHeroeComponent } from '../eliminarHeroe/eliminarHeroe.component';
import { BaseModalComponent } from "../baseModal/baseModal.component";
import { EditarHeroeComponent } from "../editarHeroe/editarHeroe.component";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, EliminarHeroeComponent, EditarHeroeComponent],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public heroes!: Observable<any[]>;
  public hasMoreHeroes = true;

  isModalOpenDelete = false;
  heroIdToDelete: number | null = null;

  isModalOpenEdit = false;
  heroToEdit: any = null;


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

  openModalEdit(hero: any) {
    this.heroToEdit = { ...hero };
    this.isModalOpenEdit = true;
  }

  closeModalDelete() {
    this.isModalOpenDelete = false;
    this.heroIdToDelete = null;
  }

  closeModalEdit() {
    this.isModalOpenEdit = false;
    this.heroToEdit = null;
  }

  onHeroEdited(updatedHero: any) {
    this.heroService.saveEditedHero(updatedHero, null).subscribe(() => {
      this.closeModalEdit();
    });
  }


  onHeroDeleted(heroId: number) {
    this.heroService.fetchUpdatedHeroes();
    this.closeModalDelete();
  }
}
