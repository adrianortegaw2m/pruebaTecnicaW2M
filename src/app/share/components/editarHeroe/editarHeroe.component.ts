import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseModalComponent } from '../baseModal/baseModal.component';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-editar-heroe',
  standalone: true,
  imports: [BaseModalComponent, CommonModule],
  templateUrl: './editarHeroe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarHeroeComponent implements OnInit {
  @Input() hero: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor(private readonly heroService: HeroService) { }

  ngOnInit(): void {
    if (this.hero) {
      this.hero.termsAccepted = false;
    }
  }

  closeModal() {
    this.close.emit();
  }

  saveHero() {
    this.heroService.saveEditedHero(this.hero, null).subscribe(() => {
      this.closeModal();
    });
  }


}
