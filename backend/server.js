const exp = require(`express`);
const cors = require(`cors`);
const connectionDB = require(`./config/connection`);
var app = exp();

connectionDB();

const bodyParser = require(`body-parser`);
app.use(bodyParser.json());

app.use(cors());

//redireccionamientos
app.use(`/api/login`, require(`./routes/login`));
app.use(`/api/:camarero/mesas`, require(`./routes/mesas`));
app.use(`/api/:camarero/mesas/:mesa`,  require(`./routes/mesas`));

app.use(`/api/platos`, require(`./routes/platos`));
app.use(`/api/:camarero/comandas/modificar/:idPlato/:op`, require(`./routes/comandas`));
app.use(`/api/:camarero/comandas`, require(`./routes/comandas`));
app.use(`/api/:camarero/liberar`, require(`./routes/liberarMesa`));
app.use(`/api/ingredientes`, require(`./routes/ingredientes`));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}


const PORT = process.env.PORT || 3053;
app.listen(PORT, () => console.log("Puerto escuchado el 3053"));
