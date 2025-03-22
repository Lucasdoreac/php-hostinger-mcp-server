/**
 * PHP Hostinger MCP Server
 * 
 * Servidor MCP especializado para desenvolvimento PHP em hospedagem compartilhada
 * com foco em sites e lojas online.
 */

const { createMcpServer } = require('@anthropic-ai/mcp-core');
const { createTool, createSafeTools } = require('@anthropic-ai/mcp-core');

// Importar ferramentas e guardrails
const phpTools = require('./tools/php-tools');
const hostingerIntegration = require('./tools/hostinger-integration');
const securityGuardrails = require('./guardrails/security');
const shopTemplates = require('./tools/shop-templates');

/**
 * Configuração do servidor MCP
 */
const server = createMcpServer({
  name: 'php-hostinger-mcp-server',
  description: 'Servidor MCP especializado para desenvolvimento PHP em hospedagem compartilhada com foco em sites e lojas online',
  version: '0.1.0',
  tools: [
    // Ferramentas PHP
    ...createSafeTools(phpTools, securityGuardrails),
    
    // Ferramentas de integração com Hostinger
    ...createSafeTools(hostingerIntegration, securityGuardrails),
    
    // Templates para lojas
    ...shopTemplates
  ],
  // Configurações adicionais
  config: {
    maxUploadSize: '10MB', // Limite de upload compatível com hospedagem compartilhada
    timeoutMs: 30000, // Timeout adequado para operações PHP
    guardrails: securityGuardrails,
  }
});

// Iniciar o servidor na porta definida ou 3000 por padrão
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`PHP Hostinger MCP Server rodando na porta ${port}`);
});