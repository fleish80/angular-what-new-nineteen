import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'df-template-syntax-improvements',
  imports: [CommonModule],
  template: '<p [class]="`some-class ${className}`">{{ `template-syntax-improvements works! ${title}` }}</p>',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSyntaxImprovementsComponent {
  className = 'another-class';
  title = 'some-title';
}
