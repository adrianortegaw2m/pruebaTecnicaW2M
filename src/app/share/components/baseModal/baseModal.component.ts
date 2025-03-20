import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './baseModal.component.html',
  styleUrls: ['./baseModal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BaseModalComponent {
  @Input() title: string = '';
  @Input() hero: any = { name: '', occupation: '', location: '', description: '', termsAccepted: false };
  @Input() buttonLabel: string = 'Guardar';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor(private readonly heroService: HeroService) { }

  selectedFileName: string = '';
  selectedFile: File | null = null;

  closeModal() {
    this.close.emit();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file || null;
    this.selectedFileName = file ? file.name : 'Sin archivos seleccionados';
  }

  saveHero() {
    if (this.isFormValid()) {
      this.save.emit({ hero: this.hero, file: this.selectedFile });
    }
  }


  isFormValid() {
    return this.hero.name && this.hero.occupation && this.hero.location && this.hero.description && this.hero.termsAccepted;
  }
}
