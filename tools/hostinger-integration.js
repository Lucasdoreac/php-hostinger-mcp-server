/**
 * Ferramentas de integração com a Hostinger
 * 
 * Conjunto de ferramentas para integração com os serviços da Hostinger.
 */

const { createTool } = require('@anthropic-ai/mcp-core');

/**
 * Lista de ferramentas para integração com Hostinger
 */
module.exports = [
  createTool({
    name: 'hostinger_deploy',
    description: 'Implanta um site PHP no ambiente de hospedagem da Hostinger via FTP',
    parameters: {
      type: 'object',
      properties: {
        localPath: {
          type: 'string',
          description: 'Caminho local do projeto a ser implantado'
        },
        ftpHost: {
          type: 'string',
          description: 'Endereço do servidor FTP da Hostinger'
        },
        ftpUser: {
          type: 'string',
          description: 'Usuário FTP'
        },
        ftpPassword: {
          type: 'string',
          description: 'Senha FTP'
        },
        remotePath: {
          type: 'string',
          description: 'Caminho remoto onde o site será implantado'
        }
      },
      required: ['localPath', 'ftpHost', 'ftpUser', 'ftpPassword']
    },
    handler: async function({ localPath, ftpHost, ftpUser, ftpPassword, remotePath = '/' }) {
      // Implementação simulada
      return {
        status: 'success',
        message: `Site implantado com sucesso em ${ftpHost}${remotePath}`,
        details: {
          filesUploaded: 42,
          totalSize: '3.2MB',
          uploadTime: '1m 23s'
        }
      };
    }
  }),
  
  createTool({
    name: 'hostinger_database_create',
    description: 'Cria um banco de dados MySQL no ambiente da Hostinger',
    parameters: {
      type: 'object',
      properties: {
        dbName: {
          type: 'string',
          description: 'Nome do banco de dados a ser criado'
        },
        dbUser: {
          type: 'string',
          description: 'Nome do usuário do banco de dados'
        },
        dbPassword: {
          type: 'string',
          description: 'Senha do usuário do banco de dados'
        },
        hostUrl: {
          type: 'string',
          description: 'URL do painel de hospedagem da Hostinger'
        },
        accessToken: {
          type: 'string',
          description: 'Token de acesso à API da Hostinger'
        }
      },
      required: ['dbName', 'dbUser', 'dbPassword', 'hostUrl', 'accessToken']
    },
    handler: async function({ dbName, dbUser, dbPassword, hostUrl, accessToken }) {
      // Implementação simulada
      return {
        status: 'success',
        message: `Banco de dados ${dbName} criado com sucesso`,
        connectionString: `mysql://${dbUser}:***@${hostUrl}/${dbName}`,
        credentials: {
          host: hostUrl,
          database: dbName,
          user: dbUser,
          // Não retornar a senha real por segurança
          password: '********'
        }
      };
    }
  }),
  
  createTool({
    name: 'hostinger_ssl_setup',
    description: 'Configura certificado SSL para um domínio na Hostinger',
    parameters: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Nome do domínio para configurar SSL'
        },
        sslType: {
          type: 'string',
          enum: ['lets_encrypt', 'custom'],
          description: 'Tipo de certificado SSL'
        },
        hostUrl: {
          type: 'string',
          description: 'URL do painel de hospedagem da Hostinger'
        },
        accessToken: {
          type: 'string',
          description: 'Token de acesso à API da Hostinger'
        }
      },
      required: ['domain', 'hostUrl', 'accessToken']
    },
    handler: async function({ domain, sslType = 'lets_encrypt', hostUrl, accessToken }) {
      // Implementação simulada
      return {
        status: 'success',
        message: `Certificado SSL ${sslType} configurado com sucesso para ${domain}`,
        details: {
          expirationDate: '2026-03-22',
          issuer: sslType === 'lets_encrypt' ? 'Let\'s Encrypt Authority X3' : 'Custom CA',
          status: 'active'
        },
        recommendations: [
          'Configure redirecionamento HTTP para HTTPS no .htaccess',
          'Atualize todas as URLs absolutas no código para usar HTTPS'
        ]
      };
    }
  })
];