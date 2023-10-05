const DB = require('../utilities/db')
const bcrypt = require('bcrypt');

class User {
    static countOrders = 0;
    static _id = 0;
    firstName;
    lastName;
    email;
    password;
    phone;
    address;
    role;
    isActive;

    constructor(firstName, lastName, role, email, password, address, isActive) {
        User._id++;
        this._id = User._id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.password = password;
        this.address = [{city:address[0],street:address[1],streetNum:address[2]}];  
        this.isActive = isActive;
    }

    static async FindAllUsers() {
        return await new DB().FindAll('Users');
    }

    static async FindUserbyId(id){
        return await new DB().FindUserbyId('users',id);
    }
    static async FindbyEmail(email){
        let query = {"email":{$eq:email}}
        return await new DB().FindbyEmail('Users',query);
    }

    static async Login(userPassword, password){
        let response = await bcrypt.compare(password, userPassword);
        if(!response){return false;}
        return true;
    }
    static async UpdateUser(user, firstName, lastName, email, phone, address){
        return await new DB().UpdateUser('Users', user, firstName, lastName, email, phone, address);
    }
    static async InsertUser(firstName, lastName, email, password, phone, address, role, isActive){
       this.firstName = firstName;
       this.lastName = lastName;
       this.email = email;
       this.password = await bcrypt.hash(password,10);
       this.phone = phone;
       this.address = address;
       this.role = role;
       this.isActive = isActive;
       
        return await new DB().InsertUser('Users',{...this});
    }
    static async InsertRole(firstName, lastName, email, password, phone, role, isActive){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = await bcrypt.hash(password,10);
        this.phone = phone;
        this.role = role;
        this.isActive = isActive;
        
         return await new DB().InsertUser('Users',{...this});
     }
    static async DisableUser(id){
        let query = {"id":{$eq:id}}
        return await new DB().DisableUser('Users',query);
    }
    
}
module.exports = User;