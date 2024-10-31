import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login",{
      loggedOut: true,
      messages: req.flash()
    });
  });

  // Rota de logout
router.get("/logout", (req,res)=>{
    req.session.usuario = undefined; //limpa a sessão
    res.redirect("/");
  })
  
router.get("/cadastro", (req, res) => {
    res.render("cadastro",{
      loggedOut: true,
      messages: req.flash()
    });
  });
  router.post("/createUser", (req, res) => {
    const { email, senha } = req.body;
  
    Usuario.findOne({ where: { email: email } }).then((usuario) => {
  
      //se não houver
      if (usuario == undefined) {
        const salt = bcrypt.genSaltSync(10); //o salt é uma chave que o bcrypt usa para modificar a criptografia e tornar ela unica
        const hash = bcrypt.hashSync(senha, salt);
        Usuario.create({
          email: email,
          senha: hash,
        }).then(() => {
          res.redirect("/login");
        });
      }else{ //caso o usuario ja esteja cadastrado
          req.flash('danger', `Usuario já cadastrado. Faça o login!`)
          res.redirect("/cadastro")
          
      }
    });
  });
  
  // ROTA DE AUTENTICACAO
  router.post("/authenticate", (req, res) => {
    const { email, senha } = req.body;
    //verificar se o usuario esta cadastrado
  
    Usuario.findOne({
      where: {
        email: email,
      },
    }).then((usuario) => {
      if (usuario != undefined) {
          // valida a senha
          const correct = bcrypt.compareSync(senha, usuario.senha); //retorna um boolean
          // se a senha for válida
          if(correct){
              //autoriza o login
              
              req.session.usuario ={
                id: usuario.id,
                email: usuario.email
              }
              // res.send(`Usuario logado: <br> ID: ${req.session.usuario['id']} <br> email: ${req.session.usuario['email']}`)
                // enviar mensagem de sucesso
                req.flash('success', "Login efetuado com sucesso!");
                res.redirect("/");
          }else{ // caso a senha esteja errada
              req.flash('danger', `Senha inválida! Tente novamente.`);
              res.redirect("/login");
          }
      } else {
        req.flash('danger', `Usuario não cadastrado. Tente novamente!`);
        res.redirect("/login")
      }
    });
  });
  export default router;
  