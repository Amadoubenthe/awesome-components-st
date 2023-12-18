import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmEqualValidator(
  main: string,
  confirm: string
): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (!ctrl.get(main) || !ctrl.get(confirm)) {
      return {
        confirmEqual: 'Invalid control names',
      };
    } else {
      const mainValue = ctrl.get(main)!.value;
      const confirmvalue = ctrl.get(confirm)!.value;

      return mainValue === confirmvalue
        ? null
        : {
            confirmEqual: {
              main: mainValue,
              confirm: confirmvalue,
            },
          };
    }
  };
}
