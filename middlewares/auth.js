const isLogin = async(req, res, next)=>{
    try {
    if(req.session.user){}
    else{
        res.redirect('/')
    }
    next();
    } catch (error) {
    console.log(error.message);
    }
    }
const isLogout = (req, res, next) => {
        if (req.session.user) {
         res.redirect('/dashboard');
        }
        next();
      };
        module.exports={isLogin,isLogout};
        