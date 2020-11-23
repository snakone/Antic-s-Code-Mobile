import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { APP_CONFIG, APP_CONSTANTS } from './app.config';
import { CoreModule } from '@core/core.module';
import { HammerConfig } from '@core/hammer.config';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { MenuComponent } from '@layout/menu/menu.component';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({_forceStatusbarPadding: true, mode: 'ios'}),
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    SharedModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_CONFIG, useValue: APP_CONSTANTS },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
