const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.get('/',(req,res) =>{
    res.render('index',{data:{response:null,status:null,statusMessage:null}});
})

router.post('/', async (req,res) =>{

    res.setTimeout(8000, function(){
        console.log('Request Failed');
        res.render('index',{data:{response:null,status:500,statusMessage:'Bad Request'}});
    })

    const{url,message} = req.body;
    var method_lower = req.body.method;
    var method = method_lower.toUpperCase(); //Convert to uppercase
    var response;
    var status;
    var statusMessage;


    try {
        if(method === "GET"){
            //GET requests do not have a body
            try{
                response = await axios.get(url);
                status = response.status;
                statusMessage = response.statusText;
                console.log(response);
                response = JSON.stringify(response.data,undefined,4);
                res.render('index',{data:{response,status,statusMessage}});

            }
            catch(error){
                console.log(error);
                if(typeof(error.response.data) !== 'undefined'){
                    response = JSON.stringify(error.response.data,undefined,4);
                    status = error.response.status;
                    statusMessage = error.response.statusText;
                }
                else{
                    response = JSON.stringify(error.response.data,undefined,4);
                    status = 400;
                    statusMessage = 'Bad Request';
                }
                
                res.render('index',{data:{response,status,statusMessage}});
            }
            
        }
        else if(method === "POST"){
            // POST requests need a body can be empty however
            try{
                response = await axios.post(url,message);
                status = response.status;
                statusMessage = response.statusText;
                response = JSON.stringify(response.data,undefined,4);
                res.render('index',{data:{response,status,statusMessage}});
                //console.log(response);
            }
            catch(error){
                console.log(error);
                if(typeof(error.response.data) !== 'undefined'){
                    response = JSON.stringify(error.response.data,undefined,4);
                    status = error.response.status;
                    statusMessage = error.response.statusText;
                }
                else{
                    response = JSON.stringify(error.response.data,undefined,4);
                    status = 400;
                    statusMessage = 'Bad Request';
                }
                
                res.render('index',{data:{response,status,statusMessage}});


                //console.log(response);
                //console.log(status);
            }
        }
        else if(method === "PUT"){
            try{
                response = await axios.put(url,message);
                status = response.status;
                statusMessage = response.statusText;
                response = JSON.stringify(response.data,undefined,4);
                res.render('index',{data:{response,status,statusMessage}});

            }
            catch(error){
                if(typeof(error.response.data) !== 'undefined'){
                    response = JSON.stringify(error.response.data,undefined,4);
                    status = error.response.status;
                    statusMessage = error.response.statusText;
                }
                else{
                    response = JSON.stringify(error.response.data,undefined,4);
                    status = 400;
                    statusMessage = 'Bad Request';
                }
                
                res.render('index',{data:{response,status,statusMessage}});

            }
        }
        else if(method === "DELETE"){

            try{
                response = await axios.delete(url,message);
                status = response.status;
                statusMessage = response.statusText;
                response = JSON.stringify(response.data, undefined, 4);
                res.render('index',{data:{response,status,statusMessage}});
                

            }
            catch(error){
                if(typeof(error.response.data) !== 'undefined'){
                    response = JSON.stringify(error.response.data,undefined,4);
                    status = error.response.status;
                    statusMessage = error.response.statusText;
                }
                else{
                    response = JSON.stringify(error.response.data,undefined,4);
                    status = 400;
                    statusMessage = 'Bad Request';
                }
                
                res.render('index',{data:{response,status,statusMessage}});

            }
        }
    } catch (error){
        
        if(typeof(error.response.data) !== 'undefined'){
            response = JSON.stringify(error.response.data,undefined,4);
            status = error.response.status;
            statusMessage = error.response.statusText;
        }
        else{
            response = JSON.stringify(error.response.data,undefined,4);
            status = 400;
            statusMessage = 'Bad Request';
        }
        
        console.log(response);
        res.render('index',{data:{response,status,statusMessage}});

    }



});




module.exports = router;