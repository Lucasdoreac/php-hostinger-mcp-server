# PHP Hostinger MCP Server

Servidor MCP especializado para desenvolvimento PHP em hospedagem compartilhada com foco em sites e lojas online.

## Introdução

O PHP Hostinger MCP Server é uma ferramenta poderosa para auxiliar o desenvolvimento de sites PHP em ambientes de hospedagem compartilhada, especialmente na plataforma Hostinger. O servidor MCP (Machine-assisted Coding Protocol) funciona como um assistente inteligente que facilita a criação, configuração e implantação de sites e lojas virtuais em PHP.

## Características

- Criação de arquivos PHP com templates predefinidos
- Templates completos para lojas virtuais (e-commerce)
- Integração com a plataforma Hostinger
- Otimização para SEO
- Suporte a múltiplos gateways de pagamento
- Guardrails de segurança para PHP em hospedagem compartilhada

## Instalação

### Pré-requisitos

- Node.js 16.x ou superior
- NPM 7.x ou superior

### Passos de instalação

1. Clone o repositório:
```bash
git clone https://github.com/Lucasdoreac/php-hostinger-mcp-server.git
```

2. Instale as dependências:
```bash
cd php-hostinger-mcp-server
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
```
PORT=3000
ANTHROPIC_API_KEY=your_claude_api_key
HOSTINGER_CLIENT_ID=your_hostinger_client_id
HOSTINGER_CLIENT_SECRET=your_hostinger_client_secret
HOSTINGER_REDIRECT_URI=http://localhost:3000/callback
```

4. Inicie o servidor:
```bash
npm start
```

## Uso

### Ferramentas disponíveis

O PHP Hostinger MCP Server oferece várias ferramentas para facilitar o desenvolvimento PHP:

#### Criação de arquivos PHP

```javascript
// Exemplo de uso da ferramenta de criação de arquivos PHP
const result = await createPhpFile({
  filename: 'contact.php',
  template: 'form',
  path: '/path/to/your/site'
});
```

Templates disponíveis:
- `basic`: Template básico PHP
- `crud`: Template CRUD para banco de dados
- `api`: Template de API REST
- `form`: Template de formulário com validação

#### Criação de sites na Hostinger

```javascript
// Exemplo de uso da ferramenta de criação de sites na Hostinger
const result = await createHostingerSite({
  domain: 'example.com',
  template: 'ecommerce',
  apiKey: 'your_hostinger_api_key'
});
```

#### Criação de templates de e-commerce

```javascript
// Exemplo de uso da ferramenta de criação de templates de e-commerce
const result = await createEcommerceTemplate({
  type: 'fashion',
  features: ['cart', 'wishlist', 'search'],
  outputPath: '/path/to/your/site'
});
```

Tipos de e-commerce disponíveis:
- `fashion`: Loja de moda e vestuário
- `electronics`: Loja de eletrônicos
- `food`: Loja de alimentos
- `general`: Loja geral multisegmento

Funcionalidades disponíveis:
- `cart`: Carrinho de compras
- `wishlist`: Lista de desejos
- `search`: Sistema de busca
- `reviews`: Sistema de avaliações
- `filters`: Filtros de produtos

#### Otimização SEO

```javascript
// Exemplo de uso da ferramenta de otimização SEO
const result = await optimizeSEO({
  sitePath: '/path/to/your/site',
  keywords: ['loja', 'produtos', 'ecommerce'],
  generateSitemap: true
});
```

#### Configuração de gateway de pagamento

```javascript
// Exemplo de uso da ferramenta de configuração de gateway de pagamento
const result = await setupPaymentGateway({
  gateway: 'mercadopago',
  apiCredentials: {
    access_token: 'YOUR_ACCESS_TOKEN',
    public_key: 'YOUR_PUBLIC_KEY'
  },
  sitePath: '/path/to/your/site'
});
```

Gateways de pagamento suportados:
- `mercadopago`: MercadoPago
- `pagseguro`: PagSeguro
- `paypal`: PayPal
- `stripe`: Stripe

### Integração com a API da Hostinger

Para utilizar as funcionalidades de integração com a API da Hostinger, é necessário obter as credenciais de API no painel da Hostinger e configurá-las no servidor MCP.

```javascript
// Exemplo de uso da integração com a API da Hostinger
const client = await createHostingerClient({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://localhost:3000/callback'
});

