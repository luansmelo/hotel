import { Validation } from "@/validation/protocols";
import { FieldValidator, ValidationComposite } from "@/validation/validators";
import { MeasureFieldValidatorAdapter } from "@/validation/validators/MeasureValidationAdapter";
import { RequiredFieldValitation } from "@/validation/validators/RequiredFieldValidation";

export const makeMeasureValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];
    const requiredFields = [
        'name'
    ];

    for (const field of requiredFields) {
        validations.push(new RequiredFieldValitation(field));
    }

    const measureValidator = new FieldValidator(new MeasureFieldValidatorAdapter());

    validations.push(measureValidator);

    return new ValidationComposite(validations);
};
