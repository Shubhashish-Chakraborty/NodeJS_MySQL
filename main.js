const mysql = require("mysql2")
const express = require('express');
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

const app = express();
const port = 5500;

const mysqlConnectionObject = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'impinfomanager'
})



// app.use(express.json())

app.get('/', (req, res) => { // HomeRoute!!
    res.send(`
        
            <html>
                <style>
                    body {
                        background-color: rgb(0,10,40);
                        color: azure;
                    }
                </style>

                <body>
                    <h1 style="text-align: center;">Hello Welcome to the IMP Info Manager</h1>
                </body>
            </html>

        `);
});

app.post("/addgmail" , jsonParser , (req , res) => {
    const DataObject = req.body;

    const sql_query = `INSERT INTO gmailacc (Sno , Gmail_Account , Password , Extra_info) VALUES (?,?,?,?)`
    const values = [DataObject.Sno , DataObject.Account_Name , DataObject.Password , DataObject.Extra_info];

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) {
            console.log(`${err}`);
        }

        res.json({
            msg:`Data Added Successfully: ${result.insertId}`
        })
    })
})

app.get("/gmail" , (req , res) => {

    const sql_query = `SELECT * FROM gmailacc`;

    mysqlConnectionObject.query(sql_query , (err , DATA , fields) => {
        if (err) console.log(`${err}`);

        res.json(DATA)
    })
})

app.put("/updategmail/password" , jsonParser , (req , res) => {
    const sno = req.body.sno;
    const newPassword = req.body.newPassword;

    sql_query = `UPDATE gmailacc SET Password=? WHERE Sno=?`;
    values = [newPassword , sno]

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) console.log(`${err}`);

        res.json({
            msg: "Password is being Updated!!"
        })
    })
})

app.put("/updategmail/accountname" , jsonParser , (req , res) => {
    const sno = req.body.sno;
    const newName = req.body.newName;

    sql_query = `UPDATE gmailacc SET Gmail_Account=? WHERE Sno=?`;
    values = [newName , sno]

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) console.log(`${err}`);

        res.json({
            msg: "AccountName is being Updated!!"
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});