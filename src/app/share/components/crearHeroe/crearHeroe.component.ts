import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { BaseModalComponent } from '../baseModal/baseModal.component';
import { HeroService } from '../../services/heroes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-heroe',
  standalone: true,
  imports: [BaseModalComponent, CommonModule],
  templateUrl: './crearHeroe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrearHeroeComponent {
  @Output() close = new EventEmitter<void>();

  hero: any = {
    name: '',
    occupation: '',
    location: '',
    description: '',
    termsAccepted: false,
  };

  constructor(private readonly heroService: HeroService) { }

  closeModal() {
    this.close.emit();
  }

  saveHero(event: any) {
    if (!event || !event.hero) {
      console.error('Error: No se recibió un héroe válido en saveHero', event);
      return;
    }

    const { hero, file } = event;
    this.heroService.saveHero(hero, file).subscribe(() => {
      this.closeModal();
    });
  }
}
