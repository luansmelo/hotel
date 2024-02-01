import { useCallback, useState } from 'react'

const useGrammageValidation = () => {
  const [isGrammageValid, setIsGrammageValid] = useState(true)

  const validateGrammage = useCallback((value: string) => {
    const isValid = Number(value) > 0 && !isNaN(Number(value))
    setIsGrammageValid(isValid)
  }, [])

  return { isGrammageValid, validateGrammage }
}

export default useGrammageValidation
