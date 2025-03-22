/**
 * Exemplo de uso da API da Hostinger
 * 
 * Este exemplo demonstra como utilizar a integração com a API da Hostinger
 * para gerenciar sites, domínios, bancos de dados e outras operações.
 * 
 * IMPORTANTE: Para utilizar este exemplo, é necessário obter credenciais
 * de API no painel da Hostinger e configurar corretamente as variáveis de ambiente.
 */

// Importar as ferramentas necessárias
const {
  createHostingerClient,
  createHostingerSiteWithAPI,
  processHostingerAuthCallback,
  publishToHostingerAPI,
  setupHostingerDatabaseAPI
} = require('../src/tools/hostinger-api');

// Configurações da API
// Em um ambiente real, use variáveis de ambiente
const apiConfig = {
  clientId: process.env.HOSTINGER_CLIENT_ID || 'your_client_id',
  clientSecret: process.env.HOSTINGER_CLIENT_SECRET || 'your_client_secret',
  redirectUri: process.env.HOSTINGER_REDIRECT_URI || 'http://localhost:3000/callback',
  tokenFile: './hostinger-token.json'
};

// Função para demonstrar fluxo de autorização
async function demonstrateAuthorization() {
  try {
    console.log('Demonstrando fluxo de autorização...');
    
    // Criar cliente
    const client = await createHostingerClient(apiConfig);
    
    // Verificar se já está autorizado
    if (!client.token) {
      // Obter URL de autorização
      const authUrl = client.getAuthorizationUrl();
      console.log('Você precisa autorizar o acesso à API da Hostinger.');
      console.log(`Acesse a URL para autorizar: ${authUrl}`);
      console.log('Após autorizar, você será redirecionado para a URL de callback com um código.');
      console.log('Cole o código de autorização quando solicitado.');
      
      // Em um ambiente real, você implementaria um servidor web para capturar o callback
      // Aqui, vamos simular com entrada manual do código
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      return new Promise((resolve) => {
        readline.question('Cole o código de autorização: ', async (code) => {
          readline.close();
          
          // Processar código de autorização
          const result = await processHostingerAuthCallback({
            code,
            apiConfig
          });
          
          if (result.success) {
            console.log('Autorização concluída com sucesso!');
            resolve(true);
          } else {
            console.error(`Erro na autorização: ${result.message}`);
            resolve(false);
          }
        });
      });
    } else {
      console.log('Cliente já está autorizado.');
      return true;
    }
  } catch (error) {
    console.error(`Erro no fluxo de autorização: ${error.message}`);
    return false;
  }
}

// Função para listar domínios
async function listDomains() {
  try {
    console.log('\nListando domínios...');
    
    // Criar cliente
    const client = await createHostingerClient(apiConfig);
    
    // Verificar se está autorizado
    if (!client.token) {
      console.log('Cliente não autorizado. Execute o fluxo de autorização primeiro.');
      return false;
    }
    
    // Listar domínios
    const domains = await client.getDomains();
    
    console.log('Domínios:');
    if (domains.length === 0) {
      console.log('Nenhum domínio encontrado.');
    } else {
      domains.forEach(domain => {
        console.log(`- ${domain.name} (Status: ${domain.status})`);
      });
    }
    
    return true;
  } catch (error) {
    console.error(`Erro ao listar domínios: ${error.message}`);
    return false;
  }
}

// Função para listar sites
async function listSites() {
  try {
    console.log('\nListando sites...');
    
    // Criar cliente
    const client = await createHostingerClient(apiConfig);
    
    // Verificar se está autorizado
    if (!client.token) {
      console.log('Cliente não autorizado. Execute o fluxo de autorização primeiro.');
      return false;
    }
    
    // Listar sites
    const sites = await client.getSites();
    
    console.log('Sites:');
    if (sites.length === 0) {
      console.log('Nenhum site encontrado.');
    } else {
      sites.forEach(site => {
        console.log(`- ID: ${site.id}, Domínio: ${site.domain}, Status: ${site.status}`);
      });
    }
    
    return true;
  } catch (error) {
    console.error(`Erro ao listar sites: ${error.message}`);
    return false;
  }
}

