import React, { useState } from 'react'
import './contactForm.css'

const axios = require("axios")

const endpoints = {
  contact: "/.netlify/functions/sendEmail",
}

export default function ContactForm() {

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    info: '',
  })

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    let { name, email, info } = formState
    let data = { name, email, info }
    axios.post(endpoints.contact, JSON.stringify(data)).then(response => {
      if (response.status !== 200) {
        handleError()
      } else {
        handleSuccess()
      }
    })
    e.preventDefault()
  }

  const handleSuccess = () => {
    setFormState({
      name: '',
      email: '',
      info: '',
    })
  }

  const handleError = msg => {
    setFormState({
      error: true,
      msg
    })
    alert('Your message could not be sent. Sorry about that.')
  }


  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputBox">
          <label htmlFor="name">Name</label>
          <input required type="text" name="name" id="name" onChange={handleChange} />
        </div>
        <div className="inputBox">
          <label htmlFor="email">Email</label>
          <input required type="email" name="email" id="email" onChange={handleChange} />
        </div>
        <div className="inputBox">
          <label required htmlFor="info">More Information:</label>
          <textarea id="info" name="info" onChange={handleChange} ></textarea>
        </div>
        <div>
          <button type="submit">Отправить</button>
        </div>
      </form>
    </>
  )
}