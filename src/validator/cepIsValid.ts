import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCep', async: false })
export class IsCep implements ValidatorConstraintInterface {
  validate(cep: string): boolean {
    const cepFormatted = cep.replace(/\D/g, '');
    const validcep = /^[0-9]{8}$/;
    const sameCaracteres = /^(\d)\1+$/;

    const isCepValid =
      validcep.test(cepFormatted) && !sameCaracteres.test(cepFormatted);

    return isCepValid;
  }

  defaultMessage() {
    return 'Cep inválido';
  }
}
