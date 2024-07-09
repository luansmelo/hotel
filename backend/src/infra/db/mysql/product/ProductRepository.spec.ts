import prisma from "@/config/prisma";
import { ProductRepository } from "./ProductRepository";
import { IngredientRepository } from "../ingredient/IngredientRepository";
import { MeasureRepository } from "../measure/MeasureRepository";
import { GroupRepository } from "../group/GroupRepository";

const makeFakeProduct = () => ({
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    accession: 100,
    preparationTime: '00:45',
    resource: 'any_resourse'
});

const makeFakeInput = () => ({
    id: "any_input_id",
    name: 'any_name',
    code: 'any_code',
    unitPrice: 3,
    measurementId: 'any_measure_id',
    groups: ["any_id"]
});

const makeFakeGroup = () => ({
    name: 'any_group'
});

const makeFakeAddInputToProduct = () => ({
    productId: "any_id",
    ingredients: [
        {
            id: "any_input_id",
            grammage: 4,
            measurement: "any_measure"
        }
    ]
});

const makeSut = () => ({
    product: new ProductRepository(),
    input: new IngredientRepository(),
    measurement: new MeasureRepository(),
    group: new GroupRepository()
});

describe('Product MySQL Repository', () => {
    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM \`group\`;`;
        await prisma.$executeRaw`DELETE FROM \`input\`;`;
        await prisma.$executeRaw`DELETE FROM product;`;
        await prisma.$executeRaw`DELETE FROM measurement;`;
    });

    afterAll(async () => {
        prisma.$disconnect();
    });

    it('should return a Product on success on create', async () => {
        const sut = makeSut();
        const Product = await sut.product.create(makeFakeProduct());

        expect(Product).toBeTruthy();
    });

    it('should add inputs to the product on success', async () => {
        const { product, group, input, measurement } = makeSut();

        const groupCreate = await group.create(makeFakeGroup());

        const measurementResponse = await measurement.create({ name: 'any_measure' });

        const data = {
            ...makeFakeInput(),
            groupIds: [groupCreate.id],
            measurementId: measurementResponse.id as string
        };

        await input.create(data);
        await product.create(makeFakeProduct());

        const addInput = await product.addInput(makeFakeAddInputToProduct());

        expect(addInput).toBeTruthy();
    });

    it('should delete an inputs on success on delete inputs', async () => {
        const { product, group, input, measurement } = makeSut();

        const groupCreate = await group.create(makeFakeGroup());

        const measurementResponse = await measurement.create({ name: 'any_measure' });

        const data = {
            ...makeFakeInput(),
            groupIds: [groupCreate.id],
            measurementId: measurementResponse.id as string
        };

        const inputCreated = await input.create(data);

        const createdProduct = await product.create(makeFakeProduct());

        await product.addInput(makeFakeAddInputToProduct());

        const removeInput = await product.deleteProduct({ productId: createdProduct.id, ingredientId: inputCreated.id })

        expect(removeInput).toBeTruthy()
    });

    it('should return a list of products', async () => {
        const sut = makeSut();
        const createProduct = await sut.product.create(makeFakeProduct());
        const product = await sut.product.loadAll({ page: 1 });

        expect(product).toEqual({
            products: [{
                ...createProduct,
                inputs: []
            }],
            totalPages: 1,
            totalItems: 1
        });
    });

    it('should return an updated Product on success on UpdateProduct', async () => {
        const sut = makeSut();
        const createProduct = await sut.product.create(makeFakeProduct());
        const updateProduct = await sut.product.updateById(createProduct.id, {
            name: 'new_name',
            ingredients: null
        });

        expect(updateProduct.name).toBe('new_name');
    });

    it('should delete a Product on success on deleteProduct', async () => {
        const sut = makeSut();
        const createProduct = await sut.product.create(makeFakeProduct());
        const deleteProduct = await sut.product.deleteById(createProduct.id);

        expect(deleteProduct).toEqual(createProduct);
    });

    it('should return a Product on success on loadById', async () => {
        const sut = makeSut();
        const createProduct = await sut.product.create(makeFakeProduct());
        const loadProductById = await sut.product.loadById(createProduct.id);

        expect(loadProductById).toEqual({
            ...createProduct,
            inputs: []
        });
    });

    it('should return null if Product not found on loadById', async () => {
        const sut = makeSut();
        const loadProductById = await sut.product.loadById('any_id');

        expect(loadProductById).toBeNull();
    });

    it('should return a Product on success on loadByName', async () => {
        const sut = makeSut();
        const createProduct = await sut.product.create(makeFakeProduct());
        const loadProductById = await sut.product.loadByName(createProduct.name);

        expect(loadProductById).toEqual(createProduct);
    });

    it('should return null if Product not found on loadByName', async () => {
        const sut = makeSut();
        const loadProductById = await sut.product.loadByName('any_name');

        expect(loadProductById).toBeNull();
    });
});
