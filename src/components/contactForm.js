import React from 'react'
import './contactForm.css'

export default function ContactForm() {


  return (
    <>
      <form action="">
        <div className="inputBox">
          <label htmlFor="name">Name</label>
          <input required type="text" name="name" id="name"/>
        </div>
        <div className="inputBox">
          <label htmlFor="name">Email</label>
          <input required type="email" name="email" id="email"/>
        </div>
        <div className="inputBox">
          <label required htmlFor="info">More Information:</label>
          <textarea id="info" name="info"></textarea>
        </div>
        <div>
          <button type="submit">Отправить</button>
        </div>
      </form>
    </>
  )
}