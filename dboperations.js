var config=require('./dbconfig');
const sql=require('mssql');

async function getOrders(){
    try{
        let pool=await sql.connect(config);
        let products=await pool.request().query("SELECT * FROM Order_Details");
        return products.recordsets;

    }
    catch(error){
        console.log(error);

    }
}

async function getOrdersById(OrderId){
    try{
        let pool=await sql.connect(config);
        let products=await pool.request()
              .input('input_parameter',sql.Int,OrderId) 
              .query("SELECT * FROM Order_Details where ORDER_ID=@input_parameter");
        return products.recordsets;

    }
    catch(error){
        console.log(error);

    }
}

async function addOrder(order){
    try{
        let pool=await sql.connect(config);
        console.log("dhdg",order);
        let insertOrder=await pool.request()
            // .input('ORDER_ID',sql.Int,order.ORDER_ID)
            .input('CUSTOMER_NAME',sql.VarChar, order.CUSTOMER_NAME)
            .input('TOTAL_AMOUNT',sql.Int, order.TOTAL_AMOUNT)
            .input('CREATED_DATE',sql.Date, order.CREATED_DATE)
            .query("INSERT into Order_Details(CUSTOMER_NAME,TOTAL_AMOUNT,CREATED_DATE) VALUES (CUSTOMER_NAME,TOTAL_AMOUNT,CREATED_DATE)");
      
    }
    catch(error){
        console.log(error);

    }
}


    //For products/items

    async function getItems(){
        try{
            let pool=await sql.connect(config);
            let products=await pool.request().query("SELECT * FROM Order_Item");
            return products.recordsets;
    
        }
        catch(error){
            console.log(error);
    
        }
    }
    
    async function getItemsById(Id){
        try{
            let pool=await sql.connect(config);
            let products=await pool.request()
                  .input('input_parameter',sql.Int,Id) 
                  .query("SELECT * FROM Order_Item where ID=@input_parameter");
            return products.recordsets;
    
        }
        catch(error){
            console.log(error);
    
        }
    }
    
    // async function addItems(items){
    //     try{
    //         let pool=await sql.connect(config);
    //         let insertOrder=await pool.request()
    //             .input('CUSTOMER_NAME',sql.Int,items.CUSTOMER_NAME)
    //             .input('TOTAL_AMOUNT',sql.Int,items.TOTAL_AMOUNT)
    //             .input('CREATED_DATE',sql.Int,items.CREATED_DATE)
    //             .query("INSERT into Order_Details (ORDER_ID,CUSTOMER_NAME,TOTAL_AMOUNT,CREATED_DATE) VALUES (@ORDER_ID,@CUSTOMER_NAME,@TOTAL_AMOUNT,@CREATED_DATE))");
    //        // return insertOrder.recordsets;
                
    //     }
    //     catch(error){
    //         console.log(error);
    
    //     }
    
    // }
    


module.exports={
    getOrders:getOrders,
    getOrdersById:getOrdersById,
    addOrder:addOrder,
    getItems:getItems,
    getItemsById:getItemsById,
   // addItems:addItems

}