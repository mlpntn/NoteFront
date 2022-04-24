import { FormGroup, AbstractControl, FormArray, ValidationErrors } from "@angular/forms";

export class ValidatorUtilities {
    protected validators: FormGroup

    constructor() { }

    isDisabled(field: string): boolean {
        return this.getControl(field).disabled
    }
  
    isTouchedInvalid(field: string): boolean {
        return this.isTouched(field) && this.isInvalid(field);
    }

    isTouchedValid(field: string): boolean {
        return this.isTouched(field) && this.isValid(field);
    }
  
    isTouchedInvalidError(field: string, error: string): boolean {
        return this.isTouched(field) && this.isInvalid(field) && this.hasError(field, error);
    }

    isUntouched(field: string): boolean {
        return !this.isTouched(field);
    }

    isDirty(field: string): boolean {
        return this.getControl(field).dirty;
    }

    hasError(field: string, error: string): boolean {
        return this.getControl(field).hasError(error);
    }

    getErrors(field: string): ValidationErrors {
        return this.getControl(field).errors;
    }

    isValid(field: string): boolean {
        return this.getControl(field).valid;
    } 

    isInvalid(field: string): boolean {
        return this.getControl(field).invalid;
    }

    isTouched(field: string): boolean {
        return this.getControl(field).touched;
    }

    getValue(field: string): any {
        return this.getControl(field).value;
    }

    getControl(field: string): AbstractControl {
        return this.validators.get(field);
    }

    /**
     * It will reset field of component validator inheriting this
     * @param field
     * @param value
     */
    resetValidation(field: string, value: any): void {
        this.getControl(field).reset(value);
        //this.getControl(field.split('.')[0]).markAsTouched();
        this.getControl(field).markAsTouched();
    }

    /**
     * It will reset specific field for specific validator (use for validator outside the class inheriting this)
     * @param validator
     * @param field
     * @param value
     */
    resetFieldValidation(validator: FormGroup, field: string, value?: any): void {
        validator.get(field).reset(value);
    }
    /**
     * It will mark as touched specific field for specific validator (use for validator outside the class inheriting this)
     * @param validator
     * @param field
     */
    markFieldAsTouched(validator: FormGroup, field: string): void {
        validator.get(field).markAsTouched();
    }

    validate(control: AbstractControl, f?: string) {
      
        if (control instanceof FormGroup) {
            const group = (control as FormGroup);

            for (const field in group.controls) {
                const c = group.controls[field];
                this.validate(c, field);
            }
        } else if (control instanceof FormArray) {
            const group = (control as FormArray);

            for (const field in group.controls) {
                const c = group.controls[field];
                this.validate(c, field);
            }
        }
      
        if(control.enabled) {
            control.markAsTouched({ onlySelf: false });
            control.updateValueAndValidity({ onlySelf: false });
        } 
        if(!control.valid) console.log('CONTROL: ', control.valid, control.touched, f, control.errors, control.value, control.disabled);
    }
}
