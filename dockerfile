# Use a imagem Node como base
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /usr/src

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Compile o código da aplicação (se necessário, para projetos TypeScript)
RUN npm run build

# Exponha a porta que a aplicação irá utilizar
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "npm", "run", "start:prod" ]
