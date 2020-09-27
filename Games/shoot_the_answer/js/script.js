let gc = new gameslib.GameConnection();

// TODA VEZ QUE A JANELA FOR REDIMENSIONADA, O ESPAÇO ADQUIRE 100% DO SEU HEIGHT E DO SEU WIDTH
$('#espaco').css('width', `${window.innerWidth}px`);
$('#espaco').css('height', `${window.innerHeight}px`);
window.addEventListener('resize', function() {
	$('#espaco').css('width', `${window.innerWidth}px`);
	$('#espaco').css('height', `${window.innerHeight}px`);
});
// ***

// TODA VEZ QUE O SCROLL FOR CHAMADO, ELE VOLTA PARA ZERO, IMPEDINDO-O DE ACONTECER
function bloqueia_scroll(){
    $(window).scrollTop(0);
    $(window).scrollLeft(0);
}
$(window).bind('scroll', bloqueia_scroll);
// ***

// VARIÁVEIS DE CONFIGURAÇÃO
let salto_nave=0.30;
let salto_laser=3;
let salto_obs=0.075;
let tempo_atualizacao=1;
// ***

// VARIÁVEIS DE CONTROLE
let acoes_nave={
	'moveu_direita':false,
	'moveu_esquerda':false,
	'atirou':false
};
let parar=false;
let pontuacao=0;
let tempo=2*60;
// ***

// VALORES
let perguntas;
let respostas;
let imagens;
let pergunta_resposta;
// ***

