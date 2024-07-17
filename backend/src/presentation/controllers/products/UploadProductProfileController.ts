import { File } from '@/domain/usecases/file/File';
import { UploadProductPhotoUseCaseContract } from '@/domain/usecases/productMedia/UploadProductPhoto';
import { MissingParamError } from '@/presentation/errors/MissingParamError';
import { errorHandler } from '@/presentation/helpers/errorHandler/errorHandler';
import { badRequest, ok } from '@/presentation/helpers/httpCodesHelper';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';

export class UploadProductPhotoController implements Controller {
    constructor(private readonly uploadProductPhoto: UploadProductPhotoUseCaseContract) { }
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            const { productId } = httpRequest.params as { productId: string };

            if (!productId) {
                return badRequest(new MissingParamError('productId'));
            }

            if (!httpRequest.file) {
                return badRequest(new MissingParamError('file'));
            }

            const picture = await this.uploadProductPhoto.uploadProductPhoto(productId, {
                ...httpRequest.file as File,
                filename: (httpRequest.file as { key: string }).key,
            });

            return ok(picture);
        } catch (err) {
            return errorHandler(err);
        }
    }
}