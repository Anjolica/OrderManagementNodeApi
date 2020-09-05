
var Order=require('./order');
var Item=require('./item');
const dboperations=require('./dboperations');

var express= require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
const { response } = require('express');
var app=express();
var router=express.Router();
const multer = require('multer');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/images',express.static('images'));
app.use(cors());
app.use('/api',router);


router.use((request,response,next)=>{
    console.log('middlewa');
    next();
})

router.route('/orders').get((request,response)=>{
   
    dboperations.getOrders().then(result=>{
        console.log(result);
        response.json(result);
    })
})

router.route('/orders/:id').get((request,response)=>{
   
    dboperations.getOrdersById(request.params.id).then(result=>{
        console.log(result);
        response.json(result);
    })
})

router.route('/orders').post((request,response)=>{

    let order={...request.body}
    
   
    dboperations.addOrder(order).then(result=>{
        
        response.status(201).json(result);
        console.log(result);
    })
})


//For items/products

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './images/');
    },
    filename: function(req, file, cb) {
      cb(null,file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

router.route('/items').get((request,response)=>{
   
    dboperations.getItems().then(result=>{
        console.log(result);
        response.json(result);
    })
})

router.route('/items/:id').get((request,response)=>{
   
    dboperations.getItemsById(request.params.id).then(result=>{
        console.log(result);
        response.json(result);
    })
})

// router.route('/items').post((request,response)=>{
   
//     let order={...request.body}

//     dboperations.addItems(order).then(result=>{
        
//         response.status(201).json(result);
//         console.log(result);
//     })
//})



var port=process.env.PORT || 8090;
app.listen(port);
console.log("order api is running at"+port);


