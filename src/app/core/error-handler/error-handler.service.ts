import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error/error.service';
import { LoadingController } from '@ionic/angular';
import { CrafterService } from '@core/services/crafter/crafter.service';

@Injectable()

export class ErrorHandlerService implements ErrorHandler {

  chunkFailedMessage = /Loading chunk [\d]+ failed/;

  constructor(private injector: Injector) { }

  async handleError(error: Error | HttpErrorResponse): Promise<void> {

    const service = this.injector.get(ErrorService);

    switch (error.constructor) {
      case TypeError: {
        console.error('Type Error! ', error);
        break;
      }
      case Error: {
        console.error('General Error!. ', error);
        break;
      }
    }

    if (!(error instanceof HttpErrorResponse)) {
      service.saveError(error);
    } 

    if (this.chunkFailedMessage.test(error?.message || null)) {
      window.location.reload();
      return;
    }
  }

}
