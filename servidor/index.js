//conection BD
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proyectobd'
}); 
connection.connect();



const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());



app.post("/getTabla", (req, res) => {
  var tid=req.body.tabla;
  connection.query('SELECT * FROM '+tid, function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
});



app.post("/getDireccion", (req, res) => {
  var did=req.body.id;

  connection.query('SELECT * FROM direccion WHERE id = '+did, function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
  
});

app.post("/updateDireccion", (req, res) => {

 const {did,calle,fraccionamiento,numero,ciudad} = req.body;
 console.log(did,calle,fraccionamiento,numero,ciudad);
  connection.query('UPDATE direccion set calle = "'+calle+'", fraccionamiento = "'+fraccionamiento+'", numero = "'+parseInt(numero)+'", ciudad = "'+ciudad+'" WHERE id = "'+did+'"', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
  
});


app.post("/insertDireccion", (req, res) => {
  connection.query(`INSERT INTO  ${req.body.tabla}  VALUES (null,"${req.body.calle}","${req.body.fracc}",${parseInt(req.body.numero,10)},"${req.body.cd}")`,
  function (error, results, fields) {
    if (error) throw error;
    res.send({sucess: true,resultados:results});
  });
});


app.post("/insertRegistro", (req, res) => {
  var insertar='';
  var obj=Object.values(req.body);
  console.log(obj);
  for(var i=1;i<obj.length; i++){
    if(i!=obj.length-1)
      insertar+="'"+obj[i]+"',";
    else
    insertar+="'"+obj[i]+"'";
  }
  connection.query('INSERT INTO '+ req.body.tabla +' VALUES ('+ insertar+')', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true});
  });
});



app.post("/insertProyecto", (req, res) => {
  connection.query(`INSERT INTO  ${req.body.tabla}  VALUES ("${req.body.id}","${req.body.nombre}","${req.body.finicio}","${req.body.fentrega}",${parseInt(req.body.presupuesto,10)},${parseInt(req.body.ganancia,10)},"${req.body.id_cliente}")`,
  function (error, results, fields) {
    connection.query(`CALL insertAdmin("${req.body.id}","${req.body.id_lider}")`,
    function (error2, results2, fields2) {
      if (error2) throw error2;
      res.send({sucess: true});
    });
  });
});

