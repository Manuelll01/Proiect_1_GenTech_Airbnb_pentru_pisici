const exitButtob = document.querySelector('.exit')
const sideBar = document.querySelector('.side-bar')
const bars = document.querySelector('.bars')

exitButtob.addEventListener('click', () => {
    sideBar.classList.remove("active");
})
bars.addEventListener('click', () => {
    sideBar.classList.add("active");
})


const deleteButton = document.querySelector('#deleteButton')

deleteButton.addEventListener('click', async (e) => {
    e.preventDefault()
    

    try {
        const category = decodeURIComponent(window.location.pathname.split('/')[1])
        const currentPath = window.location.pathname
        const response = await fetch('/DecrementNumber', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: category
            }),
        });
        const response2 = fetch(`${currentPath}`, { method: 'DELETE' })
        

        if (response.ok) {
            const result = await response.text();
            
            console.log(result);
        }
        if(response2.ok){
            const result = await response2.text();
            
            console.log(result);
        }
         else {
            console.error('Error:', response.statusText);
        }
        window.location.href = '/'
    } catch (error) {
        console.error('Fetch error:', error);
    }
})


const addCommentForm = document.querySelector('#addCommentForm')

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        const commenterName = document.querySelector('#commenterName').value
        const commenterText = document.querySelector('#commenterText').value
        const response = await fetch(`${window.location.pathname}/addComment`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: commenterName,
                content: commenterText
            }),
            
        });
        if (response.ok) {
            const result = await response.json();
            location.reload();
            console.log(result);
        }
    } catch (error) {
        console.error("Error adding comment: ", error)
    }
})
