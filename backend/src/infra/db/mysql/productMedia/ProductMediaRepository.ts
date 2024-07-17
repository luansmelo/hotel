import { ProductMedia } from "@/data/local/entity/product";
import { UploadProductPhotoRepository } from "@/data/protocols/db/productMedia/UploadProductPhotoRepository.protocol";
import { ProductModel } from "@/domain/models/Product";
import { File } from "@/domain/usecases/file/File";

export class ProductMediaRepository implements UploadProductPhotoRepository {
    async uploadProductPhoto(productId: string, file: File): Promise<Partial<ProductModel> | null> {
        return await ProductMedia.create({
            data: {
                productId,
                filename: file.filename,
                metadata: file.mimetype
            }
        })
    }
}