function verifica_tipo_quiz(){
	let tipo=$("#tipo_quiz option:selected").val();
	if(tipo=='estados_brasil'){
		respostas=['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantis', 'Distrito Federal'];
		imagens=['ac.jpg', 'al.jpg', 'ap.jpg', 'am.jpg', 'ba.jpg', 'ce.jpg', 'es.jpg', 'go.jpg', 'ma.jpg', 'mt.jpg', 'ms.jpg', 'mg.jpg', 'pa.jpg', 'pb.jpg', 'pr.jpg', 'pe.jpg', 'pi.jpg', 'rj.jpg', 'rn.jpg', 'rs.jpg', 'ro.jpg', 'rr.jpg', 'sc.jpg', 'sp.jpg', 'se.jpg', 'to.jpg', 'df.jpg'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual estado/local?');
			imagens[i]='img/brasil/estados_brasileiros/'+imagens[i];
		}
	}else if(tipo=='capitais_brasil'){
		perguntas=['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantis', 'Distrito Federal'];
		imagens=['ac.jpg', 'al.jpg', 'ap.jpg', 'am.jpg', 'ba.jpg', 'ce.jpg', 'es.jpg', 'go.jpg', 'ma.jpg', 'mt.jpg', 'ms.jpg', 'mg.jpg', 'pa.jpg', 'pb.jpg', 'pr.jpg', 'pe.jpg', 'pi.jpg', 'rj.jpg', 'rn.jpg', 'rs.jpg', 'ro.jpg', 'rr.jpg', 'sc.jpg', 'sp.jpg', 'se.jpg', 'to.jpg', 'df.jpg'];
		for(let i=0; i<imagens.length; i++){
			imagens[i]='img/brasil/estados_brasileiros/'+imagens[i];
		}
		respostas=['Rio Branco', 'Maceió', 'Macapá', 'Manaus', 'Salvador', 'Fortaleza', 'Vitória', 'Goiânia', 'São Luís', 'Cuiabá', 'Campo Grande', 'Belo Horizonte', 'Belém', 'João Pessoa', 'Curitiba', 'Recife', 'Teresina', 'Rio de Janeiro', 'Natal', 'Porto Alegre', 'Porto Velho', 'Boa Vista', 'Florianópolis', 'São Paulo', 'Aracaju', 'Palmas', 'Brasília'];
	}else if(tipo=='bandeiras_brasil'){
		imagens=['acre.png', 'alagoas.png', 'amapa.png', 'amazonas.png', 'bahia.png', 'ceara.png', 'espirito_santo.png', 'goias.png', 'maranhao.png', 'mato_grosso.png', 'mato_grosso_sul.png', 'minas_gerais.png', 'para.png', 'paraiba.png', 'parana.png', 'pernambuco.png', 'piaui.png', 'rio_de_janeiro.png', 'rio_grande_norte.png', 'rio_grande_sul.png', 'rondonia.png', 'roraima.png', 'santa_catarina.png', 'sao_paulo.png', 'sergipe.png', 'tocantins.png', 'distrito_federal.png'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual estado?');
			imagens[i]='img/brasil/bandeiras/'+imagens[i];
		}
		respostas=['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantis', 'Distrito Federal'];
	}else if(tipo=='regioes_brasil'){
		imagens=['regiao_centro_oeste.jpg', 'regiao_nordeste.jpg', 'regiao_norte.jpg', 'regiao_sudeste.jpg', 'regiao_sul.jpg'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual região?');
			imagens[i]='img/brasil/regioes/'+imagens[i];
		}
		respostas=['Centro-oeste', 'Nordeste', 'Norte', 'Sudeste', 'Sul'];
	}else if(tipo=='biomas_brasil'){
		imagens=['caatinga.jpg', 'cerrado.jpg', 'floresta_amazonica.jpg', 'mata_atlantica.jpg', 'mata_de_araucarias.jpg', 'mata_dos_cocais.jpg', 'pampas.jpg', 'pantanal.jpg', 'vegetacao_litoranea.jpg'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual bioma?');
			imagens[i]='img/brasil/biomas/'+imagens[i];
		}
		respostas=['Caatinga', 'Cerrado', 'Floresta Amazônica', 'Mata Atlântica', 'Mata de Araucárias', 'Mata dos Cocais', 'Pampas', 'Pantanal', 'Vegetação Litorânea'];
	}else if(tipo=='climas_brasil'){
		imagens=['equatorial_umido.jpg', 'subtropical.jpg', 'tropical.jpg', 'tropical_altitude.jpg', 'tropical_atlantico.jpg', 'tropical_semiarido.jpg'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual clima?');
			imagens[i]='img/brasil/climas/'+imagens[i];
		}
		respostas=['Equatorial Úmido', 'Subtropical', 'Tropical', 'Tropical de Altitude', 'Tropical Atlântico', 'Tropical Semiárido'];
	}else if(tipo=='relevos_brasil'){
		imagens=['planalto_central.jpg', 'planalto_das_guianas.jpg', 'planalto_do_maranhao_piaui.jpg', 'planalto_meridional.jpg', 'planalto_nordestino.jpg', 'planalto_uruguaio_sul_rio_grandense.jpg', 'planice_do_pantanal.jpg', 'planices_de_terras_baixas_costeiras.jpg', 'planices_de_terras_baixas_amazonicas.jpg', 'serras_e_planaltos_do_leste_e_sudeste.jpg'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual relevo?');
			imagens[i]='img/brasil/relevos/'+imagens[i];
		}
		respostas=['Planalto Central', 'Planalto das Guianas', 'Planalto Maranhão Piauí', 'Planalto Meridional', 'Planalto Nordestino', 'Planalto Uruguaio Sul Rio Grandense', 'Planíce do Pantanal', 'Planíces de Terras Baixas Costeiras', 'Planíces de Terras Baixas Amazônicas', 'Serras e Planaltos do Leste e Sudeste'];
	}else if(tipo=='bacias_brasil'){
		imagens=['bacia_amazonica.jpg', 'bacia_atlantico_nordeste_ocidental.jpg', 'bacia_atlantico_nordeste_oriental.jpg', 'bacia_atlantico_sul.jpg', 'bacia_do_atlantico_leste.jpg', 'bacia_do_atlantico_sudeste.jpg', 'bacia_do_paraguai.jpg', 'bacia_do_parana.jpg', 'bacia_do_parnaiba.jpg', 'bacia_do_sao_francisco.jpg', 'bacia_do_uruguai.jpg', 'bacia_tocantins_araguaia.jpg'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual bacia?');
			imagens[i]='img/brasil/bacias/'+imagens[i];
		}
		respostas=['Bacia Amazônica', 'Bacia Atlântico Nordeste Ocidental', 'Bacia Atlântico Nordeste Oriental', 'Bacia Atlântico Sul', 'Bacia do Atlântico Leste', 'Bacia do Atlântico Sudeste', 'Bacia do Paraguai', 'Bacia do Paraná', 'Bacia do Parnaíba', 'Bacia do São Francisco', 'Bacia do Uruguai', 'Bacia Tocantins Araguaia'];
	}

	// CAPITAIS MUNDO
	if(tipo=='capitais_paises_mundo'){
		imagens=["img/america_sul/argentina.jpg", "img/america_sul/bolivia.jpg", "img/america_sul/brasil.jpg", "img/america_sul/chile.jpg", "img/america_sul/colombia.jpg", "img/america_sul/equador.jpg", "img/america_sul/guiana.jpg", "img/america_sul/paraguai.jpg", "img/america_sul/peru.jpg", "img/america_sul/suriname.jpg", "img/america_sul/uruguai.jpg", "img/america_sul/venezuela.jpg", "img/america_sul/guiana_francesa.jpg", "img/america_central/antigua_e_barbuda.jpg", "img/america_central/bahamas.jpg", "img/america_central/barbados.jpg", "img/america_central/belize.jpg", "img/america_central/costa_rica.jpg", "img/america_central/cuba.jpg", "img/america_central/dominica.jpg", "img/america_central/el_salvador.jpg", "img/america_central/granada.jpg", "img/america_central/guatemala.jpg", "img/america_central/haiti.jpg", "img/america_central/honduras.jpg", "img/america_central/jamaica.jpg", "img/america_central/nicaragua.jpg", "img/america_central/panama.jpg", "img/america_central/puerto_rico.jpg", "img/america_central/republica_dominicana.jpg", "img/america_central/santa_lucia.jpg", "img/america_central/sao_cristovao_e_nevis.jpg", "img/america_central/sao_vicente_e_granadinas.jpg", "img/america_central/trinidad_e_tobago.jpg", "img/america_norte/mexico.jpg", "img/america_norte/estados_unidos.jpg", "img/america_norte/canada.jpg", "img/america_norte/groelandia.jpg", "img/bandeiras/europa/albania.png","img/bandeiras/europa/alemanha.png","img/bandeiras/europa/andorra.png","img/bandeiras/europa/armenia.png","img/bandeiras/europa/austria.png","img/bandeiras/europa/azerbaijao.png","img/bandeiras/europa/belgica.png","img/bandeiras/europa/bielorussia.png","img/bandeiras/europa/bosnia.png","img/bandeiras/europa/bulgaria.png","img/bandeiras/europa/cazaquistao.png","img/bandeiras/europa/chequia.png","img/bandeiras/europa/chipre.png","img/bandeiras/europa/croacia.png","img/bandeiras/europa/dinamarca.png","img/bandeiras/europa/eslovaquia.png","img/bandeiras/europa/eslovenia.png","img/bandeiras/europa/espanha.png","img/bandeiras/europa/estonia.png","img/bandeiras/europa/finlandia.png","img/bandeiras/europa/franca.png","img/bandeiras/europa/georgia.png","img/bandeiras/europa/grecia.png","img/bandeiras/europa/hungria.png","img/bandeiras/europa/irlanda.png","img/bandeiras/europa/islandia.png","img/bandeiras/europa/italia.png","img/bandeiras/europa/letonia.png","img/bandeiras/europa/liechtenstein.png","img/bandeiras/europa/lituania.png","img/bandeiras/europa/luxemburgo.png","img/bandeiras/europa/macedonia.png","img/bandeiras/europa/malta.png","img/bandeiras/europa/moldavia.png","img/bandeiras/europa/monaco.png","img/bandeiras/europa/montenegro.png","img/bandeiras/europa/noruega.png","img/bandeiras/europa/paises_baixos.png","img/bandeiras/europa/polonia.png","img/bandeiras/europa/portugal.png","img/bandeiras/europa/reino_unido.png","img/bandeiras/europa/romenia.png","img/bandeiras/europa/russia.png","img/bandeiras/europa/san_marino.png","img/bandeiras/europa/servia.png","img/bandeiras/europa/suecia.png","img/bandeiras/europa/suica.png","img/bandeiras/europa/turquia.png","img/bandeiras/europa/ucrania.png","img/bandeiras/europa/vaticano.png", "img/asia/afeganistao.png","img/asia/arabia_saudita.png","img/asia/armenia.png","img/asia/azerbaijao.png","img/asia/bahrein.png","img/asia/bangladesh.png","img/asia/brunei.png","img/asia/butao.png","img/asia/camboja.png","img/asia/cazaquistao.png","img/asia/china.png","img/asia/chipre.png","img/asia/coreia_norte.png","img/asia/coreia_sul.png","img/asia/egito.png","img/asia/emirados_arabes_unidos.png","img/asia/filipinas.png","img/asia/georgia.png","img/asia/iemen.png","img/asia/india.png","img/asia/indonesia.png","img/asia/irao.png","img/asia/iraque.png","img/asia/israel.png","img/asia/japao.png","img/asia/jordania.png","img/asia/kuwait.png","img/asia/laos.png","img/asia/libano.png","img/asia/malasia.png","img/asia/maldivas.png","img/asia/mongolia.png","img/asia/myanmar.png","img/asia/nepal.png","img/asia/oma.png","img/asia/israel.png","img/asia/paquistao.png","img/asia/catar.png","img/asia/quirguistao.png","img/asia/russia.png","img/asia/singapura.png","img/asia/siria.png","img/asia/sri_lanka.png","img/asia/tailandia.png","img/asia/tajiquistao.png","img/asia/timor.png","img/asia/turquia.png","img/asia/uzbequistao.png","img/asia/vietna.png", "img/africa/africa_sul.jpg","img/africa/angola.jpg","img/africa/argelia.jpg","img/africa/benim.jpg","img/africa/botsuana.jpg","img/africa/burkina_faso.jpg","img/africa/borundi.jpg","img/africa/cabo_verde.jpg","img/africa/camaroes.jpg","img/africa/chade.jpg","img/africa/comores.jpg","img/africa/congo.jpg","img/africa/costa_do_marfim.jpg","img/africa/egito.jpg","img/africa/eritreia.jpg","img/africa/etiopia.jpg","img/africa/gabao.jpg","img/africa/gambia.jpg","img/africa/gana.jpg","img/africa/guine_bissau.jpg","img/africa/guine_conacri.jpg","img/africa/guine_equatorial.jpg","img/africa/ilhas_canarias.jpg","img/africa/jibuti.jpg","img/africa/lesoto.jpg","img/africa/liberia.jpg","img/africa/libia.jpg","img/africa/madagascar.jpg","img/africa/malawi.jpg","img/africa/mali.jpg","img/africa/marrocos.jpg","img/africa/mauricia.jpg","img/africa/mauritania.jpg","img/africa/mocambique.jpg","img/africa/namibia.jpg","img/africa/niger.jpg","img/africa/nigeria.jpg","img/africa/quenia.jpg","img/africa/republica_centro_africana.jpg","img/africa/ruanda.jpg","img/africa/sao_tome_e_principe.jpg","img/africa/senegal.jpg","img/africa/serra_leoa.jpg","img/africa/somalia.jpg","img/africa/suazilandia.jpg","img/africa/sudao.jpg","img/africa/sudao_do_sul","img/africa/tanzania.jpg","img/africa/togo.jpg","img/africa/tunisia.jpg","img/africa/uganda.jpg","img/africa/zambia.jpg","img/africa/zimbabue.jpg", "img/oceania/australia.jpg","img/oceania/estados_federados_da_micronesia.jpg","img/oceania/fiji.jpg","img/oceania/ilhas_marshall.jpg","img/oceania/ilhas_salomao.jpg","img/oceania/kiribati.jpg","img/oceania/nauru.jpg","img/oceania/samoa.jpg","img/oceania/nova_zelandia.jpg","img/oceania/palau.jpg","img/oceania/papua_nova_guine.jpg","img/oceania/tonga.jpg","img/oceania/tuvalu.jpg","img/oceania/vanuatu.jpg"]


		perguntas=['Argentina', 'Bolívia', 'Brasil', 'Chile', 'Colômbia', 'Equador', 'Guiana', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela', 'Guiana Francesa', 'Antígua e Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Costa Rica', 'Cuba', 'Dominica', 'El Salvador', 'Granada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Nicarágua', 'Panamá', 'Puerto Rico', 'República Dominicana', 'Santa Lúcia', 'São Cristovão e Nevis', 'São Vicente e Granadinas', 'Trinidad e Tobago', 'México', 'Estados Unidos', 'Canadá', 'Groelândia', 'Albânia', 'Alemanha', 'Andorra', 'Armênia', 'Áustria', 'Azerbaijão', 'Bélgica', 'Bielorússia', 'Bósnia', 'Bulgária', 'Cazaquistão', 'Tchéquia', 'Chipre', 'Croácia', 'Dinamarca', 'Eslováquia', 'Eslovênia', 'Espanha', 'Estônia', 'Finlândia', 'França', 'Georgia', 'Grécia', 'Hungria', 'Irlanda', 'Islândia', 'Itália', 'Letônia', 'Liechtenstein', 'Lituânia', 'Luxemburgo', 'Macedônia', 'Malta', 'Moldavia', 'Mônaco', 'Montenegro', 'Noruega', 'Países Baixos', 'Polônia', 'Portugal', 'Reino Unido', 'Romênia', 'Rússia', 'San Marino', 'Sérvia', 'Suécia', 'Suíça', 'Turquia', 'Ucrânia', 'Vaticano', 'Afeganistão', 'Arábia Saudita', 'Armênia', 'Azerbaijão', 'Bahrein', 'Bangladesh', 'Brunei', 'Butão', 'Camboja', 'Cazaquistão', 'China', 'Chipre', 'Coreia do Norte', 'Coreia do Sul', 'Egito', 'Emirados Árabes Unidos', 'Filipinas', 'Georgia', 'Iemen', 'Índia', 'Indonésia', 'Irão', 'Iraque', 'Israel', 'Japão', 'Jordânia', 'Kuwait', 'Laos', 'Líbano', 'Malásia', 'Maldivas', 'Mongólia', 'Myanmar', 'Nepal', 'Omã', 'Palestina', 'Paquistão', 'Qatar', 'Quirguistão', 'Rússia', 'Singapura', 'Síria', 'Sri Lanka', 'Tailândia', 'Tajiquistão', 'Timor Leste', 'Turquia', 'Uzbequistão', 'Vietnã', 'África do Sul', 'Angola', 'Argélia', 'Benim', 'Botsuana', 'Burkina Faso', 'Borundi', 'Cabo Verde', 'Camarões', 'Chade', 'Comores', 'Congo', 'Costa do Marfim', 'Egito', 'Eritreia', 'Etiópia', 'Gabão', 'Gâmbia', 'Gana', 'Guiné Bissau', 'Guiné Conacri', 'Guiné Equatorial', 'Ilhas Canárias', 'República do Djibouti', 'Lesoto', 'Libéria', 'Líbia', 'Madagascar', 'Malaui', 'Mali', 'Marrocos', 'Maurícia', 'Mauritania', 'Moçambique', 'Namíbia', 'Niger', 'Nigéria', 'Quênia', 'República Centro Africana', 'Reunião', 'Ruanda', 'São Tomé e Príncipe', 'Senegal', 'Serra Leoa', 'Somália', 'Suazilândia', 'Sudão', 'Sudão do Sul', 'Tanzânia', 'Togo', 'Tunísia', 'Uganda', 'Zâmbia', 'Zimbabue', 'Austrália', 'Estados Federados da Micronésia', 'Fiji', 'Ilhas Marshall', 'Ilhas Salomão', 'Kiribati', 'Nauru', 'Samoa', 'Nova Zelândia', 'Palau', 'Papua-Nova Guiné', 'Tonga', 'Tuvalu', 'Vanuatu']

		respostas=['Buenos Aires', 'La Paz', 'Brasília', 'Santiago', 'Bogotá', 'Quito', 'Georgetown', 'Assunção', 'Lima', 'Paramaribo', 'Montevidéu', 'Caracas', 'Caiena', 'São João', 'Nassau', 'Bridgetown', 'Belmopã', 'San José', 'Havana', 'Roseau', 'São Salvador', 'São Jorge', 'Cidade da Guatemala', 'Porto Príncipe', 'Tegucigalpa', 'Kingston', 'Manágua', 'Cidade do Panamá', 'San Juan', 'Santo Domingo', 'Castries', 'Basseterre', 'Kingstown', 'Porto da Espanha', 'Cidade do México', 'Washington DC', 'Ottawa', 'Nuuk', 'Tirana', 'Berlim', 'Andorra-a-Velha', 'Yerevan', 'Viena', 'Baku', 'Bruxelas', 'Minsk', 'Sarajevo', 'Sófia', 'Nursultan', 'Praga', 'Nicósia', 'Zagrebe', 'Copenhage', 'Bratislava', 'Liubliana', 'Madrid', 'Talín', 'Helsinque', 'Paris', 'Tiblissi', 'Atenas', 'Budapeste', 'Dublin', 'Reykjavik', 'Roma', 'Riga', 'Vaduz', 'Vilnius', 'Luxemburgo', 'Escópia', 'Valeta', 'Chisinau', 'Monaco-Ville', 'Podgorica', 'Oslo', 'Amsterdã', 'Varsóvia', 'Lisboa', 'Londres', 'Bucareste', 'Moscou', 'San Marino', 'Belgrado', 'Estocolmo', 'Berna', 'Ancara', 'Kiev', 'Vaticano', 'Kabul', 'Riad', 'Yerevan', 'Baku', 'Manama', 'Daca', 'Bandar Seri Begawan', 'Timbu', 'Phnom Penh', 'Nursultan', 'Pequim', 'Nicósia', 'Pyongyang', 'Seul', 'Cairo', 'Abu Dhabi', 'Manila', 'Tiblissi', 'Sanaã', 'Nova Delhi', 'Jacarta', 'Teerão', 'Bagdá', 'Jerusalém', 'Tóquio', 'Amã', 'Kuwait', 'Vienciana', 'Beirute', 'Kuala Lumpur', 'Malé', 'Ulan Bator', 'Naipidau', 'Katmandu', 'Mascate', 'Ramala e Jerusalém Oriental', 'Islamabade', 'Doha', 'Bishkek', 'Moscou', 'Área Central de Singapura', 'Damasco', 'Colombo e Sri Jayawardenapura Kote', 'Bangkok', 'Dushanbe', 'Díli', 'Ancara', 'Toshkent', 'Hanói', 'Pretória, Cidade do Cabo e Bloemfontein', 'Luanda', 'Algiers', 'Porto Novo', 'Gaborone', 'Uagadugu', 'Gitega', 'Praia', 'Yaoundé', 'Djamena', 'Moroni', 'Brazzaville', 'Yamussucro', 'Cairo', 'Asmara', 'Addis Ababa', 'Libreville', 'Banjul', 'Acra', 'Bissau', 'Conakri', 'Malabo', 'Las Palmas', 'Djibouti', 'Maseru', 'Monróvia', 'Trípoli', 'Antananarivo', 'Lilongwe', 'Bamako', 'Rabat', 'Porto Luís', 'Nouakchott', 'Maputo', 'Windhoek', 'Niamei', 'Abuja', 'Nairóbi', 'Bangui', 'Saint Denis', 'Kigali', 'São Tomé', 'Dacar', 'Freetown', 'Mogadíscio', 'Mebabane e Lobamba', 'Cartum', 'Juba', 'Dodoma', 'Lomé', 'Tunes', 'Kampala', 'Lusaka', 'Harare', 'Camberra', 'Palikir', 'Suva', 'Majuro', 'Honiara', 'Tarawa', 'Yaren', 'Wellington', 'Ngerulmud', 'Port Moresby', 'Apia', 'Noku\'alofa', 'Funafuti', 'Port Vila']	
	}else if(tipo=='capitais_paises_america'){
		perguntas=['Argentina', 'Bolívia', 'Brasil', 'Chile', 'Colômbia', 'Equador', 'Guiana', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela', 'Guiana Francesa', 'Antígua e Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Costa Rica', 'Cuba', 'Dominica', 'El Salvador', 'Granada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Nicarágua', 'Panamá', 'Puerto Rico', 'República Dominicana', 'Santa Lúcia', 'São Cristovão e Nevis', 'São Vicente e Granadinas', 'Trinidad e Tobago', 'México', 'Estados Unidos', 'Canadá', 'Groelândia'];
		imagens=["img/america_sul/argentina.jpg", "img/america_sul/bolivia.jpg", "img/america_sul/brasil.jpg", "img/america_sul/chile.jpg", "img/america_sul/colombia.jpg", "img/america_sul/equador.jpg", "img/america_sul/guiana.jpg", "img/america_sul/paraguai.jpg", "img/america_sul/peru.jpg", "img/america_sul/suriname.jpg", "img/america_sul/uruguai.jpg", "img/america_sul/venezuela.jpg", "img/america_sul/guiana_francesa.jpg", "img/america_central/antigua_e_barbuda.jpg", "img/america_central/bahamas.jpg", "img/america_central/barbados.jpg", "img/america_central/belize.jpg", "img/america_central/costa_rica.jpg", "img/america_central/cuba.jpg", "img/america_central/dominica.jpg", "img/america_central/el_salvador.jpg", "img/america_central/granada.jpg", "img/america_central/guatemala.jpg", "img/america_central/haiti.jpg", "img/america_central/honduras.jpg", "img/america_central/jamaica.jpg", "img/america_central/nicaragua.jpg", "img/america_central/panama.jpg", "img/america_central/puerto_rico.jpg", "img/america_central/republica_dominicana.jpg", "img/america_central/santa_lucia.jpg", "img/america_central/sao_cristovao_e_nevis.jpg", "img/america_central/sao_vicente_e_granadinas.jpg", "img/america_central/trinidad_e_tobago.jpg", "img/america_norte/mexico.jpg", "img/america_norte/estados_unidos.jpg", "img/america_norte/canada.jpg", "img/america_norte/groelandia.jpg"];
		respostas=['Buenos Aires', 'La Paz', 'Brasília', 'Santiago', 'Bogotá', 'Quito', 'Georgetown', 'Assunção', 'Lima', 'Paramaribo', 'Montevidéu', 'Caracas', 'Caiena', 'São João', 'Nassau', 'Bridgetown', 'Belmopã', 'San José', 'Havana', 'Roseau', 'São Salvador', 'São Jorge', 'Cidade da Guatemala', 'Porto Príncipe', 'Tegucigalpa', 'Kingston', 'Manágua', 'Cidade do Panamá', 'San Juan', 'Santo Domingo', 'Castries', 'Basseterre', 'Kingstown', 'Porto da Espanha', 'Cidade do México', 'Washington DC', 'Ottawa', 'Nuuk'];
	}else if(tipo=='capitais_paises_america_norte'){
		perguntas=['México', 'Estados Unidos', 'Canadá', 'Groelândia'];
		imagens=['mexico.jpg', 'estados_unidos.jpg', 'canada.jpg', 'groelandia.jpg'];
		for(let i=0; i<imagens.length; i++){
			imagens[i]='img/america_norte/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['Cidade do México', 'Washington DC', 'Ottawa', 'Nuuk'];
	}else if(tipo=='capitais_paises_america_central'){
		perguntas=['Antígua e Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Costa Rica', 'Cuba', 'Dominica', 'El Salvador', 'Granada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Nicarágua', 'Panamá', 'Puerto Rico', 'República Dominicana', 'Santa Lúcia', 'São Cristovão e Nevis', 'São Vicente e Granadinas', 'Trinidad e Tobago'];
		imagens=['antigua_e_barbuda.jpg', 'bahamas.jpg', 'barbados.jpg', 'belize.jpg', 'costa_rica.jpg', 'cuba.jpg', 'dominica.jpg', 'el_salvador.jpg', 'granada.jpg', 'guatemala.jpg', 'haiti.jpg', 'honduras.jpg', 'jamaica.jpg', 'nicaragua.jpg', 'panama.jpg', 'puerto_rico.jpg', 'republica_dominicana.jpg', 'santa_lucia.jpg', 'sao_cristovao_e_nevis.jpg', 'sao_vicente_e_granadinas.jpg', 'trinidad_e_tobago.jpg'];
		for(let i=0; i<imagens.length; i++){
			imagens[i]='img/america_central/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['São João', 'Nassau', 'Bridgetown', 'Belmopã', 'San José', 'Havana', 'Roseau', 'São Salvador', 'São Jorge', 'Cidade da Guatemala', 'Porto Príncipe', 'Tegucigalpa', 'Kingston', 'Manágua', 'Cidade do Panamá', 'San Juan', 'Santo Domingo', 'Castries', 'Basseterre', 'Kingstown', 'Porto da Espanha'];	
	}else if(tipo=='capitais_paises_america_sul'){
		perguntas=['Argentina', 'Bolívia', 'Brasil', 'Chile', 'Colômbia', 'Equador', 'Guiana', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela', 'Guiana Francesa'];
		imagens=['argentina.jpg', 'bolivia.jpg', 'brasil.jpg', 'chile.jpg', 'colombia.jpg', 'equador.jpg', 'guiana.jpg', 'paraguai.jpg', 'peru.jpg', 'suriname.jpg', 'uruguai.jpg', 'venezuela.jpg', 'guiana_francesa.jpg'];
		for(let i=0; i<imagens.length; i++){
			imagens[i]='img/america_sul/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['Buenos Aires', 'La Paz', 'Brasília', 'Santiago', 'Bogotá', 'Quito', 'Georgetown', 'Assunção', 'Lima', 'Paramaribo', 'Montevidéu', 'Caracas', 'Caiena'];
	}else if(tipo=='capitais_paises_africa'){
		perguntas=['África do Sul', 'Angola', 'Argélia', 'Benim', 'Botsuana', 'Burkina Faso', 'Borundi', 'Cabo Verde', 'Camarões', 'Chade', 'Comores', 'Congo', 'Costa do Marfim', 'Egito', 'Eritreia', 'Etiópia', 'Gabão', 'Gâmbia', 'Gana', 'Guiné Bissau', 'Guiné Conacri', 'Guiné Equatorial', 'Ilhas Canárias', 'República do Djibouti', 'Lesoto', 'Libéria', 'Líbia', 'Madagascar', 'Malaui', 'Mali', 'Marrocos', 'Maurícia', 'Mauritania', 'Moçambique', 'Namíbia', 'Niger', 'Nigéria', 'Quênia', 'República Centro Africana', 'Reunião', 'Ruanda', 'São Tomé e Príncipe', 'Senegal', 'Serra Leoa', 'Somália', 'Suazilândia', 'Sudão', 'Sudão do Sul', 'Tanzânia', 'Togo', 'Tunísia', 'Uganda', 'Zâmbia', 'Zimbabue'];
		respostas=['Pretória, Cidade do Cabo e Bloemfontein', 'Luanda', 'Algiers', 'Porto Novo', 'Gaborone', 'Uagadugu', 'Gitega', 'Praia', 'Yaoundé', 'Djamena', 'Moroni', 'Brazzaville', 'Yamussucro', 'Cairo', 'Asmara', 'Addis Ababa', 'Libreville', 'Banjul', 'Acra', 'Bissau', 'Conakri', 'Malabo', 'Las Palmas', 'Djibouti', 'Maseru', 'Monróvia', 'Trípoli', 'Antananarivo', 'Lilongwe', 'Bamako', 'Rabat', 'Porto Luís', 'Nouakchott', 'Maputo', 'Windhoek', 'Niamei', 'Abuja', 'Nairóbi', 'Bangui', 'Saint Denis', 'Kigali', 'São Tomé', 'Dacar', 'Freetown', 'Mogadíscio', 'Mebabane e Lobamba', 'Cartum', 'Juba', 'Dodoma', 'Lomé', 'Tunes', 'Kampala', 'Lusaka', 'Harare'];
		imagens=['africa_sul.jpg', 'angola.jpg', 'argelia.jpg', 'benim.jpg', 'botsuana.jpg', 'burkina_faso.jpg', 'borundi.jpg', 'cabo_verde.jpg', 'camaroes.jpg', 'chade.jpg', 'comores.jpg', 'congo.jpg', 'costa_do_marfim.jpg', 'egito.jpg', 'eritreia.jpg', 'etiopia.jpg', 'gabao.jpg', 'gambia.jpg', 'gana.jpg', 'guine_bissau.jpg', 'guine_conacri.jpg', 'guine_equatorial.jpg', 'ilhas_canarias.jpg', 'jibuti.jpg', 'lesoto.jpg', 'liberia.jpg', 'libia.jpg', 'madagascar.jpg', 'malawi.jpg', 'mali.jpg', 'marrocos.jpg', 'mauricia.jpg', 'mauritania.jpg', 'mocambique.jpg', 'namibia.jpg', 'niger.jpg', 'nigeria.jpg', 'quenia.jpg', 'republica_centro_africana.jpg', 'ruanda.jpg', 'sao_tome_e_principe.jpg', 'senegal.jpg', 'serra_leoa.jpg', 'somalia.jpg', 'suazilandia.jpg', 'sudao.jpg', 'sudao_do_sul', 'tanzania.jpg', 'togo.jpg', 'tunisia.jpg', 'uganda.jpg', 'zambia.jpg', 'zimbabue.jpg'];
		for(let i=0; i<imagens.length; i++){
			imagens[i]='img/africa/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
	}else if(tipo=='capitais_paises_europa'){
		perguntas=['Albânia', 'Alemanha', 'Andorra', 'Armênia', 'Áustria', 'Azerbaijão', 'Bélgica', 'Bielorússia', 'Bósnia', 'Bulgária', 'Cazaquistão', 'Tchéquia', 'Chipre', 'Croácia', 'Dinamarca', 'Eslováquia', 'Eslovênia', 'Espanha', 'Estônia', 'Finlândia', 'França', 'Georgia', 'Grécia', 'Hungria', 'Irlanda', 'Islândia', 'Itália', 'Letônia', 'Liechtenstein', 'Lituânia', 'Luxemburgo', 'Macedônia', 'Malta', 'Moldavia', 'Mônaco', 'Montenegro', 'Noruega', 'Países Baixos', 'Polônia', 'Portugal', 'Reino Unido', 'Romênia', 'Rússia', 'San Marino', 'Sérvia', 'Suécia', 'Suíça', 'Turquia', 'Ucrânia', 'Vaticano'];
		respostas=['Tirana', 'Berlim', 'Andorra-a-Velha', 'Yerevan', 'Viena', 'Baku', 'Bruxelas', 'Minsk', 'Sarajevo', 'Sófia', 'Nursultan', 'Praga', 'Nicósia', 'Zagrebe', 'Copenhage', 'Bratislava', 'Liubliana', 'Madrid', 'Talín', 'Helsinque', 'Paris', 'Tiblissi', 'Atenas', 'Budapeste', 'Dublin', 'Reykjavik', 'Roma', 'Riga', 'Vaduz', 'Vilnius', 'Luxemburgo', 'Escópia', 'Valeta', 'Chisinau', 'Monaco-Ville', 'Podgorica', 'Oslo', 'Amsterdã', 'Varsóvia', 'Lisboa', 'Londres', 'Bucareste', 'Moscou', 'San Marino', 'Belgrado', 'Estocolmo', 'Berna', 'Ancara', 'Kiev', 'Vaticano'];
		imagens=['albania.jpg', 'alemanha.jpg', 'andorra.jpg', 'armenia.jpg', 'austria.jpg', 'azerbaijao.jpg', 'belgica.jpg', 'bielorussia.jpg', 'bosnia.jpg', 'bulgaria.jpg', 'cazaquistao.jpg', 'chequia.jpg', 'chipre.jpg', 'croacia.jpg', 'dinamarca.jpg', 'eslovaquia.jpg', 'eslovenia.jpg', 'espanha.jpg', 'estonia.jpg', 'finlandia.jpg', 'franca.jpg', 'georgia.jpg', 'grecia.jpg', 'hungria.jpg', 'irlanda.jpg', 'islandia.jpg', 'italia.jpg', 'letonia.jpg', 'liechtenstein.jpg', 'lituania.jpg', 'luxemburgo.jpg', 'macedonia.jpg', 'malta.jpg', 'moldavia.jpg', 'monaco.jpg', 'montenegro.jpg', 'noruega.jpg', 'paises_baixos.jpg', 'polonia.jpg', 'portugal.jpg', 'reino_unido.jpg', 'romenia.jpg', 'russia.jpg', 'san_marino.jpg', 'servia.jpg', 'suecia.jpg', 'suica.jpg', 'turquia.jpg', 'ucrania.jpg', 'vaticano.jpg'];
		for(let i=0; i<imagens.length; i++){
			imagens[i]='img/europa/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
	}else if(tipo=='capitais_paises_asia'){
		perguntas=['Afeganistão', 'Arábia Saudita', 'Armênia', 'Azerbaijão', 'Bahrein', 'Bangladesh', 'Brunei', 'Butão', 'Camboja', 'Cazaquistão', 'China', 'Chipre', 'Coreia do Norte', 'Coreia do Sul', 'Egito', 'Emirados Árabes Unidos', 'Filipinas', 'Georgia', 'Iemen', 'Índia', 'Indonésia', 'Irão', 'Iraque', 'Israel', 'Japão', 'Jordânia', 'Kuwait', 'Laos', 'Líbano', 'Malásia', 'Maldivas', 'Mongólia', 'Myanmar', 'Nepal', 'Omã', 'Palestina', 'Paquistão', 'Qatar', 'Quirguistão', 'Rússia', 'Singapura', 'Síria', 'Sri Lanka', 'Tailândia', 'Tajiquistão', 'Timor Leste', 'Turquia', 'Uzbequistão', 'Vietnã'];
		respostas=['Kabul', 'Riad', 'Yerevan', 'Baku', 'Manama', 'Daca', 'Bandar Seri Begawan', 'Timbu', 'Phnom Penh', 'Nursultan', 'Pequim', 'Nicósia', 'Pyongyang', 'Seul', 'Cairo', 'Abu Dhabi', 'Manila', 'Tiblissi', 'Sanaã', 'Nova Delhi', 'Jacarta', 'Teerão', 'Bagdá', 'Jerusalém', 'Tóquio', 'Amã', 'Kuwait', 'Vienciana', 'Beirute', 'Kuala Lumpur', 'Malé', 'Ulan Bator', 'Naipidau', 'Katmandu', 'Mascate', 'Ramala e Jerusalém Oriental', 'Islamabade', 'Doha', 'Bishkek', 'Moscou', 'Área Central de Singapura', 'Damasco', 'Colombo e Sri Jayawardenapura Kote', 'Bangkok', 'Dushanbe', 'Díli', 'Ancara', 'Toshkent', 'Hanói'];
		imagens=['afeganistao.png', 'arabia_saudita.png', 'armenia.png', 'azerbaijao.png', 'bahrein.png', 'bangladesh.png', 'brunei.png', 'butao.png', 'camboja.png', 'cazaquistao.png', 'china.png', 'chipre.png', 'coreia_norte.png', 'coreia_sul.png', 'egito.png', 'emirados_arabes_unidos.png', 'filipinas.png', 'georgia.png', 'iemen.png', 'india.png', 'indonesia.png', 'irao.png', 'iraque.png', 'israel.png', 'japao.png', 'jordania.png', 'kuwait.png', 'laos.png', 'libano.png', 'malasia.png', 'maldivas.png', 'mongolia.png', 'myanmar.png', 'nepal.png', 'oma.png', 'israel.png', 'paquistao.png', 'catar.png', 'quirguistao.png', 'russia.png', 'singapura.png', 'siria.png', 'sri_lanka.png', 'tailandia.png', 'tajiquistao.png', 'timor.png', 'turquia.png', 'uzbequistao.png', 'vietna.png'];
		for(let i=0; i<imagens.length; i++){
			imagens[i]='img/asia/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
	}else if(tipo=='capitais_paises_oceania'){
		perguntas=['Austrália', 'Estados Federados da Micronésia', 'Fiji', 'Ilhas Marshall', 'Ilhas Salomão', 'Kiribati', 'Nauru', 'Samoa', 'Nova Zelândia', 'Palau', 'Papua-Nova Guiné', 'Tonga', 'Tuvalu', 'Vanuatu'];

		respostas=['Camberra', 'Palikir', 'Suva', 'Majuro', 'Honiara', 'Tarawa', 'Yaren', 'Wellington', 'Ngerulmud', 'Port Moresby', 'Apia', 'Noku\'alofa', 'Funafuti', 'Port Vila'];

		imagens=['australia.jpg', 'estados_federados_da_micronesia.jpg', 'fiji.jpg', 'ilhas_marshall.jpg', 'ilhas_salomao.jpg', 'kiribati.jpg', 'nauru.jpg', 'samoa.jpg', 'nova_zelandia.jpg', 'palau.jpg', 'papua_nova_guine.jpg', 'tonga.jpg', 'tuvalu.jpg', 'vanuatu.jpg'];
		for(let i=0; i<imagens.length; i++){
			imagens[i]='img/oceania/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));	
	}
	// BANDEIRAS MUNDO
	if(tipo=='bandeiras_paises_mundo'){
		imagens=["img/bandeiras/america_sul/argentina.png","img/bandeiras/america_sul/bolivia.png","img/bandeiras/america_sul/brasil.png","img/bandeiras/america_sul/chile.png","img/bandeiras/america_sul/colombia.png","img/bandeiras/america_sul/equador.png","img/bandeiras/america_sul/guiana.png","img/bandeiras/america_sul/paraguai.png","img/bandeiras/america_sul/peru.png","img/bandeiras/america_sul/suriname.png","img/bandeiras/america_sul/uruguai.png","img/bandeiras/america_sul/venezuela.png","img/bandeiras/america_sul/guiana_francesa.png", "img/bandeiras/america_central/antigua_e_barbuda.png","img/bandeiras/america_central/bahamas.png","img/bandeiras/america_central/barbados.png","img/bandeiras/america_central/belize.png","img/bandeiras/america_central/costa_rica.png","img/bandeiras/america_central/cuba.png","img/bandeiras/america_central/dominica.png","img/bandeiras/america_central/el_salvador.png","img/bandeiras/america_central/granada.png","img/bandeiras/america_central/guatemala.png","img/bandeiras/america_central/haiti.png","img/bandeiras/america_central/honduras.png","img/bandeiras/america_central/jamaica.png","img/bandeiras/america_central/nicaragua.png","img/bandeiras/america_central/panama.png","img/bandeiras/america_central/republica_dominicana.png","img/bandeiras/america_central/santa_lucia.png","img/bandeiras/america_central/sao_cristovao_e_nevis.png","img/bandeiras/america_central/sao_vicente_e_granadinas.png","img/bandeiras/america_central/trinidad_e_tobago.png", "img/bandeiras/america_norte/mexico.png","img/bandeiras/america_norte/estados_unidos.png","img/bandeiras/america_norte/canada.png","img/bandeiras/america_norte/groelandia.png", "img/bandeiras/europa/albania.png","img/bandeiras/europa/alemanha.png","img/bandeiras/europa/andorra.png","img/bandeiras/europa/armenia.png","img/bandeiras/europa/austria.png","img/bandeiras/europa/azerbaijao.png","img/bandeiras/europa/belgica.png","img/bandeiras/europa/bielorussia.png","img/bandeiras/europa/bosnia.png","img/bandeiras/europa/bulgaria.png","img/bandeiras/europa/cazaquistao.png","img/bandeiras/europa/chequia.png","img/bandeiras/europa/chipre.png","img/bandeiras/europa/croacia.png","img/bandeiras/europa/dinamarca.png","img/bandeiras/europa/eslovaquia.png","img/bandeiras/europa/eslovenia.png","img/bandeiras/europa/espanha.png","img/bandeiras/europa/estonia.png","img/bandeiras/europa/finlandia.png","img/bandeiras/europa/franca.png","img/bandeiras/europa/georgia.png","img/bandeiras/europa/grecia.png","img/bandeiras/europa/hungria.png","img/bandeiras/europa/irlanda.png","img/bandeiras/europa/islandia.png","img/bandeiras/europa/italia.png","img/bandeiras/europa/letonia.png","img/bandeiras/europa/liechtenstein.png","img/bandeiras/europa/lituania.png","img/bandeiras/europa/luxemburgo.png","img/bandeiras/europa/macedonia.png","img/bandeiras/europa/malta.png","img/bandeiras/europa/moldavia.png","img/bandeiras/europa/monaco.png","img/bandeiras/europa/montenegro.png","img/bandeiras/europa/noruega.png","img/bandeiras/europa/paises_baixos.png","img/bandeiras/europa/polonia.png","img/bandeiras/europa/portugal.png","img/bandeiras/europa/reino_unido.png","img/bandeiras/europa/romenia.png","img/bandeiras/europa/russia.png","img/bandeiras/europa/san_marino.png","img/bandeiras/europa/servia.png","img/bandeiras/europa/suecia.png","img/bandeiras/europa/suica.png","img/bandeiras/europa/turquia.png","img/bandeiras/europa/ucrania.png","img/bandeiras/europa/vaticano.png", "img/asia/afeganistao.png","img/asia/arabia_saudita.png","img/asia/armenia.png","img/asia/azerbaijao.png","img/asia/bahrein.png","img/asia/bangladesh.png","img/asia/brunei.png","img/asia/butao.png","img/asia/camboja.png","img/asia/cazaquistao.png","img/asia/china.png","img/asia/chipre.png","img/asia/coreia_norte.png","img/asia/coreia_sul.png","img/asia/egito.png","img/asia/emirados_arabes_unidos.png","img/asia/filipinas.png","img/asia/georgia.png","img/asia/iemen.png","img/asia/india.png","img/asia/indonesia.png","img/asia/irao.png","img/asia/iraque.png","img/asia/israel.png","img/asia/japao.png","img/asia/jordania.png","img/asia/kuwait.png","img/asia/laos.png","img/asia/libano.png","img/asia/malasia.png","img/asia/maldivas.png","img/asia/mongolia.png","img/asia/myanmar.png","img/asia/nepal.png","img/asia/oma.png","img/asia/israel.png","img/asia/paquistao.png","img/asia/catar.png","img/asia/quirguistao.png","img/asia/russia.png","img/asia/singapura.png","img/asia/siria.png","img/asia/sri_lanka.png","img/asia/tailandia.png","img/asia/tajiquistao.png","img/asia/timor.png","img/asia/turquia.png","img/asia/uzbequistao.png","img/asia/vietna.png", "img/bandeiras/africa/africa_sul.png","img/bandeiras/africa/angola.png","img/bandeiras/africa/argelia.png","img/bandeiras/africa/benim.png","img/bandeiras/africa/botsuana.png","img/bandeiras/africa/burkina_faso.png","img/bandeiras/africa/borundi.png","img/bandeiras/africa/cabo_verde.png","img/bandeiras/africa/camaroes.png","img/bandeiras/africa/chade.png","img/bandeiras/africa/comores.png","img/bandeiras/africa/congo.png","img/bandeiras/africa/costa_do_marfim.png","img/bandeiras/africa/egito.png","img/bandeiras/africa/eritreia.png","img/bandeiras/africa/etiopia.png","img/bandeiras/africa/gabao.png","img/bandeiras/africa/gambia.png","img/bandeiras/africa/gana.png","img/bandeiras/africa/guine_bissau.png","img/bandeiras/africa/guine_conacri.png","img/bandeiras/africa/guine_equatorial.png","img/bandeiras/africa/ilhas_canarias.png","img/bandeiras/africa/jibuti.png","img/bandeiras/africa/lesoto.png","img/bandeiras/africa/liberia.png","img/bandeiras/africa/libia.png","img/bandeiras/africa/madagascar.png","img/bandeiras/africa/malawi.png","img/bandeiras/africa/mali.png","img/bandeiras/africa/marrocos.png","img/bandeiras/africa/mauricia.png","img/bandeiras/africa/mauritania.png","img/bandeiras/africa/mocambique.png","img/bandeiras/africa/namibia.png","img/bandeiras/africa/niger.png","img/bandeiras/africa/nigeria.png","img/bandeiras/africa/quenia.png","img/bandeiras/africa/republica_centro_africana.png","img/bandeiras/africa/ruanda.png","img/bandeiras/africa/sao_tome_e_principe.png","img/bandeiras/africa/senegal.png","img/bandeiras/africa/serra_leoa.png","img/bandeiras/africa/somalia.png","img/bandeiras/africa/suazilandia.png","img/bandeiras/africa/sudao.png","img/bandeiras/africa/sudao_do_sul","img/bandeiras/africa/tanzania.png","img/bandeiras/africa/togo.png","img/bandeiras/africa/tunisia.png","img/bandeiras/africa/uganda.png","img/bandeiras/africa/zambia.png","img/bandeiras/africa/zimbabue.png", "img/bandeiras/oceania/australia.png","img/bandeiras/oceania/estados_federados_da_micronesia.png","img/bandeiras/oceania/fiji.png","img/bandeiras/oceania/ilhas_marshall.png","img/bandeiras/oceania/ilhas_salomao.png","img/bandeiras/oceania/kiribati.png","img/bandeiras/oceania/nauru.png","img/bandeiras/oceania/samoa.png","img/bandeiras/oceania/nova_zelandia.png","img/bandeiras/oceania/palau.png","img/bandeiras/oceania/papua_nova_guine.png","img/bandeiras/oceania/tonga.png","img/bandeiras/oceania/tuvalu.png","img/bandeiras/oceania/vanuatu.png"];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual país?');
		}
		respostas=['Argentina', 'Bolívia', 'Brasil', 'Chile', 'Colômbia', 'Equador', 'Guiana', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela', 'Guiana Francesa', 'Antígua e Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Costa Rica', 'Cuba', 'Dominica', 'El Salvador', 'Granada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Nicarágua', 'Panamá', 'Puerto Rico', 'República Dominicana', 'Santa Lúcia', 'São Cristovão e Nevis', 'São Vicente e Granadinas', 'Trinidad e Tobago', 'México', 'Estados Unidos', 'Canadá', 'Groelândia', 'Albânia', 'Alemanha', 'Andorra', 'Armênia', 'Áustria', 'Azerbaijão', 'Bélgica', 'Bielorússia', 'Bósnia', 'Bulgária', 'Cazaquistão', 'Tchéquia', 'Chipre', 'Croácia', 'Dinamarca', 'Eslováquia', 'Eslovênia', 'Espanha', 'Estônia', 'Finlândia', 'França', 'Georgia', 'Grécia', 'Hungria', 'Irlanda', 'Islândia', 'Itália', 'Letônia', 'Liechtenstein', 'Lituânia', 'Luxemburgo', 'Macedônia', 'Malta', 'Moldavia', 'Mônaco', 'Montenegro', 'Noruega', 'Países Baixos', 'Polônia', 'Portugal', 'Reino Unido', 'Romênia', 'Rússia', 'San Marino', 'Sérvia', 'Suécia', 'Suíça', 'Turquia', 'Ucrânia', 'Vaticano', 'Afeganistão', 'Arábia Saudita', 'Armênia', 'Azerbaijão', 'Bahrein', 'Bangladesh', 'Brunei', 'Butão', 'Camboja', 'Cazaquistão', 'China', 'Chipre', 'Coreia do Norte', 'Coreia do Sul', 'Egito', 'Emirados Árabes Unidos', 'Filipinas', 'Georgia', 'Iemen', 'Índia', 'Indonésia', 'Irão', 'Iraque', 'Israel', 'Japão', 'Jordânia', 'Kuwait', 'Laos', 'Líbano', 'Malásia', 'Maldivas', 'Mongólia', 'Myanmar', 'Nepal', 'Omã', 'Palestina', 'Paquistão', 'Qatar', 'Quirguistão', 'Rússia', 'Singapura', 'Síria', 'Sri Lanka', 'Tailândia', 'Tajiquistão', 'Timor Leste', 'Turquia', 'Uzbequistão', 'Vietnã', 'África do Sul', 'Angola', 'Argélia', 'Benim', 'Botsuana', 'Burkina Faso', 'Borundi', 'Cabo Verde', 'Camarões', 'Chade', 'Comores', 'Congo', 'Costa do Marfim', 'Egito', 'Eritreia', 'Etiópia', 'Gabão', 'Gâmbia', 'Gana', 'Guiné Bissau', 'Guiné Conacri', 'Guiné Equatorial', 'Ilhas Canárias', 'República do Djibouti', 'Lesoto', 'Libéria', 'Líbia', 'Madagascar', 'Malaui', 'Mali', 'Marrocos', 'Maurícia', 'Mauritania', 'Moçambique', 'Namíbia', 'Niger', 'Nigéria', 'Quênia', 'República Centro Africana', 'Reunião', 'Ruanda', 'São Tomé e Príncipe', 'Senegal', 'Serra Leoa', 'Somália', 'Suazilândia', 'Sudão', 'Sudão do Sul', 'Tanzânia', 'Togo', 'Tunísia', 'Uganda', 'Zâmbia', 'Zimbabue', 'Austrália', 'Estados Federados da Micronésia', 'Fiji', 'Ilhas Marshall', 'Ilhas Salomão', 'Kiribati', 'Nauru', 'Samoa', 'Nova Zelândia', 'Palau', 'Papua-Nova Guiné', 'Tonga', 'Tuvalu', 'Vanuatu'];
	}else if(tipo=='bandeiras_paises_america'){
		imagens=["img/bandeiras/america_sul/argentina.png","img/bandeiras/america_sul/bolivia.png","img/bandeiras/america_sul/brasil.png","img/bandeiras/america_sul/chile.png","img/bandeiras/america_sul/colombia.png","img/bandeiras/america_sul/equador.png","img/bandeiras/america_sul/guiana.png","img/bandeiras/america_sul/paraguai.png","img/bandeiras/america_sul/peru.png","img/bandeiras/america_sul/suriname.png","img/bandeiras/america_sul/uruguai.png","img/bandeiras/america_sul/venezuela.png","img/bandeiras/america_sul/guiana_francesa.png", "img/bandeiras/america_central/antigua_e_barbuda.png","img/bandeiras/america_central/bahamas.png","img/bandeiras/america_central/barbados.png","img/bandeiras/america_central/belize.png","img/bandeiras/america_central/costa_rica.png","img/bandeiras/america_central/cuba.png","img/bandeiras/america_central/dominica.png","img/bandeiras/america_central/el_salvador.png","img/bandeiras/america_central/granada.png","img/bandeiras/america_central/guatemala.png","img/bandeiras/america_central/haiti.png","img/bandeiras/america_central/honduras.png","img/bandeiras/america_central/jamaica.png","img/bandeiras/america_central/nicaragua.png","img/bandeiras/america_central/panama.png","img/bandeiras/america_central/republica_dominicana.png","img/bandeiras/america_central/santa_lucia.png","img/bandeiras/america_central/sao_cristovao_e_nevis.png","img/bandeiras/america_central/sao_vicente_e_granadinas.png","img/bandeiras/america_central/trinidad_e_tobago.png", "img/bandeiras/america_norte/mexico.png","img/bandeiras/america_norte/estados_unidos.png","img/bandeiras/america_norte/canada.png","img/bandeiras/america_norte/groelandia.png"];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual país?');
		}
		respostas=['Argentina', 'Bolívia', 'Brasil', 'Chile', 'Colômbia', 'Equador', 'Guiana', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela', 'Guiana Francesa', 'Antígua e Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Costa Rica', 'Cuba', 'Dominica', 'El Salvador', 'Granada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Nicarágua', 'Panamá', 'Puerto Rico', 'República Dominicana', 'Santa Lúcia', 'São Cristovão e Nevis', 'São Vicente e Granadinas', 'Trinidad e Tobago', 'México', 'Estados Unidos', 'Canadá', 'Groelândia'];
	}else if(tipo=='bandeiras_paises_america_norte'){
		imagens=['mexico.png', 'estados_unidos.png', 'canada.png', 'groelandia.png'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual país?');
			imagens[i]='img/bandeiras/america_norte/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['México', 'Estados Unidos', 'Canadá', 'Groelândia'];
	}else if(tipo=='bandeiras_paises_america_central'){
		imagens=['antigua_e_barbuda.png', 'bahamas.png', 'barbados.png', 'belize.png', 'costa_rica.png', 'cuba.png', 'dominica.png', 'el_salvador.png', 'granada.png', 'guatemala.png', 'haiti.png', 'honduras.png', 'jamaica.png', 'nicaragua.png', 'panama.png', 'republica_dominicana.png', 'santa_lucia.png', 'sao_cristovao_e_nevis.png', 'sao_vicente_e_granadinas.png', 'trinidad_e_tobago.png'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual país?');
			imagens[i]='img/bandeiras/america_central/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['Antígua e Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Costa Rica', 'Cuba', 'Dominica', 'El Salvador', 'Granada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Nicarágua', 'Panamá', 'Puerto Rico', 'República Dominicana', 'Santa Lúcia', 'São Cristovão e Nevis', 'São Vicente e Granadinas', 'Trinidad e Tobago'];
	}else if(tipo=='bandeiras_paises_america_sul'){
		imagens=['argentina.png', 'bolivia.png', 'brasil.png', 'chile.png', 'colombia.png', 'equador.png', 'guiana.png', 'paraguai.png', 'peru.png', 'suriname.png', 'uruguai.png', 'venezuela.png', 'guiana_francesa.png'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual país?');
			imagens[i]='img/bandeiras/america_sul/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['Argentina', 'Bolívia', 'Brasil', 'Chile', 'Colômbia', 'Equador', 'Guiana', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela', 'Guiana Francesa'];
	}else if(tipo=='bandeiras_paises_america'){

	}else if(tipo=='bandeiras_paises_africa'){
		imagens=['africa_sul.png', 'angola.png', 'argelia.png', 'benim.png', 'botsuana.png', 'burkina_faso.png', 'borundi.png', 'cabo_verde.png', 'camaroes.png', 'chade.png', 'comores.png', 'congo.png', 'costa_do_marfim.png', 'egito.png', 'eritreia.png', 'etiopia.png', 'gabao.png', 'gambia.png', 'gana.png', 'guine_bissau.png', 'guine_conacri.png', 'guine_equatorial.png', 'ilhas_canarias.png', 'jibuti.png', 'lesoto.png', 'liberia.png', 'libia.png', 'madagascar.png', 'malawi.png', 'mali.png', 'marrocos.png', 'mauricia.png', 'mauritania.png', 'mocambique.png', 'namibia.png', 'niger.png', 'nigeria.png', 'quenia.png', 'republica_centro_africana.png', 'ruanda.png', 'sao_tome_e_principe.png', 'senegal.png', 'serra_leoa.png', 'somalia.png', 'suazilandia.png', 'sudao.png', 'sudao_do_sul', 'tanzania.png', 'togo.png', 'tunisia.png', 'uganda.png', 'zambia.png', 'zimbabue.png'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual país?');
			imagens[i]='img/bandeiras/africa/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['África do Sul', 'Angola', 'Argélia', 'Benim', 'Botsuana', 'Burkina Faso', 'Borundi', 'Cabo Verde', 'Camarões', 'Chade', 'Comores', 'Congo', 'Costa do Marfim', 'Egito', 'Eritreia', 'Etiópia', 'Gabão', 'Gâmbia', 'Gana', 'Guiné Bissau', 'Guiné Conacri', 'Guiné Equatorial', 'Ilhas Canárias', 'República do Djibouti', 'Lesoto', 'Libéria', 'Líbia', 'Madagascar', 'Malaui', 'Mali', 'Marrocos', 'Maurícia', 'Mauritania', 'Moçambique', 'Namíbia', 'Niger', 'Nigéria', 'Quênia', 'República Centro Africana', 'Reunião', 'Ruanda', 'São Tomé e Príncipe', 'Senegal', 'Serra Leoa', 'Somália', 'Suazilândia', 'Sudão', 'Sudão do Sul', 'Tanzânia', 'Togo', 'Tunísia', 'Uganda', 'Zâmbia', 'Zimbabue'];
	}else if(tipo=='bandeiras_paises_europa'){
		imagens=['albania.png', 'alemanha.png', 'andorra.png', 'armenia.png', 'austria.png', 'azerbaijao.png', 'belgica.png', 'bielorussia.png', 'bosnia.png', 'bulgaria.png', 'cazaquistao.png', 'chequia.png', 'chipre.png', 'croacia.png', 'dinamarca.png', 'eslovaquia.png', 'eslovenia.png', 'espanha.png', 'estonia.png', 'finlandia.png', 'franca.png', 'georgia.png', 'grecia.png', 'hungria.png', 'irlanda.png', 'islandia.png', 'italia.png', 'letonia.png', 'liechtenstein.png', 'lituania.png', 'luxemburgo.png', 'macedonia.png', 'malta.png', 'moldavia.png', 'monaco.png', 'montenegro.png', 'noruega.png', 'paises_baixos.png', 'polonia.png', 'portugal.png', 'reino_unido.png', 'romenia.png', 'russia.png', 'san_marino.png', 'servia.png', 'suecia.png', 'suica.png', 'turquia.png', 'ucrania.png', 'vaticano.png'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual país?');
			imagens[i]='img/bandeiras/europa/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['Albânia', 'Alemanha', 'Andorra', 'Armênia', 'Áustria', 'Azerbaijão', 'Bélgica', 'Bielorússia', 'Bósnia', 'Bulgária', 'Cazaquistão', 'Tchéquia', 'Chipre', 'Croácia', 'Dinamarca', 'Eslováquia', 'Eslovênia', 'Espanha', 'Estônia', 'Finlândia', 'França', 'Georgia', 'Grécia', 'Hungria', 'Irlanda', 'Islândia', 'Itália', 'Letônia', 'Liechtenstein', 'Lituânia', 'Luxemburgo', 'Macedônia', 'Malta', 'Moldavia', 'Mônaco', 'Montenegro', 'Noruega', 'Países Baixos', 'Polônia', 'Portugal', 'Reino Unido', 'Romênia', 'Rússia', 'San Marino', 'Sérvia', 'Suécia', 'Suíça', 'Turquia', 'Ucrânia', 'Vaticano'];
	}else if(tipo=='bandeiras_paises_asia'){
		imagens=['afeganistao.png', 'arabia_saudita.png', 'armenia.png', 'azerbaijao.png', 'bahrein.png', 'bangladesh.png', 'brunei.png', 'butao.png', 'camboja.png', 'cazaquistao.png', 'china.png', 'chipre.png', 'coreia_do_norte.png', 'coreia_do_sul.png', 'egito.png', 'emirados_arabes_unidos.png', 'filipinas.png', 'georgia.png', 'iemen.png', 'india.png', 'indonesia.png', 'irao.png', 'iraque.png', 'israel.png', 'japao.png', 'jordania.png', 'kuwait.png', 'laos.png', 'libano.png', 'malasia.png', 'maldivas.png', 'mongolia.png', 'myanmar.png', 'nepal.png', 'oma.png', 'palestina.png', 'paquistao.png', 'qatar.png', 'quirguistao.png', 'russia.png', 'singapura.png', 'siria.png', 'sri_lanka.png', 'tailandia.png', 'tajiquistao.png', 'timor_leste.png', 'turquia.png', 'uzbequistao.png', 'vietna.png'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual país?');
			imagens[i]='img/bandeiras/asia/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['Afeganistão', 'Arábia Saudita', 'Armênia', 'Azerbaijão', 'Bahrein', 'Bangladesh', 'Brunei', 'Butão', 'Camboja', 'Cazaquistão', 'China', 'Chipre', 'Coreia do Norte', 'Coreia do Sul', 'Egito', 'Emirados Árabes Unidos', 'Filipinas', 'Georgia', 'Iemen', 'Índia', 'Indonésia', 'Irão', 'Iraque', 'Israel', 'Japão', 'Jordânia', 'Kuwait', 'Laos', 'Líbano', 'Malásia', 'Maldivas', 'Mongólia', 'Myanmar', 'Nepal', 'Omã', 'Palestina', 'Paquistão', 'Qatar', 'Quirguistão', 'Rússia', 'Singapura', 'Síria', 'Sri Lanka', 'Tailândia', 'Tajiquistão', 'Timor Leste', 'Turquia', 'Uzbequistão', 'Vietnã'];
	}else if(tipo=='bandeiras_paises_oceania'){
		imagens=['australia.png', 'estados_federados_da_micronesia.png', 'fiji.png', 'ilhas_marshall.png', 'ilhas_salomao.png', 'kiribati.png', 'nauru.png', 'samoa.png', 'nova_zelandia.png', 'palau.png', 'papua_nova_guine.png', 'tonga.png', 'tuvalu.png', 'vanuatu.png'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual país?');
			imagens[i]='img/bandeiras/oceania/'+imagens[i];
		}
		console.log(JSON.stringify(imagens));
		respostas=['Austrália', 'Estados Federados da Micronésia', 'Fiji', 'Ilhas Marshall', 'Ilhas Salomão', 'Kiribati', 'Nauru', 'Samoa', 'Nova Zelândia', 'Palau', 'Papua-Nova Guiné', 'Tonga', 'Tuvalu', 'Vanuatu'];
	}

	if(tipo=='rosa_ventos'){
		respostas=['Les Nordeste', 'Les Sudeste', 'Leste', 'Nor Nordeste', 'Nor Noroeste', 'Nordeste', 'Noroeste', 'Norte', 'Oes Noroeste', 'Oes Sudoeste', 'Oeste', 'Su Sudeste', 'Su Sudoeste', 'Sudeste', 'Sudoeste', 'Sul'];
		imagens=['les_nordeste.png', 'les_sudeste.png', 'leste.png', 'nor_nordeste.png', 'nor_noroeste.png', 'nordeste.png', 'noroeste.png', 'norte.png', 'oes_noroeste.png', 'oes_sudoeste.png', 'oeste.png', 'su_sudeste.png', 'su_sudoeste.png', 'sudeste.png', 'sudoeste.png', 'sul.png'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual o nome?');
			imagens[i]='img/rosa_ventos/'+imagens[i];
		}
	}

	if(tipo=='oceanos_mares_golfos'){
		imagens=['golfo_austral.jpg', 'golfo_bengala.png', 'golfo_botnia.jpg', 'golfo_finlandia.jpg', 'golfo_de_carpentaria.jpg', 'golfo_de_sidra.png', 'golfo_leao.jpg', 'golfo_mexico.jpg', 'golfo_oma_2.png', 'golfo_persico_2.png', 'golfo_riga.jpg', 'mar_adriatico.jpg', 'mar_baltico.jpg', 'mar_caribe_ou_antilhas.jpg', 'mar_caspio.jpg', 'mar_de_arafura.jpg', 'mar_de_coral.jpg', 'mar_jonico.jpg', 'mar_mediterraneo.jpg', 'mar_negro_2.png', 'mar_nova_zelandia.jpg', 'mar_tirreno.jpg', 'mar_vermelho.jpg', 'oceano_antartico.jpg', 'oceano_atlantico.jpg', 'oceano_glacial_artico.jpg', 'oceano_indico.jpg', 'oceano_pacifico.jpg'];
		respostas=['Golfo Austral', 'Golfo Bengala', 'Golfo Botnia', 'Golfo da Finlândia', 'GOlfo de Carpentaria', 'Golfo de Sidra', 'Golfo Leão', 'Golfo do México', 'Golfo Omã', 'Golfo Pérsico', 'Golfo Riga', 'Mar Adriático', 'Mar Báltico', 'Mar do Caribe ou Antilhas', 'Mar Cáspio', 'Mar de Arafura', 'Mar de Coral', 'Mar Jônico', 'Mar Mediterrâneo', 'Mar Negro', 'Mar da Nova Zelândia', 'Mar Tirreno', 'Mar Vermelho', 'Oceano Antártico', 'Oceano Atlântico', 'Oceano Glacial Ártico', 'Oceano Índico', 'Oceano Pacífico'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual o nome?');
			imagens[i]='img/oceanos_mares_golfos/'+imagens[i];
		}
	}

	if(tipo=='ilhas_peninsulas'){
		imagens=['gra_bretanha.png', 'groelandia.jpg', 'honshu.png', 'ilha_de_baffin.jpg', 'ilha_de_nova_guine.jpg', 'ilha_de_vitoria.jpg', 'ilha_ellesmere.jpg', 'java.png', 'madagascar.jpg', 'peninsula_arabica.jpg', 'peninsula_balcanica.jpg', 'peninsula_de_kamchatka.jpg', 'peninsula_iberica.jpg', 'peninsula_italica.jpg', 'peninsula_jutlandia.jpg', 'subcontinente_indiano.jpg', 'sumatra.png'];
		respostas=['Grã Bretanha', 'Groelândia', 'Ilha Honshu', 'Ilha de Baffin', 'Ilha de Nova Guiné', 'Ilha de Vitória', 'Ilha Ellesmere', 'Java', 'Madagascar', 'Península Arábica', 'Península Balcânica', 'Península de Kamchatka', 'Península Ibérica', 'Península Itálica', 'Península Jutlândia', 'Subcontinente Indiano', 'Sumatra'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual o nome?');
			imagens[i]='img/ilhas_peninsulas/'+imagens[i];
		}
	}

	if(tipo=='regioes_continentes'){
		imagens=['africa_central.png', 'africa_meridional.png', 'africa_ocidental.png', 'africa_oriental.png', 'africa_setentrional.png', 'asia_meridional.png', 'asia_setentrional.png', 'europa_meridional.png', 'europa_ocidental.png', 'europa_setentrional.png', 'extremo_oriente.png', 'indonesia.jpg', 'leste_europeu.png', 'melanesia.jpg', 'micronesia.jpg', 'oriente_medio.png', 'polinesia.jpg', 'regiao_indonesia.jpg', 'sudeste_asiatico.png'];
		respostas=['África Central', 'África Meridional', 'África Ocidental', 'África Oriental', 'África Setentrional', 'Ásia Meridional', 'Ásia Setentrional', 'Europa Meridional', 'Europa Ocidental', 'Europa Setentrional', 'Extremo Oriente', 'Indonésia', 'Leste Europeu', 'Melanésia', 'Micronésia', 'Oriente Médio', 'Polinésia', 'Região Indonésia', 'Sudeste Asiático'];
			perguntas=[];
			for(let i=0; i<imagens.length; i++){
				perguntas.push('Qual o nome?');
				imagens[i]='img/regioes_continentes/'+imagens[i];
			}
	}

	if(tipo=='paises_africa'){
		respostas=['África do Sul', 'Angola', 'Argélia', 'Benim', 'Botsuana', 'Burkina Faso', 'Borundi', 'Cabo Verde', 'Camarões', 'Chade', 'Comores', 'Congo', 'Costa do Marfim', 'Egito', 'Eritreia', 'Etiópia', 'Gabão', 'Gâmbia', 'Gana', 'Guiné Bissau', 'Guiné Conacri', 'Guiné Equatorial', 'Ilhas Canárias', 'Jibuti', 'Lesoto', 'Libéria', 'Líbia', 'Madagascar', 'Malaui', 'Mali', 'Marrocos', 'Maurícia', 'Mauritania', 'Moçambique', 'Namíbia', 'Niger', 'Nigéria', 'Quênia', 'República Centro Africana', 'Reunião', 'Ruanda', 'São Tomé e Príncipe', 'Senegal', 'Serra Leoa', 'Somália', 'Suazilândia', 'Sudão', 'Sudão do Sul', 'Tanzânia', 'Togo', 'Tunísia', 'Uganda', 'Zâmbia', 'Zimbabue'];
		imagens=['africa_sul.jpg', 'angola.jpg', 'argelia.jpg', 'benim.jpg', 'botsuana.jpg', 'burkina_faso.jpg', 'borundi.jpg', 'cabo_verde.jpg', 'camaroes.jpg', 'chade.jpg', 'comores.jpg', 'congo.jpg', 'costa_do_marfim.jpg', 'egito.jpg', 'eritreia.jpg', 'etiopia.jpg', 'gabao.jpg', 'gambia.jpg', 'gana.jpg', 'guine_bissau.jpg', 'guine_conacri.jpg', 'guine_equatorial.jpg', 'ilhas_canarias.jpg', 'jibuti.jpg', 'lesoto.jpg', 'liberia.jpg', 'libia.jpg', 'madagascar.jpg', 'malawi.jpg', 'mali.jpg', 'marrocos.jpg', 'mauricia.jpg', 'mauritania.jpg', 'mocambique.jpg', 'namibia.jpg', 'niger.jpg', 'nigeria.jpg', 'quenia.jpg', 'republica_centro_africana.jpg', 'ruanda.jpg', 'sao_tome_e_principe.jpg', 'senegal.jpg', 'serra_leoa.jpg', 'somalia.jpg', 'suazilandia.jpg', 'sudao.jpg', 'sudao_do_sul.jpg', 'tanzania.jpg', 'togo.jpg', 'tunisia.jpg', 'uganda.jpg', 'zambia.jpg', 'zimbabue.jpg'];
		perguntas=[];
		for(let i=0; i<imagens.length; i++){
			perguntas.push('Qual o nome?');
			imagens[i]='img/africa/'+imagens[i];
		}
	}
}

// CHAMADAS DE FUNÇÕES
$('#btn_jogar').click(function(){
	verifica_tipo_quiz();
	pergunta_resposta=aleatorio(0, perguntas.length-1);
	gera_alternativas();
	let x=perguntas[pergunta_resposta];
	$('#pergunta').text(x);
	$('#imagem').attr('src', `${imagens[pergunta_resposta]}`);
	$('#bg_inicio').hide();
	tempo=Math.floor(parseFloat($('#tempo_desejado').val()))*60;
	$('#tempo').text(escreve_tempo(tempo));
	posiciona_laser();
	atualiza();
	temporizador();
});
// ***

function gera_alternativas(){
	let alts=$('.alt');
	let posicao_resposta=aleatorio(0, alts.length-1);
	for(let i=0; i<alts.length; i++){
		if(i==posicao_resposta){
			$(alts[i]).children('.valor').text(respostas[pergunta_resposta]);
		}else{
			$(alts[i]).children('.valor').text(respostas[aleatorio(0, respostas.length-1)]);
		}
	}
}

function game_over(){
	parar=true;
	// gc.sendScore(pontuacao);
	$('#pontuacao_obtida').text(pontuacao);
	$('#bg_fim').show();
}

$('#btn_jogar_novamente').click(() => {
	window.location.reload();
});

// *************************************************
// LOOP PRINCIPAL
// *************************************************
function atualiza(){
	verifica_acoes_nave();
	gera_obstaculos(4);
	move_obstaculos();
	limite_espaco_nave();
	limite_espaco_obstaculos();
	let intervalo_func=setTimeout(atualiza,tempo_atualizacao);
	if (parar){
		clearTimeout(intervalo_func);
	}
	$('#pontuacao').text(pontuacao);
}
// *************************************************

function verifica_resposta(){
	let resposta='';
	let alts=$('.alt');
	for(let i=0; i<alts.length; i++){
		resposta+=$(alts[i]).children('.valor').text();
	}
	if(resposta==respostas[pergunta_resposta]){
		toast('Parabéns, você acertou! +10 pontos!', 'purple', 2500);
		pontuacao+=10;
		gc.sendScore(pontuacao);
		pergunta_resposta=aleatorio(0, perguntas.length-1);
		let x=perguntas[pergunta_resposta];
		$('#pergunta').text(x);
		$('#imagem').attr('src', `${imagens[pergunta_resposta]}`);
	}
}

function aleatorio(min, max) {
	// Gera um número aleatório entre o mínimo e o máximo, estando eles inclusos
	 min = Math.ceil(min);
	 max = Math.floor(max);
	 return Math.floor(Math.random()*(max-min+1))+min;
}

function gera_obstaculos(qtde){
	function define_tipos(t, obj){
		switch(t){
			case 1:
			case 2:
			case 3:
				$(obj).addClass('amigo').css('background-image', 'url("img/planeta_generico.gif")');
				break;
			case 4:
			case 5:
				$(obj).addClass('amigo').css('background-image', 'url("img/planeta_roxo.gif")');
				break;
			case 6:
				$(obj).addClass('amigo').css('background-image', 'url("img/sol.gif")');
				break;
			case 7:
			case 8:
			case 9:
			case 10:
				$(obj).addClass('inimigo').css('background-image', 'url("img/alien.gif")');
				break;
		}
		return obj;
	}
	let width_obs = $('#obstaculos').width();
	let height_obs = $('#obstaculos').height();
	if($('#obstaculos').children().length==0){
		// TIPO A: VEM DA ESQUERDA
		for(let i=0; i<qtde; i++){
			let x=aleatorio(0, width_obs);
			let y=aleatorio(90, height_obs-100);
			let _obstaculo = $('<div class="obs obs_a"></div>').css('bottom', `${y}px`).css('left', `${x}px`);
			let tipo=aleatorio(1, 10);
			_obstaculo=define_tipos(tipo, _obstaculo);
			$('#obstaculos').append(_obstaculo);
		}
		// TIPO B: VEM DA DIREITA
		for(let i=0; i<qtde; i++){
			let x=aleatorio(0, width_obs);
			let y=aleatorio(90, height_obs-100);
			let _obstaculo = $('<div class="obs obs_b"></div>').css('bottom', `${y}px`).css('left', `${x}px`);
			let tipo=aleatorio(1, 10);
			_obstaculo=define_tipos(tipo, _obstaculo);
			$('#obstaculos').append(_obstaculo);
			$('#obstaculos').append(_obstaculo);
		}

	}
}

function move_obstaculos(){
	$('.obs_a').css('left', `-=${salto_obs}%`);
	$('.obs_b').css('left', `+=${salto_obs}%`);		
}

function limite_espaco_obstaculos(){
	let left_espaco = $('#espaco').offset().left;
	let width_espaco = $('#espaco').width();
	let _obstaculos = $('.obs');
	for(let i=0; i<_obstaculos.length; i++){
		let left_obs = $(_obstaculos[i]).offset().left;
		let width_obs = $(_obstaculos[i]).width();
		if(left_obs<width_obs||left_obs>width_espaco-width_obs){
			$(_obstaculos[i]).remove();
		}
	}
}

function verifica_acoes_nave(){
	// AÇÕES DA NAVE
	let c=0;
	if(acoes_nave['moveu_direita']){
		$('#nave').css('background-image', `url('img/nave_direita.png')`);
		$('#nave').css('left', `+=${salto_nave}%`);
	}
	if(acoes_nave['moveu_esquerda']){
		$('#nave').css('background-image', `url('img/nave_esquerda.png')`);
		$('#nave').css('left', `-=${salto_nave}%`);
	}
	if(!acoes_nave['moveu_direita']&&!acoes_nave['moveu_esquerda']){
		$('#nave').css('background-image', `url('img/nave.png')`);
	}
	if(acoes_nave['atirou']){
		if (acoes_nave['atirou']){
			acoes_nave['atirou']=false;
			atira();
			clicou_nave=false;
		}
	}else{
		// Dado que a nave não atirou, isso significa que o laser deve estar dentro dela. Portanto, deve ser posicionado.
		posiciona_laser();
	}
	// ***
}

function limite_espaco_nave() {
	// Esta função serve para evitar a nave de sair do espaço delimitado. Quando ele atinge o limite à direta, por exemplo, ela surge no início da esquerda.
	let top_espaco = $('#espaco').offset().top;
	let left_espaco = $('#espaco').offset().left;
	let height_espaco = $('#espaco').height();
	let width_espaco = $('#espaco').width();
	let top_nave = $('#nave').offset().top;
	let left_nave = $('#nave').offset().left;
	let height_nave = $('#nave').height();
	let width_nave = $('#nave').width();
	// direita
	if (left_nave > width_espaco - width_nave) {
		$('#nave').css('left', `${0}px`);
	}
	// esquerda
	if (left_nave < left_espaco) {
		$('#nave').css('left', `${width_espaco - width_nave - 5}px`);
	}

	// TODA VEZ QUE A NAVE E O BLOCO DE INFORMAÇÕES SE ENCONTRAM, O BLOCO MUDA DE LUGAR
	let left_informacoes = $('#informacoes').offset().left;
	let width_informacoes = $('#informacoes').width();
	if(left_nave>=left_informacoes-width_nave){
		$('#informacoes').css('left', '5%');
	}
	if(left_nave<width_informacoes+50){
		$('#informacoes').css('left', '75%');
	}
}

// CENTRO DE AÇÕES
$('body').keydown(function(event) {
	let tecla = event.keyCode;
	if(tecla == 39 || tecla == 68) {
		 // seta pra DIREITA ou D
		 acoes_nave['moveu_direita']=true;
	}
	if(tecla == 37 || tecla == 65) {
		 // seta pra ESQUERDA ou A
		 acoes_nave['moveu_esquerda']=true;
	}
	if (tecla == 32) {
		// espaço
		// tiros_dados++;
		acoes_nave['atirou']=true;
	}
});
$('body').keyup(function(event) {
	let tecla = event.keyCode;
	if(tecla == 39 || tecla == 68) {
		 // seta pra DIREITA ou D
		 acoes_nave['moveu_direita']=false;
	}
	if(tecla == 37 || tecla == 65) {
		 // seta pra ESQUERDA ou A
		 acoes_nave['moveu_esquerda']=false;
	}
	if (tecla == 32) {
		// espaço
		// tiros_dados++;
		acoes_nave['atirou']=false;
	}
});
// ***

// CONTROLE DA NAVE VIA CLIQUE
let clicou_nave=false;
$('#nave').click(function(){
	clicou_nave=true;
	acoes_nave['atirou']=true;
});
let mouse;
window.addEventListener('mousemove', function(e){
	let x = {
	    'x_page': e.pageX,
	    'y_page': e.pageY,
	    'x_client': e.clientX,
	    'y_client': e.clientY
	};
    mouse = x;
});
$('#espaco').click(function(e){
	if(!clicou_nave && !parar){
		$('#nave').animate({
			'left':`${mouse['x_client']}px`
		}, 1000);
		clicou_nave=false;
	}
});
// ***

// FUNÇÃO DE TIRO
function atira(){
	$('#laser').show();
	$('#laser').css('margin-top', `-=${salto_laser}%`);

	// VERIFICA COLISÃO DO LASER COM OBSTÁCULOS
	let colidiu_obs=verifica_colisao('#laser', '.obs');
	if(colidiu_obs[0]){
		if($(colidiu_obs[1]).hasClass('inimigo')){
			pontuacao++;
			gc.sendScore(pontuacao);
			toast('+1 ponto!', 'green');
		}else{
			pontuacao--;
			gc.sendScore(pontuacao);
			toast('-1 ponto!', 'brown');
		}
		$(colidiu_obs[1]).remove();
	}
	// VERIFICA COLISÃO DO LASER COM ALTERNATIVAS
	let colidiu_alt=verifica_colisao('#laser', '.alt');
	if(!colidiu_obs[0]){
		if(colidiu_alt[0]){
			// VERIFICA A RESPOSTA JÁ NA COLISÃO
			if($(colidiu_alt[1]).children('.valor').text()==respostas[pergunta_resposta]){
				toast('Parabéns, você acertou! +10 pontos!', 'purple', 1000);
				pontuacao+=10;
				gc.sendScore(pontuacao);
				pergunta_resposta=aleatorio(0, perguntas.length-1);
				let x=perguntas[pergunta_resposta];
				$('#pergunta').text(x);
				$('#imagem').attr('src', `${imagens[pergunta_resposta]}`);
				gera_alternativas();
			}else{
				pontuacao-=1;
				gc.sendScore(pontuacao);
				toast('Opa, você errou! -1 ponto!', 'brown', 1000);
			}
		}
	}

	let tiro = window.requestAnimationFrame(atira);
	if ($('#laser').offset().top <= 0) {
		window.cancelAnimationFrame(tiro);
		$('#laser').css('margin-top', '0px');
		$('#laser').hide();
	}
}

// DADO QUE O LASER É SEPARADO DO INTERIOR DA NAVE, NO HTML, É PRECISO POSICIONÁ-LO
function posiciona_laser(){
	let top_nave = $('#nave').offset().top;
	let left_nave = $('#nave').offset().left + 5;
	$('#laser').css('top', `${top_nave}px`);
	$('#laser').css('left', `${left_nave}px`);
}

function verifica_colisao(e1, e2){
	// DIMENSÕES E POSIÇÃO DO ELEMENTO 1
	let top_e1 = $(e1).offset().top;
	let left_e1 = $(e1).offset().left;
	let height_e1 = $(e1).height();
	let width_e1 = $(e1).width();
	// DIMENSÕES E POSIÇÃO DO ELEMENTO 2
	let _e2 = $(e2);
	for(let i=0; i<_e2.length; i++){
		let top_e2 = $(_e2[i]).offset().top;
		let left_e2 = $(_e2[i]).offset().left;
		let height_e2 = $(_e2[i]).height();
		let width_e2 = $(_e2[i]).width();
		// VERIFICAÇÃO
		if(left_e1>=left_e2){
			if(left_e1<left_e2+width_e2){
				if(top_e1<top_e2+height_e2){
					$('#laser').css('margin-top', '0px');
					$('#laser').hide();
					return [true, _e2[i]];										
				}
			}
		}
	}
	return false;
}

// TOAST
function toast(texto, bg, tempo=1100) {
	$('#toast').css('background', bg);
	$('#toast').text(texto);
	$('#toast').fadeIn('300');
	setTimeout(function() {
		$('#toast').fadeOut('1000');
	}, tempo);
}
// ***

// TEMPORIZADOR
function temporizador() {
    if(parar){
    	clearTimeout(t);
    }
	let t = setTimeout(function() {
	  	if(tempo > 0){
	  		$('#tempo').text(escreve_tempo(tempo--));
	  	}else{
	  		$('#tempo').text(escreve_tempo(tempo--));
	  		game_over();
	  	}
	    if(tempo >= 0) {
	      temporizador();
	    }
  	}, 1000);
}

function escreve_tempo(tempo) {
	let min = tempo / 60;
	if (min >= 1) {
		min = Math.floor(min);
	} else {
		min = 0;
	}
	let seg = tempo - (min * 60);
	if (seg < 10) {
		seg = '0' + seg;
	}
	return `${min}:${seg}`;
}
// ***