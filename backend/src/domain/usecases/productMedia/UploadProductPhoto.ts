import { ProductModel } from "@/domain/models/Product";
import { File } from "../file/File";

export interface UploadProductPhotoUseCaseContract {
    uploadProductPhoto(productId: string, file: File): Promise<Partial<ProductModel> | null>;
}