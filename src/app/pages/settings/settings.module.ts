import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsPageRouting } from './settings.routing';
import { SettingsPage } from './settings.page';
import { IonicModule } from '@ionic/angular';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from '@layout/page-header/page-header.module';

@NgModule({
  declarations: [SettingsPage],
  imports: [
    CommonModule,
    SettingsPageRouting,
    IonicModule,
    SharedModule,
    LayoutModule,
    FormsModule,
    PageHeaderModule
  ]
})

export class SettingsPageModule { }
