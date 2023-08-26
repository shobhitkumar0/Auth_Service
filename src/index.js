const express =require('express');
const bodyParser=require('body-parser');
const {PORT}=require('./config/serverConfig');

const UserRepository =require('./repository/user-repository');
const apiRoutes =require('./routes/index');
const app =express();
const prepareAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{

        console.log(`server started at PORT: ${PORT}`);
        // const repo =new UserRepository();
        // const response =  repo.getById(1);
        // console.log(response);
    });

}

prepareAndStartServer();