const body = document.getElementsByTagName('body')[0]
const versusSelector = document.querySelector('.versus-selector')

const light = document.getElementById('light')
const night = document.getElementById('night')

const displayTheme = document.querySelector('.display-theme')

light.onclick = () => {
    light.style.display = 'none'
    night.style.display = 'flex'
    night.style.color = 'white'
    body.style.backgroundColor = '#0D1821'
    displayTheme.style.border = '1px solid white'
    versusSelector.style.border = '1px solid white'
    localStorage.setItem('theme', 'night')
}
night.onclick = () => {
    night.style.display = 'none'
    light.style.display = 'flex'
    light.style.color = 'black'
    body.style.backgroundColor = 'white'
    displayTheme.style.border = '1px solid #0D1821'
    versusSelector.style.border = '1px solid #0D1821'
    localStorage.setItem('theme', 'light')
}


if (localStorage.getItem('theme') == 'night') {
    light.click()
}
