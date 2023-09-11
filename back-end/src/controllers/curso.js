import prisma  from "../database/client.js"

const controller ={} // objeto vazio


controller.create = async  function(req, res){
    try{
     //conecta-se ao bd e envia uma instrução de criaçao de um novo documento, com os dados que estão dentro do req.body
        await prisma.curso.create({data: req.body})

    //envia uma resposta de sucesso ao front-end - http 201: created
    res.status(201).end()
    }
    catch(error){
    //deu errado: exibe o erro no console do back-end
    console.error(error)
    //Envia o erro ao front-end, com status 500 - http 500: Internal Server Error
    res.status(500).send(error)
    }
}

export default controller