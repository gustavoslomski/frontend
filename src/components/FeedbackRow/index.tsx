import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Button } from '@material-ui/core';
import styles from './styles.module.scss';

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
  date: Date;
}

export function FeedbackRow({ id, author, target, improvement, maintain, suggestion, message }: Feedback) {

  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {author.name}
      </TableCell>
      <TableCell align="left">{target.name}</TableCell>
      <TableCell align="left">{improvement}</TableCell>
      <TableCell align="left">{maintain}</TableCell>
      <TableCell align="left">{suggestion}</TableCell>
      <TableCell align="left">{message}</TableCell>
      <TableCell align="left"><Link className={styles.editButton} to={{ pathname: "/feedback/" + id }}>Editar</Link></TableCell>
    </TableRow>

  )
}