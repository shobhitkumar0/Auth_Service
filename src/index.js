const express =require('express');
const bodyParser=require('body-parser');
const {PORT}=require('./config/serverConfig');
const UserService=require('./services/user-service');
const UserRepository =require('./repository/user-repository');
const apiRoutes =require('./routes/index');
const app =express();
const prepareAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{

        console.log(`server started at PORT: ${PORT}`);
        const service=new UserService();
        // const newToken=service.createToken({email:'shobhit@admin.com ',id:1});
        // console.log("new token is  :",newToken);
        const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNob2JoaXRAYWRtaW4uY29tICIsImlkIjoxLCJpYXQiOjE2OTMxNjQ5MTgsImV4cCI6MTY5MzE2ODUxOH0.XOBD6-9ZuExATuDFdBRSpAPxK7fz4Oywc5tLRId8AU4'
        // const repo =new UserRepository();
        // const
        // e.log(response );
        // const response =  repo.getById(1);
        // console.log(response);
    });

}

prepareAndStartServer();