let tarefas = [];

function cadastrarMat() {

    let input_textMatId = document.getElementById('input_textMatId').value

    if (input_textMatId !== '') {

        tarefas.push({

            nome: input_textMatId

        });

        mostrar();

    } else {

        alert('Preencha os campos')

    }

    limparInputs();

}

function mostrar() {
    let div_tableMatResId = document.getElementById('div_tableMatResId');
    let conteudoHTML = "";

    tarefas.forEach((tarefa, indice) => {
        let estiloConcluido = tarefa.concluida ? "text-decoration: line-through; opacity: 0.8;" : "color: #000000;";
        
        conteudoHTML += `
            <tr style="${estiloConcluido}">
                <td>${tarefa.nome}</td>
                <td>Area</td>
                <td>
                    <button class="button_js1" onclick="alternarTarefa(${indice})">Concluir</button>
                    <button class="button_js12" onclick="deletarTarefa(${indice})">Excluir</button>
                </td>
            </tr>
        `;
    });

    div_tableMatResId.innerHTML = conteudoHTML;
}

function limparInputs(){

    document.getElementById('input_textMatId').value = '';
}

function alternarTarefa(indice) {
    tarefas[indice].concluida = !tarefas[indice].concluida;
    window.confirm("Está tarefa foi concluida?");
    mostrar();
    
}

function deletarTarefa(indice) {
    tarefas.splice(indice, 1);
    window.alert("Tarefa Excluída!");
    mostrar();
}
