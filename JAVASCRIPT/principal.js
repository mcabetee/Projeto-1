let materias = [];
let tarefas = [];

function cadastrarMat() {

    let input_textMatId = document.getElementById('input_textMatId').value
    let select_materiaId = document.getElementById('select_materiaId').value

    if (input_textMatId !== '') {

        materias.push({

            nome: input_textMatId,
            materia: select_materiaId

        });

        mostrarMat();

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
                <td>${materia.materia}</td>
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


function cadastrarTare(){

    let input_textTareId = document.getElementById('input_textTareId').value
    let select_tarefasId = document.getElementById('select_tarefasId').value

    div_tableTarResId.innerHTML = '';

    if(input_textTareId !== '' && select_tarefasId !== '' ){

        tarefas.push({

            nome:input_textTareId,
            materia:select_tarefasId

        });

        mostrarTare()

    } else {

        alert('Preencha todos as campos')

    }

    limparInputs();

}

function mostrarTare(){
    
    let div_tableTarResId = document.getElementById('div_tableTarResId')

    tarefas.forEach((tarefa, indice) => {

        div_tableTarResId.innerHTML += `
        
        <td>${tarefa.nome}</td>
        <td>${tarefa.materia}</td>
        <td>Materia</td>
        <td>area</td>
        <td>expira</td>
        <td>
        <button>Concluirr</button>
        <button>Excluir</button>
        </td>

        `
        
    });

}

function limparInputs() {

    document.getElementById('input_textMatId').value = '';
    document.getElementById('input_textTareId').value = '';

}