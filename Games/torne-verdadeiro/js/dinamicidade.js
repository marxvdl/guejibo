function estadosIguais(estado1, estado2) {
    let iguais = true;
    for (let i = 0; i < estado1.length; i++) {
        if (estado1[i] !== estado2[i]) {
            iguais = false;
            break;
        }
    }
    return iguais;
}

function criaTodasPossibilidadesResposta(posicao_elementos_iniciais) {
	let quantidadeNecessaria;;
	if (posicao_elementos_iniciais.length > 0) {
		quantidadeNecessaria = Math.pow(2, posicao_elementos_iniciais.length);
	} else {
		quantidadeNecessaria = 0;
	}
	let respostasPossiveisValidas = [];
	
	if (quantidadeNecessaria > 0) {
		do {
			let estadoInicial = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
		    for (let i = 0; i < posicao_elementos_iniciais.length; i++) {
		        estadoInicial[posicao_elementos_iniciais[i] - 140] = getRandomIntInclusive(0, 1).toString();
		    }

			let jaTem = false;
			for (let j = 0; j < respostasPossiveisValidas.length; j++) {
				if (estadosIguais(respostasPossiveisValidas[j], estadoInicial)) {
					jaTem = true;
				}
			}

			if (!jaTem) {
				respostasPossiveisValidas.push(estadoInicial);
			}
		} while(respostasPossiveisValidas.length < quantidadeNecessaria);
	}

    return respostasPossiveisValidas;
}

function verificaSolucoesPossiveis(circuitoJSON) {
	let respostasPossiveisValidas = criaTodasPossibilidadesResposta(circuitoJSON.posicao_elementos_iniciais);
	let solucoes_possiveis = [];
	for (let i = 0; i < respostasPossiveisValidas.length; i++) {
		let r = pegaOutputDePropagacaoVirtual(circuitoJSON, respostasPossiveisValidas[i]);
		if (r) {
			let jaTem = false;
			for (let j = 0; j < solucoes_possiveis.length; j++) {
				if (estadosIguais(solucoes_possiveis[j], respostasPossiveisValidas[i])) {
					jaTem = true;
				}
			}

			if (!jaTem) {
				solucoes_possiveis.push(respostasPossiveisValidas[i]);
			}
		}
	}

	return solucoes_possiveis;
}

