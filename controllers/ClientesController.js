import express from 'express'
const router = express.Router()
router.get("/clientes", (req,res) =>{
    const clientes=[
        {
            nome: "Arthur",
            cpf: 12312312301,
            endereco: "Pariquera"
        },
        {
            nome: "Eric",
            cpf: 12312312302,
            endereco: "Registro"
        },
        {
            nome: "Amanda",
            cpf: 12312312303,
            endereco: "Sete Barras"
        },
        {
            nome: "Igor",
            cpf: 12312312304,
            endereco: "Registro"
        }
    ]
    res.render("clientes",{
        clientes:clientes
    });
});
export default router;