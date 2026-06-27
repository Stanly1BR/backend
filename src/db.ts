import { Sequelize } from 'sequelize';

// Configuração do H2 usando Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite', // Usamos SQLite para simular o H2
  storage: './database.sqlite', // Caminho onde o banco será armazenado
  logging: console.log, // Mude para false em produção
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Testa a conexão
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado ao SQLite com sucesso!');
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao SQLite:', err);
  });

export default sequelize;