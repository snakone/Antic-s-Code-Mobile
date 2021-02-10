import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '@core/services/http/http.service';
import { ErrorHandlerService } from '@core/error-handler/error-handler.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageModule } from './language/language.module';
import { CORE_MODULE_CONSTANTS, CORE_MODULE_CONFIG } from './core.module.config';
import { LanguageService } from './language/services/language.service';
import { JwtInterceptor } from './services/http/jwt.interceptor';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { StorageModule } from './services/storage/storage.module';
import { NgMarkdownModule } from './markdown/markdown.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '@env/environment';

import { StoreModule } from '@ngrx/store';
import { reducers } from './ngrx/ngrx.index';
import { EffectsModule } from '@ngrx/effects';
import { ContentEffects } from './ngrx/content/content.effects';
import { UserEffects } from './ngrx/user/user.effects';
import { MailAccessModule } from '@store/mail/data-access/mail-access.module';

import { NativeModule } from './native/native.module';
import { SocketsModule } from './sockets/sockets.module';
import { RandomizerPipe } from '@shared/pipes/randomizer/randomizer.pipe';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, CORE_MODULE_CONSTANTS.TRANSLATE_CONFIG.I18N_PATH,
                                 CORE_MODULE_CONSTANTS.TRANSLATE_CONFIG.SUFFIX_FILE);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StorageModule,
    NgMarkdownModule,
    NgxWebstorageModule.forRoot(CORE_MODULE_CONSTANTS.WEBSTORAGE_CONFIG),
    LanguageModule.forRoot(),
    StoreModule.forFeature('AppState', reducers),
    EffectsModule.forRoot([
      ContentEffects,
      UserEffects
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    NativeModule,
    SocketsModule,
    MailAccessModule
  ],
  providers: [
    HttpService,
    LanguageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: CORE_MODULE_CONFIG, useValue: CORE_MODULE_CONSTANTS },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    RandomizerPipe
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
