import { LoadProductByIdRepository } from "@/data/protocols/db/product/LoadProductByIdRepository.protocol";
import { ProductModel } from "@/domain/models/Product";
import { File } from "@/domain/usecases/file/File";
import { UploadProductPhotoUseCaseContract } from "@/domain/usecases/productMedia/UploadProductPhoto";
import { UploadProductPhotoRepository } from "@/data/protocols/db/productMedia/UploadProductPhotoRepository.protocol";

export class UploadProductPhoto implements UploadProductPhotoUseCaseContract {
    constructor(
        private readonly uploadProductPhotoRepository: UploadProductPhotoRepository,
        private readonly findProductByIdRepository: LoadProductByIdRepository,
    ) { }

    async uploadProductPhoto(productId: string, file: File): Promise<Partial<ProductModel> | null> {
        const product = await this.findProductByIdRepository.loadById(productId);

        if (!product) {
            return null;
        }

        if (product?.photo_url) {
            /*await this.queueAdapter.addJob('DeleteUserPhoto', {
                userId,
                fileName: user.photoUrl,
            });*/
        }

        return await this.uploadProductPhotoRepository.uploadProductPhoto(productId, file);
    }
}