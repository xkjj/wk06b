const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

const connection = mysql.createConnection(
   {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'kjarosz02',
      port: '3306'
   }
);

connection.connect((err) => {

   if (err) return console.log(err.message);

});

app.get('/', (req, res) => {
   let title = "Web Dev Company";
   res.render('landing', { tdata: title });
});

app.get('/about', (req, res) => {
   let title = "About Us";
   let intr = `A web development company helps you build a website or an application for business or 
               personal use. The process of creating a website varies from one company to another, 
               but many web development businesses follow similar procedures. We are different, we do things not the same as the others.`
   res.render('people', { tdata: title, intro: intr });
});

app.get('/staff', (req, res) => {
   let title = "Staff";

   //send an SQL statement to a MySQL server

   let myquery = "SELECT id, name FROM web_dev_staff ";

   connection.query(myquery, (err, sqlresult) => {

      if (err) throw err;

      let stringdata = JSON.stringify(sqlresult);

      res.render('people', { tdata: title, intro: "this is what the people do", staff_data: sqlresult });

   });



});

app.get("/details", (req, res) => {

   let id = req.query.staffid;

   let myquery = `SELECT * FROM web_dev_staff WHERE id = ${id} `;

   connection.query(myquery, (err, sqlresult) => {

      if (err) throw err;

      res.render('staff', { tdata: "Staff Member", staff_data: sqlresult });

   });


});



app.listen(3000, () => {
   console.log('Server is listening on localhost:3000');
});

