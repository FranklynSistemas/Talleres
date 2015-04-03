var debug = "";
window.onload = function()
{
	Decimal=[];
	Valor="";
	temp=0;
	Completo="";
	var shift=0;
	var operacion = "";
	var cifras = []; //Guardará las cifras...
	var operaciones = [
						{
							"tipo" 		: "Suma", 
							"operador"	: "+",
							"code"		: 187
						},
						{
							"tipo" 		: "Resta", 
							"operador"	: "-",
							"code"		: 189
						},
						{
							"tipo" 		: "Multiplicación", 
							"operador"	: "x",
							"code"		: 88
						},
						{
							"tipo" 		: "División", 
							"operador"	: "%",
							"code"		: 68
						}];
	//Para capturar los números...
	for(var i = 0; i <= 9; i++)
	{
		nom_div("numero_" + i).addEventListener('click', function(event)
		{
			//console.log("Valor de I: " + i);
			var numero = event.target.id.split("_")[1];
			insertaNumeros(numero);
		});
		if(i >= 1 && i <= 4)
		{
			//Para los operadores...
			nom_div("operador_" + i).addEventListener('click', function(event)
			{
				//Saber si el final hay un operador...
				var ultimo = operacion.charAt(operacion.length - 1);
				if(!existeOperador(ultimo) && operacion !== "")
				{
					var operador = Number(event.target.id.split("_")[1]);
					var txtOperador = operaciones[operador - 1].operador;					
					operacion += txtOperador;
					tamanoFuente();
					nom_div("pantalla").innerHTML = operacion;
					//console.log(operaciones[operador - 1].tipo);
				}
			});
		}
			//Para las demás acciones (limpiar, igual y punto)...
			
			if(i >=1 && i <= 7){
		
				//console.log("acciones_" + i);
				nom_div("acciones_" + i).addEventListener('click', function(event)
				{
					var accion = Number(event.target.id.split("_")[1]);
					//console.log("Acción es: " + accion);
					var resultado = "";
					switch(accion)
					{
						case 1: operacion = ""; cifras = []; break;
						case 2: //Primero saber si ya existe un punto...
								//Traer la última cifra...
								var ultimaCifra = cifras[cifras.length - 1];
								//console.log(ultimaCifra);
								//Buscar si ya existe un punto...
								if(ultimaCifra.indexOf(".") < 0)
								{
									operacion += ".";
									cifras[cifras.length - 1] += ".";
								}
								resultado = operacion;
								break;
						case 3: 
								//Buscar al final si existe un operador
								if(operacion !== "")
								{
									var ultimo = operacion.charAt(operacion.length - 1);
									if(existeOperador(ultimo))
									{
										//Eliminar el último operador...
										operacion = operacion.substr(0, operacion.length - 1);
									}
									var reemplaza = [{busca : "x", cambia : "*"},
													 {busca : "%", cambia : "/"}];
													 for (var i in reemplaza){
													 	do{
													 		if(operacion.indexOf(reemplaza[i].busca) >= 0){
													 			operacion = operacion.replace(reemplaza[i].busca,reemplaza[i].cambia);
													 		}
													 		else{
													 			break;

													 		}
													 }while(1);
												}
												try{
													
													if(ValidaDecimal(eval(operacion))){
														cifras = [];
														resultado = Fraccionarios(eval(operacion));
														operacion = cifras[0] = String(resultado);
													}else{
														cifras = [];
														resultado = eval(operacion);
														operacion = cifras[0] = String(resultado);
														tamanoFuente();
													}
													
												}catch(e){
													alert("Error en la operacion");
												}
									
								}
								break;
						case 4:
								var ultimaCifra = cifras[cifras.length - 1];
								//console.log(ultimaCifra);
								//Buscar si ya existe un punto...
								if(ultimaCifra.indexOf("(") < 0)
								{
									operacion += "(";
									cifras[cifras.length - 1] += "(";
								}
								resultado = operacion;
						break;
						case 5:
								var ultimaCifra = cifras[cifras.length - 1];
								//console.log(ultimaCifra);
								//Buscar si ya existe un punto...
								if(ultimaCifra.indexOf(")") < 0)
								{
									operacion += ")";
									cifras[cifras.length - 1] += ")";
								}
								resultado = operacion;
						break;
						case 6:
								borrarUltimo();
								resultado=operacion;
						break;

						case 7:
								var ultimaCifra = cifras[cifras.length - 1];
								//console.log(ultimaCifra);
								//Buscar si ya existe un punto...
								if(ultimaCifra.indexOf("/") < 0)
								{
									operacion += "/";
									cifras[cifras.length - 1] += "/";
								}
								resultado = operacion;
						break;
					}
					
					tamanoFuente();
					nom_div("pantalla").innerHTML = resultado;
				});
			}
		}
	
	var Fraccionarios = function(result){

		var Numero = String(result);
		Decimal = Numero.split(".");
		var entero = Decimal[0];
		var Div = Decimal[1];
		Completo=Decimal[0]+Decimal[1];

		var Fracc1=[];
		var Fracc2=[];
		debug=validaDecimales(Decimal[1]);
		switch(validaDecimales(Decimal[1])){
			case 0:
				var num = Number(Valor.charAt(0));
				temp = eval(entero*9+num);
				Fracc1=Simplificar(temp,9);
				
				return Fracc1[0]+"/"+Fracc1[1];
				console.log(Fracc1[0]+"/"+Fracc1[1]);
				break;

			case 1:
						Fracc1=Simplificar(Valor.charAt(0),10);

						temp = eval((entero*Fracc1[1])+Fracc1[0]);
						Fracc2=Simplificar(temp,Fracc1[1]);

						if(Fracc2[1]===1){
							return Fracc2[0];
						}else{
						console.log(Fracc2[0]+"/"+Fracc2[1]);
						return Fracc2[0]+"/"+Fracc2[1];
						}
			break;

			case 2:
						Fracc1=Simplificar(Valor,100);

						temp = eval((entero*Fracc1[1])+Fracc1[0]);
						Fracc2=Simplificar(temp,Fracc1[1]);

						if(Fracc2[1]===1){
							return Fracc2[0];
						}else{
						console.log(Fracc2[0]+"/"+Fracc2[1]);
						return Fracc2[0]+"/"+Fracc2[1];
						}
			break;
			case 3:
						Fracc1=Simplificar(Valor,1000);

						temp = eval((entero*Fracc1[1])+Fracc1[0]);
						Fracc2=Simplificar(temp,Fracc1[1]);

						if(Fracc2[1]===1){
							return Fracc2[0];
						}else{
						console.log(Fracc2[0]+"/"+Fracc2[1]);
						return Fracc2[0]+"/"+Fracc2[1];
						}
			break;
			case 4:
						Fracc1=Simplificar(Valor,10000);

						temp = eval((entero*Fracc1[1])+Fracc1[0]);
						Fracc2=Simplificar(temp,Fracc1[1]);

						if(Fracc2[1]===1){
							return Fracc2[0];
						}else{
						console.log(Fracc2[0]+"/"+Fracc2[1]);
						return Fracc2[0]+"/"+Fracc2[1];
						}
			break;
			case 5:
			
						Fracc1=Simplificar(Valor,100000);

						temp = eval((entero*Fracc1[1])+Fracc1[0]);
						Fracc2=Simplificar(temp,Fracc1[1]);

						if(Fracc2[1]===1){
							return Fracc2[0];
						}else{
						console.log(Fracc2[0]+"/"+Fracc2[1]);
						return Fracc2[0]+"/"+Fracc2[1];
				}
			break;
			case 6:
						Fracc1=Simplificar(Valor,1000000);

						temp = eval((entero*Fracc1[1])+Fracc1[0]);
						Fracc2=Simplificar(temp,Fracc1[1]);

						if(Fracc2[1]===1){
							return Fracc2[0];
						}else{
						console.log(Fracc2[0]+"/"+Fracc2[1]);
						return Fracc2[0]+"/"+Fracc2[1];
						}
			break;
			case 7:
				
						Fracc1=Simplificar(Valor,10000000);

						temp = eval((entero*Fracc1[1])+Fracc1[0]);
						Fracc2=Simplificar(temp,Fracc1[1]);

						if(Fracc2[1]===1){
							return Fracc2[0];
						}else{
						console.log(Fracc2[0]+"/"+Fracc2[1]);
						return Fracc2[0]+"/"+Fracc2[1];
						}
					
			break;
			case 8:
						// Mixtos
						temp = Number(Completo)-entero;
						Fracc1 = Simplificar(temp,990);

						if(Fracc1[1]===1){
							return Fracc1[0];
						}else{
						console.log(Fracc1[0]+"/"+Fracc1[1]);
						return Fracc1[0]+"/"+Fracc1[1];
						}


			break;
}
	};
	var ValidaDecimal = function(result){
		var Numero = String(result);
		var esDecimal = Numero.indexOf(".");

		if(esDecimal>0){
			return true;
		}else{
			return false;
		}
	};
	var validaDecimales = function(Num){
		Valor = Num;
		var estados;


		if(/^[0-9]+$/.test(Valor)){
			for(var i=0; i<Valor.length;i++){
            

			if(Valor.charAt(i) === Valor.charAt(i+1))
			{
				
				estados=0;
			}

			}

		 	
		 if(/^[0-9]{1,10}$/){
			switch(Valor.length){
				case 1:
				estados=1;
				//10
				break;
				case 2:
				estados=2;
				//100
				break;
				case 3:
				estados=3;
				//1000
				break;
				case 4:
				estados=4;
				//10000
				break;
				case 5:
				estados=5;
				//100000
				break;
				case 6:
				estados=6;
				//1000000
				break;
				case 7:
				estados=7;
				//10000000
				break;
			}		

		}
	}
		return estados;
		
	};


	var insertaNumeros = function(numero)
	{
		operacion += numero;
		var cont = 0;
		cifras[cont] = "";
		for(var c = 0; c < operacion.length; c++)
		{
			if(!existeOperador(operacion.charAt(c)) || operacion.charAt(c) === ".")
			{
				cifras[cont] += operacion.charAt(c);
			}
			else
			{
				cont++;
				cifras[cont] = "";
			}
		}
		tamanoFuente();
		nom_div("pantalla").innerHTML = operacion;
	};

	//Para saber si existe un operador...
	var existeOperador = function(operador)
	{
		var existe = false; //Para saber si existe un operador al final...
		//Saber si es un operador...
		for(var c in operaciones)
		{
			if(operaciones[c].operador === operador)
			{
				existe = true;
				break;
			}
		}
		return existe;
	};
	

	var tamanoFuente = function(){

		var fuente= 220;

		var maximoFuente = 10;

			if(operacion.length > maximoFuente)
			{

			fuente -= Math.round(fuente * ((operacion.length + 25) / 100));

			}

			nom_div("pantalla").style.fontSize = fuente + "%";

	};

	var borrarUltimo = function(){

			if(operacion.length >= 0){

			operacion = operacion.substr(0, operacion.length - 1);
			

			}	

	};

	var MinimoComunDivisor = function(num,div){

		var Resp = num % div;

		if(Resp==0){
			return div;
		}else{
			return MinimoComunDivisor(div,Resp);
		}

	}; 

	var Simplificar = function(Num,Div){
		var Min = MinimoComunDivisor(Number(Num),Div);
		var Fraccion=[];
		Fraccion[0] = Num /= Min;
		Fraccion[1] = Div /= Min; 

		return Fraccion;
	};


	window.onkeydown = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		console.log(code);

		if(code === 16){
			shift=16;
		}
	};
	
	window.onkeyup = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;

		if(shift!=16){
		if(code >= 48 && code <= 57)
		{		
			console.log(code + " === " + String.fromCharCode(code));
			insertaNumeros(String.fromCharCode(code));
		}else{
			if(code === 187 || code === 189){
				code === 187 ? code=43 : code=45;
				insertaNumeros(String.fromCharCode(code));
				console.log(code + " === " + String.fromCharCode(code));
			}

		}
	}else{
		shift=0;
		if (code === 53|| code === 187) {
			code===53 ? code=37 : code=120;

			insertaNumeros(String.fromCharCode(code));
			console.log(code + " === " + String.fromCharCode(code));
		}else{
			if(code === 56 ||code === 57){
				code===56 ? code=40 : code=41;
				insertaNumeros(String.fromCharCode(code));
				console.log(code + " === " + String.fromCharCode(code));
			}else{
			if(code===55)
				code=47;
				insertaNumeros(String.fromCharCode(code));
				console.log(code + " === " + String.fromCharCode(code));
			}
		}
	}

	};
	
	function nom_div(div)
	{
		return document.getElementById(div);
	}
};