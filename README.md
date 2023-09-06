PROJETO BACK-END
========================

#Para iniciar o projeto (nome: back-end)
* `npx @aka-demy/create-express-app`
* Install package...?: y
* _Name_: back-end
* _Language_: JavaScript
* _Template Engine_: None
* _Package manager_: npm

#Mudando para a pasta do projeto
* `cd back-end`

#Atualizando pacotes vulneraveis com  atualização de segurança
* `npm audit fix --force`

#Instalando o  Prisma como dependencia de desenvilvimento
* `npm install prisma --save-dev`

#Instalando o Primsma com conector para MongoDB
* `npx prisma init --datasource-provider mongodb`
* Instale os pacotes de extensao do prisma


# Gerando o cliente do Prisma
*`npx prisma generate`
*Precisa ser executado ** toda vez** que o arquivo `schema.prima` for alterado