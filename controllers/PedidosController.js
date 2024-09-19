import express from 'express'
const router = express.Router()
router.get("/pedidos", (req,res) =>{
    const pedidos = [
        {
          numeroPedido: 1,
          valor: 2000,
        },
        {
          numeroPedido: 2,
          valor: 1500,
        },
        {
          numeroPedido: 3,
          valor: 3000,
        },
        {
          numeroPedido: 4,
          valor: 10000,
        },
      ];
      res.render("pedidos", {
        pedidos:pedidos
      })
})
export default router;
