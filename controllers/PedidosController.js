import express from "express";
import Pedido from "../models/Pedido.js";
import Auth from "../middleware/Auth.js";
const router = express.Router();
router.get("/pedidos",Auth, (req, res) => {
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
router.post("/pedidos/new",Auth, (req, res) => {
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
router.get("/pedidos/delete/:id",Auth, (req, res) => {
  const id = req.params.id;
  Pedido.destroy({ where: { id: id } })
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((error) => {
      console.log(error);
    });
});
router.get("/pedidos/edit/:id",Auth, (req, res) => {
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
router.post("/pedidos/update",Auth, (req, res) => {
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

export default router;
