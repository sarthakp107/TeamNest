import React from 'react'

import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

//styles
import './Project.css';

export default function Project() {
  const{ id } = useParams();
  const {error, document} = useDocument('projects' , id);

  return (
    <div>Project details</div>
  )
}
