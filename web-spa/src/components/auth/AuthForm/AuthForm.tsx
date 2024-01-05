import { AuthFormProps } from './types'
import Link from 'next/link'
import styles from './styles.module.scss'
import AddButton from '@/components/button'
export const AuthForm: React.FC<AuthFormProps> = ({
  children,
  loading,
  register = false,
  submit,
}) => {
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerContainer}>
        <form
          className={styles.formWrapper}
          onSubmit={(e) => {
            e.preventDefault()
            console.log('Form submitted')
            submit(e)
          }}
        >
          {children}

          <AddButton
            text={register ? 'Cadastrar' : 'Entrar'}
            loading={loading}
          />
        </form>

        {!register && (
          <span className={styles.accountText}>
            Não tem uma conta?
            <Link href="/register" className={styles.accountLink}>
              Cadastre-se
            </Link>
          </span>
        )}
        {register && (
          <span className={styles.accountText}>
            Já tem uma conta?
            <Link href="/" className={styles.accountLink}>
              Entre
            </Link>
          </span>
        )}
      </div>
    </div>
  )
}
