import express from 'express';
import appRoutes from './route/route'

const app = express();

//middlewares
app.use(express.json());

app.use(appRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
  });

  export default app;