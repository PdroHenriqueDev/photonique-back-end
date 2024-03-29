import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CepResponse } from 'src/interface/CepResponse';
import { StandardResponse } from 'src/interface/StandartResponse';
import { IsCep } from 'src/validator/cepIsValid';
@Injectable()
export class CepService {
  constructor(
    private readonly httpService: HttpService,
    private isCep: IsCep,
  ) {}
  async getCepInfo(
    cep: string,
  ): Promise<StandardResponse<CepResponse | object>> {
    const isCepValid = this.isCep.validate(cep);
    const cepFormatted = cep.replace(/\D/g, '');

    const request = this.httpService
      .get(`//viacep.com.br/ws/${cepFormatted}/json/`)
      .pipe(
        map((res: AxiosResponse) => {
          const { cep, logradouro, complemento, bairro, localidade, uf } =
            res.data;

          const { erro } = res.data;
          if (erro) return {};

          return {
            zip_code: cep,
            address: logradouro,
            address_complement: complemento,
            neighborhood: bairro,
            city: localidade,
            state: uf,
          };
        }),
        catchError(() => of({})),
      );

    const response = isCepValid ? await lastValueFrom(request) : {};

    return {
      data: response,
      statusCode: 200,
    };
  }
}
