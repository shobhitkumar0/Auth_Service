const {User}=require('../models/index');
const {Role}=require('../models/index')
class UserRepository{
    async create(data){
        try {
            const user= await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw error;
        }
    }
    async signIn(data){
        try {
            
        } catch (error) {
            console.log("Something went wrong at signIN layer");
            throw error;
        }
    }
    async destroy(userId){
        try {
            await User.destroy({where:{
                id:userId
            }});
            return true;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw error;
        }
    }
    async getById(userId){
        try {
            const user =await User.findByPk(userId,{
                attributes:['email','id']
            });//we dont want userpassword to be exposed. We just want username to be found.
            return user;
        } catch (error) {
            console.log("Something went wrong at repository layer in getById");
            throw error;
        }
    }
    async getByEmail(userEmail){
        try {
            const user=await User.findOne({where:{
                email:userEmail
            }});
            return user;
        } catch (error) {
            console.log("Something went wrong at geeting user Id layer");
            throw error;
        }
    }
    async isAdmin(userId){
        try {
            const user =await User.findByPk(userId); 
            const adminRole =await Role.findOne({
                where:{
                name:'ADMIN'
                }
            });
            console.log(adminRole);
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw error;
        }
    }
}
module.exports=UserRepository;