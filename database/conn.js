import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGOURL;
const schema = process.env.MONGOSHEMA;

const connectDB = async () => {
    try {
        await mongoose.connect(`${url}${schema}`);
        console.log('Conexão com o MongoDB estabelecida.');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1); // Encerra o processo com falha em caso de erro na conexão
    }
};

export default connectDB;