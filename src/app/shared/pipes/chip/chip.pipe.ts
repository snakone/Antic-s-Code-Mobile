import { Pipe, PipeTransform } from '@angular/core';
const success = ['TAGS.DEVELOP', 'TAGS.BACKEND'];
const danger = ['TAGS.ANTICS', 'TAGS.DESIGN'];
const warning = ['TAGS.CONFIG', 'TAGS.MATERIAL'];
const tertiary = ['TAGS.DATABASE', 'TAGS.CONSOLE'];
const primary = ['TAGS.DEVELOP', 'TAGS.GIT', 'TAGS.FRONTEND'];
const secondary = ['TAGS.IONIC', 'TAGS.MATERIAL'];
const medium = ['TAGS.MOBILE', 'TAGS.TYPESCRIPT'];

@Pipe({name: 'chip'})

export class ChipPipe implements PipeTransform {
  transform(value: string): string {
    if (success.includes(value)) {
      return 'success';
    } else if (warning.includes(value)) {
      return 'warning';
    } else if (primary.includes(value)) {
      return 'primary';
    } else if (secondary.includes(value)) {
      return 'secondary';
    } else if (medium.includes(value)) {
      return 'medium';
    } else if (tertiary.includes(value)) {
      return 'tertiary';
    } else if (danger.includes(value)) {
      return 'primary';
    } else { return value; }
  }
}