app.post("/updateProyecto", (req, res) => {
  const {id,nombre,fecha_inicio,fecha_entrega,presupuesto,ganancia_estimada} = req.body;

  connection.query('UPDATE proyecto set nombre = "'+nombre+'", fecha_inicio = "'+fecha_inicio+'", fecha_entrega = "'+fecha_entrega+'", presupuesto = "'+parseInt(presupuesto)+'", ganancia_estimada = "'+parseInt(ganancia_estimada)+'" WHERE id = "'+id+'"', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
});


app.post("/addAdministra", (req, res) => { 
    connection.query(`CALL insertAdmin("${req.body.id_proy}","${req.body.id_lider}")`,
    function (error2, results2, fields2) {
      if (error2) throw error2;
      res.send({sucess: true});
    });
});



app.post("/insertCliente", (req, res) => {
  connection.query(`INSERT INTO  ${req.body.tabla}  VALUES ("${req.body.id}","${req.body.nombre}","${req.body.tel}",${parseInt(req.body.id_dir,10)})`,
  function (error, results, fields) {
    if (error) throw error;
    res.send({sucess: true});
  });
});

app.post("/updateCliente", (req, res) => {
  const {id,nombre,telefono} = req.body;

  connection.query('UPDATE cliente set nombre = "'+nombre+'", telefono = "'+telefono+'" WHERE id = "'+ id +'"', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
});



app.post("/insertArea", (req, res) => {
  connection.query(`INSERT INTO area VALUES ("${req.body.id}","${req.body.nombre}")`,
  function (error, results, fields) {
    if (error) throw error;
    res.send({sucess: true});
  });
});

app.post("/updateArea", (req, res) => {
  const {id,nombre} = req.body;

  connection.query('UPDATE area set nombre_area = "'+nombre+'" WHERE id = "'+id+'"', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
});



app.post("/insertLider", (req, res) => {
  connection.query(`INSERT INTO  ${req.body.tabla}  VALUES ("${req.body.id}","${req.body.nombre}","${req.body.prima}","${req.body.sega}",${parseInt(req.body.sueldo,10)},"${req.body.tel}","${req.body.horario}",${parseInt(req.body.id_dir,10)})`,
  function (error, results, fields) {
    if (error) throw error;
    res.send({sucess: true});
  });
});

app.post("/updateLider", (req, res) => {
  const {id,nombre,prima,sega,sueldo,tel,horario} = req.body;
  connection.query('UPDATE lider set nombre = "'+nombre+'", primApe = "'+prima+'", segApe = "'+sega+'", sueldo = "'+parseInt(sueldo)+'", telefono = "'+tel+'", horario = "'+horario+'" WHERE id = "'+ id +'"', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
});



app.post("/insertEmpleado", (req, res) => {
  connection.query(`INSERT INTO  ${req.body.tabla}  VALUES ("${req.body.id}","${req.body.nombre}","${req.body.prima}","${req.body.sega}",${parseInt(req.body.sueldo,10)},"${req.body.tel}","${req.body.horario}",${parseInt(req.body.id_dir,10)},"${req.body.id_area}","${req.body.id_eq}","${req.body.id_lider}")`,
  function (error, results, fields) {
    if (error) throw error;
    res.send({sucess: true});
  });
});

app.post("/updateEmpleado", (req, res) => {
  const {id,nombre,prima,sega,sueldo,tel,horario} = req.body;
  connection.query('UPDATE empleado set nombre = "'+nombre+'", primApe = "'+prima+'", segApe = "'+sega+'", sueldo = "'+parseInt(sueldo)+'", telefono = "'+tel+'", horario = "'+horario+'" WHERE id = "'+ id +'"', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
});


app.post("/insertEquipo", (req, res) => {
  connection.query(`INSERT INTO  ${req.body.tabla}  VALUES ("${req.body.id}","${req.body.tipo}",${parseInt(req.body.costo,10)},"${req.body.marca}")`,
  function (error, results, fields) {
    if (error) throw error;
    res.send({sucess: true});
  });
});

app.post("/updateEquipo", (req, res) => {
  const {id,tipo,costo,marca} = req.body;
  console.log(id,tipo,costo,marca);
  connection.query('UPDATE Equipo_de_computo set tipo = "'+tipo+'", costo = "'+costo+'", marca = "'+marca+'" WHERE id = "'+ id +'"', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
});



app.post("/insertModulo", (req, res) => {
  connection.query(`INSERT INTO  ${req.body.tabla}  VALUES ("${req.body.id}","${req.body.nombre}","${req.body.tipo}","${req.body.id_proyecto}")`,
  function (error, results, fields) {
    if (error) throw error;
    res.send({sucess: true});
  });
});

app.post("/updateModulo", (req, res) => {
  const {id, nombre,tipo} = req.body;
  connection.query('UPDATE Modulo set nombre = "'+nombre+'", tipo = "'+tipo+'" WHERE id = "'+ id +'"', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
});



app.post("/insertProveedor", (req, res) => {
  connection.query(`INSERT INTO  ${req.body.tabla}  VALUES ("${req.body.id}","${req.body.nombre}","${req.body.sitio_web}","${req.body.descripcion}","${req.body.id_proyecto}")`,
  function (error, results, fields) {
    if (error) throw error;
    res.send({sucess: true});
  });
});

app.post("/updateProveedor", (req, res) => {
  const {id, nombre,sitio_web,descripcion} = req.body;
  connection.query('UPDATE Proveedor set nombre = "'+nombre+'", sitio_web = "'+sitio_web+'", descripcion = "'+descripcion+'" WHERE id = "'+ id +'"', function (error, results, fields) {
  if (error) throw error;
    res.send({sucess: true, results});
  });
});

app.post("/deleteRegistro", (req, res) => {
  connection.query('DELETE FROM '+ req.body.tabla+' WHERE id="'+req.body.id+'"', function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true});
  });
});

app.post("/deleteAdminByProyecto", (req, res) => {
  connection.query(`call deleteAdminByProyecto("${req.body.id_proy}") `, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true});
  });
});

app.post("/deleteAdminByLider", (req, res) => {
  connection.query(`call deleteAdminByLider("${req.body.id_lider}")`, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true,results});
  });
});

app.post("/reporte1", (req, res) => {
  connection.query(`SELECT DISTINCT e.*, a.nombre_area as 'area a la que pertenece' FROM empleado e, lider l ,area a ,proyecto p , administra ad
  where  ad.id_proyecto="${req.body.id}" and ad.id_lider=l.id 
  and e.id_lider=l.id and a.id=e.id_area`, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true,results});
  });
});

app.post("/reporte2", (req, res) => {
  connection.query(`SELECT DISTINCT l.* FROM cliente c, lider l, proyecto p, administra a 
  WHERE c.id='${req.body.id}' and p.id_cliente=c.id and a.id_proyecto=p.id and a.id_lider=l.id
  `, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true, results});
  });
});

app.post("/reporte3", (req, res) => {
  connection.query(`SELECT e.id_area, SUM(e.sueldo) Total FROM empleado e GROUP BY e.id_area with ROLLUP`, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true,results});
  });
});

app.post("/reporte4", (req, res) => {
  connection.query(`SELECT GananciaTotal() as total`, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true,results});
  });
});

app.post("/reporte5", (req, res) => {
  connection.query(`SELECT PorcentajeGan("${req.body.id_proy}") as Ganancia`, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true,results});
  });
});

app.post("/reporte5", (req, res) => {
  connection.query(`SELECT PorcentajeGan("${req.body.id_proy}") as Ganancia`, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true,results});
  });
});

app.post("/vista1", (req, res) => {
  connection.query(`SELECT * FROM Proy_Prov`, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true,results});
  });
});

app.post("/vista2", (req, res) => {
  connection.query(`SELECT * FROM muestra_empleado`, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true,results});
  });
});

app.post("/vista3", (req, res) => {
  connection.query(`SELECT * FROM Equipo `, function (error, results, fields) {
  if (error) throw error;
  res.send({sucess: true,results});
  });
});



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});