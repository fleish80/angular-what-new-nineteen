import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LinkedSignalComponent } from './linked-signal/linked-signal.component';
import { ResourceComponent } from './resource/resource.component';
import { TemplateSyntaxImprovementsComponent } from './template-syntax-improvements/template-syntax-improvements.component';

@Component({
  imports: [
    RouterModule,
    MatTab,
    MatTabGroup,
    LinkedSignalComponent,
    ResourceComponent,
    TemplateSyntaxImprovementsComponent
  ],
  selector: 'df-root',
  template: `
    <mat-tab-group>
      <mat-tab label="Linked Signal"><df-linked-signal /></mat-tab>
      <mat-tab label="Resource"><df-resource /></mat-tab>
      <mat-tab label="Template Syntax Improvements"><df-template-syntax-improvements/></mat-tab>
    </mat-tab-group>
  `,
  styles: ``,
})
export class AppComponent {}