function pegaOutputDePropagacaoVirtual(circuitoJSON, estadoInicial = ["0","0","0","0","1","1","0","0","0","0"]) {
	function ativaAlgumElementoDadaSuaPosicao(posicaoDada) {
		for (let j = 0; j < circuitoJSON.lista_elementos.length; j++) {
			if (circuitoJSON.lista_elementos[j].posicao === posicaoDada) {
				circuitoJSON.lista_elementos[j].estado = 'on';
			}
		}
	}

	function verificaSeDeterminadoElementoEstaAtivo(posicaoDada) {
		let ativo = false;
		for (let j = 0; j < circuitoJSON.lista_elementos.length; j++) {
			if (circuitoJSON.lista_elementos[j].posicao === posicaoDada && circuitoJSON.lista_elementos[j].estado === 'on') {
				ativo = true;
			}
		}
		return ativo;
	}

	// coloca o atributo "estado" e dá a ele o valor off para cada um dos elementos
	for (let i = 0; i < circuitoJSON.lista_elementos.length; i++) {
		circuitoJSON.lista_elementos[i].estado = 'off';
	}
	// realiza a primeira propagação, considerando a posição dos elementos inicias e o estadoInicial passado
	// percorre o array de posição dos elementos iniciais, para sem seguida verificar se a posição correspondente do estado inicial é 1, porque se for, queremos ativar esse elemento que tá nessa posição inicial
	for (let i = 0; i < circuitoJSON.posicao_elementos_iniciais.length; i++) {
		if (estadoInicial[circuitoJSON.posicao_elementos_iniciais[i] - 140] === '1') {
			ativaAlgumElementoDadaSuaPosicao(circuitoJSON.posicao_elementos_iniciais[i]);
		}
	}
	// realiza o resto da propagação, com base nos elementos iniciais que estão ativos
	for (let i = 0; i < circuitoJSON.lista_elementos.length; i++) { 
		let nomeElemento = circuitoJSON.lista_elementos[i].elemento.split('-');
		// linhas normais
		if (nomeElemento.includes('linha') || nomeElemento.includes('canto') || nomeElemento.includes('cruz') || nomeElemento.includes('t')) {
			// se tem conexão 0, é porque é um dos primeiros elementos
			if (circuitoJSON.lista_elementos[i].conexao.length !== 0) {				
                if (verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0])) {
                	circuitoJSON.lista_elementos[i].estado = 'on';
                } else {
                	circuitoJSON.lista_elementos[i].estado = 'off';
                }
			}
		}
		// not: inverte
		if (circuitoJSON.lista_elementos[i].elemento === 'not') {
			if (verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0])) {
				circuitoJSON.lista_elementos[i].estado = 'off';
			} else {
				circuitoJSON.lista_elementos[i].estado = 'on';
			}
		}
		// and: ambas devem ser verdadeiras
		if (circuitoJSON.lista_elementos[i].elemento === 'and') {
			if (verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0]) && verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[1])) {
				circuitoJSON.lista_elementos[i].estado = 'on';
			} else {
				circuitoJSON.lista_elementos[i].estado = 'off';
			}
		}
		// or: pelo menos uma deve ser verdadeira
		if (circuitoJSON.lista_elementos[i].elemento === 'or') {
			if (verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0]) || verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[1])) {
				circuitoJSON.lista_elementos[i].estado = 'on';
			} else {
				circuitoJSON.lista_elementos[i].estado = 'off';
			}
		}
        // nand: falsa se ambas verdadeiras
        if (circuitoJSON.lista_elementos[i].elemento === 'nand') {
            if (verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0]) && verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[1])) {
                circuitoJSON.lista_elementos[i].estado = 'off';
            } else {
                circuitoJSON.lista_elementos[i].estado = 'on';
            }
        }
        // nor: nenhuma deve ser verdadeira
        if (circuitoJSON.lista_elementos[i].elemento === 'nor') {
            if (!verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0]) && !verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[1])) {
                circuitoJSON.lista_elementos[i].estado = 'on';
            } else {
                circuitoJSON.lista_elementos[i].estado = 'off';
            }
        }
        // xor: só uma pode ser verdadeira
        if (circuitoJSON.lista_elementos[i].elemento === 'xor') {
            if ((verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0]) && !verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[1])) || (!verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0]) && verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[1]))) {
                circuitoJSON.lista_elementos[i].estado = 'on';
            } else {
                circuitoJSON.lista_elementos[i].estado = 'off';
            }
        }
        // xnor: ou ambas falsas ou ambas verdadeiras
        if (circuitoJSON.lista_elementos[i].elemento === 'xnor') {
            if ((!verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0]) && !verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[1])) || (verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[0]) && verificaSeDeterminadoElementoEstaAtivo(circuitoJSON.lista_elementos[i].conexao[1]))) {
                circuitoJSON.lista_elementos[i].estado = 'on';
            } else {
                circuitoJSON.lista_elementos[i].estado = 'off';
            }
        }
        // fim
	}
	// agora altera o output, verificando se todos os últimos elementos estão ativos
	let output = true, totalElementosUltimaPosicao = 0;
	for (let i = 0; i < circuitoJSON.lista_elementos.length; i++) {
		if (circuitoJSON.lista_elementos[i].posicao < 10) {
			totalElementosUltimaPosicao++;
			if (circuitoJSON.lista_elementos[i].estado === 'off') {
				output = false;
			}			
		}
	}
	// remove a propriedade "estado" dos elementos, já que ela não será útil mais
	for (let i = 0; i < circuitoJSON.lista_elementos.length; i++) {
		delete circuitoJSON.lista_elementos[i].estado;
	}

	return output && totalElementosUltimaPosicao > 0;
}
function verificaTotalElemento(circuitoJSON, elemento = 'and') {
	let total = 0;
	for (let i = 0; i < circuitoJSON.lista_elementos.length; i++) {
		if (circuitoJSON.lista_elementos[i].elemento === elemento) {
			total++;
		}
	}

	return total;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function geraCombinacaoAleatoriaPadrao(quantidade, tipo, alcance = 5) {
	let combinacao = [];
	switch(tipo) {
		case 'and':
			for (let i = 0; i < quantidade; i++) {
				let valorAleatorio = getRandomIntInclusive(0, alcance);
				switch(valorAleatorio) {
					case 0:
						combinacao.push('and');
						break;
					case 1:
						combinacao.push('or');
						break;
					case 2:
						combinacao.push('xor');
						break;
					case 3:
						combinacao.push('nor');
						break;
					case 4:
						combinacao.push('nand');
						break;
					case 5:
						combinacao.push('xnor');
						break;
				}
			}
			break;
		case 'not':
			for (let i = 0; i < quantidade; i++) {
				let valorAleatorio = getRandomIntInclusive(0, 1);
				switch(valorAleatorio) {
					case 0:
						combinacao.push('not');
						break;
					case 1:
						combinacao.push('linha-central-vertical');
						break;
				}
			}
			break;
	}

	return combinacao;
}

function arraysIguais(array1, array2) {
	let igual = true;
	if (array1.length === array2.length) {
		for (let i = 0; i < array1.length; i++) {
			if (array1[i] !== array2[i]) {
				igual = false;
				break;
			}
		}
	} else {
		return false;
	}

	return igual;
}

function verificaSeCombinacoesJaForam(combinacaoElementosComplexos, combinacaoElementosSimples, listaCombinacoes) {
	let jaForam = false;
	for (let i = 0; i < listaCombinacoes.length; i++) {
		if (arraysIguais(listaCombinacoes[i][0], combinacaoElementosComplexos) && arraysIguais(listaCombinacoes[i][1], combinacaoElementosSimples)) {
			jaForam = true;
			break;
		}
	}

	return jaForam;
}

function obtemCombinacoesAleatoriasComBaseMolde(molde, alcance = 6) {
	let totalAnds = verificaTotalElemento(molde, 'and');
	let totalNots = verificaTotalElemento(molde, 'not');
	let combinacaoElementosComplexos = geraCombinacaoAleatoriaPadrao(totalAnds, 'and', alcance);
	let combinacaoElementosSimples = geraCombinacaoAleatoriaPadrao(totalNots, 'not');

	return [combinacaoElementosComplexos, combinacaoElementosSimples];
}

function criaCircuito(molde, combinacaoElementosComplexos, combinacaoElementosSimples) {
	let copiaMolde = JSON.parse(JSON.stringify(molde));
	copiaMolde = realizaSubstituicoes(copiaMolde, combinacaoElementosComplexos, 'and');
	copiaMolde = realizaSubstituicoes(copiaMolde, combinacaoElementosSimples, 'not');
	copiaMolde.solucoes_possiveis = verificaSolucoesPossiveis(copiaMolde);

	return copiaMolde;
}

function realizaSubstituicoes(circuitoJSON, combinacao, elemento = 'and') {
	let total = verificaTotalElemento(circuitoJSON, elemento);
	if (total === combinacao.length) {
		let posicaoElementoCombinacao = 0;
		for (let i = 0; i < circuitoJSON.lista_elementos.length; i++) {
			if (circuitoJSON.lista_elementos[i].elemento === elemento) {
				circuitoJSON.lista_elementos[i].elemento = combinacao[posicaoElementoCombinacao];
				posicaoElementoCombinacao++;
			}
		}
	}

	return circuitoJSON;
}