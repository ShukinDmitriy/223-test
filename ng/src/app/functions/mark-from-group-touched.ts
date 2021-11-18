/**
 * Marks all controls in a form group as touched
 * @param formGroup - The group to caress..hah
 */
import {FormArray, FormGroup} from "@angular/forms";

export function markFormGroupTouched(formGroup: FormGroup | FormArray) {
  if (formGroup instanceof FormArray) {
    for (let i = 0; i < formGroup.length; ++i) {
      const control = <FormArray>formGroup.controls[i];
      control.markAsTouched();
      if (control.controls) {
        markFormGroupTouched(control);
      }
    }
  }
  if (formGroup instanceof FormGroup) {
    for (const name in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(name) === false) {
        continue;
      }
      const control = <FormGroup>formGroup.controls[name];
      control.markAsTouched();
      if (control.controls) {
        markFormGroupTouched(control);
      }
    }
  }
}
