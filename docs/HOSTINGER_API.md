# Integração com a API da Hostinger

Este documento descreve a integração do PHP Hostinger MCP Server com a API da Hostinger para criação e gerenciamento de sites, domínios, bancos de dados e outros recursos na plataforma Hostinger.

## Obtenção de credenciais

Para utilizar a integração com a API da Hostinger, é necessário obter as credenciais de API:

1. Acesse o [Painel da Hostinger](https://hpanel.hostinger.com)
2. Vá para Configurações da Conta > API
3. Crie uma nova aplicação OAuth2
4. Defina um nome para a aplicação e a URL de redirecionamento (por padrão, use `http://localhost:3000/callback`)
5. Anote o Client ID e Client Secret gerados

## Configuração

As credenciais da API da Hostinger devem ser configuradas no arquivo `.env` do servidor MCP:

```
HOSTINGER_CLIENT_ID=your_client_id
HOSTINGER_CLIENT_SECRET=your_client_secret
HOSTINGER_REDIRECT_URI=http://localhost:3000/callback
```

Ou podem ser fornecidas diretamente nas chamadas das funções:

```javascript
const result = await createHostingerSiteWithAPI({
  domain: 'example.com',
  template: 'ecommerce',
  apiConfig: {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    redirectUri: 'http://localhost:3000/callback'
  }
});
```

## Fluxo de autorização OAuth2

A integração utiliza o fluxo OAuth2 para autenticação com a API da Hostinger:

1. O servidor MCP gera uma URL de autorização
2. O usuário acessa a URL e autoriza o acesso
3. A Hostinger redireciona para a URL configurada com um código de autorização
4. O servidor MCP utiliza o código para obter um token de acesso
5. O token é armazenado em um arquivo e utilizado nas requisições futuras

## Classes e funções disponíveis

### Classe HostingerClient

Classe principal para interação com a API da Hostinger.

#### Construtor

```javascript
const client = new HostingerClient(clientId, clientSecret, redirectUri, tokenFile);
```

- `clientId`: ID do cliente da API
- `clientSecret`: Chave secreta do cliente
- `redirectUri`: URL de redirecionamento
- `tokenFile`: Caminho para o arquivo de token (opcional)

#### Métodos

- `init()`: Inicializa o cliente e carrega o token se disponível
- `getAuthorizationUrl(scope)`: Obtém URL de autorização
- `getAccessToken(code)`: Obtém token de acesso com código de autorização
- `refreshToken()`: Atualiza o token de acesso
- `request(endpoint, options)`: Realiza uma requisição para a API

#### Métodos para domínios

- `getDomains()`: Obtém lista de domínios
- `getDomain(domainName)`: Obtém informações de um domínio específico

#### Métodos para sites

- `getSites()`: Obtém lista de sites hospedados
- `getSite(siteId)`: Obtém informações de um site específico
- `createSite(data)`: Cria um novo site
- `updateSite(siteId, data)`: Atualiza um site existente
- `deleteSite(siteId)`: Exclui um site

#### Métodos para bancos de dados

- `getDatabases()`: Obtém lista de bancos de dados
- `createDatabase(data)`: Cria um novo banco de dados

#### Métodos para arquivos e FTP

- `uploadFile(siteId, filePath, remotePath)`: Upload de arquivo para o site
- `createFtpAccount(siteId, data)`: Cria conta FTP para um site

#### Métodos para SSL

- `installSsl(siteId)`: Instala certificado SSL para um site

### Funções auxiliares

#### createHostingerClient

```javascript
const client = await createHostingerClient(config);
```

Cria e configura um cliente da API da Hostinger.

Parâmetros:
- `config`: Objeto com as configurações do cliente
  - `clientId`: ID do cliente da API
  - `clientSecret`: Chave secreta do cliente
  - `redirectUri`: URL de redirecionamento
  - `tokenFile`: Caminho para o arquivo de token (opcional)

#### createHostingerSiteWithAPI

```javascript
const result = await createHostingerSiteWithAPI({
  domain: 'example.com',
  template: 'ecommerce',
  apiConfig: {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    redirectUri: 'http://localhost:3000/callback',
    package: 'premium',
    registerDomain: true
  }
});
```

Cria um site na Hostinger utilizando a API.

Parâmetros:
- `domain`: Domínio do site
- `template`: Template do site
- `apiConfig`: Configurações da API
  - `clientId`: ID do cliente da API
  - `clientSecret`: Chave secreta do cliente
  - `redirectUri`: URL de redirecionamento (opcional)
  - `tokenFile`: Caminho para o arquivo de token (opcional)
  - `package`: Pacote de hospedagem (opcional)
  - `registerDomain`: Se deve registrar o domínio (opcional)

#### processHostingerAuthCallback

```javascript
const result = await processHostingerAuthCallback({
  code: 'authorization_code',
  apiConfig: {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    redirectUri: 'http://localhost:3000/callback'
  }
});
```

Processa o callback de autorização da Hostinger.

Parâmetros:
- `code`: Código de autorização
- `apiConfig`: Configurações da API
  - `clientId`: ID do cliente da API
  - `clientSecret`: Chave secreta do cliente
  - `redirectUri`: URL de redirecionamento (opcional)
  - `tokenFile`: Caminho para o arquivo de token (opcional)

#### publishToHostingerAPI

```javascript
const result = await publishToHostingerAPI({
  siteId: 'site_id',
  filePath: '/path/to/local/file.php',
  remotePath: '/public_html/',
  apiConfig: {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret'
  }
});
```

Publica arquivos em um site Hostinger.

Parâmetros:
- `siteId`: ID do site
- `filePath`: Caminho local do arquivo
- `remotePath`: Caminho remoto para upload
- `apiConfig`: Configurações da API

#### setupHostingerDatabaseAPI

```javascript
const result = await setupHostingerDatabaseAPI({
  siteId: 'site_id',
  dbName: 'database_name',
  dbUser: 'database_user',
  dbPassword: 'database_password',
  apiConfig: {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret'
  }
});
```

Configura banco de dados MySQL na Hostinger.

Parâmetros:
- `siteId`: ID do site
- `dbName`: Nome do banco de dados
- `dbUser`: Usuário do banco de dados
- `dbPassword`: Senha do banco de dados
- `apiConfig`: Configurações da API

## Exemplos de uso

### Autorização

```javascript
// Criar cliente
const client = await createHostingerClient({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://localhost:3000/callback'
});

// Verificar se já está autorizado
if (!client.token) {
  // Obter URL de autorização
  const authUrl = client.getAuthorizationUrl();
  console.log('Acesse a URL para autorizar:', authUrl);
  
  // Em um servidor web, redirecionar para a URL
  // res.redirect(authUrl);
}

// Processar callback (em um endpoint de callback)
app.get('/callback', async (req, res) => {
  const code = req.query.code;
  
  const result = await processHostingerAuthCallback({
    code,
    apiConfig: {
      clientId: 'your_client_id',
      clientSecret: 'your_client_secret',
      redirectUri: 'http://localhost:3000/callback'
    }
  });
  
  if (result.success) {
    res.send('Autorização concluída com sucesso!');
  } else {
    res.status(400).send('Erro: ' + result.message);
  }
});
```

### Criação de site

```javascript
// Criar site
const result = await createHostingerSiteWithAPI({
  domain: 'example.com',
  template: 'ecommerce',
  apiConfig: {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    package: 'premium'
  }
});

if (result.success) {
  console.log('Site criado com sucesso:', result.site);
} else if (result.needsAuth) {
  console.log('Autorização necessária. Acesse:', result.authUrl);
} else {
  console.error('Erro:', result.message);
}
```

### Upload de arquivos

```javascript
// Upload de arquivo
const result = await publishToHostingerAPI({
  siteId: 'site_id',
  filePath: '/path/to/local/index.php',
  remotePath: '/public_html/',
  apiConfig: {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret'
  }
});

if (result.success) {
  console.log('Arquivo publicado com sucesso:', result.file);
} else {
  console.error('Erro:', result.message);
}
```

### Configuração de banco de dados

```javascript
// Criar banco de dados
const result = await setupHostingerDatabaseAPI({
  siteId: 'site_id',
  dbName: 'my_database',
  dbUser: 'db_user',
  dbPassword: 'db_password',
  apiConfig: {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret'
  }
});

if (result.success) {
  console.log('Banco de dados configurado com sucesso:', result.database);
} else {
  console.error('Erro:', result.message);
}
```

### Uso direto do cliente

```javascript
// Criar cliente
const client = await createHostingerClient({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://localhost:3000/callback'
});

// Listar domínios
const domains = await client.getDomains();
console.log('Domínios:', domains);

// Listar sites
const sites = await client.getSites();
console.log('Sites:', sites);

// Instalar SSL
await client.installSsl('site_id');
```

## Limites e considerações

- A API da Hostinger pode ter limites de requisições, consulte a documentação oficial
- O token de acesso é válido por 7 dias por padrão
- O refresh token é válido por 30 dias
- Algumas operações podem demorar alguns minutos para serem concluídas
- Armazene as credenciais de API de forma segura e não as inclua em repositórios públicos

## Recursos adicionais

- [Documentação oficial da API da Hostinger](https://api.hostinger.com/docs)
- [Painel de desenvolvedores da Hostinger](https://hpanel.hostinger.com/api)