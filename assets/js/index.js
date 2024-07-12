const inputTarefa = document.querySelector('.input-nova-tarefa');
const btnTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.lista-de-tarefas');
console.log(inputTarefa)
console.log(btnTarefa)
console.log(tarefas)

function createLi(){
    return document.createElement('li')
}

function criaTarefa(textoInput){
    let li = createLi()
    li.innerText = textoInput
    tarefas.appendChild(li)
    criarBotaoApagar(li)
    salvarTarefas()
}

function criarBotaoApagar(li){
    li.innerText += ' '
    const botao = document.createElement('button')
    botao.innerText = 'X'
    botao.setAttribute('class','apagar')
    botao.setAttribute('title','Apagar Tarefa')
    li.appendChild(botao)
}
//adicionar tarefa 1
inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
        inputTarefa.value = ''
        inputTarefa.focus()
    }
})
//adicionar tarefa 2
btnTarefa.addEventListener('click', function(e){
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
    inputTarefa.value = ''
    inputTarefa.focus()
})
//apagar tarefa
document.addEventListener('click', function(el){
    const elemenento = el.target
    if(elemenento.classList.contains('apagar')){
        elemenento.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas(){
    const liTarefas = document.querySelectorAll('li')
    const tarefasArray = []

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText.replace('X', ' ').trim()
        tarefasArray.push(tarefaTexto)
        
        
    }
    const tarefasJSON = JSON.stringify(tarefasArray)
    localStorage.setItem('tarefas',tarefasJSON)

    console.log(tarefasArray)
}

function exibirTarefasSalvas(){
    const tarefasSalvasNoLocalStorage =  localStorage.getItem('tarefas')
    const tarefasArray = JSON.parse(tarefasSalvasNoLocalStorage)
    for(let tarefa of tarefasArray){
        criaTarefa(tarefa)
    }
}

exibirTarefasSalvas()