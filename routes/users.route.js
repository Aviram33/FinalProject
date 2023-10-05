const UserModel = require('../models/user.model');
const UsersRoutes = require('express').Router();

UsersRoutes.get('/', async (req, res) => {
    try {
        let data = await UserModel.FindAllUsers();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

UsersRoutes.put('/Register', async (req, res) => {
    try {
        console.log('regi :>> ');
        let { firstName, lastName, email, password, phone, address, role, isActive } = req.body;
        let data = await UserModel.InsertUser(firstName, lastName, email, password, phone, address, role, isActive);
        console.log('data :>> ',data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});


UsersRoutes.post('/add/:role', async (req, res) => {
    try {
        let { role } = req.params;
        let { firstName, lastName, email, password, phone } = req.body;
        let data = await UserModel.InsertRole(firstName, lastName, email, password, phone, role, true);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

UsersRoutes.post('/Login', async (req, res) => {
    try {
        let {email,password} = req.body;
        let user = await UserModel.FindbyEmail(email);
        if(!user){return undefined}
        console.log('user :>> ', user);
        let result = await UserModel.Login(user.password,password);
        if(result){
            res.status(200).json({
                firstName:`${user.firstName}`,
                lastName:`${user.lastName}`,
                email:`${user.email}`,
                phone:`${user.phone}`,
                address:`${[user.address[0].street,user.address[0].streetNum,user.address[0].city]}`,
                role:`${user.role}`, 
        });
        }
        else{
            res.status(401).json({ error: "משתמש לא קיים" })}
    } catch (error) {
        res.status(500).json({ error });
    }
});
UsersRoutes.put('/UpdateUser', async (req, res) => {
    try {
        let {currentE,firstName,lastName,email,phone,address} = req.body;
        let user = await UserModel.FindbyEmail(currentE);
        if(!user){throw error}
        console.log('user :>> ', user);
        let result = await UserModel.UpdateUser(user,firstName,lastName,email,phone,address);
        console.log('result :>> ', result);
        if(result){
            res.status(200).json({
                firstName:`${user.firstName}`,
                lastName:`${user.lastName}`,
                email:`${user.email}`,
                role:`${user.role}`
        });
        }
        else{
            res.status(401).json({ error: "משתמש לא קיים" })}
    } catch (error) {
        res.status(500).json({ error });
    }
});

UsersRoutes.put('/:id', async (req, res) => {
    try {
        let { email,password } = req.params;
        let data = await UserModel.UpdateUser(email,password);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

UsersRoutes.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let data = await UserModel.DisableUser(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = UsersRoutes;