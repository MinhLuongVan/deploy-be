const jwt = require('jsonwebtoken')


const middleware = {

    verifyToken : (req,res,next) =>{
        const token = req.headers.token;
       
        if(token){
            const Token = token.split(" ")[1];
           
            jwt.verify(Token,'secrefkey',(error,user) =>{
                if(error){
                  return res.status(403).json("Token đã hết hạn");
                }
                req.user = user;
                next();
            });
    
        }
        else{
            res.status(401).json("Bạn chưa có token");
        }
    },
   verifyTokenAuth : (req,res,next) =>{
    middleware.verifyToken(req,res,() =>{
        if(req.user.isAdmin = true || req.user.id == req.params.id){
            next();
        }else{
            res.status(403).json("Bạn không có quyền xóa");
        }      
    }); 
   }
}
module.exports = middleware;