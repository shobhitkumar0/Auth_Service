const express =require('express');
const bodyParser=require('body-parser');
const {PORT}=require('./config/serverConfig');
const apiRoutes =require('./routes/index');

const db = require('./models/index');
const {User,Role}=require('./models/index');
const app =express();
const prepareAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,async()=>{

        console.log(`server started at PORT: ${PORT}`);
        // if(process.env.DB_SYNC){
        //     db.sequelize.sync({alert:true});
        // }
        // const u1=  await User.findByPk(3);
        // const r1 = await Role.findByPk(1);
        
        // const response =await u1.hasRole(r1);
        // console.log(response);
    });

}

prepareAndStartServer();