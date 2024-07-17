import { ProductModel } from "@/domain/models/Product";
import { File } from "@/domain/usecases/file/File";

export interface UploadProductPhotoRepository {
    uploadProductPhoto(productId: string, file: File): Promise<Partial<ProductModel> | null>;
}