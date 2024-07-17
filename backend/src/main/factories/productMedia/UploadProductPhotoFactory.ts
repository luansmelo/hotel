import { UploadProductPhoto } from "@/data/usecases/product/UploadProductPhotoUseCase";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";
import { UploadProductPhotoController } from "@/presentation/controllers/products/UploadProductProfileController";

export const makeUploadProductPhotoController = (): UploadProductPhotoController => {
  const productRepository = new ProductRepository();
  
  const uploadUserPhotoUseCase = new UploadProductPhoto(productRepository, productRepository);
  
  return new UploadProductPhotoController(uploadUserPhotoUseCase);
};