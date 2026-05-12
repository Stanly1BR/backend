import express from "express";
import cors from "cors";
import sequelize from "./db.js";
import router from "./controllers/index.js";


const app = express();

// ✅ CORS CONFIGURADO
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true,
}));

app.use(express.json());

// Rotas
app.use('/api', router);

// Sincroniza os modelos com o banco (cria tabelas se não existirem)
sequelize.sync({ force: false })
  .then(() => {
    console.log('📊 Modelos sincronizados com o banco de dados');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar modelos:', err);
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
