const form = document.querySelector('#form-add-category');


form.addEventListener('submit', (e) => {
    const categoryName = document.querySelector('#categoryName').value
    e.preventDefault();
    fetch('/AddCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            categoryName: categoryName
        }), 
    })
    .then(res => res.json('category added'))
    .then(data => {
        console.log(data);
        window.location.href = '/'
    })
    .catch(error => {
        console.log(error);
    });
});