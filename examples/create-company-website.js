/**
 * Exemplo de criação de um site institucional
 * 
 * Este exemplo demonstra como criar um site institucional
 * com o PHP Hostinger MCP Server, incluindo:
 * - Criação das páginas básicas
 * - Formulário de contato
 * - Otimização SEO
 */

// Importar as ferramentas necessárias
const { createPhpFile } = require('../src/tools/php-tools');
const { optimizeSEO } = require('../src/tools/seo-tools');
const fs = require('fs').promises;
const path = require('path');

// Função principal para criar o site institucional
async function createCompanyWebsite() {
  try {
    console.log('Iniciando criação do site institucional...');
    
    // Definir configurações básicas
    const sitePath = './output/company-website';
    const siteTitle = 'Empresa Exemplo';
    const siteDescription = 'Empresa especializada em soluções de alto desempenho';
    
    // Criar diretório de saída se não existir
    try {
      await fs.mkdir(sitePath, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
    
    // 1. Criar página inicial
    console.log('Criando página inicial...');
    const indexResult = await createPhpFile({
      filename: 'index.php',
      template: 'basic',
      path: sitePath
    });
    
    if (!indexResult.success) {
      throw new Error(`Erro ao criar página inicial: ${indexResult.message}`);
    }
    
    // 2. Criar página sobre
    console.log('Criando página sobre...');
    const aboutResult = await createPhpFile({
      filename: 'about.php',
      template: 'basic',
      path: sitePath
    });
    
    if (!aboutResult.success) {
      throw new Error(`Erro ao criar página sobre: ${aboutResult.message}`);
    }
    
    // 3. Criar página de serviços
    console.log('Criando página de serviços...');
    const servicesResult = await createPhpFile({
      filename: 'services.php',
      template: 'basic',
      path: sitePath
    });
    
    if (!servicesResult.success) {
      throw new Error(`Erro ao criar página de serviços: ${servicesResult.message}`);
    }
    
    // 4. Criar formulário de contato
    console.log('Criando formulário de contato...');
    const contactResult = await createPhpFile({
      filename: 'contact.php',
      template: 'form',
      path: sitePath
    });
    
    if (!contactResult.success) {
      throw new Error(`Erro ao criar formulário de contato: ${contactResult.message}`);
    }
    
    // 5. Criar diretório de assets e CSS básico
    try {
      await fs.mkdir(path.join(sitePath, 'assets'), { recursive: true });
      await fs.mkdir(path.join(sitePath, 'assets/css'), { recursive: true });
      await fs.mkdir(path.join(sitePath, 'assets/js'), { recursive: true });
      await fs.mkdir(path.join(sitePath, 'assets/images'), { recursive: true });
      
      // Criar CSS básico
      const cssContent = `
/* Estilos básicos para o site institucional */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f8f8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
}

header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 24px;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-left: 20px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

nav ul li a:hover {
  color: #3498db;
}

.hero {
  background-color: #3498db;
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto 30px;
}

.btn {
  display: inline-block;
  background-color: #2c3e50;
  color: white;
  padding: 12px 25px;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #1a252f;
}

main {
  padding: 60px 0;
}

section {
  margin-bottom: 60px;
}

section h2 {
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.service-card {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.service-card h3 {
  font-size: 24px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 150px;
}

footer {
  background-color: #2c3e50;
  color: white;
  padding: 40px 0;
  text-align: center;
}
`;
      
      await fs.writeFile(path.join(sitePath, 'assets/css/style.css'), cssContent);
      
      // Criar arquivo de inclusão para header e footer
      const headerContent = `<?php
/**
 * Header do site
 */
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($pageTitle) ? $pageTitle . ' - ${siteTitle}' : '${siteTitle}'; ?></title>
  <meta name="description" content="<?php echo isset($pageDescription) ? $pageDescription : '${siteDescription}'; ?>">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header>
    <div class="container">
      <div class="logo">
        <h1>${siteTitle}</h1>
      </div>
      <nav>
        <ul>
          <li><a href="index.php">Home</a></li>
          <li><a href="about.php">Sobre</a></li>
          <li><a href="services.php">Serviços</a></li>
          <li><a href="contact.php">Contato</a></li>
        </ul>
      </nav>
    </div>
  </header>
`;
      
      const footerContent = `<?php
/**
 * Footer do site
 */
?>
  <footer>
    <div class="container">
      <p>&copy; <?php echo date('Y'); ?> ${siteTitle}. Todos os direitos reservados.</p>
    </div>
  </footer>
  <script src="assets/js/main.js"></script>
</body>
</html>
`;
      
      // Criar diretório includes
      await fs.mkdir(path.join(sitePath, 'includes'), { recursive: true });
      await fs.writeFile(path.join(sitePath, 'includes/header.php'), headerContent);
      await fs.writeFile(path.join(sitePath, 'includes/footer.php'), footerContent);
      
      // Atualizar os arquivos de páginas para incluir header e footer
      const updatePageContent = async (filePath, title, description, content) => {
        const pageContent = `<?php
/**
 * ${title}
 */

// Definir título e descrição da página
$pageTitle = '${title}';
$pageDescription = '${description}';

// Incluir header
require_once 'includes/header.php';
?>

${content}

<?php
// Incluir footer
require_once 'includes/footer.php';
?>`;
        
        await fs.writeFile(filePath, pageContent);
      };
      
      // Atualizar Home
      await updatePageContent(
        path.join(sitePath, 'index.php'),
        'Home',
        'Bem-vindo ao site oficial da Empresa Exemplo',
        `<div class="hero">
  <div class="container">
    <h2>Bem-vindo à ${siteTitle}</h2>
    <p>${siteDescription}</p>
    <a href="contact.php" class="btn">Entre em contato</a>
  </div>
</div>

<main>
  <div class="container">
    <section>
      <h2>Nossos Serviços</h2>
      <div class="services-grid">
        <div class="service-card">
          <h3>Serviço 1</h3>
          <p>Descrição detalhada do serviço 1 oferecido pela nossa empresa.</p>
        </div>
        <div class="service-card">
          <h3>Serviço 2</h3>
          <p>Descrição detalhada do serviço 2 oferecido pela nossa empresa.</p>
        </div>
        <div class="service-card">
          <h3>Serviço 3</h3>
          <p>Descrição detalhada do serviço 3 oferecido pela nossa empresa.</p>
        </div>
      </div>
    </section>
    
    <section>
      <h2>Sobre Nós</h2>
      <p>Somos uma empresa comprometida com a excelência e a inovação. Há mais de 10 anos no mercado, 
         buscamos sempre oferecer as melhores soluções para nossos clientes.</p>
      <p>Nossa equipe é formada por profissionais qualificados e dedicados, prontos para atender às 
         suas necessidades com eficiência e qualidade.</p>
    </section>
  </div>
</main>`
      );
      
      // Atualizar Sobre
      await updatePageContent(
        path.join(sitePath, 'about.php'),
        'Sobre Nós',
        'Conheça a história e os valores da Empresa Exemplo',
        `<main>
  <div class="container">
    <section>
      <h2>Sobre Nós</h2>
      <p>A ${siteTitle} foi fundada em 2010 com o objetivo de oferecer soluções inovadoras e de alta qualidade para empresas de todos os portes.</p>
      <p>Ao longo desses anos, construímos uma reputação sólida baseada em nossos valores fundamentais:</p>
      
      <h3>Missão</h3>
      <p>Proporcionar soluções que impulsionem o crescimento e o sucesso de nossos clientes.</p>
      
      <h3>Visão</h3>
      <p>Ser referência nacional em soluções inovadoras e de alto desempenho.</p>
      
      <h3>Valores</h3>
      <ul>
        <li>Excelência em tudo o que fazemos</li>
        <li>Compromisso com a satisfação do cliente</li>
        <li>Inovação constante</li>
        <li>Respeito e ética nas relações</li>
        <li>Responsabilidade social e ambiental</li>
      </ul>
      
      <h3>Nossa Equipe</h3>
      <p>Contamos com uma equipe de profissionais altamente qualificados e especializados, sempre prontos para oferecer as melhores soluções para o seu negócio.</p>
    </section>
  </div>
</main>`
      );
      
      // Atualizar Serviços
      await updatePageContent(
        path.join(sitePath, 'services.php'),
        'Nossos Serviços',
        'Conheça os serviços oferecidos pela Empresa Exemplo',
        `<main>
  <div class="container">
    <section>
      <h2>Nossos Serviços</h2>
      <p>Oferecemos uma ampla gama de serviços para atender às necessidades específicas da sua empresa:</p>
      
      <div class="services-grid">
        <div class="service-card">
          <h3>Consultoria Estratégica</h3>
          <p>Análise detalhada do seu negócio e do mercado para identificar oportunidades de crescimento e desenvolver estratégias personalizadas.</p>
        </div>
        
        <div class="service-card">
          <h3>Desenvolvimento de Projetos</h3>
          <p>Planejamento e execução de projetos com metodologias ágeis, garantindo entregas de qualidade dentro dos prazos estabelecidos.</p>
        </div>
        
        <div class="service-card">
          <h3>Otimização de Processos</h3>
          <p>Análise e reestruturação dos processos da sua empresa para aumentar a eficiência e reduzir custos operacionais.</p>
        </div>
        
        <div class="service-card">
          <h3>Suporte Técnico</h3>
          <p>Equipe especializada disponível para resolver problemas e garantir o funcionamento adequado dos sistemas da sua empresa.</p>
        </div>
        
        <div class="service-card">
          <h3>Treinamentos Corporativos</h3>
          <p>Capacitação da sua equipe com treinamentos personalizados para maximizar o potencial dos colaboradores.</p>
        </div>
        
        <div class="service-card">
          <h3>Análise de Dados</h3>
          <p>Coleta e análise de dados para fornecer insights valiosos e embasar a tomada de decisões estratégicas.</p>
        </div>
      </div>
    </section>
    
    <section>
      <h2>Como Podemos Ajudar?</h2>
      <p>Entre em contato conosco para discutir como nossos serviços podem ser adaptados às necessidades específicas da sua empresa.</p>
      <p><a href="contact.php" class="btn">Solicite um orçamento</a></p>
    </section>
  </div>
</main>`
      );
      
      // Manter o formulário de contato como está, pois o template já é bom
    } catch (error) {
      throw new Error(`Erro ao criar assets: ${error.message}`);
    }
    
    // 6. Otimizar para SEO
    console.log('Aplicando otimizações de SEO...');
    const seoResult = await optimizeSEO({
      sitePath: sitePath,
      keywords: ['empresa', 'serviços', 'consultoria', 'soluções'],
      generateSitemap: true
    });
    
    if (!seoResult.success) {
      throw new Error(`Erro ao otimizar SEO: ${seoResult.message}`);
    }
    
    console.log('Otimizações de SEO aplicadas com sucesso');
    
    console.log('\nSite institucional criado com sucesso!');
    console.log('Próximos passos:');
    console.log('1. Personalize o conteúdo editando os arquivos PHP');
    console.log('2. Adicione suas próprias imagens em ./output/company-website/assets/images');
    console.log('3. Ajuste o CSS em ./output/company-website/assets/css/style.css');
    console.log('4. Publique os arquivos em seu servidor web');
    
    return true;
  } catch (error) {
    console.error(`\nErro durante a criação do site institucional: ${error.message}`);
    return false;
  }
}

// Executar a função
createCompanyWebsite().then(result => {
  process.exit(result ? 0 : 1);
});