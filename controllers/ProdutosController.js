import express from "express";
import Produto from "../models/Produto.js";
import multer from "multer";
import path from "path";

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

router.get("/produtos/:categoria?", (req, res) => {
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
router.post("/produtos/new", upload.single("imagem"), (req, res) => {
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
router.get("/produtos/delete/:id", (req, res)=>{
  const id = req.params.id;
  Produto.destroy({where: {id:id}}).then(()=>{
    res.redirect("/produtos")
  }).catch((error) => {
    console.log(error);
  });
})
router.get("/produtos/edit/:id", (req,res)=>{
  const id = req.params.id;
  Produto.findByPk(id).then((produto)=>{
    res.render("produtoEdit",{
      produto:produto
    })
  }).catch((error) => {
      console.log(error);
    });
})
router.post("/produtos/update", upload.single("imagem"), (req,res)=>{
  
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
/* router.get("/produtos/:categoria?", (req, res) => {
  const categoria = req.params.categoria;
  const camisetas = [
    {
      nomeProduto: "Vamp Tee",
      preco: 199.99,
      categoria: "Camisetas",
      src: "/imgs/vamptee.webp",
    },
    {
      nomeProduto: "Peace Tee",
      preco: 199.99,
      categoria: "Camisetas",
      src: "/imgs/peacetee.webp",
    },
    {
      nomeProduto: "Stoned Vintage Drawings Tee",
      preco: 189.99,
      categoria: "Camisetas",
      src: "/imgs/vintagedrawings.webp",
    },
    {
      nomeProduto: "Moon Garment Dyeing Tee",
      preco: 330,
      categoria: "Camisetas",
      src: "/imgs/moonop.webp",
    },
    {
      nomeProduto: "Software Flame Tee",
      preco: 360,
      categoria: "Camisetas",
      src: "/imgs/flamesop.webp",
    },
  ];
  const calcas = [
    {
      nomeProduto: "Skull Denim Pants",
      preco: 800,
      categoria: "Calças",
      src: "/imgs/skullpants.webp",
    },
    {
      nomeProduto: "501 Original Jeans",
      preco: 700,
      categoria: "Calças",
      src: "/imgs/501.webp",
    },
    {
      nomeProduto: "568 Stay Loose Jeans",
      preco: 550,
      categoria: "Calças",
      src: "/imgs/568.webp",
    },
    {
      nomeProduto: "Storm Pants",
      preco: 469,
      categoria: "Calças",
      src: "/imgs/storm.webp",
    },
    {
      nomeProduto: "Storm Pants",
      preco: 469,
      categoria: "Calças",
      src: "/imgs/storm.webp",
    },
    {
      nomeProduto: "Tape Pants",
      preco: 1300,
      categoria: "Calças",
      src: "/imgs/pace.jpg",
    },
  ];
  const shoes = [
    {
      nomeProduto: "NB 725 Shoes",
      preco: 799.99,
      categoria: "Tênis",
      src: "/imgs/725.webp",
    },
    {
      nomeProduto: "JP Pro Shoes",
      preco: 699.99,
      categoria: "Tênis",
      src: "/imgs/jppro.webp",
    },
    {
      nomeProduto: "Chuck 70's Shoes",
      preco: 429.9,
      categoria: "Tênis",
      src: "/imgs/chuck.webp",
    },
  ];
  res.render("produtos", {
    categoria: categoria,
    camisetas: camisetas,
    calcas: calcas,
    shoes: shoes,
    produtos: { camisetas, calcas, shoes },
  });
}); */
export default router;