// Função para demonstrar criação de site
async function demonstrateCreateSite() {
  try {
    console.log('\nDemonstrando criação de site...');
    
    // Este exemplo está comentado para evitar criação acidental de sites
    console.log('Esta operação está comentada para evitar criação acidental de sites.');
    console.log('Para testar, descomente o código e configure um domínio válido.');
    
    /*
    // Criar site
    const result = await createHostingerSiteWithAPI({
      domain: 'example.com', // Substitua por seu domínio
      template: 'ecommerce',
      apiConfig
    });
    
    if (result.success) {
      console.log('Site criado com sucesso:');
      console.log(`- ID: ${result.site.id}`);
      console.log(`- Domínio: ${result.site.domain}`);
      console.log(`- Status: ${result.site.status}`);
    } else if (result.needsAuth) {
      console.log('Autorização necessária. Execute o fluxo de autorização primeiro.');
    } else {
      console.error(`Erro ao criar site: ${result.message}`);
    }
    */
    
    return true;
  } catch (error) {
    console.error(`Erro ao demonstrar criação de site: ${error.message}`);
    return false;
  }
}

// Função para simular upload de arquivo
async function demonstrateFileUpload() {
  try {
    console.log('\nDemonstrando upload de arquivo...');
    
    // Este exemplo está comentado para evitar uploads acidentais
    console.log('Esta operação está comentada para evitar uploads acidentais.');
    console.log('Para testar, descomente o código e configure um site válido.');
    
    /*
    // Criar arquivo de teste
    const fs = require('fs').promises;
    await fs.writeFile('./test.php', '<?php echo "Hello, World!"; ?>');
    
    // Upload de arquivo
    const siteId = 'your_site_id'; // Substitua pelo ID do seu site
    const result = await publishToHostingerAPI({
      siteId,
      filePath: './test.php',
      remotePath: '/public_html/',
      apiConfig
    });
    
    // Remover arquivo de teste
    await fs.unlink('./test.php');
    
    if (result.success) {
      console.log('Arquivo publicado com sucesso:');
      console.log(`- Arquivo: ${result.file.name}`);
      console.log(`- Caminho: ${result.file.path}`);
    } else if (result.needsAuth) {
      console.log('Autorização necessária. Execute o fluxo de autorização primeiro.');
    } else {
      console.error(`Erro ao publicar arquivo: ${result.message}`);
    }
    */
    
    return true;
  } catch (error) {
    console.error(`Erro ao demonstrar upload de arquivo: ${error.message}`);
    return false;
  }
}

// Função para simular criação de banco de dados
async function demonstrateCreateDatabase() {
  try {
    console.log('\nDemonstrando criação de banco de dados...');
    
    // Este exemplo está comentado para evitar criação acidental de bancos de dados
    console.log('Esta operação está comentada para evitar criação acidental de bancos de dados.');
    console.log('Para testar, descomente o código e configure um site válido.');
    
    /*
    // Criar banco de dados
    const siteId = 'your_site_id'; // Substitua pelo ID do seu site
    const result = await setupHostingerDatabaseAPI({
      siteId,
      dbName: 'my_database',
      dbUser: 'db_user',
      dbPassword: 'db_password',
      apiConfig
    });
    
    if (result.success) {
      console.log('Banco de dados criado com sucesso:');
      console.log(`- Nome: ${result.database.name}`);
      console.log(`- Usuário: ${result.database.username}`);
      console.log(`- Host: ${result.database.host}`);
    } else if (result.needsAuth) {
      console.log('Autorização necessária. Execute o fluxo de autorização primeiro.');
    } else {
      console.error(`Erro ao criar banco de dados: ${result.message}`);
    }
    */
    
    return true;
  } catch (error) {
    console.error(`Erro ao demonstrar criação de banco de dados: ${error.message}`);
    return false;
  }
}

// Função principal
async function main() {
  console.log('Exemplo de uso da API da Hostinger\n');
  
  // Verificar se as variáveis de ambiente estão configuradas
  if (!process.env.HOSTINGER_CLIENT_ID || !process.env.HOSTINGER_CLIENT_SECRET) {
    console.log('AVISO: Variáveis de ambiente não configuradas.');
    console.log('Para usar a API da Hostinger, configure as variáveis de ambiente:');
    console.log('- HOSTINGER_CLIENT_ID');
    console.log('- HOSTINGER_CLIENT_SECRET');
    console.log('- HOSTINGER_REDIRECT_URI (opcional)');
    console.log('\nAlternativamente, edite este arquivo e defina as credenciais diretamente.\n');
  }
  
  // Executar demonstrações
  await demonstrateAuthorization();
  await listDomains();
  await listSites();
  await demonstrateCreateSite();
  await demonstrateFileUpload();
  await demonstrateCreateDatabase();
  
  console.log('\nExemplo concluído!');
}

// Executar função principal
main().catch(error => {
  console.error(`Erro na execução: ${error.message}`);
  process.exit(1);
});