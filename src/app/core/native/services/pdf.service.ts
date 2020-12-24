import { Injectable } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';

import { MarkdownService } from 'ngx-markdown';
import { Platform } from '@ionic/angular';
import { Article } from '@shared/interfaces/interfaces';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { markedOptionsPDF } from '@app/core/markdown/markdown.module';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { FilesystemDirectory, Plugins } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DEFAULT_PDF_STYLES, makePdfRef } from '@app/shared/data/pdf';
const { Filesystem } = Plugins;

@Injectable({providedIn: 'root'})

export class PDFService {

  pdfFile: pdfMake.TCreatedPdf;
  title: string;

  constructor(
    private crafter: CrafterService,
    private platform: Platform,
    private markdownSrv: MarkdownService,
    private fileOpen: FileOpener
  ) { }

  public async createPDF(article: Article): Promise<void> {
    this.title = article.title;
    try {
      const txt = htmlToPdfmake(
        this.markdownSrv.compile(
          article.message, 
          false,
          false,
          markedOptionsPDF()
        ),
        DEFAULT_PDF_STYLES
      );

      const docRef = makePdfRef(article, txt);
      this.pdfFile = pdfMake.createPdf(docRef);
      this.downloadPDF();

    } catch (err) {
      console.log(err);
      await this.crafter.loaderOff();
      this.crafter.alert('FILE.ERROR');
    }
  }

  private downloadPDF(): void {
    if (!this.pdfFile) { 
      this.crafter.loaderOff();
      return;
    }
    if (!this.platform.is('hybrid')) {
      this.pdfFile.download(this.title, () => this.crafter.loaderOff());
    } else {
      this.hybridDownload();
    }
  }

  private hybridDownload(): void {
    if (!this.pdfFile) {
      this.crafter.loaderOff();
      return;
    }

    this.pdfFile.getBase64(async (data: string) => {
      this.saveToDevice(data);
    });
  }

  private async saveToDevice(data: string) {
    try {
      const path = `Antic\'s/article/${
        this.title || 
        new Date().valueOf().toString()}.pdf`;

      const result = await Filesystem.writeFile({
        path,
        data,
        directory: FilesystemDirectory.Documents,
        recursive: true
      });

      this.fileOpen.open(result.uri, 'application/pdf')
       .then(_ => this.crafter.loaderOff());
    } catch (err) {
        console.log(err);
        await this.crafter.loaderOff();
        this.crafter.alert('FILE.ERROR');
    }
  }
}