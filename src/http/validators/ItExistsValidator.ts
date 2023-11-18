import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidatorOptions,
    registerDecorator
} from "class-validator";
import { AppDataSource } from "../../database/data-source";

@ValidatorConstraint({ async: true })
export class ItExistsConstraint implements ValidatorConstraintInterface {
    async validate(value: any, validationArguments: ValidationArguments): Promise<boolean> {
        const [entity, field] = validationArguments.constraints;

        const repo = AppDataSource.getRepository(entity);

        const count = await repo.count({ where: { [field]: value } });



        return count > 0;
    }
    defaultMessage?(validationArguments?: ValidationArguments | undefined): string {
        return `$property does not exist`;
    }
}

export function ItExists(entity: any, field: string, validatorOptions?: ValidatorOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validatorOptions,
            constraints: [entity, field],
            validator: ItExistsConstraint,
        })
    }
}

