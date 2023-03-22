const body = document.getElementsByTagName('body')[0]
const difficultySelector = document.querySelector('.difficulty-selector')
const nameSelecter = document.querySelector('.name-selector')
const light = document.getElementById('light')
const night = document.getElementById('night')

const displayTheme = document.querySelector('.display-theme')

const easyButton = document.getElementById('easy-button')
const mediumButton = document.getElementById('medium-button')
const hardButton = document.getElementById('hard-button')

const userName = document.getElementById('name')
const playerName1 = document.getElementById('name-1')
const playerName2 = document.getElementById('name-2')
const saveName = document.getElementById('save-name')
const saveName1 = document.getElementById('save-name-1')
const saveName2 = document.getElementById('save-name-2')
const saveNameIcon = document.getElementById('save-name-icon')
const saveNameIcon1 = document.getElementById('save-name-icon-1')
const saveNameIcon2 = document.getElementById('save-name-icon-2')
const playButton = document.getElementById('play-button')
const playButton2 = document.getElementById('play-button-2')


if(localStorage.getItem('vs') == 'c'){
    difficultySelector.style.display = 'flex'
}
else if(localStorage.getItem('vs') == 'p'){
    nameSelecter.style.display = 'flex'
}


if (localStorage.getItem('name') != null) {
    userName.value = localStorage.getItem('name')
    saveName.style.color = 'green'
}
if (localStorage.getItem('name-1') != null) {
    playerName1.value = localStorage.getItem('name-1')
    saveName1.style.color = 'green'
}
if (localStorage.getItem('name-2') != null) {
    playerName2.value = localStorage.getItem('name-2')
    saveName2.style.color = 'green'
}


userName.onkeyup = () => {
    if(userName.value.trim() != '' && userName.value.trim() != localStorage.getItem('name')){
        saveNameIcon.style.color = 'green'
    }
    else{
        saveNameIcon.style.color = 'rgba(0, 128, 0, 0.5)'
    }
}
playerName1.onkeyup = () => {
    if(playerName1.value.trim() != '' && playerName1.value.trim() != localStorage.getItem('name-1')){
        saveNameIcon1.style.color = 'green'
    }
    else{
        saveNameIcon1.style.color = 'rgba(0, 128, 0, 0.5)'
    }
}
playerName2.onkeyup = () => {
    if(playerName2.value.trim() != '' && playerName2.value.trim() != localStorage.getItem('name-2')){
        saveNameIcon2.style.color = 'green'
    }
    else{
        saveNameIcon2.style.color = 'rgba(0, 128, 0, 0.5)'
    }
}

saveName.onclick = () => {
    if(userName.value.trim() != '' && userName.value.trim() != localStorage.getItem('name')){
        localStorage.setItem('name', userName.value.trim())
        saveNameIcon.style.color = 'rgba(0, 128, 0, 0.5)'
    }
}
saveName1.onclick = () => {
    if(playerName1.value.trim() != '' && playerName1.value.trim() != localStorage.getItem('name-1')){
        localStorage.setItem('name-1', playerName1.value.trim())
        saveNameIcon1.style.color = 'rgba(0, 128, 0, 0.5)'
    }
}
saveName2.onclick = () => {
    if(playerName2.value.trim() != '' && playerName2.value.trim() != localStorage.getItem('name-2')){
        localStorage.setItem('name-2', playerName2.value.trim())
        saveNameIcon2.style.color = 'rgba(0, 128, 0, 0.5)'
    }
}


light.onclick = () => {
    light.style.display = 'none'
    night.style.display = 'flex'
    night.style.color = 'white'
    body.style.backgroundColor = '#0D1821'
    displayTheme.style.border = '1px solid white'
    difficultySelector.style.border = '1px solid white'
    nameSelecter.style.border = '1px solid white'
    localStorage.setItem('theme', 'night')
}
night.onclick = () => {
    night.style.display = 'none'
    light.style.display = 'flex'
    light.style.color = 'black'
    body.style.backgroundColor = 'white'
    displayTheme.style.border = '1px solid #0D1821'
    difficultySelector.style.border = '1px solid #0D1821'
    nameSelecter.style.border = '1px solid #0D1821'
    localStorage.setItem('theme', 'light')
}


if (localStorage.getItem('theme') == 'night') {
    light.click()
}



playButton.onclick = () => {

    if(saveNameIcon.style.color == 'green' || localStorage.getItem('name') == null){
        alert('Same your name and start the game!..')
    }
    else{
        if(easyButton.checked == true){
            localStorage.setItem('difficulty', 'easy')
            window.location.href = './game'
        }
        else if(mediumButton.checked == true){
            localStorage.setItem('difficulty', 'medium')
            window.location.href = './game'
        }
        else if(hardButton.checked == true){
            localStorage.setItem('difficulty', 'hard')
            window.location.href = './game'
        }
        else{
            alert('Select Difficulty')
        }
    }

    

}
playButton2.onclick = () => {

    if(saveNameIcon1.style.color == 'green' || localStorage.getItem('name-1') == null || saveNameIcon2.style.color == 'green' || localStorage.getItem('name-2') == null){
        alert('Same your name and start the game!..')
    }
    else{
        window.location.href = './game.html' 
    }
}