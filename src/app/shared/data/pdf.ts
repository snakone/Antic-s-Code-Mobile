import { URI } from "@app/app.config";
import moment from "moment";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Article } from "../interfaces/interfaces";

export const DEFAULT_PDF_STYLES = {
  defaultStyles: {
    h2: {
      marginTop: 20,
      marginBottom: 15,
      fontSize: 24
    },
    h3: {
      marginTop: 15,
      marginBottom: 10,
      fontSize: 18
    },
    ul: {
      marginTop: 10,
      marginBottom: 13
    },
    ol: {
      marginTop: 10,
      marginBottom: 13
    },
    table: {
      marginTop: 12,
      marginBottom: 13
    }
  }
};

export const makePdfRef = (article: Article, txt: any): TDocumentDefinitions => {
  return {
    info: {
      title: article.title
    },
    watermark: { text: 'Antic\'s Code', color: 'pink', opacity: 0.1 },
    content: [
      {
        columns: [
          { image: LOGO64, width: 80, margin: [0, 0, 10, 0] },
          { 
            stack: [
              {
                text: 'Antic\'s Code',
                fontSize: 30,
                nodeName: 'H1',
                style: ['logo', 'html-h1', 'html-div']
              },
              {
                text: 'Aprende programación con artículos, tutoriales...',
                fontSize: 15,
                color: '#222',
                style: ['html-p', 'html-div'] 
              },
              {
                text: moment().format('LLL'),
                style: ['date', 'html-p', 'html-div']
              }
            ],
            style: 'header'
          }
        ]
      },
      {
        text: article.title,
        fontSize: 26,
        decoration: 'underline',
        color: '#ee7da8',
        margin: [0, 5, 0, 18]
      },
      {
        text: [
          {
            text: 'Autor: ',
            bold: true
          },
          {
            text: article.author
          }
        ],
        margin: [0, 0, 0, 5]
      },
      {
        text: [
          {
            text: 'Categoría: ',
            bold: true
          },
          {
            text: article.category
          }
        ],
        margin: [0, 0, 0, 5]
      },
      {
        text: [
          {
            text: 'Creado el: ',
            bold: true
          },
          {
            text: article.created
          }
        ],
        margin: [0, 0, 0, 5]
      },
      {
        text: [
          {
            text: 'Enlace: ',
            bold: true
          },
          {
            text: article.title,
            link: `${URI}/article/${article.slug}`,
            style: ['html-a'],
            color: 'blue',
            decoration: 'underline',
          }
        ],
        margin: [0, 0, 0, 12]
      },
      ...txt
    ],
    footer: (curr, count) => {
      return curr === count ? [
        {
          text: [
            {
              text: 'Gracias por usar nuestro servicio. No olvides visitarnos en',
              alignment: 'center',
              fontSize: 10,
              color: '#333'
            },
            {
              text: ' Antic\'s Code',
              link: 'https://anticscode.netlify.com/',
              fontSize: 10,
              style: ['html-a'],
              color: 'blue',
              decoration: 'underline'
            }
          ]
        }
      ] : { text: '' }
    },
    styles:{
      'pdf-page-break': {
        fontSize: 0
      },
      code: {
        background: '#2d2d2d',
        margin: [0, 6, 0, 6],
        color: '#fff',
        fontSize: 10
      },
      logo: {
        margin: [0, 8, 0, 0]
      },
      header: {
        margin: [6, 0, 0, 35]
      },
      date: {
        margin: [0, 3, 0, 0],
        fontSize: 10,
        color: '#555'
      }
    },
    pageBreakBefore: currentNode => currentNode && 
    (currentNode.style as string[])?.indexOf('pdf-page-break') > -1
  }
} 

