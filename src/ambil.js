import axios from "axios";
var fs = require('fs');

let headersList = {
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdmVlb2ZmaWNlLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTY2MDY1MTM4NSwiZXhwIjoxNjYwNjU0OTg1LCJuYmYiOjE2NjA2NTEzODUsImp0aSI6InRQQjhxVG13T1pBS1R2ZFciLCJzdWIiOjIwOSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.-GQjAAGhB_9jUz3PrOPYEEDa00TJvrNNIjq-qmb4rPU"
}

let formdata = new FormData();
formdata.append("amount", "40000");
formdata.append("note", "Coba");
formdata.append("images", fs.createReadStream("D:\Gambar & Video & Games\sasazuka.png"));

let bodyContent = formdata;

let reqOptions = {
    url: "http://veeoffice.com/api/deposit",
    method: "POST",
    headers: headersList,
    data: bodyContent,
}

let response = async () => await axios.request(reqOptions);
console.log(response.data);
