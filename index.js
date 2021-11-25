const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create database conection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pharmacy'
    
});

db.connect((err) =>{
    if(err) throw err;
    else{
        console.log('db ' + db.state);
    }
});

// create class for instance

let instance = null;
class dbService{
    static getDbServiceInstance(){
        return instance ? instance : new dbService();
    }

    async getAllData() {
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM medicine;';
                db.query(sql, (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }


    async getAllDataAvailabeAndNotExpire() {
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM medicine WHERE Available > 0 AND ExpireDate > CURRENT_DATE();';
                db.query(sql, (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }


    // Show data with ID 
    async showDataWithID(id) {
        id = parseInt(id, 10);
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM medicine WHERE id = ?';
                db.query(sql, [id], (err,result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }
    // ExpireDate show Medicine

    async getExpireMedicine() {
       
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM medicine WHERE ExpireDate < CURRENT_DATE();';
                db.query(sql, (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }

    async getOutOfStock() {
       
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM medicine WHERE Available <= 0;';
                db.query(sql, (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }


    // insert new row
    async insertNewRow(name, prize, available, buyDate, expireDate) {
        try{
            const insertId = await new Promise((resolve, reject) => {

                const sql = 'INSERT INTO medicine (Name, Price, Available, BuyDate, ExpireDate) VALUES (?,?,?,?,?);';

                db.query(sql, [name, prize, available, buyDate, expireDate],(err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            console.log(insertId);
            //return response;
        }
        catch(e){
            console.log(e);
        }
    }

    // insert Customer and total amount
    
    async insertNewRowCustomer(name, medicine, date, total) {
        try{
            const insertId = await new Promise((resolve, reject) => {

                const sql = 'INSERT INTO customer (Name, Medicine, BuyDate, Total) VALUES (?,?,?, ?);';

                db.query(sql, [name, medicine, date, total],(err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            console.log(insertId);
            //return response;
        }
        catch(e){
            console.log(e);
        }
    }
    // get customer data for today's Sales 
    async getTodaySales() {
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM customer WHERE BuyDate = CURRENT_DATE();';
                db.query(sql, (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }

    

    // Get all the total sales in The Pharmacy
    async getAllTotalSales() {
        try{
            const response = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM customer ;';
                db.query(sql, (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }


    // Delete row
    async deleteRowById(id) {
        id = parseInt(id, 10);
        try{
            const deleteRow = await new Promise((resolve, reject) => {

                const sql = 'DELETE FROM medicine WHERE id = ?;';

                db.query(sql, [id],(err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            
            return deleteRow === 1 ? true : false;
        }
        catch(e){
            console.log(e);
            return false;
        }
    }

    // Update with
   
    async  updateWithId(id, available) {
        id = parseInt(id, 10);
        try{
            const updateRow = await new Promise((resolve, reject) => {
                console.log('Updating' + available);
                const sql = 'UPDATE medicine SET available = ? WHERE id = ?;';

                db.query(sql, [available, id],(err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            
            return updateRow === 1 ? true : false;
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
 
};


// create
app.post('/insert', (req, res)=>{

        const {name, prize, available, buyDate, expireDate} = req.body;

        // console.log(name + " " + prize + " " + available + " " + buyDate + " " + expireDate);
        const DB = dbService.getDbServiceInstance(); 
        const results = DB.insertNewRow(name, prize, available, buyDate, expireDate);
      
        results
        .then((data)=> res.json({success: true}))
        .catch((err)=>console.error(err));
});


app.post('/insert/customer', (req, res)=>{

    const {name, medicine, date, total} = req.body;

    //console.log(name + " " + medicine + " " + date + " " + total);
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.insertNewRowCustomer(name, medicine, date, total);
  
    results
    .then((data)=> res.json({success: true}))
    .catch((err)=>console.error(err));
});
// read For customer todays data Sales 

app.get('/client/shop/todaySales', (req, res)=>{
    console.log(`MehediHasanHi`);
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.getTodaySales();
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});

// Read data for Total Sales in The Pharmacy
app.get('/client/shop/totalSales', (req, res)=>{
    console.log(`MehediHasanHi`);
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.getAllTotalSales();
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});


app.get('/client/admin/availableMedicine', (req, res)=>{
    console.log(`MehediHasanHi`);
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.getAllData();
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});



app.get('/client/admin/expireMedicine', (req, res)=>{
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.getExpireMedicine();
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});

// Read Of of stock data
app.get('/client/admin/outOfStockMedicine', (req, res)=>{
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.getOutOfStock();
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});

// read for Buy Available Medicine information Shop page Here
app.get('/client/shop/buy', (req, res)=>{
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.getAllDataAvailabeAndNotExpire();
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});

// Read data from databse with ID
app.get('/show/:id', (req, res)=>{
    const {id} = req.params;
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.showDataWithID(id);
  
    results
    .then((data)=> res.json({data: data}))
    .catch((err)=>console.error(err));
    
});



// update
app.patch('/update', function(req, res){
    
    const {id, available} = req.body;
    console.log(available);
    const DB = dbService.getDbServiceInstance(); 
    const results = DB. updateWithId(id, available);
  
    results
    .then((data)=> res.json({success: data}))
    .catch((err)=>console.error(err));
});


// delete
app.delete('/delete/:id', function(req, res){
    const {id} = req.params;
    const DB = dbService.getDbServiceInstance(); 
    const results = DB.deleteRowById(id);
  
    results
    .then((data)=> res.json({success: data}))
    .catch((err)=>console.error(err));
    
});



// listen for backend 
app.listen(process.env.PORT, ()=>{
    console.log(`Server is Listen ${process.env.PORT}`);
});
















/*
    ================== Pratice mySql ==============
const express = require('express');
const mysql = require('mysql');

// conection into database

const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    database: 'pharmacy'
});

// conection

db.connect((err)=>{
    if(err){
        throw err;
    }
   
    console.log('MySql connected....');
});





var app = express();

// Create DB 

app.get('/createdb', (req, res)=>{
    let sql = 'CREATE DATABASE pharmacy';
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        else{
            console.log(result); 
            res.send('databse create...');
        }
    })
});

// Create table

app.get('/createpoststable', ()=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';

    db.query(sql, (err, result) =>{

        if(err){
            throw err;
        }
        else{
            console.log(result);
            res.send('Post table create');
        }
    })
});

// create posts

app.get('/addpost1', (err, res)=>{
    let post = {
        title: 'post one',
        body: 'This post number one'
    };

    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if(err)
        {
            throw err;
        }
        else{
            console.log(result);
            res.send('post 1 added...');
        }
    })
});


app.get('/addpost2', (err, res)=>{
    let post = {
        title: 'post Two',
        body: 'This post number one'
    };

    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if(err)
        {
            throw err;
        }
        else{
            console.log(result);
            res.send('post 2 added...');
        }
    })
});

// Select All posts

app.get('/getposts', (req, res)=>{
   
   
        let sql = 'SELECT * FROM posts';
        let query = db.query(sql, (err, results) =>{
            if(err) throw err;
            else{
                console.log(results);
                res.send('posts fetched'); 
            }
        })
  
});


// Selected only single post
app.get('/getpost/:id', (req, res) =>{
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        else{
            console.log(result);
            res.send('Post fetched....');
        }
    })
});

// Update post
app.get('/updatepost/:id', (req, res) =>{
    let newTitle = 'updated Title';
    let sql =  `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        else{
            console.log(result);
            res.send('post updated');
        }
    });
});

// Deleted post
app.get('/deletepost/:id', (req, res) =>{
    let newTitle = 'updated Title';
    let sql =  `DELETE FROM posts  WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        else{
            console.log(result);
            res.send('post Deleted...');
        }
    });
});

// define routes here..

var server = app.listen(5000, function () {
    console.log('Node server is running on port 5000');
});

*/