const express = require ("express");
const app= express();
const mysql=require("mysql");
const cors = require("cors");
const PORT = 3001; 

app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    host:"localhost",
    //port: 3306,
    user:"root",
    //password:"77448360",
    password:"adme5416",
    database:"empleadosDB"


});

db.connect((err) => {
if (err) {
    console.error('Error conectando: ' + err.stack);
    return;
}
console.log('Conectado como ID ' + db.threadId);
});


app.get("/empleados",(req,res)=>{

    db.query('SELECT * FROM empleados',
        (err,result)=>{
            if(err){
                console.log("Error en la consulta:", err);
            }else{
                console.log("Empleados obtenidos:", result); // Log para verificar
                res.send(result);
            }
        }
    );
});

app.post("/create",(req,res)=>{
    const nombre=req.body.nombre;
    const edad=req.body.edad;
    const ci=req.body.ci;
    const antiguedad=req.body.antiguedad;
    const cargo=req.body.cargo;

    db.query('INSERT INTO empleados(nombre,edad,ci,antiguedad,cargo) VALUES (?,?,?,?,?)',[nombre,edad,ci,antiguedad,cargo],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("Empleado registrado correctamente!");
            }
        }
    );
});

app.put("/update",(req,res)=>{
    const id=req.body.id;
    const nombre=req.body.nombre;
    const edad=req.body.edad;
    const ci=req.body.ci;
    const antiguedad=req.body.antiguedad;
    const cargo=req.body.cargo;

    db.query('UPDATE empleados SET nombre=?,edad=?,ci=?,antiguedad=?,cargo=? WHERE id=?',[nombre,edad,ci,antiguedad,cargo,id],

    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado actualizado correctamente!");
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;

    db.query('DELETE FROM empleados WHERE id=?',id,

    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.listen(PORT,() => {
    // el puerto de escucha sera el 3001
    //console.log(´Puerto ${PORT} abierto y escuchando´);
    console.log(`Servidor escuchando en el puerto ${PORT}`);

});