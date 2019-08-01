import React from 'react'
import NewQuestion from '../components/NewQuestion'
import EditQuestion from '../components/EditQuestion'

function Question ({...props}) {
  const { match: { params } } = props
  if (params.id) return <EditQuestion className="question-section" id={params.id} />
  else return <NewQuestion/>
}

export default Question