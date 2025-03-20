import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { BaseModalComponent } from '../baseModal/baseModal.component';



@Component({
  selector: 'app-crear-heroe',
  standalone: true,
  imports: [BaseModalComponent],
  templateUrl: './crearHeroe.component.html',
  styleUrls: ['./crearHeroe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrearHeroeComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  saveHero(heroData: any) {
    console.log('Héroe guardado:', heroData);
    this.closeModal();
  }
}
