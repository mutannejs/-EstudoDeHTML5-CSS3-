function removeEquip(e) {
    let id = e.currentTarget.id.slice(4);
    const div = document.getElementById('equipamentos');

    let encontrou = false, node = null, c, label;
    for (let i = 0; i < div.childNodes.length; i++) {
        c = div.children.item(i);

        if (encontrou) {
            label = 'equi_' + (i - 1);
            c.setAttribute('id', label);
            c.children.item(0).setAttribute('for', `tipo_${label}`);
            c.children.item(1).setAttribute('id', `tipo_${label}`);
            c.children.item(1).setAttribute('name', `tipo_${label}`);
            c.children.item(2).setAttribute('for', `patr_${label}`);
            c.children.item(3).setAttribute('id', `patr_${label}`);
            c.children.item(3).setAttribute('name', `patr_${label}`);
            c.children.item(4).setAttribute('id', `btn_${label}`);
        } else if (c.getAttribute('id') === id) {
            c.innerHTML = '';
            encontrou = true;
            node = c;
        }
    }

    if (node) {
        div.removeChild(node);
    }
}

function addEquipamento() {
    const div = document.getElementById('equipamentos');
    const equipamentos = Array.from(div.children);

    const newEl = document.createElement('li');
    newEl.id = 'equi_' + equipamentos.length;
    newEl.classList.add('equip');
    newEl.innerHTML = `
        <label for="tipo_${newEl.id}">Tipo:</label>
        <input type="text" id="tipo_${newEl.id}" name="tipo_${newEl.id}" required />
        <label for="patr_${newEl.id}">Patrimônio:</label>
        <input type="number" id="patr_${newEl.id}" name="patr_${newEl.id}" class="patr_equi" required />
        <button type="button" id="btn_${newEl.id}" class="btn btn_del">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
            </svg>
        </button>
    `;

    div.appendChild(newEl);

    const btn = document.getElementById('btn_' + newEl.id);
    btn?.addEventListener('click', removeEquip);
}

function showMessage(id, message = null, type, time = 3000, handler = null) {
    const field = document.getElementById(id);
    field.classList.add('show');
    field.classList.add(type);
    if (message)
        field.innerHTML = message;
    setTimeout(() => {
        field.classList.remove('show');
        field.classList.remove(type);
        handler?.();
    }, time);
}

function finalizarChamado() {
    const form = document.querySelector('form');

    if (!form.reportValidity()) return;

    const {
        chamado,
        descricao,
        id_chamado,
        departamento,
        sala,
        requerente,
        entregue,
        ...equips
    } = Object.fromEntries(new FormData(form).entries());

    let listEquips = Object.entries(equips);
    if (listEquips.length === 0) return showMessage('message');

    let equipamentos = [];
    for (let i = 0; i < listEquips.length; i+=2) {
        equipamentos.push({
            tipo: listEquips[i][1],
            patrimonio: listEquips[i+1][1],
        })
    }

    validatedData = {
        ehChamado: chamado === 's' ? true : false,
        descricao: descricao,
        idChamado: chamado === 's' ? Number(id_chamado) : null,
        departamento: chamado === 's' ? departamento : null,
        sala: chamado === 's' ? sala || null : null,
        requerente: chamado === 's' ? requerente : null,
        entregue: chamado === 'n' ? true : entregue === 's' ? true : false,
        equipamentos: equipamentos
    }

    // onSuccess();
    // onFailure();

    console.log(validatedData);
}

async function onFailure() {
    try {
        await fetch('https://www.helloworld/');
    } catch (error) {
        showMessage(
            'output',
            `Ocorreu um erro ao tentar inserir os dados na planilha:
            <p>${error.message}</p>`,
            'error',
            15000
        );
    }
}

function onSuccess() {
    showMessage(
        'output',
        'Dados inseridos na planilha com sucesso',
        'success',
        3000,
        google.script.host.close
    );
    document.getElementById('form').classList.add('hidden');
}

function setDadosChamado(value) {
    const dados = document.getElementById('dados_chamado');
    if (value)
        dados.classList.remove('disabled')
    else
        dados.classList.add('disabled');

    [
        'id_chamado',
        'departamento',
        'requerente',
        'sala',
        'foi_entregue',
        'nao_entregue'
    ].forEach(id => {
        let input = document.getElementById(id);
        input.toggleAttribute('disabled', !value);
    });
}

function toggleDadosChamado(e) {
    if (e.currentTarget.id === 'eh_chamado')
        setDadosChamado(true)
    else
        setDadosChamado(false)
}

const naoChamado = document.getElementById("nao_chamado");
const ehChamado = document.getElementById("eh_chamado");
naoChamado.addEventListener('change', toggleDadosChamado);
ehChamado.addEventListener('change', toggleDadosChamado);