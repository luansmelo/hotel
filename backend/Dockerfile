# Escolha a imagem oficial do Node
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /api

# Instalar o dockerize 
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Copie os arquivos de pacote e instale as dependências
COPY package*.json ./
RUN npm install 

# Copie todos os arquivos para o diretório de trabalho
COPY . .

# Da permissão para o start.sh para execução do script
RUN chmod +x ./start.sh

# Exponha a porta em que sua aplicação irá rodar (ajuste conforme necessário)
EXPOSE 3000 

# Comando para rodar sua aplicação
CMD ["sh", "./start.sh"]
