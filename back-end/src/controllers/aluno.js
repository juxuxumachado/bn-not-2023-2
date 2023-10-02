import prisma  from "../database/client.js"

const controller ={} // objeto vazio


controller.create = async  function(req, res){
    try{

     //conecta-se ao bd e envia uma instrução de criaçao de um novo documento, com os dados que estão dentro do req.body
        await prisma.aluno.create({data: req.body})

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

controller.retrieveAll = async function(req, res){

        //Por padrão não inclui nenhum relacionamento
    const include = {}

        if(req.query.turmas) include.turmas = true
    
    try {
        //Manda buscar os dados no servidor
        // Traz ordenado por nome, depois por n ivel
        const result = await prisma.aluno.findMany({
            include,
            orderBy:[
                {nome:'asc'}, // ordem ascendete
            ]
        })
        //http 200: ok
        res.send(result)

    }
    catch(error){
        //deu errado: exibe o erro no console do back-end
        console.error(error)
        //Envia o erro ao front-end, com status 500 - http 500: Internal Server Error
        res.status(500).send(error)
        }
}

controller.retrieveOne = async function(req, res){
    try{
        const result = await prisma.aluno.findUnique({
            where: {id: req.params.id}
        })

        // Encontrou ~> retorna HTTP 200:OK
        if(result) res.send(result)

        //Não encontrou ~> retorna HTTP 404: NOT fOUND
        else res.status(404).end()
    }
    catch(error){
        //deu errado: exibe o erro no console do back-end
        console.error(error)
        //Envia o erro ao front-end, com status 500 - http 500: Internal Server Error
        res.status(500).send(error)
        }
    
}


controller.update = async function(req, res){
    try{
        const result = await prisma.aluno.update({
            where: {id: req.params.id},
            data: req.body
        })

        //Encontrou e atualizou ~> retorna http 204: ok
        if(result) res.status(204).end()

        //Não encontrou (e não atualizou) ~> retonna HTTP 404: NOt Found
        else res.status(404).end()
    }
    catch(error){
        //deu errado: exibe o erro no console do back-end
        console.error(error)
        //Envia o erro ao front-end, com status 500 - http 500: Internal Server Error
        res.status(500).send(error)
        }
}


controller.delete = async function(req, res){
    try{
        const result = await prisma.aluno.delete({
            where :{id: req.params.id}
        })
        //Encontrou e atualizou ~> retorna http 204: ok
        if(result) res.status(204).end()

        //Não encontrou (e não atualizou) ~> retonna HTTP 404: NOt Found
        else res.status(404).end()
    }
    catch(error){
        //deu errado: exibe o erro no console do back-end
        console.error(error)
        //Envia o erro ao front-end, com status 500 - http 500: Internal Server Error
        res.status(500).send(error)
        }
}

controller.addTurma = async function(req, res){
    try{
        //Busca o aluno para recuperar a lista de ids de tumas dele
        const aluno = await prisma.aluno.findUnique({
            where:{id: req.params.alunoId}
            
        })
        //Se ele não tiver turmas ainda, criamos a lista vazia
        const turmaIds = aluno.turmaIds || []

        //Se o id de turma passao ainda não estiver na lista do aluno, fazemos a respectiva inserção
        if(! turmaIds.include(req.params.turmaId))
        turmaIds.push(req.params.turmaId)

        //Atualizamos o aluno com uma ista de ids de turma atualizadas
        const result = await prisma.aluno.update({
            where:{id: req.params.alunoId},
            data: {turmaIds}
        })

    }
    catch(error){
        //deu errado: exibe o erro no console do back-end
        console.error(error)
        //Envia o erro ao front-end, com status 500 - http 500: Internal Server Error
        res.status(500).send(error)

    }
}

export default controller