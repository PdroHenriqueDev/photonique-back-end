import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCpf', async: false })
export class IsCpf implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf === '') {
      return false;
    }

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = sum % 11;
    let digit = rest < 2 ? 0 : 11 - rest;
    if (digit !== parseInt(cpf.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = sum % 11;
    digit = rest < 2 ? 0 : 11 - rest;
    if (digit !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Cpf inválido';
  }
}
