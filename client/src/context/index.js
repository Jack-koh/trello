import { ValidatorContext, ValidatorProvider, ValidatorSubmit } from './validator/ValidatorContext';
import { validator } from './validator/ValidatorRules';
import { customValidator } from './validator/customValidator';

export const validation = {
  ValidatorContext,
  ValidatorProvider,
  ValidatorSubmit,
  validator,
  customValidator,
};
