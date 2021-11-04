import { useState, FormEvent, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import Select from 'react-select';
import moment from 'moment';

type User = {
  id: string;
  github_id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type Feedback = {
  id: string;
  target: {
    id: string;
    github_id: string;
    name: string;
    avatar_url: string;
  }
  author: {
    id: string;
    github_id: string;
    name: string;
    avatar_url: string;
  }
  improvement: string;
  maintain: string;
  suggestion: string;
  message: string;
  date: Date
}
export function SendFeedbackForm(props?: { match?: { params?: { id?: string } } }) {
  const [author, setAuthor] = useState('')
  const [target, setTarget] = useState('')
  const [improvement, setImprovement] = useState('')
  const [maintain, setMaintain] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [message, setMessage] = useState('')

  const [updateMode, setUpdateMode] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>()
  const [usersOptions, setUsersOptions] = useState<User[]>([])


  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    const date = moment().format('YYYY-MM-DD HH:mm:ss');

    let id = props?.match?.params?.id;
    if (typeof id === 'string') {
      await api.put('feedback', {
        id: id, improvement: improvement, maintain: maintain, suggestion: suggestion, message: message, date: date
      })
    } else {
      await api.post('feedback', {
        author, target, improvement, maintain, suggestion, message, date
      }).then(response => {
        location.reload();
      })
    }

    clearValues();
  }

  const clearValues = () => {
    setMessage('');
    setFeedback(undefined);
    setImprovement('');
    setMaintain('');
    setTarget('');
    setAuthor('');
    setSuggestion('');
  }

  useEffect(() => {
    if (typeof props?.match?.params?.id === 'string') {
      setUpdateMode(true);
      api.get<Feedback>('feedback', {
        params: {
          id: props?.match?.params?.id
        }
      }).then(response => {
        setFeedback(response.data)
        setImprovement(response.data.improvement)
        setMaintain(response.data.maintain)
        setMessage(response.data.message)
        setAuthor(response.data.author.name)
        setTarget(response.data.target.name)
        setSuggestion(response.data.suggestion)
      }).catch(err => {
        console.log(err)
      })
    } else {
      clearValues();
    }

    api.get<User[]>('listUsers').then(response => {
      setUsersOptions(response.data)
    })
  }, [])

  // useEffect(() => {
  //   if (typeof props?.match?.params?.id === 'string') return

  //   clearValues();
  // })


  return (
    <>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="usuario">Avaliador (a)</label>
        <Select
          isSearchable
          inputValue={updateMode ? author : undefined}
          noOptionsMessage={() => 'Sem resultado'}
          placeholder="Selecione um usuário"
          id="author"
          name="author"
          isOptionDisabled={() => updateMode}
          onChange={(event) => setAuthor(event?.value || "")}
          className={styles.selectUser}
          options={usersOptions.map(obj => ({
            value: obj?.github_id, label: obj?.name
          }))} />

        <label htmlFor="usuario">Pessoa avaliada</label>
        <Select
          inputValue={updateMode ? target : undefined}
          noOptionsMessage={() => 'Sem resultado'}
          placeholder={!!author ? 'Selecione um usuário' : 'Selecione um avaliador antes'}
          id="target"
          name="target"
          isOptionDisabled={() => (updateMode || !(!!author))}
          onChange={(event) => setTarget(event?.value || "")}
          className={styles.selectUser}
          options={usersOptions.filter(user => user.github_id !== author).map(obj => {
            return {
              value: obj?.github_id, label: obj?.name
            }
          })} />

        <label htmlFor="usuario">Pontos a melhorar</label>
        <textarea
          required={true}
          defaultValue={improvement}
          name="improvement"
          id="improvement"
          placeholder="Indique os pontos que podem melhorar"
          onChange={(event) => setImprovement(event.target.value)}
          value={improvement}
        />

        <label htmlFor="usuario">Pontos a manter</label>
        <textarea
          required={true}
          defaultValue={feedback?.maintain}
          name="maintain"
          id="maintain"
          placeholder="Indique os pontos que devem ser mantidos"
          onChange={(event) => setMaintain(event.target.value)}
          value={maintain}
        />

        <label htmlFor="usuario">Sugestões</label>
        <textarea
          required={true}
          defaultValue={feedback?.suggestion}
          name="suggestion"
          id="suggestion"
          placeholder="Faça sugestões a pessoa avaliada"
          onChange={(event) => setSuggestion(event.target.value)}
          value={suggestion}
        />

        <label htmlFor="feedback">Feedback</label>
        <textarea
          required={true}
          defaultValue={feedback?.message}
          name="feedback"
          id="feedback"
          placeholder="Deixe seu feedback final"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit">Gravar</button>

      </form>
    </>
  )
}