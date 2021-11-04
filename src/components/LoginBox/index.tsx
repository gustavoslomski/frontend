import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext)

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Bem vindo (a), entre para continuar</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted /> Entrar com Github
      </a>
    </div>
  )
}