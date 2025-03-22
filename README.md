# PHP Hostinger MCP Server

Um servidor MCP especializado para desenvolvimento PHP em hospedagem compartilhada com foco em sites e lojas online.

## Sobre

Este servidor MCP (Model-Code-Prompt) fornece um conjunto de ferramentas específicas para desenvolver, otimizar e implantar sites PHP em ambientes de hospedagem compartilhada como a Hostinger. Inclui funcionalidades para criação de sites comuns e lojas online, com ênfase em práticas de segurança e otimização.

## Características

- 🔒 **Guardrails de Segurança**: Regras de proteção específicas para ambiente compartilhado
- 🚀 **Otimização para PHP**: Ferramentas de otimização para melhor desempenho
- 🛍️ **Templates para Lojas**: Modelos pré-configurados para diferentes tipos de lojas
- 🔧 **Integração com Hostinger**: Ferramentas específicas para deploy na Hostinger
- 📊 **Análise de Código**: Verificação de vulnerabilidades e padrões inseguros

## Ferramentas Disponíveis

### Ferramentas PHP

- `php_create_site`: Cria a estrutura básica para um site PHP
- `php_optimize`: Otimiza um site PHP para melhor desempenho
- `php_security_check`: Verifica vulnerabilidades em código PHP

### Ferramentas para Lojas

- `shop_create_template`: Cria uma loja online usando um template pré-definido
- `shop_add_product`: Adiciona um produto à loja online
- `shop_setup_payment`: Configura gateways de pagamento
- `shop_generate_sitemaps`: Gera sitemaps para SEO

### Ferramentas de Integração com Hostinger

- `hostinger_deploy`: Implanta um site no ambiente da Hostinger via FTP
- `hostinger_database_create`: Cria um banco de dados MySQL no ambiente Hostinger
- `hostinger_ssl_setup`: Configura certificado SSL para um domínio

## Guardrails de Segurança

O servidor inclui guardrails para:

- Validação de caminhos de arquivo
- Verificação de segurança em consultas SQL
- Análise de código PHP para funções perigosas
- Validação de uploads de arquivo
- Verificação de configurações de banco de dados

## Como Usar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente necessárias
4. Inicie o servidor: `node index.js`

## Requisitos

- Node.js 14.x ou superior
- Acesso a uma conta na Hostinger (para recursos de integração)

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue para discutir alterações importantes antes de submeter um PR.

## Licença

MIT