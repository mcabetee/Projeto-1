// arrays
let materias = [];
let tarefas = [];

function pesquisa() {

    let input_pesquisaId = document.getElementById('input_pesquisaId').value.toLowerCase()

    let div_pesuiseRes = document.getElementById('div_pesuiseRes')

    div_pesuiseRes.innerHTML = '';

    materias.forEach((materia, indice) => {

        if (materia.nome.toLowerCase().includes(input_pesquisaId))

            div_pesuiseRes.innerHTML += `
            
            <table>
            
            <thead>
            <tr>
            <th>Materia</th>
            <th>Area</th>
            </tr>
            </thead>
            
            <tbody>
            <tr>
            <td>${materia.nome}</td>
            <td>${materia.area}</td>
            </tr>
            </tbody>

            </table>

            `

    });

}

// function da botão de cadastrar as materias
function cadastrarMat() {

    let input_textMatId = document.getElementById('input_textMatId').value
    let select_materiaId = document.getElementById('select_materiaId').value

    if (input_textMatId.trim() !== '') {

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

// function para atualizar e conseguir ver o resultado dos cadastros
function mostrarMat() {

    let div_tableMatResId = document.getElementById('div_tableMatResId');
    let conteudoHTML = "";

    materias.forEach((materia, indice) => {

        conteudoHTML += `
            <tr>
                <td>${materia.nome}</td>
                <td>${materia.area}</td>
                <td>
                    <button class="button_js2" onclick="deletarMateria(${indice})">Excluir</button>
                </td>
            </tr>
        `;
    });

    div_tableMatResId.innerHTML = conteudoHTML;

    // Embaixo são os totais
    // total de materias cadastradas (da para colocar assim: "div_totalMateriasResId.innerHTML = materias.length;")
    let somaMat = materias.reduce((acc) => acc + 1, 0);

    div_totalMateriasResId.innerHTML = `<h4 class="h4_totalDeMatJS">${somaMat}</h4>`;

}

// function do botão de excluir uma materia
function deletarMateria(indice) {
    materias.splice(indice, 1);
    window.alert("Tarefa Excluída!");
    mostrarMat();
}

// function atualizar o select das materias nas tarefas
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

// function da botão de cadastrar as tarefas
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

    if (input_textTareId.trim() !== '' && indiceMateria.trim() !== '' && input_datetimeLocalTareId !== '') {

        tarefas.push({

            nome: input_textTareId,
            materia: materiaSelecionada.nome,
            area: materiaSelecionada.area,
            data: dataFormatada,
            hora: horaFormatada,
            dataISO: input_datetimeLocalTareId,
            concluida: false

        });

        mostrarTare();

        atualizarSelectMaterias();

        mostrarCalendario();

        verificarAvisos();

        atualizarPendencias();

        limparInputs();

    } else {

        alert('Preencha todos as campos')

    }

}

// function para atualizar e conseguir ver o resultado dos cadastros
function mostrarTare() {

    let div_tableTarResId = document.getElementById('div_tableTarResId')

    div_tableTarResId.innerHTML = '';

    tarefas.forEach((tarefa, indice) => {

        let estiloConcluido = tarefa.concluida ? "text-decoration: line-through; color: #000000; opacity: 0.8;" : "color: #000000;";

        let div_totalTarefasResId = document.getElementById('div_totalTarefasResId')

        div_tableTarResId.innerHTML += `
        
        <tr style="${estiloConcluido}">

        <td>${indice + 1}</td>
        <td>${tarefa.nome}</td>
        <td>${tarefa.materia}</td>
        <td>${tarefa.area}</td>
        <td>${tarefa.data}</td>
        <td>${tarefa.hora}</td>
        <td>
        <button class="button_js3" onclick="concluidaTarefa(${indice})">Concluir</button>
        <button class="button_js4" onclick="alterar(${indice})">Alerar</button>
        <button class="button_js5" onclick="excluirTarefa(${indice})">Excluir</button>
        </td>

        </tr>

        `

        let somaTar = tarefas.reduce((acc) => acc + 1, 0);

        div_totalTarefasResId.innerHTML = `<h4 class="h4_totalDeTareJS">${somaTar}</h4>`;

    });

}

// function do botão de concluir uma tarefa
function concluidaTarefa(indice) {

    let confirmar = window.confirm('Essa tarefa foi concluída?');

    if (confirmar) {

        tarefas[indice].concluida = !tarefas[indice].concluida;

        mostrarTare();

        verificarAvisos();

        atualizarPendencias();

        limparInputs();


    } else {

        alert('A tarefa não foi concluída.');

    }
}

// function do botão de altera uma tarefa
function alterar(indice) {

    let novaData = prompt("Digite a nova data (DDMMAAAA):");
    let novaHora = prompt("Digite o novo horário (HHMM):");

    // Remove qualquer caractere que não seja número
    novaData = novaData.replace(/\D/g, "");
    novaHora = novaHora.replace(/\D/g, "");

    if (novaData.length === 8 && novaHora.length === 4) {

        // Formata a data
        let dataFormatada =
            `${novaData.slice(0, 2)}/${novaData.slice(2, 4)}/${novaData.slice(4, 8)}`;

        // Formata a hora
        let horaFormatada =
            `${novaHora.slice(0, 2)}:${novaHora.slice(2, 4)}`;

        // Cria a data no formato ISO
        let dia = novaData.slice(0, 2);
        let mes = novaData.slice(2, 4);
        let ano = novaData.slice(4, 8);

        let hora = novaHora.slice(0, 2);
        let minuto = novaHora.slice(2, 4);

        let dataISO =
            `${ano}-${mes}-${dia}T${hora}:${minuto}`;

        // Atualiza a tarefa
        tarefas[indice].data = dataFormatada;
        tarefas[indice].hora = horaFormatada;
        tarefas[indice].dataISO = dataISO;

        alert("Alterações salvas!");

        mostrarTare();

        verificarAvisos();

        mostrarCalendario();

        atualizarPendencias();

        atualizarProximaExpirar();

    } else {

        alert(
            "Digite a data com 8 números (DDMMAAAA) " +
            "e a hora com 4 números (HHMM)."
        );
    }
}

// function do botão de excluir uma tarefa
function excluirTarefa(indice) {

    tarefas.splice(indice, 1);
    window.alert("Tarefa excluida");

    mostrarTare();

    mostrarCalendario();

    verificarAvisos();

    atualizarPendencias();


}

// Calendario

let dataCalendario = new Date();


let mesAtual = dataCalendario.getMonth();


let anoAtual = dataCalendario.getFullYear();


// mostrar calendario
function mostrarCalendario() {

    let diasCalendario = document.getElementById('diasCalendario');

    let mesAno = document.getElementById('mesAno');

    diasCalendario.innerHTML = '';

    // Primeiro dia do mês
    let primeiroDia =
        new Date(
            anoAtual,
            mesAtual,
            1
        );

    // Último dia do mês
    let ultimoDia =
        new Date(
            anoAtual,
            mesAtual + 1,
            0
        );

    let quantidadeDias = ultimoDia.getDate();

    // Dia da semana em que o mês começa
    let diaSemanaInicio = primeiroDia.getDay();

    // Nome do mês
    let nomeMes = new Date(
        anoAtual,
        mesAtual
    ).toLocaleDateString(
        'pt-BR',
        {
            month: 'long',
            year: 'numeric'
        }
    );

    nomeMes =
        nomeMes.charAt(0).toUpperCase()
        + nomeMes.slice(1);

    mesAno.innerHTML =
        nomeMes;

    // Espaços antes do primeiro dia
    for (
        let i = 0;
        i < diaSemanaInicio;
        i++
    ) {

        let vazio =
            document.createElement(
                'div'
            );

        vazio.classList.add(
            'dia_vazio'
        );

        diasCalendario.appendChild(
            vazio
        );

    }

    // Cria os dias
    for (
        let dia = 1;
        dia <= quantidadeDias;
        dia++
    ) {

        let elementoDia =
            document.createElement(
                'div'
            );

        elementoDia.classList.add(
            'dia_calendario'
        );

        elementoDia.innerText =
            dia;

        // verificar hoje
        let hoje =
            new Date();

        let ehHoje =

            dia === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear();


        // verificar a tarefa
        let temTarefa =
            tarefas.some(
                function (tarefa) {

                    if (!tarefa.dataISO) {

                        return false;

                    }

                    let dataTarefa =
                        new Date(
                            tarefa.dataISO
                        );

                    return (

                        dataTarefa.getDate() === dia && dataTarefa.getMonth() === mesAtual && dataTarefa.getFullYear() === anoAtual

                    );

                }
            );

        // Vermelho para tarefa

        if (temTarefa) {

            elementoDia.classList.add(
                'dia_tarefa'
            );

        }

        // Roxo para hoje

        if (ehHoje) {

            elementoDia.classList.add(
                'dia_hoje'
            );

        }

        diasCalendario.appendChild(
            elementoDia
        );

    }

}

// mes anterior
function mesAnterior() {

    mesAtual--;

    if (mesAtual < 0) {

        mesAtual = 11;

        anoAtual--;

    }

    mostrarCalendario();

}

// proximo mes
function proximoMes() {

    mesAtual++;

    if (mesAtual > 11) {

        mesAtual = 0;

        anoAtual++;

    }

    mostrarCalendario();

}

// Aviso e prazo
function verificarAvisos() {

    let divAvisos = document.getElementById('avisosTarefas');

    divAvisos.innerHTML = '';

    let agora = new Date();

    let tarefasProximas = [];

    tarefas.forEach(
        function (tarefa) {

            // Tarefa concluída não gera aviso
            if (
                !tarefa.dataISO ||
                tarefa.concluida
            ) {

                return;

            }

            let prazo =
                new Date(
                    tarefa.dataISO
                );

            let diferenca =
                prazo.getTime()
                -
                agora.getTime();

            let diasRestantes = Math.ceil(

                diferenca / (1000 * 60 * 60 * 24)
            );

            // Tarefa atrasada
            if (diferenca < 0) {

                tarefasProximas.push({

                    tarefa: tarefa,

                    dias: diasRestantes,

                    atrasada: true

                });

            }

            // Faltam até 2 dias
            else if (
                diasRestantes <= 2
            ) {

                tarefasProximas.push({

                    tarefa: tarefa,

                    dias: diasRestantes,

                    atrasada: false

                });

            }

        }
    );

    // Nenhum aviso
    if (
        tarefasProximas.length === 0
    ) {

        divAvisos.innerHTML = `

            <p>Nenhuma tarefa próxima do prazo.</p>

        `;

        return;

    }

    // Mostra avisos
    tarefasProximas.forEach(

        function (item) {

            let tarefa = item.tarefa;

            let textoAviso;

            // Atrasada
            if (
                item.atrasada
            ) {

                textoAviso = `

                    <p>⚠️ A tarefa <strong> ${tarefa.nome} </strong> está atrasada!</p>

                `;

            }

            // Vence hoje
            else if (
                item.dias === 0
            ) {

                textoAviso = `

                    <p>⚠️ A tarefa <strong> ${tarefa.nome} </strong> vence hoje às <strong> ${tarefa.hora} </strong>.</p>

                `;

            }

            // Amanhã
            else if (

                item.dias === 1

            ) {

                textoAviso = `

                    <p>⚠️ A tarefa <strong> ${tarefa.nome} </strong> vence amanhã.</p>

                `;

            }

            // Dois dias
            else {

                textoAviso = `

                    <p>⚠️ A tarefa <strong>${tarefa.nome}</strong> vai expirar daqui a <strong> ${item.dias} dias </strong>.</p>

                `;
            }

            divAvisos.innerHTML += textoAviso;

        }
    );

}

// Total de pendencias
function atualizarPendencias() {

    let pendencias = tarefas.filter(function (tarefa) {

        return !tarefa.concluida;

    }

    );

    document.getElementById('div_totalPendenResId').innerHTML = `<h4>${pendencias.length}</h4>`;

    atualizarProximaExpirar();

}

// proxima tarefa a expriar
function atualizarProximaExpirar() {

    let div = document.getElementById('div_tempoDeExpirarResId');

    let pendencias = tarefas.filter(function (tarefa) {

        return (!tarefa.concluida && tarefa.dataISO);

    }

    );

    if (pendencias.length === 0) {

        div.innerHTML = '<p class="p_TotalPendJs">Nenhuma tarefa pendente.</p>';

        return;

    }

    // Ordena pela data
    pendencias.sort(function (a, b) {

        return (new Date(a.dataISO) - new Date(b.dataISO));

    }

    );

    let tarefa = pendencias[0];


    div.innerHTML = `

        <ul class="ul_LisTotalDePendenjs">

            <li><strong>TAREFA:</strong>${tarefa.nome}</li>

            <li><strong>DATA:</strong>${tarefa.data}</li>

            <li><strong>HORÁRIO:</strong>${tarefa.hora}</li>

        </ul>

    `;

}

mostrarCalendario();

verificarAvisos();

atualizarPendencias();


// function de limpar os inputs após cadastrar algo
function limparInputs() {

    document.getElementById('input_textMatId').value = '';
    document.getElementById('input_textTareId').value = '';
    document.getElementById('input_datetimeLocalTareId').value = '';

}