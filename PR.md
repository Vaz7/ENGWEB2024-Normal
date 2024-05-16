# Persistência da base de dados

### Arrancar o container do mongo
docker run -d -p 27017:27017 --name=mongoTeste mongo:latest

### Copiar o dataset para o mongo
sudo docker cp contratos2024.json mongoTeste:/tmp

### importar o dataset para o mongo
-sudo docker exec -it mongoTeste bash
-cd tmp
-mongoimport -d contratos -c contratos contratos2024.json --jsonArray


# Modificações na base de dados:

Substituir o idcontrato por _id
Alterar nos valores decimais (precoContratual) a "," por "."

## Respostas textuais em /ex1/queries.txt

## Para arrancar a aplicação tanto para o ex1 como para o ex2:

npm i
npm start