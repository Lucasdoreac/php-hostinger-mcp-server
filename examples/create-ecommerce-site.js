/**
 * Exemplo de criação de uma loja virtual completa (e-commerce)
 * 
 * Este exemplo demonstra como criar uma loja virtual completa
 * com o PHP Hostinger MCP Server, incluindo:
 * - Criação do template de e-commerce
 * - Configuração de gateway de pagamento
 * - Otimização SEO
 * - Publicação na Hostinger (opcional)
 */

// Importar as ferramentas necessárias
const { createEcommerceTemplate } = require('../src/tools/ecommerce-tools');
const { setupPaymentGateway } = require('../src/tools/payment-tools');
const { optimizeSEO } = require('../src/tools/seo-tools');
const { createHostingerSite } = require('../src/tools/hostinger-tools');

// Função principal para criar a loja virtual
async function createFashionStore() {
  try {
    console.log('Iniciando criação da loja virtual...');
    
    // 1. Criar o template de e-commerce
    console.log('Criando template de e-commerce...');
    const templateResult = await createEcommerceTemplate({
      type: 'fashion',                              // Tipo: fashion, electronics, food, general
      features: ['cart', 'wishlist', 'search'],     // Funcionalidades desejadas
      outputPath: './output/fashion-store'          // Pasta de saída
    });
    
    if (!templateResult.success) {
      throw new Error(`Erro ao criar template: ${templateResult.message}`);
    }
    
    console.log(`Template criado com sucesso em: ${templateResult.path}`);
    
    // 2. Configurar gateway de pagamento
    console.log('Configurando gateway de pagamento...');
    const paymentResult = await setupPaymentGateway({
      gateway: 'mercadopago',                      // Gateway: mercadopago, pagseguro, paypal, stripe
      apiCredentials: {                            // Credenciais da API (exemplo)
        access_token: 'TEST-0000000000000000-000000-00000000000000000000000000000000-000000000',
        public_key: 'TEST-00000000-0000-0000-0000-000000000000'
      },
      sitePath: './output/fashion-store'           // Pasta da loja
    });
    
    if (!paymentResult.success) {
      throw new Error(`Erro ao configurar gateway de pagamento: ${paymentResult.message}`);
    }
    
    console.log('Gateway de pagamento configurado com sucesso');
    
    // 3. Otimizar para SEO
    console.log('Aplicando otimizações de SEO...');
    const seoResult = await optimizeSEO({
      sitePath: './output/fashion-store',                            // Pasta da loja
      keywords: ['moda', 'roupas', 'loja online', 'fashion store'],  // Palavras-chave
      generateSitemap: true                                          // Gerar sitemap.xml
    });
    
    if (!seoResult.success) {
      throw new Error(`Erro ao otimizar SEO: ${seoResult.message}`);
    }
    
    console.log('Otimizações de SEO aplicadas com sucesso');
    
    // 4. (Opcional) Publicar na Hostinger
    // Descomente este bloco e configure suas credenciais para publicar na Hostinger
    /*
    console.log('Publicando na Hostinger...');
    const hostingerResult = await createHostingerSite({
      domain: 'minhalojafashion.com.br',              // Seu domínio
      template: 'ecommerce',                          // Template
      apiKey: 'YOUR_HOSTINGER_API_KEY'                // Sua chave de API
    });
    
    if (!hostingerResult.success) {
      throw new Error(`Erro ao publicar na Hostinger: ${hostingerResult.message}`);
    }
    
    console.log(`Site publicado com sucesso: ${hostingerResult.site.domain}`);
    */
    
    console.log('\nLoja virtual criada com sucesso!');
    console.log('Próximos passos:');
    console.log('1. Personalize o design editando os arquivos CSS em ./output/fashion-store/assets/css');
    console.log('2. Configure os produtos editando os arquivos PHP em ./output/fashion-store/products');
    console.log('3. Configure suas credenciais reais de gateway de pagamento em ./output/fashion-store/payments');
    console.log('4. Publique os arquivos em seu servidor web ou na Hostinger');
    
    return true;
  } catch (error) {
    console.error(`\nErro durante a criação da loja virtual: ${error.message}`);
    return false;
  }
}

// Executar a função
createFashionStore().then(result => {
  process.exit(result ? 0 : 1);
});