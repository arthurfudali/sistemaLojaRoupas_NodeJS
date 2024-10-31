import express from "express";
import Produto from "../models/Produto.js";
import multer from "multer";
import path from "path";
import Auth from "../middleware/Auth.js";
const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Pasta onde a imagem será salva
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com um timestamp
  },
});
const upload = multer({ storage: storage });

router.get("/produtos/:categoria?", Auth,(req, res) => {
  const categoria = req.params.categoria;
  if (!categoria) {
    Produto.findAll().then((produtos) => {
      res.render("produtos", {
        produtos: produtos,
      });
    });
  } else {
    Produto.findAll({
      where: { categoria: categoria },
    }).then((produtos) => {
      res.render("produtos", {
        produtos: produtos,
      });
    });
  }
});
router.post("/produtos/new",Auth, upload.single("imagem"), (req, res) => {
  const { nome, categoria, preco } = req.body;
  const imagem = req.file ? req.file.filename : null; // Nome do arquivo salvo
  Produto.create({
    nome: nome,
    preco: preco,
    categoria: categoria,
    imagem: `/uploads/${imagem}`,
  })
    .then(() => {
      res.redirect("/produtos");
    })
    .catch((error) => {
      console.log(error);
    });
});
router.get("/produtos/delete/:id",Auth, (req, res)=>{
  const id = req.params.id;
  Produto.destroy({where: {id:id}}).then(()=>{
    res.redirect("/produtos")
  }).catch((error) => {
    console.log(error);
  });
})
router.get("/produtos/edit/:id", Auth,(req,res)=>{
  const id = req.params.id;
  Produto.findByPk(id).then((produto)=>{
    res.render("produtoEdit",{
      produto:produto
    })
  }).catch((error) => {
      console.log(error);
    });
})
router.post("/produtos/update",Auth, upload.single("imagem"), (req,res)=>{
  
  const{nome, categoria, preco, id} = req.body;
  const imagem = req.file ? req.file.filename:null;
  const produto = Produto.findByPk(id);
  Produto.update(
    {
      nome: nome,
      categoria: categoria,
      preco: preco,
      imagem: imagem ? imagem: produto.imagem
    }, {where: {id:id}}
  ).then(()=>{
    res.redirect("/produtos")
  })
});
export default router;
