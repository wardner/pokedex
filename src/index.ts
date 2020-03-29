import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';


//import routes
import userRoutes from './routes/user.routes';
import  pokemonRoutes from './routes/pokemon.routes';

//Conexion default del ORM
createConnection();

const app = express();

//middelwares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/users', userRoutes);
app.use('/pokes', pokemonRoutes);

app.listen(3000);
console.log('Server on port', 3000);