/**
 * Guardrails de segurança
 * 
 * Regras de segurança para garantir operações seguras em ambiente de hospedagem compartilhada.
 */

const path = require('path');
const fs = require('fs');

/**
 * Guardrails para proteger contra operações inseguras
 */
module.exports = {
  /**
   * Verifica se um caminho é seguro para operações de arquivo
   */
  isPathSafe: function(filePath) {
    // Não permitir caminhos absolutos
    if (path.isAbsolute(filePath)) {
      return {
        safe: false,
        reason: 'Caminhos absolutos não são permitidos por razões de segurança'
      };
    }
    
    // Não permitir navegação acima do diretório atual
    if (filePath.includes('../') || filePath.includes('..\\')) {
      return {
        safe: false,
        reason: 'Navegação para diretórios superiores não é permitida'
      };
    }
    
    // Verificar extensões de arquivo perigosas
    const dangerousExtensions = ['.exe', '.sh', '.bat', '.cmd', '.dll', '.so'];
    if (dangerousExtensions.some(ext => filePath.toLowerCase().endsWith(ext))) {
      return {
        safe: false,
        reason: `Arquivos com extensão ${path.extname(filePath)} não são permitidos por razões de segurança`
      };
    }
    
    return { safe: true };
  },
  
  /**
   * Verifica se uma string SQL é segura
   */
  isSqlSafe: function(sqlQuery) {
    // Lista de padrões SQL potencialmente perigosos
    const dangerousPatterns = [
      /DROP\\s+DATABASE/i,
      /DROP\\s+TABLE/i,
      /TRUNCATE\\s+TABLE/i,
      /DELETE\\s+FROM\\s+(?!WHERE)/i, // DELETE sem WHERE
      /UPDATE\\s+\\w+\\s+SET\\s+(?!WHERE)/i, // UPDATE sem WHERE
      /EXEC\\s+sp_/i,
      /EXECUTE\\s+sp_/i,
      /xp_cmdshell/i,
      /INTO\\s+OUTFILE/i,
      /LOAD\\s+DATA\\s+INFILE/i
    ];
    
    // Verificar padrões perigosos
    for (const pattern of dangerousPatterns) {
      if (pattern.test(sqlQuery)) {
        return {
          safe: false,
          reason: 'Operação SQL potencialmente perigosa detectada',
          pattern: pattern.toString()
        };
      }
    }
    
    return { safe: true };
  },
  
  /**
   * Verifica se um comando PHP é seguro
   */
  isPhpCodeSafe: function(phpCode) {
    // Lista de funções PHP potencialmente perigosas
    const dangerousFunctions = [
      'exec',
      'shell_exec',
      'system',
      'passthru',
      'eval',
      'popen',
      'proc_open',
      'assert',
      'create_function',
      'include_once',
      'require_once',
      'include',
      'require'
    ];
    
    // Verificar uso de funções perigosas
    for (const func of dangerousFunctions) {
      const pattern = new RegExp(`${func}\\s*\\(`, 'i');
      if (pattern.test(phpCode)) {
        return {
          safe: false,
          reason: `Função PHP potencialmente perigosa detectada: ${func}()`,
          suggestion: `Considere uma alternativa mais segura para ${func}()`
        };
      }
    }
    
    return { safe: true };
  },
  
  /**
   * Verifica configurações de upload de arquivos
   */
  isUploadSafe: function(fileInfo) {
    // Limite de tamanho para upload (10MB por padrão)
    const maxSize = 10 * 1024 * 1024;
    if (fileInfo.size > maxSize) {
      return {
        safe: false,
        reason: `O arquivo excede o tamanho máximo permitido de ${maxSize / (1024 * 1024)}MB`,
        suggestion: 'Compacte o arquivo ou divida-o em partes menores'
      };
    }
    
    // Verificar tipos de arquivo permitidos
    const allowedTypes = [
      'text/html', 'text/css', 'text/javascript', 'application/javascript',
      'text/plain', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml',
      'application/pdf', 'application/zip', 'application/x-zip-compressed'
    ];
    
    if (!allowedTypes.includes(fileInfo.mimetype)) {
      return {
        safe: false,
        reason: `Tipo de arquivo não permitido: ${fileInfo.mimetype}`,
        allowedTypes: allowedTypes
      };
    }
    
    return { safe: true };
  },
  
  /**
   * Verifica se configurações de banco de dados são seguras
   */
  isDatabaseConfigSafe: function(config) {
    // Verificar força da senha
    if (config.password && config.password.length < 8) {
      return {
        safe: false,
        reason: 'A senha do banco de dados é muito curta',
        suggestion: 'Use uma senha com pelo menos 8 caracteres, combinando letras, números e símbolos'
      };
    }
    
    // Verificar nome de usuário padrão
    if (config.user === 'root' || config.user === 'admin') {
      return {
        safe: false,
        reason: `Nome de usuário de banco de dados inseguro: ${config.user}`,
        suggestion: 'Evite usar nomes de usuário padrão como "root" ou "admin"'
      };
    }
    
    return { safe: true };
  }
};