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
/* router.get("/clientes", (req, res) => {
  const clientes = [
    {
      nome: "Lucas Oliveira",
      cpf: "123.456.789-01",
      endereco: "Rua das Flores, Bairro Centro, São Paulo",
    },
    {
      nome: "Mariana Souza",
      cpf: "234.567.890-12",
      endereco: "Av. Atlântica, Bairro Copacabana, Rio de Janeiro",
    },
    {
      nome: "Carlos Silva",
      cpf: "345.678.901-23",
      endereco: "Rua da Liberdade, Bairro Savassi, Belo Horizonte",
    },
    {
      nome: "Ana Pereira",
      cpf: "456.789.012-34",
      endereco: "Rua XV de Novembro, Bairro Batel, Curitiba",
    },
    {
      nome: "Pedro Lima",
      cpf: "567.890.123-45",
      endereco: "Av. Beira Mar, Bairro Lagoa, Florianópolis",
    },
    {
      nome: "Julia Mendes",
      cpf: "678.901.234-56",
      endereco: "Rua da Praia, Bairro Moinhos de Vento, Porto Alegre",
    },
    {
      nome: "Rafael Almeida",
      cpf: "789.012.345-67",
      endereco: "Av. Sete de Setembro, Bairro Comércio, Salvador",
    },
    {
      nome: "Larissa Costa",
      cpf: "890.123.456-78",
      endereco: "Av. Beira Mar, Bairro Meireles, Fortaleza",
    },
    {
      nome: "Vinícius Moreira",
      cpf: "901.234.567-89",
      endereco: "Rua do Comércio, Bairro Centro, Manaus",
    },
    {
      nome: "Gabriela Ferreira",
      cpf: "123.123.123-04",
      endereco: "Rua Carlos Gomes, Bairro Vila Nova, Registro",
    },
  ];
  res.render("clientes", {
    clientes: clientes,
  });
}); */
export default router;
