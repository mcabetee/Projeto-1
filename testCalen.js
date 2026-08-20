// =====================================
// ARRAYS
// =====================================

let materias = [];

let tarefas = [];


// =====================================
// CADASTRAR MATÉRIA
// =====================================

function cadastrarMat() {

    let input_textMatId =
        document.getElementById('input_textMatId').value;

    let select_materiaId =
        document.getElementById('select_materiaId').value;


    if (input_textMatId.trim() !== '') {

        materias.push({

            nome: input_textMatId,

            area: select_materiaId

        });


        mostrarMat();

        atualizarSelectMaterias();

    } else {

        alert('Preencha os campos');

    }


    limparInputs();

}


// =====================================
// MOSTRAR MATÉRIAS
// =====================================

function mostrarMat() {

    let div_tableMatResId =
        document.getElementById('div_tableMatResId');

    let conteudoHTML = "";


    materias.forEach((materia, indice) => {

        conteudoHTML += `

            <tr>

                <td>
                    ${materia.nome}
                </td>

                <td>
                    ${materia.area}
                </td>

                <td>

                    <button
                        class="button_js2"
                        onclick="deletarMateria(${indice})">

                        Excluir

                    </button>

                </td>

            </tr>

        `;

    });


    div_tableMatResId.innerHTML = conteudoHTML;


    // Total de matérias

    let somaMat =
        materias.reduce((acc) => acc + 1, 0);


    document.getElementById(
        'div_totalMateriasResId'
    ).innerHTML = somaMat;

}


// =====================================
// EXCLUIR MATÉRIA
// =====================================

function deletarMateria(indice) {

    materias.splice(indice, 1);

    window.alert("Matéria Excluída!");

    mostrarMat();

    atualizarSelectMaterias();

}


// =====================================
// ATUALIZAR SELECT DAS MATÉRIAS
// =====================================

function atualizarSelectMaterias() {

    let select_tarefasId =
        document.getElementById('select_tarefasId');


    select_tarefasId.innerHTML = `

        <option value="">

            Selecione uma matéria

        </option>

    `;


    materias.forEach((materia, indice) => {

        select_tarefasId.innerHTML += `

            <option value="${indice}">

                ${materia.nome}

            </option>

        `;

    });

}


// =====================================
// CADASTRAR TAREFA
// =====================================

