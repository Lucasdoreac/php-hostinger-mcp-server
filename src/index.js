// PHP Hostinger MCP Server
// Servidor MCP especializado para desenvolvimento PHP em hospedagem compartilhada

import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

// Importar ferramentas e guardrails
import { registerTools } from './tools/index.js';
import { setupGuardrails } from './guardrails/index.js';

// Configuração
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    name: 'PHP Hostinger MCP Server',
    description: 'Servidor MCP especializado para desenvolvimento PHP em hospedagem compartilhada'
  });
});

// Iniciar MCP Server
async function initServer() {
  try {
    // Criar diretórios se não existirem
    await createDirectoriesIfNeeded();
    
    // Registrar ferramentas
    const tools = registerTools();
    console.log(`Registradas ${tools.length} ferramentas`);
    
    // Configurar guardrails
    setupGuardrails();
    console.log('Guardrails configurados');
    
    // Iniciar servidor
    app.listen(port, () => {
      console.log(`Servidor MCP rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar o servidor:', error);
  }
}

// Criar diretórios necessários
async function createDirectoriesIfNeeded() {
  const directories = [
    join(__dirname, 'tools'),
    join(__dirname, 'guardrails'),
    join(__dirname, '../templates'),
    join(__dirname, '../templates/lojas'),
    join(__dirname, '../templates/sites')
  ];
  
  for (const dir of directories) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }
}

// Iniciar o servidor
initServer();