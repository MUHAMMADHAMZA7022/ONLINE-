var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Authentication',
    port: 3306

});
db.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
exports.registeruser = (req, res, next) => {
    const input = { name: req.body.name, email: req.body.email, password: req.body.password, cpassword: req.body.cpassword }

    if (!input.name || !input.email || !input.password || !input.cpassword) {
        return res.send({ message: "Please filled the field Properly" });
    }
    else {
        var sql = "SELECT * FROM USERS WHERE email=?";
        db.query(sql, [input.email], function (err, data, fields) {
            if (err) throw err
            if (data.length > 1) {
                res.send(`${input.email} was already register `)

            }
            else
                if (input.password != input.cpassword) {
                    res.send("Password Not matched")

                }
                else {
                    var sql = 'INSERT INTO USERS SET ?';
                    db.query(sql, input, function (err, data) {
                        if (err) throw err;
                        res.send("User successfully registerd")

                    })

                }
        })
    }


}


exports.loginuser = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var sql = "SELECT * FROM USERS WHERE email =? AND password =? ";
    db.query(sql, [email, password], function (err, data, fields) {
        if (err) throw err;
        if (data.length > 0) {
            res.send("Logged In")
        }
        else {
            res.send("Wrong Email or password")
        }
    })

}