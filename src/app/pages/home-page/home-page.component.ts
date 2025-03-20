import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroesComponent } from '../../share/components/heroes/heroes.component';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from '../../share/components/baseModal/baseModal.component';

@Component({
  standalone: true,
  imports: [HeroesComponent, BaseModalComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addHero(hero: any) {
    console.log('Héroe guardado:', hero);
  }
}
