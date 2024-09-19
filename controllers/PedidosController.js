import express from "express";
const router = express.Router();
router.get("/pedidos", (req, res) => {
  const pedidos = [
    {
      numeroPedido: 1,
      valor: 2000,
    },
    {
      numeroPedido: 2,
      valor: 3500,
    },
    {
      numeroPedido: 3,
      valor: 1500,
    },
    {
      numeroPedido: 4,
      valor: 5000,
    },
    {
      numeroPedido: 5,
      valor: 2750,
    },
    {
      numeroPedido: 6,
      valor: 4200,
    },
    {
      numeroPedido: 7,
      valor: 3200,
    },
    {
      numeroPedido: 8,
      valor: 1800,
    },
    {
      numeroPedido: 9,
      valor: 2500,
    },
    {
      numeroPedido: 10,
      valor: 1000,
    },
  ];
  res.render("pedidos", {
    pedidos: pedidos,
  });
});
export default router;
