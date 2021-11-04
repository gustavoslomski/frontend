import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FeedbackRow } from '../FeedbackRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type Feedback = {
  id: string;
  author: {
    id: string;
    github_id: string;
    name: string;
    avatar_url: string;
  }
  target: {
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

export function FeedbackList({ strict = true }) {

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  useEffect(() => {
    let route = strict ? 'myFeedbacks' : 'myFeedbackForOther'
    api.get<Feedback[]>(route).then(response => {
      setFeedbacks(response.data)
    })
  })

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Avaliador (a)</TableCell>
              <TableCell align="left">Pessoa Avaliada</TableCell>
              <TableCell align="left">Pontos a manter</TableCell>
              <TableCell align="left">Pontos a melhorar</TableCell>
              <TableCell align="left">Sugestões</TableCell>
              <TableCell align="left">Feedback</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(feedbacks || []).map((row) => {
              return (
                FeedbackRow(row)
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}