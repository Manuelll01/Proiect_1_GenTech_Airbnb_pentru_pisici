const exitButtob = document.querySelector('.exit')
const sideBar = document.querySelector('.side-bar')
const bars = document.querySelector('.bars')

exitButtob.addEventListener('click', () => {
    sideBar.classList.remove("active");
})
bars.addEventListener('click', () => {
    sideBar.classList.add("active");
})