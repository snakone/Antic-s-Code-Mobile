import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePage } from './home.page';
import { HomePageRouting } from './home.routing';
import { PipesModule } from '@shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from '@layout/page-header/page-header.module';

import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';

@NgModule({
  declarations: [
    HomePage,
    ArticlesListComponent,
    DraftListComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    HomePageRouting,
    PipesModule,
    PageHeaderModule,
    TranslateModule
  ]
})

export class HomePageModule {}
