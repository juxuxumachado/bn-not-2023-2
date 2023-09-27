import prisma  from "../database/client.js"

const controller ={} // objeto vazio


controller.create = async  function(req, res){
    try{
     //conecta-se ao bd e envia uma instrução de criaçao de um novo documento, com os dados que estão dentro do req.body
        await prisma.turma.create({data: req.body})

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
    try {

        // por padrão, não inclui nenhum relacionamento
        let include = {}
        if(req.query.professor)     include.professor = true
        if(req.query.curso)         include.curso = true
        if(req.query.alunos)        include.alunos = true

c
        //Manda buscar os dados no servidor
        const result = await prisma.turma.findMany({
            

            // Traz as informações das coleções relacionadas
            include:{
                professor: true,
                curso: true
            },
            orderBy:[
                {cursoId:'asc'}, // ordem ascendete
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
        const result = await prisma.turma.findUnique({
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
        const result = await prisma.turma.update({
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
        const result = await prisma.turma.delete({
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

export default controller