function cadastrarTare() {

    let input_textTareId =
        document.getElementById(
            'input_textTareId'
        ).value;


    let indiceMateria =
        document.getElementById(
            'select_tarefasId'
        ).value;


    let input_datetimeLocalTareId =
        document.getElementById(
            'input_datetimeLocalTareId'
        ).value;


    // Verifica campos

    if (
        input_textTareId.trim() !== '' &&
        indiceMateria.trim() !== '' &&
        input_datetimeLocalTareId !== ''
    ) {


        let materiaSelecionada =
            materias[indiceMateria];


        let dataObjeto =
            new Date(input_datetimeLocalTareId);


        // Data para mostrar

        let dataFormatada =
            dataObjeto.toLocaleDateString(
                'pt-BR'
            );


        // Hora para mostrar

        let horaFormatada =
            dataObjeto.toLocaleTimeString(
                'pt-BR',
                {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            );


        // Adiciona tarefa

        tarefas.push({

            nome: input_textTareId,

            materia: materiaSelecionada.nome,

            area: materiaSelecionada.area,

            data: dataFormatada,

            hora: horaFormatada,

            // Data original

            dataISO: input_datetimeLocalTareId,

            concluida: false

        });


        mostrarTare();

        atualizarSelectMaterias();

        mostrarCalendario();

        verificarAvisos();

        atualizarPendencias();


    } else {

        alert('Preencha todos os campos');

    }


    limparInputs();

}


// =====================================
// MOSTRAR TAREFAS
// =====================================

function mostrarTare() {

    let div_tableTarResId =
        document.getElementById(
            'div_tableTarResId'
        );


    div_tableTarResId.innerHTML = '';


    tarefas.forEach((tarefa, indice) => {


        let estiloConcluido =
            tarefa.concluida

                ? "text-decoration: line-through; color: #000000; opacity: 0.8;"

                : "color: #000000;";


        div_tableTarResId.innerHTML += `

            <tr style="${estiloConcluido}">

                <td>
                    ${indice + 1}
                </td>

                <td>
                    ${tarefa.nome}
                </td>

                <td>
                    ${tarefa.materia}
                </td>

                <td>
                    ${tarefa.area}
                </td>

                <td>
                    ${tarefa.data}
                </td>

                <td>
                    ${tarefa.hora}
                </td>

                <td>

                    <button
                        class="button_js3"
                        onclick="concluidaTarefa(${indice})">

                        ${tarefa.concluida
                            ? 'Desconcluir'
                            : 'Concluir'}

                    </button>


                    <button
                        class="button_js4"
                        onclick="alterar(${indice})">

                        Alterar

                    </button>


                    <button
                        class="button_js5"
                        onclick="excluirTarefa(${indice})">

                        Excluir

                    </button>

                </td>

            </tr>

        `;

    });


    // Total de tarefas

    document.getElementById(
        'div_totalTarefasResId'
    ).innerHTML = tarefas.length;


}


// =====================================
// CONCLUIR TAREFA
// =====================================

function concluidaTarefa(indice) {

    let confirmar =
        window.confirm(
            'Essa tarefa foi concluída?'
        );


    if (confirmar) {

        tarefas[indice].concluida =
            !tarefas[indice].concluida;


        mostrarTare();

        verificarAvisos();

        atualizarPendencias();


    } else {

        alert(
            'A tarefa não foi concluída.'
        );

    }

}


// =====================================
// ALTERAR TAREFA
// =====================================

function alterar(indice) {

    let novaData =
        prompt(
            "Digite a nova data (DDMMAAAA):"
        );


    let novaHora =
        prompt(
            "Digite o novo horário (HHMM):"
        );


    if (
        novaData === null ||
        novaHora === null
    ) {

        return;

    }


    // Remove caracteres

    novaData =
        novaData.replace(/\D/g, "");


    novaHora =
        novaHora.replace(/\D/g, "");


    if (
        novaData.length === 8 &&
        novaHora.length === 4
    ) {


        let dia =
            novaData.slice(0, 2);


        let mes =
            novaData.slice(2, 4);


        let ano =
            novaData.slice(4, 8);


        let hora =
            novaHora.slice(0, 2);


        let minuto =
            novaHora.slice(2, 4);


        // Verifica se a data é válida

        let dataTeste =
            new Date(
                `${ano}-${mes}-${dia}T${hora}:${minuto}`
            );


        if (
            isNaN(dataTeste.getTime())
        ) {

            alert(
                "Data ou horário inválido."
            );

            return;

        }


        // Data mostrada

        tarefas[indice].data =
            `${dia}/${mes}/${ano}`;


        // Hora mostrada

        tarefas[indice].hora =
            `${hora}:${minuto}`;


        // Data utilizada pelo JS

        tarefas[indice].dataISO =
            `${ano}-${mes}-${dia}T${hora}:${minuto}`;


        alert(
            "Alterações salvas!"
        );


        mostrarTare();

        mostrarCalendario();

        verificarAvisos();

        atualizarPendencias();


    } else {

        alert(
            "Digite a data com 8 números (DDMMAAAA) " +
            "e a hora com 4 números (HHMM)."
        );

    }

}


// =====================================
// EXCLUIR TAREFA
// =====================================

function excluirTarefa(indice) {

    tarefas.splice(indice, 1);

    window.alert(
        "Tarefa excluída"
    );


    mostrarTare();

    mostrarCalendario();

    verificarAvisos();

    atualizarPendencias();

}


// =====================================
// CALENDÁRIO
// =====================================

let dataCalendario = new Date();


let mesAtual = dataCalendario.getMonth();


let anoAtual = dataCalendario.getFullYear();


// =====================================
// MOSTRAR CALENDÁRIO
// =====================================

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

        // =================================
        // VERIFICA HOJE
        // =================================

        let hoje =
            new Date();

        let ehHoje =

            dia === hoje.getDate() &&

            mesAtual === hoje.getMonth() &&

            anoAtual === hoje.getFullYear();

        // =================================
        // VERIFICA TAREFA
        // =================================

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

                        dataTarefa.getDate()
                        === dia

                        &&

                        dataTarefa.getMonth()
                        === mesAtual

                        &&

                        dataTarefa.getFullYear()
                        === anoAtual

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
// =====================================
// MÊS ANTERIOR
// =====================================

function mesAnterior() {

    mesAtual--;

    if (mesAtual < 0) {

        mesAtual = 11;

        anoAtual--;

    }

    mostrarCalendario();

}
// =====================================
// PRÓXIMO MÊS
// =====================================

function proximoMes() {

    mesAtual++;

    if (mesAtual > 11) {

        mesAtual = 0;

        anoAtual++;

    }

    mostrarCalendario();

}
// =====================================
// AVISOS DE PRAZO
// =====================================

function verificarAvisos() {

    let divAvisos =
        document.getElementById(
            'avisosTarefas'
        );

    divAvisos.innerHTML = '';

    let agora =
        new Date();

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

            let diasRestantes =
                Math.ceil(
                    diferenca /
                    (1000 * 60 * 60 * 24)
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

            <p>
                Nenhuma tarefa próxima do prazo.
            </p>

        `;

        return;

    }

    // Mostra avisos
    tarefasProximas.forEach(
        function (item) {

            let tarefa =
                item.tarefa;

            let textoAviso;

            // Atrasada
            if (
                item.atrasada
            ) {

                textoAviso = `

                    <p>

                        ⚠️ A tarefa

                        <strong>
                            ${tarefa.nome}
                        </strong>

                        está atrasada!

                    </p>

                `;

            }

            // Vence hoje
            else if (
                item.dias === 0
            ) {

                textoAviso = `

                    <p>

                        ⚠️ A tarefa

                        <strong>
                            ${tarefa.nome}
                        </strong>

                        vence hoje às

                        <strong>
                            ${tarefa.hora}
                        </strong>.

                    </p>

                `;

            }

            // Amanhã
            else if (
                item.dias === 1
            ) {

                textoAviso = `

                    <p>

                        ⚠️ A tarefa

                        <strong>
                            ${tarefa.nome}
                        </strong>

                        vence amanhã.

                    </p>

                `;

            }

            // Dois dias
            else {

                textoAviso = `

                    <p>

                        ⚠️ A tarefa

                        <strong>
                            ${tarefa.nome}
                        </strong>

                        vai expirar daqui a

                        <strong>
                            ${item.dias} dias
                        </strong>.

                    </p>

                `;

            }

            divAvisos.innerHTML +=
                textoAviso;

        }
    );

}
// =====================================
// TOTAL DE PENDÊNCIAS
// =====================================

function atualizarPendencias() {

    let pendencias =
        tarefas.filter(
            function (tarefa) {

                return !tarefa.concluida;

            }
        );

    document.getElementById(
        'div_totalPendenResId'
    ).innerHTML =
        pendencias.length;

    atualizarProximaExpirar();

}
// =====================================
// PRÓXIMA TAREFA A EXPIRAR
// =====================================

function atualizarProximaExpirar() {

    let div =
        document.getElementById(
            'div_tempoDeExpirarResId'
        );

    let pendencias =
        tarefas.filter(
            function (tarefa) {

                return (
                    !tarefa.concluida &&
                    tarefa.dataISO
                );

            }
        );

    if (
        pendencias.length === 0
    ) {

        div.innerHTML =
            '<p>Nenhuma tarefa pendente.</p>';

        return;

    }

    // Ordena pela data
    pendencias.sort(
        function (a, b) {

            return (
                new Date(a.dataISO)
                -
                new Date(b.dataISO)
            );

        }
    );

    let tarefa =
        pendencias[0];

    div.innerHTML = `

        <ul>

            <li>
                <strong>TAREFA:</strong>
                ${tarefa.nome}
            </li>

            <li>
                <strong>DATA:</strong>
                ${tarefa.data}
            </li>

            <li>
                <strong>HORÁRIO:</strong>
                ${tarefa.hora}
            </li>

        </ul>

    `;

}
// =====================================
// LIMPAR INPUTS
// =====================================

function limparInputs() {

    document.getElementById(
        'input_textMatId'
    ).value = '';

    document.getElementById(
        'input_textTareId'
    ).value = '';

    document.getElementById(
        'input_datetimeLocalTareId'
    ).value = '';

}
// =====================================
// INICIALIZAÇÃO
// =====================================

mostrarCalendario();

verificarAvisos();

atualizarPendencias();