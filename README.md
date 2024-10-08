# Projeto de Autenticação e Gerenciamento de Usuários

Este projeto é uma aplicação back-end desenvolvida com NestJS, utilizando o padrão de arquitetura MVC (Model-View-Controller) e TypeORM para interagir com o banco de dados. O sistema permite o registro, login, recuperação de senha e gerenciamento de usuários.

## Estrutura do Projeto

- **src/auth/services/auth.service.ts**: Serviço de autenticação que gerencia o login e a recuperação de senha.
- **src/user/controllers/user.controller.ts**: Controlador que expõe as rotas para gerenciamento de usuários (criação, atualização, exclusão, etc.).
- **src/user/services/createUser/user.service.ts**: Serviço que contém a lógica de negócios para manipulação de usuários.
- **src/seed-database.ts**: Script para gerar o primeiro usuário da aplicação.

## Requisitos

Para rodar o back-end, você precisará ter os seguintes requisitos instalados:

1. **Node.js**: Versão 14 ou superior.
2. **NPM**: O gerenciador de pacotes do Node.js.
3. **PostgreSQL**: Ou outro banco de dados suportado pelo TypeORM.
4. **TypeORM**: Para gerenciar a conexão e as operações do banco de dados.

## Configuração do Ambiente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração do Banco de Dados**:
   - Crie um banco de dados no PostgreSQL (ou outro banco de dados que você escolher).
   - Configure as credenciais do banco de dados no arquivo `ormconfig.json` ou no arquivo de configuração do TypeORM no seu projeto.

   Exemplo de `ormconfig.json`:
   ```json
   {
     "type": "postgres",
     "host": "localhost",
     "port": 5432,
     "username": "seu_usuario",
     "password": "sua_senha",
     "database": "seu_banco_de_dados",
     "entities": ["src/**/*.entity{.ts,.js}"],
     "synchronize": true
   }
   ```

## Executando o Projeto

Para iniciar o servidor, execute o seguinte comando:  npm run start


O servidor estará disponível em `http://localhost:8080/api`.

## Gerando o Primeiro Usuário

Para gerar o primeiro usuário da aplicação, você pode executar o script `seed-database.ts`. Este script verifica se um usuário administrador já existe e, se não existir, cria um novo usuário.

### Executando o Script de Seed

1. **Execute o script**:
   ```bash
   ts-node src/seed-database.ts
   ```

   **Nota**: Certifique-se de ter o `ts-node` instalado globalmente ou como uma dependência de desenvolvimento.

2. **Usuário Administrador**:
   O script criará um usuário administrador com as seguintes credenciais:
   - **Email**: `admin@example.com`
   - **Senha**: `password`
   - **Nome**: `Admin User`
   - **Matrícula**: `admin123`

## Testando a API

Após a criação do usuário, você pode usar ferramentas como Postman ou Insomnia para testar as rotas da API. As principais rotas incluem:

- **Login**: `POST /auth/login`
- **Criar Usuário**: `POST /users`
- **Atualizar Usuário**: `PUT /users/:id`
- **Excluir Usuário**: `DELETE /users/:id`
- **Recuperar Senha**: `POST /auth/forgot-password`

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, faça um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.