// Criar um site
const site = await client.createSite({
  domain: 'example.com',
  package: 'premium',
  template: 'ecommerce'
});

// Upload de arquivo
await client.uploadFile(site.id, '/path/to/local/file.php', '/public_html/file.php');
```

## Estrutura de diretórios

- `src/`: Código-fonte do servidor MCP
  - `index.js`: Arquivo principal do servidor
  - `tools/`: Ferramentas disponíveis
    - `php-tools.js`: Ferramentas para manipulação de arquivos PHP
    - `hostinger-tools.js`: Ferramentas para integração com a Hostinger
    - `ecommerce-tools.js`: Ferramentas para criação de templates de e-commerce
    - `payment-tools.js`: Ferramentas para configuração de gateways de pagamento
    - `seo-tools.js`: Ferramentas para otimização SEO
    - `hostinger-api.js`: Integração com a API da Hostinger
  - `guardrails/`: Guardrails de segurança para PHP
- `templates/`: Templates disponíveis
  - `lojas/`: Templates para lojas virtuais
  - `sites/`: Templates para sites
- `docs/`: Documentação

## Templates de e-commerce

Os templates de e-commerce incluem as seguintes páginas e funcionalidades:

### Páginas

- Home
- Listagem de produtos
- Página de produto
- Carrinho de compras
- Checkout
- Cadastro e login
- Minha conta
- Sobre
- Contato

### Funcionalidades

- Sistema de carrinho de compras
- Lista de desejos
- Sistema de busca
- Filtros de produtos
- Cálculo de frete
- Integração com gateways de pagamento
- SEO otimizado
- Responsividade para dispositivos móveis

## Guardrails de segurança

O servidor MCP inclui guardrails de segurança para garantir que o código PHP gerado seja seguro e compatível com ambientes de hospedagem compartilhada. Estes guardrails incluem:

- Prevenção de funções PHP potencialmente perigosas
- Boas práticas de programação em PHP
- Limitação de uso de recursos do servidor
- Operações seguras com arquivos
- Sanitização de entrada do usuário

## Exemplos

### Criação de uma loja virtual completa

```javascript
// 1. Criar template de e-commerce
const template = await createEcommerceTemplate({
  type: 'fashion',
  features: ['cart', 'wishlist', 'search', 'filters'],
  outputPath: '/path/to/your/site'
});

// 2. Otimizar para SEO
await optimizeSEO({
  sitePath: '/path/to/your/site',
  keywords: ['moda', 'roupas', 'loja', 'online'],
  generateSitemap: true
});

// 3. Configurar gateway de pagamento
await setupPaymentGateway({
  gateway: 'mercadopago',
  apiCredentials: {
    access_token: 'YOUR_ACCESS_TOKEN',
    public_key: 'YOUR_PUBLIC_KEY'
  },
  sitePath: '/path/to/your/site'
});

// 4. Criar site na Hostinger
await createHostingerSite({
  domain: 'example.com',
  template: 'ecommerce',
  apiKey: 'your_hostinger_api_key'
});
```

### Criação de um sistema CRUD

```javascript
// 1. Criar arquivo CRUD
await createPhpFile({
  filename: 'produtos.php',
  template: 'crud',
  path: '/path/to/your/site'
});

// 2. Criar formulário de cadastro
await createPhpFile({
  filename: 'cadastro.php',
  template: 'form',
  path: '/path/to/your/site'
});

// 3. Criar API para consulta
await createPhpFile({
  filename: 'api.php',
  template: 'api',
  path: '/path/to/your/site'
});
```

## Suporte

Para obter suporte ou relatar problemas, abra uma issue no repositório:
[https://github.com/Lucasdoreac/php-hostinger-mcp-server/issues](https://github.com/Lucasdoreac/php-hostinger-mcp-server/issues)

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.