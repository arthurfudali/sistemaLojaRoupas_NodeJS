function Auth(req,res,next){
    if(req.session.usuario != undefined){
        next()
    }else{
        res.render("login", {
            loggedOut: true
        })
    }
}
export default Auth;