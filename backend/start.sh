#!/bin/sh

#Esperar o banco de dados ficar pronta
dockerize -wait tcp://db:3306 -timeout 1m

# Rodar o rollback na tabela
npm run rollback

# Rodar as migrações
echo "Iniciando as migrações..."
npm run migrate

if [ $? -ne 0 ]; then
    echo "Error durante a migração"
    exit 1
fi 

# Iniciar a aplicação
echo "Iniciando a aplicação..."
npm run dev