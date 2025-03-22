# Guia Rápido - PHP Hostinger MCP Server

Este guia tem o objetivo de ajudar você a começar rapidamente com o PHP Hostinger MCP Server, explicando os conceitos básicos e demonstrando como realizar as tarefas mais comuns.

## O que é o PHP Hostinger MCP Server?

O PHP Hostinger MCP Server é uma ferramenta que facilita o desenvolvimento de sites PHP em hospedagem compartilhada, especialmente na plataforma Hostinger. Ele oferece:

- Criação rápida de arquivos PHP usando templates
- Templates completos para lojas virtuais
- Integração direta com a API da Hostinger
- Otimização de SEO automática
- Configuração de gateways de pagamento
- Guardrails de segurança para ambientes de hospedagem compartilhada

## Instalação em 5 minutos

### Pré-requisitos
- Node.js 16+ instalado
- NPM 7+ instalado
- Conta na Hostinger (opcional, mas recomendado para funcionalidades de integração)

### Passos de instalação

1. Clone o repositório:
```bash
git clone https://github.com/Lucasdoreac/php-hostinger-mcp-server.git
cd php-hostinger-mcp-server
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz com suas credenciais:
```
PORT=3000
ANTHROPIC_API_KEY=your_api_key
HOSTINGER_CLIENT_ID=your_client_id        # opcional
HOSTINGER_CLIENT_SECRET=your_client_secret # opcional
```

4. Inicie o servidor:
```bash
npm start
```

## Primeiros passos

Após iniciar o servidor, ele estará disponível em `http://localhost:3000` (ou na porta configurada).

### 1. Criar uma página PHP básica

```javascript
const { createPhpFile } = require('./src/tools/php-tools');

// Criar um formulário de contato
await createPhpFile({
  filename: 'contact.php',
  template: 'form',
  path: './output'
});
```

### 2. Criar uma loja virtual

```javascript
const { createEcommerceTemplate } = require('./src/tools/ecommerce-tools');

// Criar uma loja de moda
await createEcommerceTemplate({
  type: 'fashion',
  features: ['cart', 'wishlist', 'search'],
  outputPath: './my-fashion-store'
});
```

### 3. Configurar um gateway de pagamento

```javascript
const { setupPaymentGateway } = require('./src/tools/payment-tools');

// Configurar PayPal
await setupPaymentGateway({
  gateway: 'paypal',
  apiCredentials: {
    client_id: 'your_paypal_client_id',
    client_secret: 'your_paypal_client_secret'
  },
  sitePath: './my-fashion-store'
});
```

### 4. Otimizar uma loja para SEO

```javascript
const { optimizeSEO } = require('./src/tools/seo-tools');

// Otimizar SEO
await optimizeSEO({
  sitePath: './my-fashion-store',
  keywords: ['moda', 'roupas', 'loja online', 'fashion'],
  generateSitemap: true
});
```

## Uso via API

Você pode integrar o servidor MCP em suas próprias aplicações usando sua API REST:

### Criação de arquivo PHP

```bash
curl -X POST http://localhost:3000/api/php-file -H "Content-Type: application/json" -d '{
  "filename": "contact.php",
  "template": "form",
  "path": "./output"
}'
```

### Criação de template de e-commerce

```bash
curl -X POST http://localhost:3000/api/ecommerce-template -H "Content-Type: application/json" -d '{
  "type": "fashion",
  "features": ["cart", "wishlist", "search"],
  "outputPath": "./my-fashion-store"
}'
```

## Templates disponíveis

### Templates PHP

- `basic`: Template PHP básico
- `crud`: Sistema CRUD para banco de dados
- `api`: API REST
- `form`: Formulário com validação

### Templates de E-commerce

- `fashion`: Loja de moda
- `electronics`: Loja de eletrônicos
- `food`: Loja de alimentos
- `general`: Loja geral multi-produtos

### Funcionalidades de E-commerce

- `cart`: Carrinho de compras
- `wishlist`: Lista de desejos
- `search`: Sistema de busca
- `reviews`: Avaliações de produtos
- `filters`: Filtros de produtos

## Gateways de pagamento

O MCP Server suporta os seguintes gateways:

- **MercadoPago**: Popular na América Latina
- **PagSeguro**: Gateway brasileiro
- **PayPal**: Gateway internacional
- **Stripe**: Gateway internacional com suporte a múltiplas moedas

## Exemplos de projetos

### Site institucional com formulário de contato

```javascript
// 1. Criar página inicial
await createPhpFile({
  filename: 'index.php',
  template: 'basic',
  path: './company-site'
});

// 2. Criar página de contato
await createPhpFile({
  filename: 'contact.php',
  template: 'form',
  path: './company-site'
});

// 3. Otimizar para SEO
await optimizeSEO({
  sitePath: './company-site',
  keywords: ['empresa', 'serviços', 'contato'],
  generateSitemap: true
});
```

### Loja virtual completa

```javascript
// 1. Criar template de e-commerce
await createEcommerceTemplate({
  type: 'fashion',
  features: ['cart', 'wishlist', 'search', 'filters'],
  outputPath: './fashion-store'
});

// 2. Configurar gateway de pagamento
await setupPaymentGateway({
  gateway: 'mercadopago',
  sitePath: './fashion-store'
});

// 3. Otimizar para SEO
await optimizeSEO({
  sitePath: './fashion-store',
  keywords: ['moda', 'roupas', 'loja online'],
  generateSitemap: true
});

// 4. Publicar na Hostinger (requer credenciais configuradas)
await createHostingerSite({
  domain: 'minhaloja.com.br',
  template: 'ecommerce'
});
```

## Configuração da Hostinger

Se você possui uma conta na Hostinger, pode integrar diretamente com a API deles:

1. Acesse [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Vá para Configurações da Conta > API
3. Crie uma nova aplicação OAuth2
4. Defina o nome e URL de redirecionamento (ex: `http://localhost:3000/callback`)
5. Copie o Client ID e Client Secret para seu arquivo `.env`

## Próximos passos

Após completar este guia rápido, você pode:

1. Explorar a [documentação completa](./README.md)
2. Verificar a [integração com a API da Hostinger](./HOSTINGER_API.md)
3. Contribuir com o projeto no [GitHub](https://github.com/Lucasdoreac/php-hostinger-mcp-server)

## Solução de problemas comuns

### Erro de conexão com a API da Hostinger

Se você encontrar erros ao conectar com a API da Hostinger:
- Verifique se as credenciais estão corretas
- Confirme se a URL de redirecionamento é a mesma configurada no painel
- Verifique se o token de acesso não expirou (válido por 7 dias)

### Templates não encontrados

Se o sistema não encontrar os templates:
- Verifique se a estrutura de diretórios está correta
- Confirme se os arquivos de template existem em `templates/`
- Verifique os logs para identificar o erro específico

### Problemas na criação de sites

Se houver problemas na criação de sites:
- Certifique-se que o domínio está disponível
- Verifique se o pacote de hospedagem especificado é válido
- Aguarde o tempo necessário para a criação (até 5 minutos em alguns casos)

## Recursos adicionais

- [Hostinger API](https://api.hostinger.com/docs)
- [PHP Best Practices](https://phptherightway.com/)
- [E-commerce SEO Guide](https://developers.google.com/search/docs/advanced/ecommerce/ecommerce-seo)