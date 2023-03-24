import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CepResponse } from 'src/model/CepResponse.model';
import { StandardResponse } from 'src/model/StandartResponse.model';
import { IsCep } from 'src/validator/cepIsValid';
@Injectable()
export class CepService {
  constructor(
    private readonly httpService: HttpService,
    private isCep: IsCep,
  ) {}
  async getCepInfo(cep: string): Promise<StandardResponse<CepResponse | null>> {
    const isCepValid = this.isCep.validate(cep);

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