export const LOGO64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWoAAAFoCAMAAABJzkHaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAACsfA2lNB0UzBcqUDrSEDkk1Bd2kEvSyEtOcEYFeCfm2E+SpElM9BptyDHtaCcqVEC0gA5NsC82YEY1oCuCmEqp9DWlNCDsrBKV5DK6ADbuKDm1QCOusEsaRDnJUCEw4BcSREKF2DIRhCjIlAzYoBGNIB8CNDl1FCL6NELeID0AuBVQQEWIUFIMaG2BGBkQNDqIgIpIdHtGZD2VLCHsYGsMpKZYdIKwkJJseIIscHbkoJu6wEmsVFrMkJZ0hIMsqKloSE70pKDQKCtMrLHUYGEgOD9srLqAfIuEtL8COEJUgH+MtMFtDBlZAB4llCk4QEO4uMjsLDLYoJiFEEh06DhkzDTFjGk2bKTlzHSlTFUmTJVu4L2DCMSRKFEGDIlmzLTRrG1WrK1/AMV28MSdQFEWLIyxaFkwQDzx5HlGjKrglJ0yZJ5ggHx08EEeQJXIYFzx7InAWFy1dGriGDhcvDFm0Mzl1IlawNFOqNVGmNTZtIFewLUwOEEaQLESMK3UWGdieEEycMCdPGHgXGUmULR9AESpVGb0kKN4sMMMmKS5gGsgnKjdwHU6gMj+AJlCfKSoZQzkiWyETNSQVOkYrcUsueTdwITUgVU4ygFI0hUksdS0bSVQ1iUMoazMeUUwwfB4SMRwQLFg1jVw4lBM0MUAoZ0AlZRAtKy59eTB/ehtJRk+hKUKGKVs2kTaSjEKyrDyinSt1chY8Oj0lYmM7nDEcTTiUjUa8tEjBuTmalSdqZicYP0CspzOJhSFZVj2koFAvfkS2sCpxbSRhXUInaSgXPmY8oGA4li15dRlEQRQ4NhcwDki+tjCBfR5RTjYiWC+AexxMShhAPki/uA4nJV85mBIwLicZQFEwfz8oZhApJyNEWCpSakiLtUSEqRUnMygYP0F+o1ShzV605UySuxkwPTpwjlGcylWm1xEiLDJhfGC26CdMY0B7nTZphzBdeCA9Tjx1li1Ychw3R1qu4Fyw31Ge0CA/UU2XxR5TUBAfKD56oDlukBg+PAAAAEwFqZ0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA6/AAAOvwE4BVMkAAAf20lEQVR4Xu2dfZwV1XnH28Jm7wYEgiwByUYBjUmDdDFZQlhBRKNJS14ksKAIiFKoaE1N0iSm8SU05r1aQahZshqzWEPasHuJN1mWsm5Qg5hi3kzbtLvs1gCBJQgBbCTa3p4z88zcMzPnnOfM3rnPuRfn+8/et939fL48/OZ5zpyZ/YN8ChGpajJS1WSkqslIVZORqiYjVU1GqpqMVDUZqWoyUtVkpKrJSFWTkaomI1VNRqqajFQ1GalqMlLVZKSqyUhVk5GqJiNVTUaqmoxUNRmpajJS1WSkqslIVZORqiYjVU1GqpqMVDUZqWoyUtVkpKrJSFWTkaomI1VNRqqajFQ1GalqMmhU/+EfwYPXMjSqhwyteh08fO1CpLo6U/N6ePyahUr1sMzwqiHwDOOsESPh0RkFmephwzKjzAy+YXT12WPg8ZkEoephmdqxJoX9xlHV1TUjxsGzMwdK1WaFPW58NaPmnLPg+RkDrWpW2OOxwh5Zw1VXV094E7xwpkCsetiwujefCy/KOa/KNV1dPfEMOziSqx6WqZ6kK+zJUNSMUWPOz18w5Ky3vGnk5DGjR0waP3bsCPhQRUKvmhX2herCfuvbwDOnpqrqj982ceKos2vA/1j4VEViQzUr7BFvh3dCnD/CdSqnxrQzL0usqGaFrTjoncsaPTUVnR+2VA/L1MgKe4jT6KkYdT58rDKxpZoXdnS5z2v05FR4R1Ia1VPgq4dMNSvs0aGR8Cy/0ZMxAT5VqZRE9UVT4YGHVDUr7KpgYY/RFXXNn8CnKpVSqK6fdjE88lCoHpZ5h1jY7xQbvQgV3ehxSqG6Yfq74JGHSjUv7LfAZ/LjzuBGj1MC1VNmTH83PPRQqx6WGToaFpb0jd5o90MVTAlU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';