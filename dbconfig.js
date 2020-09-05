
const config={
        
         user: 'sa',
         password: '123456789',
         server:'localhost',
         database: 'Order Management',
         options: {
             encrypt: false,
             trustedconnection:true, // Use this if you're on Windows Azure
             enableArithAort:true,
             instanceName: 'SQLEXPRESS'
         },
    //  port:1433
}

module.exports=config;