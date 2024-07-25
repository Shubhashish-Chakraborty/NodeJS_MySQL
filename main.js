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

// Add GmailAccount:
app.post("/addgmail" , jsonParser , (req , res) => {
    const DataObject = req.body;

    const sql_query = `INSERT INTO gmailacc (Sno , Gmail_Account , Password , Extra_info) VALUES (?,?,?,?)`
    const values = [DataObject.Sno , DataObject.Account_Name , DataObject.Password , DataObject.Extra_info];

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) {
            console.log(`${err}`);
        }

        res.json({
            msg:`Gmail Account Data Added Successfully: ${result.insertId}`
        })
    })
})

// Add SocialMediaAccount:
app.post("/addsocialmedia" , jsonParser , (req , res) => {
    const DataObject = req.body;

    const sql_query = `INSERT INTO socialmediaacc (Sno , Social_Account , Password , Extra_info) VALUES (?,?,?,?)`
    const values = [DataObject.Sno , DataObject.Account_Name , DataObject.Password , DataObject.Extra_info];

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) {
            console.log(`${err}`);
        }

        res.json({
            msg:`Instagram Account Data Added Successfully: ${result.insertId}`
        })
    })
})

// Add OtherAccount
app.post("/addother" , jsonParser , (req , res) => {
    const DataObject = req.body;

    const sql_query = `INSERT INTO otheracc (Sno , Account_Name , Password , Extra_info) VALUES (?,?,?,?)`
    const values = [DataObject.Sno , DataObject.Account_Name , DataObject.Password , DataObject.Extra_info];

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) {
            console.log(`${err}`);
        }

        res.json({
            msg:`Other Account Data Added Successfully: ${result.insertId}`
        })
    })
})

// Display Your GmailAccounts Data
app.get("/gmail" , (req , res) => {

    const sql_query = `SELECT * FROM gmailacc`;

    mysqlConnectionObject.query(sql_query , (err , DATA , fields) => {
        if (err) console.log(`${err}`);

        res.json(DATA)
    })
})

// Display Your SocialmediaAccounts Data
app.get("/socialmedia" , (req , res) => {

    const sql_query = `SELECT * FROM socialmediaacc`;

    mysqlConnectionObject.query(sql_query , (err , DATA , fields) => {
        if (err) console.log(`${err}`);

        res.json(DATA)
    })
})

// Display Your OtherAccounts Data
app.get("/other" , (req , res) => {

    const sql_query = `SELECT * FROM otheracc`;

    mysqlConnectionObject.query(sql_query , (err , DATA , fields) => {
        if (err) console.log(`${err}`);

        res.json(DATA)
    })
})

// Update Your GmailAccountData's - Password
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

// Update Your GmailAccountData's - Account'sName
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

// Update Your SocialMediaAccountData's - Password
app.put("/updatesocialmedia/password" , jsonParser , (req , res) => {
    const sno = req.body.sno;
    const newPassword = req.body.newPassword;

    sql_query = `UPDATE socialmediaacc SET Password=? WHERE Sno=?`;
    values = [newPassword , sno]

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) console.log(`${err}`);

        res.json({
            msg: "Password is being Updated!!"
        })
    })
})

// Update Your SocialMediaAccountData's - Account'sName
app.put("/updatesocialmedia/accountname" , jsonParser , (req , res) => {
    const sno = req.body.sno;
    const newName = req.body.newName;

    sql_query = `UPDATE socialmediaacc SET Social_Account=? WHERE Sno=?`;
    values = [newName , sno]

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) console.log(`${err}`);

        res.json({
            msg: "AccountName is being Updated!!"
        })
    })
})

// Update Your OtherAccountData's - Password
app.put("/updateother/password" , jsonParser , (req , res) => {
    const sno = req.body.sno;
    const newPassword = req.body.newPassword;

    sql_query = `UPDATE otheracc SET Password=? WHERE Sno=?`;
    values = [newPassword , sno]

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) console.log(`${err}`);

        res.json({
            msg: "Password is being Updated!!"
        })
    })
})

// Update Your OtherAccountData's - Account'sName
app.put("/updateother/accountname" , jsonParser , (req , res) => {
    const sno = req.body.sno;
    const newName = req.body.newName;

    sql_query = `UPDATE otheracc SET Account_Name=? WHERE Sno=?`;
    values = [newName , sno]

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) console.log(`${err}`);

        res.json({
            msg: "AccountName is being Updated!!"
        })
    })
})


app.delete("/deletegmail" , (req , res) => {
    const sno = req.headers.sno; // Catching the Sno from the Headers!!!!!

    sql_query = `DELETE FROM gmailacc WHERE Sno=?`;
    values = [sno];

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) console.log(`${err}`);

        res.json({
            msg: "Data is Being Removed!!!"
        })
    })

})

app.delete("/deletesocialmedia" , (req , res) => {
    const sno = req.headers.sno; // Catching the Sno from the Headers!!!!!

    sql_query = `DELETE FROM socialmediaacc WHERE Sno=?`;
    values = [sno];

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) console.log(`${err}`);

        res.json({
            msg: "Data is Being Removed!!!"
        })
    })

})

app.delete("/deleteother" , (req , res) => {
    const sno = req.headers.sno; // Catching the Sno from the Headers!!!!!

    sql_query = `DELETE FROM otheracc WHERE Sno=?`;
    values = [sno];

    mysqlConnectionObject.query(sql_query , values , (err , result) => {
        if (err) console.log(`${err}`);

        res.json({
            msg: "Data is Being Removed!!!"
        })
    })

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});