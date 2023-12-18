import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username',
})
export class UserNamePipePipe implements PipeTransform {
  transform(
    userName: { lastName: string; firstName: string },
    locale: 'fr' | 'en' = 'fr'
  ): unknown {
    return locale === 'fr'
      ? `${userName.lastName.toUpperCase()} ${userName.firstName}`
      : `${userName.firstName} ${userName.lastName.toUpperCase()}`;
  }
}
