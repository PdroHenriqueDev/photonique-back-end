import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, _metadata?: ArgumentMetadata) {
    const fourMB = 32000000;

    if (value.size > fourMB) return 'Tamanho da imagem não permitido';

    return null;
  }
}
