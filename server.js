const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

let alunos = [
    {
        id: 1,
        nome: "sther",
        email: "s7herr@gmail.com",
        turma: "TDS2026"
    },
    {
        id: 2,
        nome: "virginia",
        email: "virginia@gmail.com",
        turma: "TDS2026"
    }
];

// GET - Listar todos os alunos
app.get("/alunos", (req, res) => {
    res.status(200).json(alunos);
});

// GET - Consultar aluno pelo id
app.get("/alunos/:id",(req, res) => {
    const id = Number(req.params.id);

    const aluno = alunos.find(a => a.id === id);

    if (!aluno){
        return res.status(404).json({
            mensagem: "aluno nao encontrado."
        });
    }
    res.status(200).json(aluno);
})

// POST - cadastrar aluno
app.post("/aluno", (req, res) => {
    const { nome, email, turma} = req.body;

    if(!nome || !email || !turma) {
        return res.status(400).json ({
            mensagem: "informe nome, email e turma"
        });
    }

    const novoAluno = {
        //operador ternario
        id: alunos.length ? Math.max(...alunos.map(a => a.id)) + 1 : 1,
        nome,
        email,
        turma
    };

    alunos.push(novoAluno);
    res.status(200).json(novoAluno);

})

//PUT - atualizar aluno
app.put("/aluno/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = alunos.findIndex(a => a.id === id);

    if(indice === -1) {
        return res.status(404).json({
            mensagem: "aluno nao encontrado"
        });
    }

    const { nome, email, turma } = req.body;
    
    if(!nome || !email || !turma) {
        return res.status(400).json ({
            mensagem: "informe nome, email e turma"
        });
    }

    alunos[indice] = {
        id,
        nome,
        email,
        turma
    };

    res.status(200).json(alunos[indice]);
});

//delete - excluir aluno - desafio montar estrutura
app.delete("/aluno/:id", (req, res) => {
    const id = Number(req.params.id);

    const existe = alunos.some(a => a.id === id);

    if(!existe) {
        res.status(404).json({
            mensagem: "aluno nao encontrado"
        });
    }

    alunos = alunos.filter(a => a.id !== id);
    res.status(204).send();
});

// iniciar servidor
app.listen(PORT, () => {
    console.log(`API executando em http://localhost:${PORT}`);
});