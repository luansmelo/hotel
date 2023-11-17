import { LoginFormProps } from './types'
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import AddButton from '@/components/addButton'

export const AuthForm: React.FC<LoginFormProps> = ({
  children,
  forgotPassword,
  register = false,
  submit,
  loading,
}) => {
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerContainer}>
        <div className={styles.logo} style={{ marginBottom: '20px' }}>
          <Image src="/chef-hat.png" alt="" width={110} height={110} />
          <p>App</p>
          <span />
        </div>

        <form
          className={styles.formWrapper}
          onSubmit={(e) => {
            e.preventDefault()
            console.log('Form submitted')
            submit(e)
          }}
        >
          {children}
          {forgotPassword && (
            <span>
              <a href="#" className={styles.forgotPasswordLink}>
                Esqueceu sua senha?
              </a>
            </span>
          )}

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
