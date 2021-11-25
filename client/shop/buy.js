document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/client/shop/buy')
        .then((res) => res.json())
        .then((data) => {

            loadHTMLTable(data['data']);
        });
});

function loadHTMLTable(data) {

    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-class' colspan='7'>No Data</td></tr>"
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ ID, Name, Price, Available, BuyDate, ExpireDate }) {

        tableHtml += '<tr>';
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${Name}</td>`;
        tableHtml += `<td>${Price}</td>`;
        tableHtml += `<td>${Available}</td>`;
        tableHtml += `<td>${new Date(ExpireDate).toLocaleString().substring(0, 10)}</td>`;

        tableHtml += '</tr>';

    });

    table.innerHTML = tableHtml;
}


// Buy Medicine Form

document.querySelector('.buyMedicineButton').addEventListener('click',
    function (e) {


        var Name = document.querySelector('.customerName').value;
        var ID = document.querySelector('.medicineID').value;
        var Quantity = document.querySelector('.medicineQuantity').value;

        if ((Name !== "") && (ID !== "") && (Quantity !== "")) {
            let id = ID;
            fetch('http://localhost:5000/show/' + id, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((data) => {

                    chackData(data['data'], Name, ID, Quantity);
                });



            // Iinput data into data base if currectly show the input value

            // document.addEventListener('DOMContentLoaded' , ()=>{
            //     fetch('http://localhost:5000/client/admin/availableMedicine')
            //     .then((res) => res.json())
            //     .then((data) => {

            //         loadHTMLTable(data['data']);
            //     });
            // });


            // let msg =  document.querySelector('.successAddDB');
            // msg.innerHTML = 'Successfully Buy';
            // msg.style.color = 'green';
            // fetch('http://localhost:5000/Buy', {
            //     headers: {
            //         'Content-type': 'application/json',
            //     },
            //     method: 'POST',
            //     body: JSON.stringify({ name: Name, prize: Prize, available: Available, buyDate: BuyDate, expireDate: ExpireDate })
            // })
            //     .then((res) => res.json())
            //     .then((data) => insertRowIntoTable(data['data']));

            // document.querySelector('FormReset').reset();
        }
        else {
            let msg = document.querySelector('.successAddDB')
            msg.innerHTML = 'Please input carefully';
            msg.style.color = 'red';
        }




        e.preventDefault();
    });

function chackData(data, Name, ID, Quantity) {

    let msg = document.querySelector('.successAddDB');
    let total = document.querySelector('.totalAmout');

    if (data.length > 0) {
        let Q = data[0].Available;
        if (Q >= Quantity) {
            let TotalAmout = (Quantity * data[0].Price);
            msg.innerHTML = "Sucessfull Buy";
            msg.style.color = 'green';
            total.innerHTML = `Total Pay = ${TotalAmout} Tk`;


            // Insert The Customer (Name, medicine, BuyDate, Total)
            let date1 = new Date().toJSON().slice(0, 10);
            let D = data[0].Name;
            fetch('http://localhost:5000/insert/customer', {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ name: Name, medicine: D, date: date1, total: TotalAmout })
            })
                .then((res) => res.json())
                .then((data) => console.log((data['data'])));


            // update medicine Table (New Quantity ) logic update = (old - BuyNew);
            let update = Q - Quantity;
            console.log(update);
            let id = data[0].ID;
            fetch('http://localhost:5000/update', {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'PATCH',
                body: JSON.stringify({ id: id, available: update })

            })
                .then(response => response.json())
                .then((data) => {

                });
            

                // disable button After buy 
                let diable = document.querySelector('.button');
                diable.style.display = 'none';

                let button2 = document.querySelector('.button2');
                button2.innerHTML = '<button class="reloadPage" >New Buy</button>';
                button2.style.display ='block';
                document.querySelector('reloadPage').addEventListener('click', ()=>{
                    location.reload();
                })
        }
        else {
            msg.innerHTML = `${data[0].Name} is ${Q} pices only`;
            msg.style.color = 'red';
        }

    }
    else {

        msg.innerHTML = "ID is not Valid";
        msg.style.color = 'red';
    }
    // console.log(data);
    // const {id, name, prize, q} = data[0];
    // console.log(data[0].Name);
    // console.log(`${id} ${name} ${prize} ${q}`);
    // console.log(`${Name} ${ID}, ${Quantity}`)
}
