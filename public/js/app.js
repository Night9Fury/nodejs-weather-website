

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')

//messageOne.textContent = 'from j'

weatherForm.addEventListener('submit',(e) => {
  e.preventDefault()

  const location=search.value

  messageOne.textContent='Loading...'
  messageSecond.textContent=''


  fetch('/weather?address='+location).then((response) => {
    response.json().then((data) =>{
      if (data.error) {
          messageOne.textContent=data.error
      } else {
        messageOne.textContent=data.place
        messageSecond.textContent=data.weather
      }
    })
  })
})
