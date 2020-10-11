function aleatorio(min, max) {
	// Gera um número aleatório entre o mínimo e o máximo, estando eles inclusos
	 min = Math.ceil(min);
	 max = Math.floor(max);
	 return Math.floor(Math.random()*(max-min+1))+min;
}

function em_string(string, palavra){
	string=string.split('');
	palavra=palavra.split('');
	let contador, encontrado=false;
	for(let i=0; i<string.length; i++){
		contador=0;
		let x=i;
		for(let j=0; j<palavra.length; j++){
			if(string[x]==palavra[j]){
				contador++;
			}
			x++;
		}
		if(contador==palavra.length){
			encontrado=true;
			break;
		}
	}
	return encontrado;
}