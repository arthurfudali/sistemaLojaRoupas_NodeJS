import express from "express";
const router = express.Router();
router.get("/produtos/:categoria?", (req, res) => {
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
      preco: 429.90,
      categoria: "Tênis",
      src: "/imgs/chuck.webp",
    },
  ];
  res.render("produtos", {
    categoria: categoria,
    camisetas: camisetas,
    calcas: calcas,
    shoes: shoes,
    produtos: {camisetas, calcas, shoes}
  });
});
export default router;
