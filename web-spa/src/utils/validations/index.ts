type ValidationFunction<T> = (value: T) => boolean

const validateField = <T>(
  name: string,
  value: T,
  validationFn: ValidationFunction<T>
): string => {
  return validationFn(value) ? '' : `${name} é obrigatório`
}

const isNotEmpty: ValidationFunction<string> = (value) => value.trim() !== ''
const isNumber: ValidationFunction<string> = (value) => !isNaN(Number(value))

export { validateField, isNotEmpty, isNumber }
