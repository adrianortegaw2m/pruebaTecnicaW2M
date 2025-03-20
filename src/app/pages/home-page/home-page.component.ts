import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroesComponent } from '../../share/components/heroes/heroes.component';
import { CommonModule } from '@angular/common';
import { CrearHeroeComponent } from "../../share/components/crearHeroe/crearHeroe.component";

@Component({
  standalone: true,
  imports: [HeroesComponent, CommonModule, CrearHeroeComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {
  isModalOpenCreate = false;

  openModalCreate() {
    console.log("openModalCreate() llamado");
    this.isModalOpenCreate = true;
  }
  closeModalCreate() {
    this.isModalOpenCreate = false;
  }

  addHero(hero: any) {
    console.log('Héroe guardado:', hero);
  }
}
