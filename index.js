import express from "express";
import connection from "./database/connection.js";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoutes from "./routes/user.js";
import PublicationRoutes from "./routes/publication.js";
import FollowRoutes from "./routes/follow.js";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/* Mensaje de bibendenida para veficiar que se ejecutó bien la API de node */

console.log("API Node e ejecución");

/* Conexión a la BD */
connection();

/* Crear servidor de Node */
const app = express();
const puerto = process.env.PORT || 3900;

/* Cinfigruar CORD para permitir peticiones en navegador */
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD, PUT,PATCH,POST,DELETE',
  /* Métodos permitidos */
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

/* Dcodificar datos desde formularios para converlos en objetsJS */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Configurar rutas del aplicativo
app.use('/api/user', UserRoutes);
app.use('/api/publication', PublicationRoutes);
app.use('/api/follow', FollowRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración para servir archivos estáticos (imágenes de avatar)
app.use('/uploads/avatars', express.static(path.join(__dirname, 'uploads', 'avatars')));

// Configuración para servir archivos estáticos (imágenes de publicaciones)
app.use('/uploads/publications', express.static(path.join(__dirname, 'uploads', 'publications')));
// RTuta de prueba
app.get("/ruta-prueba", (req, res) => {
  return res.status(200).json(
    {
      'id': 1,
      'name': 'Fernada Sandoval',
      'username': 'luchis'
    }
  );
  });

/* Configurar el servidor de Node */

app.listen(puerto, () => {
    console.log("Servidor de Node ejecutándose en el puerto", puerto);
  });
  
export default app;
