import React, {useState, useEffect} from 'react';
import './styles.css'
import {Card} from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState('') 
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})
  function addNewStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString('pt-br', {
        hour: '2-digit', minute:'2-digit', second:'2-digit'
      })
    }
    setStudents(prevState => [...prevState, newStudent])
  }
  useEffect(() => {
    fetch('https://api.github.com/users/lucassdantas')
    .then(answer => answer.json())
    .then(answer => {
      setUser({
        name: answer.name,
        avatar: answer.avatar_url
      })
    })
  }, [user])
  return (
    <div className='container'>
      <header>
        <h1>Nome do estudante</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='imagem'/>

        </div>
      </header>
      <input 
        type='text' 
        placeholder='Nome'
        onChange={e => setStudentName(e.target.value)}
      />
      <button type='button' onClick={addNewStudent}>
        Adicionar
      </button>
      {
        students.map(student => <Card name={student.name} time={student.time} key={student.time}/>)
      }
    </div>
  ) 
}

