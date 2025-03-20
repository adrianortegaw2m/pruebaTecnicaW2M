import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-heroe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminarHeroe.component.html',
  styleUrls: ['./eliminarHeroe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EliminarHeroeComponent {
  @Input() heroId!: number;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<number>();

  constructor(private readonly heroService: HeroService) { }

  closeModal() {
    this.close.emit();
  }

  deleteHeroe() {
    if (!this.heroId) return;
    this.heroService.deleteHero(this.heroId).subscribe(() => {
      this.deleted.emit(this.heroId);
      this.closeModal();
    })
  }
}
