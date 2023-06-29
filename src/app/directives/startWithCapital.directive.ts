import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validator } from "@angular/forms";


// este es el formato de un validator Function recibe un control de formulario en su funcion mas generica un abstacControl y 
// tiene que devolver validator Error o null si no hay erroressi no hay contenido se desactiva el validador
export function startWithCapitalValidator():ValidatorFn{
    return(control:AbstractControl): ValidationErrors | null =>{
        // compruebo si control.value es null o un objeto vacion no hay valor no hay nada que validar en caso contrario creo una expresion regular
        // para comprobar que un string empieza por mayuscula 
        if(!control.value)
        return null
        // cojo el valor que me viene del control y compruebo que empieza por mayuscula entre la A y La Z
        const valid = /^[A-Z]/.test(control.value);
        // Si esto se cumple devuelve null si no se devuelve un objeto con el nombre del error y la informacion que quiero asociar al error
        return valid ? null : {'startsWithCapital':{value:control.value}};
    }
}

@Directive({
    selector: '[startWithCapital]',
    providers: [{provide: NG_VALIDATORS, useExisting: startWithCapitalValidator, multi:true}]
})
export class startsWithCapitalValidatorDirective implements Validator{
    @Input('startWithCapital') isActive:boolean;
    validate(control:AbstractControl): (ValidationErrors | null){
        return !this.isActive ? null : startWithCapitalValidator()(control)
    }
}