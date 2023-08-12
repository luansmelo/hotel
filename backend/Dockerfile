# Escolha a imagem oficial do Node
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /api

# Copie os arquivos de pacote e instale as dependências
COPY package*.json ./
RUN npm install 

# Copie todos os arquivos para o diretório de trabalho
COPY . .

# Exponha a porta em que sua aplicação irá rodar (ajuste conforme necessário)
EXPOSE 3000 

# Comando para rodar sua aplicação
CMD ["npm", "dev"]
