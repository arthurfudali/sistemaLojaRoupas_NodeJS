import express from "express";
const app = express();
import connection from "./config/sequelize-config.js";
import ClientesController from "./controllers/ClientesController.js";
import ProdutosController from "./controllers/ProdutosController.js";
import PedidosController from "./controllers/PedidosController.js";
import UsuarioController from "./controllers/UsuarioController.js"

import session from "express-session";
import Auth from "./middleware/Auth.js";
import flash from "express-flash";
app.use(flash());

app.use(session({
  secret: "lojaderoupas",
    cookie: {maxAge: 3600000}, //tempo da sessão -> nesse caso uma hora
    saveUninitialized: false,
    resave: false
}))

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))
connection.authenticate().then(()=>{
  console.log("conexao feita com sucesso");
}).catch((error)=>{
  console.log(error)
})

connection.query("CREATE DATABASE IF NOT EXISTS lojaroupa").then(()=>{
  console.log("banco de dados criado")
}).catch((error)=>{
  console.log(error);
})


// Definindo o uso das rotas dos Controllers
app.use("/", ClientesController);
app.use("/", ProdutosController);
app.use("/", PedidosController);
app.use("/", UsuarioController);

app.get("/", Auth, (req, res) => {
  res.render("index", {
    messages: req.flash()
  });
});

//iniciando o servidor
const port = 8080;
app.listen(port, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log(`Servidor iniciado em: http://localhost:${port}`);
  }
});
