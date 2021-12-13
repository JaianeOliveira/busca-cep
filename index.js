/*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."
  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */



(function () {

    'use strict';

    let $input = document.querySelector('[data-js="cepInput"]');
    let $button = document.querySelector('[data-js="btnBuscar"]');
    let $status = document.querySelector('[data-js="reqStatus"]');

    let $logradouro = document.querySelector('[data-js="logradouro"]');
    let $bairro = document.querySelector('[data-js="bairro"]');
    let $estado = document.querySelector('[data-js="estado"]');
    let $cidade = document.querySelector('[data-js="cidade"]');
    let $cep = document.querySelector('[data-js="cep"]');

    var mycep;
    let ajax = new XMLHttpRequest();


    function getCep() {
        mycep = $input.value.match(/\d+/g);
        mycep = mycep.join('');
    }

    function request() {
        ajax.open('GET', `https://ws.apicep.com/cep.json?code=${mycep}`);
        ajax.send();
        ajax.addEventListener('readystatechange', handleReadyStateChange);

    }
    function handleReadyStateChange() {
        let result;
        if (ajax.readyState === 4 && ajax.status === 200) {
            try {
                result = JSON.parse(ajax.responseText);
                if (result.ok == false) {
                    $status.textContent = `Não encontramos o endereço para o CEP ${$input.value}.`
                } else {
                    $logradouro.textContent = result.address;
                    $bairro.textContent = result.district;
                    $estado.textContent = result.state;
                    $cidade.textContent = result.city;
                    $cep.textContent = result.code;
                    $status.textContent = `Endereço referente ao CEP ${result.code}: ${result.address} ${result.district} ${result.city}/${result.state}.`;
                }
            }
            catch (e) {
                console.log(e);
            }

        } else if (ajax.readyState === 1 | ajax.readyState === 2 | ajax.readyState === 3) {
            $status.textContent = `Buscando informações para o CEP ${$input.value}...`;
        }
    }

    $button.addEventListener('click', function (e) {
        getCep();
        request();
        e.preventDefault();
    }, false);




})();
