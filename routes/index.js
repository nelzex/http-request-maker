const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.get('/',(req,res) =>{
    res.render('index',{data:{response:null,status:null}});
})
router.post('/', async (req,res) =>{


    const{url,message,method} = req.body;
    var response;
    var status;

    try {
        if(method === "GET"){
            //GET requests do not have a body
            try{
                response = await axios.get(url);
                status = response.status;
                response = JSON.stringify(response.data,undefined,4);
                res.render('index',{data:{response,status}});

            }
            catch(error){
                response = error.repsonse.data;
                status = error.response.status;
                res.render('index',{data:{response,status}});
            }
            
        }
        else if(method === "POST"){
            // POST requests need a body can be empty however
            try{
                response = await axios.post(url,message);
                status = response.status;
                response = JSON.stringify(response.data,undefined,4);
                res.render('index',{data:{response,status}});
                //console.log(response);
            }
            catch(error){
                response = error.response.data;
                status = error.response.status;
                res.render('index',{data:{response,status}});


                //console.log(response);
                //console.log(status);
            }
        }
        else if(method === "PUT"){
            try{
                response = await axios.put(url,message);
                status = response.status;
                response = JSON.stringify(response.data,undefined,4);
                res.render('index',{data:{response,status}});

            }
            catch(error){
                response = error.response.data;
                status = error.response.status;
                res.render('index',{data:{response,status}});

            }
        }
        else if(method === "DELETE"){

            try{
                response = await axios.delete(url,message);
                status = response.status;
                response = JSON.stringify(response.data, undefined, 4);
                res.render('index',{data:{response,status}});
                

            }
            catch(error){
                response = error.response.data;
                status = error.response.status;
                res.render('index',{data:{response,status}});

            }
        }
    } catch (error){
        
        repsonse = error.message;
        console.log(response);
        res.render('index',{data:{response,status:500}});

    }



});



module.exports = router;