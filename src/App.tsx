import { useContext } from 'react';
import styles from './App.module.scss';
import { LoginBox } from './components/LoginBox';
import { FeedbackList } from './components/FeedbackList';
import { SendFeedbackForm } from './components/SendFeedbackForm';
import { AuthContext } from './contexts/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';

export function App() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <>
      <main className={styles.contentWrapper}>
        {!!user ?
          <>
            <div className="header">
              <Router>
                <div>
                  <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                      <Link className={styles.menuItem} to="/">Início</Link>
                    </li>
                    <li className={styles.menuItem} >
                      <Link className={styles.menuItem} to="/feedback">Novo Feedback</Link>
                    </li>
                    <li className={styles.menuItem}>
                      <Link className={styles.menuItem} to="/myFeedbacks">Meus feedbacks</Link>
                    </li>
                    <li className={styles.menuItem}>
                      <Link className={styles.menuItem} to="/myFeedbackForOther">Feedback de outros Usuários</Link>
                    </li>
                  </ul>

                  <hr />
                  <Switch>
                    <Route exact path="/">
                      <div className={styles.userCard}>
                        <button onClick={signOut} className={styles.signOutButton}>
                          <VscSignOut size="32" />
                        </button>

                        <header className={styles.userInformation}>
                          <div className={styles.userImage}>
                            <img src={user?.avatar_url} alt={user?.name} />
                          </div>
                          <span className={styles.userGithub}>
                            <VscGithubInverted size="16" />
                            {user?.login}
                          </span>
                        </header>
                      </div>
                    </Route>

                    <Route exact path="/feedback" component={SendFeedbackForm} />
                    <Route exact path="/feedback/:id" component={SendFeedbackForm} />
                    <Route path="/myFeedbacks" render={(props) => <FeedbackList strict={true} />} />
                    <Route path="/myFeedbackForOther" render={(props) => <FeedbackList strict={false} />} />
                  </Switch>
                </div>
              </Router>
            </div>
          </> : <LoginBox />}
      </main>
    </>
  )
}
