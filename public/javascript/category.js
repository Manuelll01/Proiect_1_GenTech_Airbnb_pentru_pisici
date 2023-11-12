const exitButtob = document.querySelector('.exit')
const sideBar = document.querySelector('.side-bar')
const bars = document.querySelector('.bars')

exitButtob.addEventListener('click', () => {
    sideBar.classList.remove("active");
})
bars.addEventListener('click', () => {
    sideBar.classList.add("active");
})



const deleteCategory = document.querySelector('#delete-button')

deleteCategory.addEventListener('click', async (e) => {
    e.preventDefault()
    
    try {
        const response = await fetch(`http://localhost:3000${window.location.pathname}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const result = await response.text();
            window.location.href = '/'
            
            console.log(result);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Delete error:', error);
    }
})
