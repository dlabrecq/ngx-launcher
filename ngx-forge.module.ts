import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsciidocComponent } from './src/app/asciidoc/asciidoc.component';
import { InputComponent } from './src/app/input/input.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { ProjectSelect } from './src/app/project-select/project-select';
import { Config } from './src/app/service/config.component';
import { ForgeService } from './src/app/service/forge.service';
import { History } from './src/app/service/history.component';
import { AsciidocIndex } from './src/app/asciidoc/asciidoc.index';
import { AsciidocService } from './src/app/asciidoc/asciidoc.service';

const classes = [
  AsciidocComponent,
  InputComponent,
  ProjectSelect
];

@NgModule({
  imports: [CommonModule, FormsModule, MultiselectDropdownModule],
  exports: classes,
  declarations: classes,
  providers: [
    ForgeService,
    AsciidocIndex,
    AsciidocService,
    History,
    Config
  ]
})
export class NgxForgeModule {
}

