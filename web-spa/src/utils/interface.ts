export interface Error<T> {
  errors: Partial<T>
  setErrors: React.Dispatch<React.SetStateAction<Partial<T>>>
}
