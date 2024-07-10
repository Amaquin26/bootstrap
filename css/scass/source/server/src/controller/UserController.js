import db from '../util/database.js'


export const loginUser = (req,res) => {
    try{
        const {name,password} = req.body;

        const sql = "SELECT `name`,`age` FROM users WHERE `name` = ?";
 
        let userName = null;

        db.get(sql,[name], (err, result) => {
            if(err){
                return res.status(404).send(err.message);
            }else{
                userName = result;

                if(!userName){
                    return res.status(404).json({message:"Account not found"});
                }

                const userPass = "SELECT `password` FROM users WHERE `name` = ?"
                db.get(userPass,[userName.name],(err,result) => {
                    if(err){
                        return res.status(404).send(err.message);
                    }else{

                        if(!result){
                            return res.status(404).json({message:"Account not found"});
                        }

                        if(result.password === password){
                            return res.status(200).json({name:userName.name,age:userName.age});
                        }else{
                            return res.status(404).json({message:"Account not found"});
                        }
                    }
                })
            }
        })

    }catch(err){
        console.log("Error at loginUser " +  err.message);
        return res.status(500).send("Error: " + err.message);
    }  
}

export const getUsers = (req,res) => {
    try{
        const sql = "SELECT `id`,`name`,`age`,`password` FROM users";

        db.all(sql,[], (err, rows) => {
            if(err){
                return res.status(404).send(err.message);
            }else{
                return res.status(200).json(rows)
            }
        })

    }catch(err){
        console.log("Error at getUsers " +  err.message);
        return res.status(404).send("Error: " + err.message);
    }    
}

export const getSingleUser = (req,res) => { 
    try{
        const {id} = req.params;

        const sql = "SELECT `id`,`name`,`age`,`password` FROM users WHERE `id` = ?";

        db.get(sql,[id], (err, row) => {
            if(err){
                return res.status(404).send(err.message);
            }else{
                return res.status(200).json(row)
            }
        })

    }catch(err){
        console.log("Error at getUsers " +  err.message);
        return res.status(404).send("Error: " + err.message);
    }    
}

export const addUsers = (req,res) => {
    try{
        const {name, age,password} = req.body;
        const sql = "INSERT INTO users (`name`,`age`,`password`) VALUES (?,?,?)";

        db.run(sql,[name,age,password], function (err) {
            if(err){
                return res.status(404).send("Error adding users " + err.message);
            }
            return res.status(200).send(`Added user ${this.lastID}`)
        })
        
    }catch(err){
        console.log("Error at addUsers " +  err.message);
        return res.status(404).send("Error: " + err.message);
    }
}

export const deleteUser = (req,res) => {
    try{
        const {id} = req.params;

        const sql = "DELETE FROM users WHERE `id` = ?";

        db.run(sql,[id], (err) => {
            if(err){
                return res.status(404).send(err.message);
            }else{
                return res.status(200).send(`Deleted user ${id}`)
            }
        })

    }catch(err){
        console.log("Error at deleteUser " +  err.message);
        return res.status(404).send("Error: " + err.message);
    }    
}

export const updateUser = (req,res) => {
    try{
        const {id} = req.params;
        const {name,age,password} = req.body;

        const sql = "UPDATE users SET `name` = ?, `age` = ?, `password` = ? WHERE `id` = ?";

        db.run(sql,[name,age,password,id], (err) => {
            if(err){
                return res.status(404).send(err.message);
            }else{
                return res.status(200).send(`Updated user ${id}`)
            }
        })

    }catch(err){
        console.log("Error at updateUser " +  err.message);
        return res.status(404).send("Error: " + err.message);
    }    
}