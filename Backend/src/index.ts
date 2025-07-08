import app from "./server";
import colors from 'colors';

const port = 5100

app.listen(port,()=>{
    console.log(colors.blue.bold(`Servidor de mi prueba tecnica funcionando correctamente en el puerto ${port}`))
})