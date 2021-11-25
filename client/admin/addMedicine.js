
document.querySelector('.addMedicineButton').addEventListener('click',
    function (e) {


        let Name = document.querySelector('.addMedicineName').value;
        let Prize = document.querySelector('.addMedicinePrize').value;
        let Available = document.querySelector('.addMedicineAvailable').value;
        let BuyDate = document.querySelector('.addMedicineBuyDate').value;
        let ExpireDate = document.querySelector('.addMedicineExpireDate').value;

        if ((Name !== "") && (Prize !== "") && (Available !== "") && (BuyDate !== "") && (ExpireDate !== "")) {
            console.log("Hasan");
            let msg =  document.querySelector('.successAddDB');
            msg.innerHTML = 'Successfully added';
            msg.style.color = 'green';
            fetch('http://localhost:5000/insert', {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ name: Name, prize: Prize, available: Available, buyDate: BuyDate, expireDate: ExpireDate })
            })
                .then((res) => res.json())
                .then((data) => insertRowIntoTable(data['data']));

            // disable button After buy 
           
        }
        else{
            let msg = document.querySelector('.successAddDB')
            msg.innerHTML = 'No Data in form';
            msg.style.color = 'red';
        }
        



        e.preventDefault();
    });

function insertRowIntoTable(data) {
    let diable = document.querySelector('.button');
    diable.style.display = 'none';

    let button2 = document.querySelector('.button2');
    button2.innerHTML = '<button class="reloadPage" >New Add</button>';
    button2.style.display ='block';
    document.querySelector('reloadPage').addEventListener('click', ()=>{
        location.reload();
    })
}