import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CepResponse } from 'src/model/CepResponse.model';
import { StandardResponse } from 'src/model/StandartResponse.model';

@Injectable()
export class CepService {
  constructor(private readonly httpService: HttpService) {}
  async getCepInfo(cep: string): Promise<StandardResponse<CepResponse | null>> {
    cep = cep.replace(/\D/g, '');
    const validcep = /^[0-9]{8}$/;
    const isCepValid = validcep.test(cep);

    const request = this.httpService
      .get(`//viacep.com.br/ws/${cep}/json/`)
      .pipe(
        map((resp: AxiosResponse) => resp.data),
        catchError(() => of({})),
      );

    const response = isCepValid ? await lastValueFrom(request) : {};

    return {
      data: response,
      statusCode: 200,
    };
  }
}
