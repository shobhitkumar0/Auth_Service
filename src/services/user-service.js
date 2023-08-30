const UserRepository =require('../repository/user-repository');
// const { trace } = require('../routes');
const {JWT_KEY}=require('../config/serverConfig');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async create (data){
        try {
            const user =await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }
    async signIn(email,plainPassword){
        try {
            //step 1 ->fetch the user by emial.
            const user =await this.userRepository.getByEmail(email);
            // step 2->compare incoming plain password with stored encrpted password.
            const passwordMatch= this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("passsword does not match");
                throw {error:'Incorrrect Password'};
            }
            //step 3 if password matches create token and send it to user
            const newJWT =this.createToken({email:user.email,id:user.id});
            return newJWT;
        } catch (error) {
            console.log("something went wrong in signIn layer");
            throw error;   
        }
    }
    createToken(user){
    try {
        const result =jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
        return result;
    } catch (error) {
        console.log("something went wrong in service layer (create Token)");
            throw error;
    }
    }
    verifyToken(token){
        try {
            const response =jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in service layer ( Token validation )",error);
                throw error;
        }
        }
    isAuthenticated(token){
        try {
            const response=this.verifyToken(token);
            if(!response){
                throw{error:'Invalid Token'}
            }
            const user=this.userRepository.getById(response.id);
            if(!user){
                throw{error:'No user with the corresponding token exsists'};
            }
            return user.id;
        } catch (error) {
            console.log("something went wrong in service layer ( Token validation )",error);
                throw error;
        }
    }    
    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("something went wrong in service password validation",error);
            throw error;
        }
    }    
}
module.exports = UserService;
