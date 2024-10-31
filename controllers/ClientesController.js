import express from "express";
import Cliente from "../models/Cliente.js";
import Auth from "../middleware/Auth.js";
const router = express.Router();
router.get("/clientes",Auth, (req,res)=>{
  Cliente.findAll().then((cliente)=>{
    res.render("clientes",{
      cliente: cliente
    })
  }).catch((error)=>{
    console.log(error);
  })
})
router.post("/clientes/new",Auth, (req,res)=>{
  const {nome, endereco, cpf} = req.body;
  Cliente.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco
  }).then(()=>{
    res.redirect("/clientes")
  }).catch((error)=>{
    console.log(error);
  })
})
router.get("/clientes/delete/:id",Auth, (req,res)=>{
  const id = req.params.id;
  Cliente.destroy({where: {id:id}}).then(()=>{
    res.redirect("clientes")
  }).catch((error)=>{
    console.log(error);
  })
})
router.get("/clientes/edit/:id",Auth, (req,res)=>{
  const id = req.params.id;
  Cliente.findByPk(id).then((cliente)=>{
    res.render("clienteEdit",{
      cliente:cliente
    })
  }).catch((error)=>{
    console.log(error);
  })
})
router.post("/clientes/update",Auth, (req,res)=>{
  const {id, nome, endereco, cpf} = req.body;
  Cliente.update({
    nome:nome,
    endereco:endereco,
    cpf:cpf
  }, {where:{id:id}}).then(()=>{
    res.redirect("/clientes")
  }).catch((error)=>{
    console.log(error);
  })
})
export default router;
