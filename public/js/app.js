
//console.log('client side Javascript file is loaded')

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
  
//     response.json().then((data)=>{
//     console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search =document.querySelector('input')
const messageOne =document.querySelector('#message-1')
const messageTwo =document.querySelector('#message-2')
//messageOne.textContent = 'Form Java script'

   weatherForm.addEventListener('submit',(e)=>{

       e.preventDefault()
       const location = search.value
   //console.log(location)
   messageOne.textContent = 'Loading.....'
   messageTwo.textContent = ' '

   fetch('/weather?address='+location).then((response)=>{
   
     response.json().then((data)=>{ 
     if(data.error){
         ///console.log({error:'You must provide the address'})
         messageOne.textContent = data.error
     } else {
         //console.log(data.location)
         //console.log(data.forecast)
         messageOne.textContent= data.location
         messageTwo.textContent= data.forecast 
     }  

    })
})

})