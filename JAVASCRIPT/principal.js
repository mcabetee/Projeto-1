let materias = [];
let tarefas = [];

function cadastrarMat() {

    let input_textMatId = document.getElementById('input_textMatId').value
    let select_materiaId = document.getElementById('select_materiaId').value

    if (input_textMatId !== '') {

        materias.push({

            nome: input_textMatId,
            area: select_materiaId

        });

        mostrarMat();
        atualizarSelectMaterias();

    } else {

        alert('Preencha os campos')

    }

    limparInputs();

}

function mostrarMat() {

    let div_tableMatResId = document.getElementById('div_tableMatResId');
    let conteudoHTML = "";

    materias.forEach((materia, indice) => {
        let estiloConcluido = materia.concluida ? "text-decoration: line-through; opacity: 0.8;" : "color: #000000;";

        conteudoHTML += `
            <tr style="${estiloConcluido}">
                <td>${materia.nome}</td>
                <td>${materia.area}</td>
                <td>
                    <button class="button_js1" onclick="alternarMateria(${indice})">Concluir</button>
                    <button class="button_js2" onclick="deletarMateria(${indice})">Excluir</button>
                </td>
            </tr>
        `;
    });

    div_tableMatResId.innerHTML = conteudoHTML;
}

function alternarMateria(indice) {
    materias[indice].concluida = !materias[indice].concluida;
    window.confirm("Está tarefa foi concluida?");
    mostrarMat();

}

function deletarMateria(indice) {
    materias.splice(indice, 1);
    window.alert("Tarefa Excluída!");
    mostrarMat();
}

function atualizarSelectMaterias() {

    let select_tarefasId = document.getElementById('select_tarefasId');


    // Limpa o select

    select_tarefasId.innerHTML = `

        <option value="">
            Selecione uma matéria
        </option>

    `;


    // Adiciona todas as matérias cadastradas

    materias.forEach((materia, indice) => {

        select_tarefasId.innerHTML += `

            <option value="${indice}">
                ${materia.nome}
            </option>

        `;

    });

}

// função do botão cadastrar
function cadastrarTare() {

    let input_textTareId = document.getElementById('input_textTareId').value
    let indiceMateria = document.getElementById('select_tarefasId').value
    let input_datetimeLocalTareId = document.getElementById('input_datetimeLocalTareId').value

    let materiaSelecionada = materias[indiceMateria];

    let dataObjeto = new Date(input_datetimeLocalTareId);

    // Formata a data para o padrão brasileiro (DD/MM/AAAA)
    let dataFormatada = dataObjeto.toLocaleDateString('pt-BR');

    // Formata a hora para o padrão brasileiro (HH:MM)
    let horaFormatada = dataObjeto.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    div_tableTarResId.innerHTML = '';

    if (input_textTareId !== '' && indiceMateria !== '' && input_datetimeLocalTareId !== '') {

        tarefas.push({

            nome: input_textTareId,
            materia: materiaSelecionada.nome,
            area: materiaSelecionada.area,
            data: dataFormatada,
            hora: horaFormatada

        });

        mostrarTare()

        atualizarSelectMaterias();

    } else {

        alert('Preencha todos as campos')

    }

    limparInputs();

}

function mostrarTare() {

    let div_tableTarResId = document.getElementById('div_tableTarResId')

    div_tableTarResId.innerHTML = '';

    tarefas.forEach((tarefa, indice) => {

        div_tableTarResId.innerHTML += `
        
        <tr>

        <td>${indice + 1}</td>
        <td>${tarefa.nome}</td>
        <td>${tarefa.materia}</td>
        <td>${tarefa.area}</td>
        <td>${tarefa.data}</td>
        <td>${tarefa.hora}</td>
        <td>
        <button class="button_js3">Concluir</button>
        <button class="button_js4">Excluir</button>
        </td>

        </tr>

        `

    });

}

function limparInputs() {

    document.getElementById('input_textMatId').value = '';
    document.getElementById('input_textTareId').value = '';
    document.getElementById('input_datetimeLocalTareId').value = '';

}