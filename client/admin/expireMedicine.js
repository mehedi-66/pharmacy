document.addEventListener('DOMContentLoaded' , ()=>{
   
    fetch('http://localhost:5000/client/admin/expireMedicine')
    .then((res) => res.json())
    .then((data) => {
       
        loadHTMLTable(data['data']);
    });
});

function loadHTMLTable(data){

    console.log(data);
    const table = document.querySelector('table tbody');
    
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-class' colspan='7'>No Data</td></tr>"
        return ;
    }

    let tableHtml = "";

    data.forEach(function ({ID, Name, Price, Available, BuyDate, ExpireDate}){
       
        tableHtml += '<tr>';
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${Name}</td>`;
        tableHtml += `<td>${Price}</td>`;
        tableHtml += `<td>${Available}</td>`;
        tableHtml += `<td>${new Date(BuyDate).toLocaleString().substring(0,10)}</td>`;
        tableHtml += `<td>${new Date(ExpireDate).toLocaleString().substring(0,10)}</td>`;
        tableHtml += `<td><button class="btnDelete" data-id = ${ID}>Delete</button></td>`;
    
        tableHtml += '</tr>';

    });
    
    table.innerHTML = tableHtml;
}