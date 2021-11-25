document.querySelector('table tbody').addEventListener('click', (event)=>{
    if(event.target.className === 'btnDelete'){
        deleteRowById(event.target.dataset.id);
    }
});

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then((data) => {
        if(data.success === true) {
            location.reload();
        }
    });
}
