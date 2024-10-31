import express from "express";
import Pedido from "../models/Pedido.js";
const router = express.Router();
router.get("/pedidos", (req, res) => {
  Pedido.findAll()
    .then((pedido) => {
      res.render("pedidos", {
        pedido: pedido,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.post("/pedidos/new", (req, res) => {
  const { numero, valor } = req.body;
  Pedido.create({
    numero: numero,
    valor: valor,
  })
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((error) => {
      console.log(error);
    });
});
router.get("/pedidos/delete/:id", (req, res) => {
  const id = req.params.id;
  Pedido.destroy({ where: { id: id } })
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((error) => {
      console.log(error);
    });
});
router.get("/pedidos/edit/:id", (req, res) => {
  const id = req.params.id;
  Pedido.findByPk(id)
    .then((pedido) => {
      res.render("pedidoEdit",{
        pedido:pedido
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.post("/pedidos/update", (req, res) => {
  const { id, numero, valor } = req.body;
  Pedido.update(
    {
      numero: numero,
      valor: valor,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((error) => {
      console.log(error);
    });
});
/* router.get("/pedidos", (req, res) => {
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
}); */
export default router;
