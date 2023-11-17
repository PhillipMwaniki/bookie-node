import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidatorOptions,
    registerDecorator
} from "class-validator";
import { AppDataSource } from "../../database/data-source";
import { Not } from "typeorm";

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    async validate(value: any, validationArguments: ValidationArguments): Promise<boolean> {
        const [entity, field] = validationArguments.constraints;

        const repo = AppDataSource.getRepository(entity);
        const isUpdate: boolean = validationArguments.object["id"] !== undefined;
        let count = 0;

        if (!isUpdate) {
            count = await repo.count({ where: { [field]: value } });
        } else {
            count = await repo.count({ where: { [field]: value, id: Not(validationArguments.object["id"]) } });
        }



        return count <= 0;
    }
    defaultMessage?(validationArguments?: ValidationArguments | undefined): string {
        return `$property is already in use`;
    }

}

export function IsUnique(entity: any, field: string, validatorOptions?: ValidatorOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validatorOptions,
            constraints: [entity, field],
            validator: IsUniqueConstraint,
        })
    }
}
