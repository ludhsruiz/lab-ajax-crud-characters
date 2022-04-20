const charactersAPI = new APIHandler();


///// MINION LIST ///

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

      charactersAPI

        .getFullList()
        .then((minions)=> {

          let minionCard = ''
          minions.data.forEach(elm => minionCard +=`
          <div class="character-info">
          <div class="name">Character Name: ${elm.name}</div>
          <div class="occupation">Character Occupation:${elm.occupation}</div>
          <div class="cartoon">Is a Cartoon?${elm.cartoon}</div>
          <div class="weapon">Character Weapon : ${elm.weapon}</div>
          </div>`)

          document.querySelector('.characters-container').innerHTML = minionCard
        })
       
        .catch(err => console.log(err))    

  });


///// MINION BY ID  ///

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()
      const characterId = document.querySelector('.operation input').value

      charactersAPI

        .getOneRegister (characterId)
        .then(({data})=> {

          let minionCard =`
          <div class="character-info">
          <div class="name">Character Name: ${data.name}</div>
          <div class="occupation">Character Occupation:${data.occupation}</div>
          <div class="cartoon">Is a Cartoon?${data.cartoon}</div>
          <div class="weapon">Character Weapon: ${data.weapon}</div>
          </div>`

          document.querySelector('.characters-container').innerHTML = minionCard
        })
       
        .catch(err => console.log(err)) 

  });


///// MINION DELETE ///

  document.getElementById('delete-one').addEventListener('click', function (event) {

    event.preventDefault()
    const btn = document.getElementById('delete-one')
    const characterId = document.querySelector('.operation-delete input').value

    charactersAPI
    
       .deleteOneRegister (characterId)
       .then(minion=> {          
        btn.style.background = 'green'
      })
     
      .catch(err => btn.style.background = 'red') 


  });


  ///// MINION EDIT ///

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const btn = document.getElementById('send-data-update')  

    const inputs = document.querySelectorAll('#edit-character-form input')
    const characterId = inputs[0].value
        
    const characterInfo = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    charactersAPI
      .updateOneRegister (characterId, characterInfo)
      .then(updatedMinion => {
        document.querySelector('#edit-character-form').reset()    
        btn.style.background = 'green'
      })

      .catch(err => btn.style.background = 'red') 


  });



  ///// MINION CREATE ///

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const btn = document.getElementById('send-data')  

    const inputs = document.querySelectorAll('#new-character-form input')

    const characterInfo = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister (characterInfo)
      .then(createdMinion => {
        document.querySelector('#new-character-form').reset()
        btn.style.background = 'green'
      })


    .catch(err => btn.style.background = 'red') 

  });


});
