PROJETO BACK-END
========================

## Para iniciar o projeto (nome: back-end)
* `npx @aka-demy/create-express-app`
* Install package...?: y
* _Name_: back-end
* _Language_: JavaScript
* _Template Engine_: None
* _Package manager_: npm

## Mudando para a pasta do projeto
* `cd back-end`

## Atualizando pacotes vulneraveis com  atualização de segurança
* `npm audit fix --force`

## Instalando o  Prisma como dependencia de desenvilvimento
* `npm install prisma --save-dev`

## Instalando o Primsma com conector para MongoDB
* `npx prisma init --datasource-provider mongodb`
* Instale os pacotes de extensao do prisma


## Adicionando o Prisma Client ao projeto
* `npm install @prisma/client`

## Gerando o cliente do Prisma
* `npx prisma generate`
* Precisa ser executado ** toda vez** que o arquivo `schema.prima` for alterado

## Exibindo os dados cadastrados com o Prisma Studio
* `npx prisma studio`
* Deve ser executado em um segundo terminal, enquanto o projeto está sendo executado no primeiro terminal.

## Criando um novo CRUD a partir de outro já existente

### _Controller_
1. Copie o arquivo do _Controller_ e renomeie-o de acordo com a nova entidade para a qual será feito o novo CRUD.
2. Substutua (`CTRL+ H`)todas as ocorrencias de `prisma.xxx ` por `prisma.yyyy`, onde `xxxx` é o nome da  entidade antiga e `yyyy` é o nome da entidade nova.
3.  Verifique, no método `retrieveAll` do _controller_, se há campos sendo usados no  _orderBy_ e substitua-os conforme a nova entidade.

### _Route_
1. Copie o arquivo do _route_ (`CRTL+C CTRL+V`) e renomeie-o de acordo com a nova entidade para a qual está sendo feito o CRUD.
2. Na linha de `import` do _controller_, substitua o nome da entidade antiga pelo nome da entidade nova.

### Arquivo `app.js`
1. Na parte inferior do arquivo, na seção de rotas, copie e cole as duas linhas correspondentes a uma rota ja existente e faça as subistiuições necessárias.
    * São ** quatro substituições** ao todo, duas em cada linha.