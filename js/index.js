let juicios;
let casusas
let causas_abiertas
let causas_cerradas
let jueces
let total_casusas
let juicios_politicos
let categoria_principal

const hoy = new Date()

const calculateYears = () => { // birthday is a date
	return Math.abs(hoy.getUTCFullYear() - 1998);
}

$("#anios_desde_1988").text(calculateYears())

const obtenerAnio = (d) => {
	const exp = d.expediente_numero.split('/');
    const anio = parseInt(exp[1]);
	if (anio === 2020) return anio;
	if (anio === 200) return 2012;
	let _anio;
	if (anio > 50) {
		_anio = parseInt('19' + anio);
	} else {
		if (anio >= 10) {
			_anio = parseInt('20' + anio);
		} else {
			_anio = parseInt('200' + anio);
		}
	}
	if (192020 === _anio) debugger;
	return _anio;
};

const monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

const hideLoading = () =>{
	$(".loading").hide();
}

const finishloading = () =>{
	
	if(juicios_politicos && casusas){
		hideLoading();
	}
}

const filter_options_drawer = (options, filter_name) => {
	const opciones_multiselect = _.map(options, option => {
		const label = _.isObject(option)? option.label : option;
		const value = _.isObject(option)? option.value : label;
		const min_and_max = {
			attributes: _.pick(option, [ "min", "max" ])
		};

		return _.assign({
				label: _.toUpper(label),
				value,
			}, min_and_max);
	});
	$(filter_name).multiselect('dataprovider', opciones_multiselect);
}

$(document).ready(function () {
	var getOne = $.ajax('data/juiciosp.csv')
	var getTwo = $.ajax('data/data2.csv')

	$('#anio-multiselect').multiselect({ buttonText: () => 'AÑO' });
	$('#estado-multiselect').multiselect({ buttonText: () => 'ESTADO' });
	$('#resultado-multiselect').multiselect({ buttonText: () => 'RESULTADO' });
	$('#duracion-multiselect').multiselect({ buttonText: () => 'DURACIÓN' });
	$('#genero-multiselect').multiselect({ buttonText: () => 'GÉNERO' });
	
	console.log('- GET datasets...')
	$.when( getOne, getTwo )
		.done( (dataOne, dataTwo) => {
			console.log('- 200 OK...')
			dataParseOne = Papa.parse(dataOne[0], {
				header: 'true',
				transformHeader: function (h) {
					return h.trim();
				},
			});

			juicios_politicos = dataParseOne.data.map((j)=>{
				const a = new Date(j.causa_fecha)
				j["anio"] = a.getFullYear()
				j['juez_nombre_apellido'] = j.juez_apellido + " "+ j.juez_nombre
				return  j
			}).filter((j)=> {return j.causa_numero !== ""})
			console.log('-- step one DONE')
		}).done( (dataOne, dataTwo) => {
			dataParseTwo= Papa.parse(dataTwo[0], {
				header: 'true',
				transformHeader: function (h) {
					return h.trim();
				},
			});
			
			dataParseTwo = dataParseTwo.data.map((d) => {
				d['anio'] = obtenerAnio(d);
				if (d.fecha_dispone_articulo_11 === "" || d.fecha_dispone_articulo_11 === "17/0/19") d.fecha_dispone_articulo_11 = "1/1/2019"
				return d;
			});

			casusas = dataParseTwo
			causas_abiertas = dataParseTwo.filter((d) => d.estado !== 'cerrados')
			causas_cerradas = dataParseTwo.filter((d) => d.estado === 'cerrados')
			const _jueces = dataParseTwo.map((k) => k.juez_nombre_apellido);
			jueces = _.uniq(_jueces);
			console.log('-- step two: DONE')

			const anios_posibles = _(casusas).map("anio").uniq().filter(anio => anio > 1000).sort().value();
			filter_options_drawer(anios_posibles, "#anio-multiselect");
			
			const estados_posibles = [{ label: "Activo", value: "abierto" }, { label: "Cerrado", value: "cerrados" }];
			filter_options_drawer(estados_posibles, "#estado-multiselect");

			const resultados_posibles = [ "Desestimado", "Caducado", "Sanción", "Juicio Político" ];
			filter_options_drawer(resultados_posibles, "#resultado-multiselect");

			const duraciones_posibles = [
				{ label: "Mayor a 36 meses", min: 36 },
				{ label: "Entre 36 y 30 meses", min: 30, max: 36 },
				{ label: "Entre 30 y 24 meses", min: 24, max: 30 },
				{ label: "Entre 24 y 18 meses", min: 18, max: 24 },
				{ label: "Entre 18 y 12 meses", min: 12, max: 18 },
				{ label: "Entre 12 y 6 meses", min: 6, max: 12 },
				{ label: "Menor a 6 meses", max: 6 }
			];
			filter_options_drawer(duraciones_posibles, "#duracion-multiselect");

			const generos_posibles = [ "Hombre", "Mujer", "Mixto" ];
			filter_options_drawer(generos_posibles, "#genero-multiselect");

		}).done( () => {
			console.log('-- Generating Visualizations...')
			viz1()
			viz2()
			console.log('-- 30%...')
			viz3()
			viz4()
			console.log('-- 50%...')
			viz5()
			// viz6()
			// viz7()
			// viz8()
			viz9()
			console.log('-- 80%...')
			viz10()
			viz11()
			vizFinal('init')
			console.log('-- 100%...')
			console.log('-- step three: DONE')
			console.log('-- All done...')
			finishloading()
		}).fail( () => {
			console.log('Error GET!!!')
		});


	// $.get('data/juiciosp.csv', (data) => {
	// 	dataParse = Papa.parse(data, {
	// 		header: 'true',
	// 		transformHeader: function (h) {
	// 			return h.trim();
	// 		},
	// 	});

	// 	juicios_politicos = dataParse.data.map((j)=>{
	// 		const a = new Date(j.causa_fecha)
	// 		j["anio"] = a.getFullYear()
	// 		j['juez_nombre_apellido'] = j.juez_apellido + " "+ j.juez_nombre
	// 		return  j
	// 	}).filter((j)=> {return j.causa_numero !== ""})
	// 	finishloading()
	// })

	// $.get('data/data2.csv', (data) => {
	// 	dataParse = Papa.parse(data, {
	// 		header: 'true',
	// 		transformHeader: function (h) {
	// 			return h.trim();
	// 		},
	// 	});
		
	// 	dataParse = dataParse.data.map((d) => {
	// 		d['anio'] = obtenerAnio(d);
	// 		if (d.fecha_dispone_articulo_11 === "" || d.fecha_dispone_articulo_11 === "17/0/19") d.fecha_dispone_articulo_11 = "1/1/2019"
	// 		return d;
	// 	});

	// 	casusas = dataParse
	// 	causas_abiertas = dataParse.filter((d) => d.estado !== 'cerrados')
	// 	causas_cerradas = dataParse.filter((d) => d.estado === 'cerrados')
	// 	const _jueces = dataParse.map((k) => k.juez_nombre_apellido);
	// 	jueces = _.uniq(_jueces);
	// }).done( () => {
	// 	viz1()
	// 	viz2()
	// 	viz3()
	// 	viz4()
	// 	viz5()
	// 	viz6()
	// 	viz7()
	// 	viz8()
	// 	viz9()
	// 	viz10()
	// 	viz11()
	// 	vizFinal('init')
	// 	finishloading()
	// });

});

const viz1 = () =>{
	const dot_container = $("#viz1  > .viz-container > .dot-container")
	const contador_container = $("#viz1  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")

	causas_cerradas.map((d)=>{
		dot_container.append(`<span class="dot dot1"></span>`);
	})
	$(".total_denuncias").text(causas_cerradas.length)
	contador_container.text(causas_cerradas.length)

}

const viz2 = () =>{
	const dot_container = $("#viz2  > .viz-container > .dot-container")
	const contador_container = $("#viz2  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero")
	const contador_container_2 = $("#viz2  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	contador_container_2.text(causas_cerradas.length)

	const desestimadas = causas_cerradas.sort((a, b) => {
		return a.NORM_estado === "Desestimado" ? -1 : 1;
	});

	desestimadas.map((d)=>{
		d.NORM_estado === "Desestimado" ?
			dot_container.append(`<span class="dot dot2"></span>`)
			:
			dot_container.append(`<span class="dot dot0 opacity25"></span>`)
	})

	const num_casusa  = desestimadas.filter((d)=>(d.NORM_estado === "Desestimado"))
	
	$(".total_desestimadas").text(num_casusa.length)
	contador_container.text(num_casusa.length)

}

const viz3 = () =>{
	const dot_container = $("#viz3  > .viz-container > .dot-container")
	const contador_container = $("#viz3  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero")
	const contador_container_2 = $("#viz3  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	contador_container_2.text(causas_cerradas.length)
	const desestimadas = causas_cerradas.sort((a, b) => {
		return a.NORM_estado === "Caducado" ? -1 : 1;
	});

	desestimadas.map((d)=>{
		d.NORM_estado === "Caducado" ?
			dot_container.append(`<span class="dot dot1"></span>`)
			:
			dot_container.append(`<span class="dot dot0 opacity25"></span>`)
	})

	const num_casusa  = desestimadas.filter((d)=>(d.NORM_estado === "Caducado"))
	contador_container.text(num_casusa.length)
	$(".total_caducadas").text(num_casusa.length)

}

const viz4 = () =>{
	const dot_container = $("#viz4  > .viz-container > .dot-container")
	const contador_container = $("#viz4  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero")
	const contador_container_2 = $("#viz4  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	const pre = Array.from(Array(1500).keys())
	const post = Array.from(Array(1500).keys())
	const casusas_biertas_ordenadas = causas_abiertas.sort((a, b) => {
		const date_a = new Date(a.fecha_dispone_articulo_11);
		const date_b = new Date(b.fecha_dispone_articulo_11);
		return date_a - date_b;
	})

	const casusas_biertas_ordenadas_extendida = casusas_biertas_ordenadas.concat(pre.concat(post));
	let por_caducar = 0
	casusas_biertas_ordenadas_extendida.map((c)=>{
		let color = "dot0"
		if(!Number.isInteger(c)){
			const fecha = new Date(c.fecha_dispone_articulo_11)
			const date = monthDiff(fecha,hoy)
			if(isNaN(date)) console.log(c)
			
			if(date <= 12) color = "dot5"
			if(date > 12 && date <= 24) color = "dot4"
			if(date > 24) {
				color = "dot3";
				por_caducar = por_caducar + 1;
			}

			dot_container.append(`<span class="dot ${color}"></span>`)
		}else{
			dot_container.append(`<span class="dot ${color} opacity25"></span>`)
		}
		
	})

	contador_container_2.text(causas_abiertas.length);
	contador_container.text(por_caducar);
	$(".total_activas").text(causas_abiertas.length)

}

const viz5 = () =>{
	const dot_container = $("#viz5  > .viz-container > .dot-container")
	const contador_container = $("#viz5  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero")
	const contador_container_2 = $("#viz5  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	
	const sancionadas = causas_cerradas.sort((a, b) => {
		return a.NORM_estado === "Sanción" ? -1 : 1;
	});

	let num_sanciones = 0

	sancionadas.map((d)=>{
		//console.log(d.NORM_estado)
		if(d.NORM_estado === 'Sanción') num_sanciones = num_sanciones + 1
		d.NORM_estado === "Sanción" ?
			dot_container.append(`<span class="dot dot1"></span>`)
			:
			dot_container.append(`<span class="dot dot7 opacity25"></span>`)
	})

	const num_casusa  = sancionadas.filter((d)=>(d.NORM_estado === "Sanción"))
	contador_container_2.text(num_casusa.length)
	contador_container.text(sancionadas.length - num_sanciones)
	$(".total_sancionadas").text(num_sanciones)
	

}

const viz6 = () =>{
	const dot_container = $("#viz6  > .viz-container > .dot-container")
	const contador_container = $("#viz6  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	const pre = Array.from(Array(1500).keys())
	const post = Array.from(Array(1500).keys())

	const juicios_politicos_ordenada = juicios_politicos.sort((a, b) => {
		return a.causa_modo_de_culminación === "Destituido" ? -1 : 1;
	});
	const juicios_politicos_extendida = pre.concat(juicios_politicos_ordenada.concat(post));
	juicios_politicos_extendida
		.map((d)=>{
			if(!Number.isInteger(d)){
				dot_container.append(`<span class="dot dot8"></span>`)	
			}else{
				dot_container.append(`<span class="dot dot8 opacity25"></span>`)
			}
			
		})

	contador_container.text(juicios_politicos.length - 2)
	$(".total_juicios").text(juicios_politicos.length - 2)

}

const viz7 = () =>{
	const dot_container = $("#viz7  > .viz-container > .dot-container")
	const contador_container = $("#viz7  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero")
	const contador_container_2 = $("#viz7  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	const pre = Array.from(Array(1500).keys())
	const post = Array.from(Array(1500).keys())
	let destituidos = 0
	const juicios_politicos_ordenada = juicios_politicos.sort((a, b) => {
		return a.causa_modo_de_culminación === "Destituido" ? -1 : 1;
	});

	const juicios_politicos_extendida = pre.concat(juicios_politicos_ordenada.concat(post));
	juicios_politicos_extendida.map((d)=>{
		if(!Number.isInteger(d)){
			if(d.causa_modo_de_culminación === 'Destituido'){
				destituidos = destituidos + 1
				dot_container.append(`<span class="dot dot9"></span>`)
			}else{
				dot_container.append(`<span class="dot dot8"></span>`)
			}	
		}else{
			dot_container.append(`<span class="dot dot8 opacity25"></span>`)
		}
		
	})

	contador_container_2.text(juicios_politicos.length - 2)
	contador_container.text(destituidos)

}

const viz8 = () =>{
	const dot_container = $("#viz8  > .viz-container > .dot-container")
	const contador_container = $("#viz8  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero")
	const contador_container_2 = $("#viz8  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	const contador_container_3 = $("#viz8  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero2")
	const pre = Array.from(Array(1500).keys())
	const post = Array.from(Array(1500).keys())
	let destituidos = 0
	let absoluciones = 0
	const juicios_politicos_ordenada = juicios_politicos.sort((a, b) => {
		return a.causa_modo_de_culminación === "Destituido" ? 1 : -1;
	}).sort((a, b) => {
		return a.causa_modo_de_culminación === "Destitución rechazada" ? 1 : -1;
	});
	const juicios_politicos_extendida = juicios_politicos_ordenada.concat(pre.concat(post));
	juicios_politicos_extendida.map((d)=>{
		if(!Number.isInteger(d)){
			if(d.causa_modo_de_culminación === 'Destituido'){
				destituidos = destituidos + 1
				dot_container.append(`<span class="dot dot9"></span>`)
			}
			else{
				if( d.causa_modo_de_culminación === "Destitución rechazada"){
					absoluciones = absoluciones + 1
					dot_container.append(`<span class="dot dot7"></span>`)
				}else{
					dot_container.append(`<span class="dot dot8"></span>`)
				}
				
			}	
		}else{
			dot_container.append(`<span class="dot dot8 opacity25"></span>`)
		}
		
	})

	contador_container_2.text(juicios_politicos.length - 2)
	contador_container_3.text(absoluciones)
	contador_container.text(destituidos)

}

const viz9 = () =>{
	const dot_container = $("#viz9  > .viz-container > .dot-container")
	const contador_container = $("#viz9  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero")
	const contador_container_2 = $("#viz9  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	const contador_container_3 = $("#viz9  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero2")
	const contador_container_5 = $("#viz9  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero4")
	const pre = Array.from(Array(1500).keys())
	const post = Array.from(Array(1500).keys())
	let destituidos = 0
	let absoluciones = 0
	let renuncias = 0
	let otros = 0
	const juicios_politicos_ordenada = juicios_politicos.filter((d)=>{
		return d.causa_modo_de_culminación === 'Destituido' 
			|| d.causa_modo_de_culminación === "Destitución rechazada"
			|| d.causa_modo_de_culminación === "Renunció antes del juicio"
	}).sort((a, b) => {
		return a.causa_modo_de_culminación === "Destituido" ? 1 : -1;
	}).sort((a, b) => {
		return a.causa_modo_de_culminación === "Destitución rechazada" ? 1 : -1;
	}).sort((a, b) => {
		return a.causa_modo_de_culminación === "Renunció antes del juicio" ? 1 : -1;
	});
	const juicios_politicos_extendida = juicios_politicos_ordenada.concat(pre.concat(post));
	// console.log(juicios_politicos_extendida)
	juicios_politicos_extendida.map((d)=>{
		if(!Number.isInteger(d)){
			if(d.causa_modo_de_culminación === 'Destituido'){
				destituidos = destituidos + 1
				dot_container.append(`<span class="dot dot9"></span>`)
			}
			else{
				if( d.causa_modo_de_culminación === "Destitución rechazada"){
					absoluciones = absoluciones + 1
					dot_container.append(`<span class="dot dot7"></span>`)
				}else{
					if( d.causa_modo_de_culminación === "Renunció antes del juicio"){
						renuncias = renuncias + 1
						dot_container.append(`<span class="dot dot8"></span>`)
					}else{
						otros = otros + 1
						dot_container.append(`<span class="dot dot8"></span>`)
					}
					
				}
				
			}	
		}else{
			dot_container.append(`<span class="dot dot8 opacity25"></span>`)
		}
		
	})

	contador_container_2.text(juicios_politicos.length - 2)
	contador_container_3.text(absoluciones)
	contador_container_5.text(otros)
	contador_container.text(destituidos)

}

const viz10 = () =>{
	const dot_container = $("#viz10  > .viz-container > .dot-container")
	const contador_container = $("#viz10  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero")
	const contador_container_2 = $("#viz10  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	const contador_container_3 = $("#viz10  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero2")
	const contador_container_4 = $("#viz10  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero3")
									
	

	const pre = Array.from(Array(1500).keys())
	const post = Array.from(Array(1500).keys())
	let destituidos = 0
	let absoluciones = 0
	let renuncias = 0
	let otros = 0
	const juicios_politicos_ordenada = juicios_politicos.filter((d)=>{
		return d.causa_modo_de_culminación === 'Destituido' 
			|| d.causa_modo_de_culminación === "Destitución rechazada"
			|| d.causa_modo_de_culminación === "Renunció antes del juicio"
	}).sort((a, b) => {
		return a.causa_modo_de_culminación === "Destituido" ? 1 : -1;
	}).sort((a, b) => {
		return a.causa_modo_de_culminación === "Destitución rechazada" ? 1 : -1;
	}).sort((a, b) => {
		return a.causa_modo_de_culminación === "Renunció antes del juicio" ? 1 : -1;
	});
	const juicios_politicos_extendida = juicios_politicos_ordenada.concat(pre.concat(post));
	juicios_politicos_extendida.map((d)=>{
		if(!Number.isInteger(d)){
			if(d.causa_modo_de_culminación === 'Destituido'){
				destituidos = destituidos + 1
				dot_container.append(`<span class="dot dot9"></span>`)
			}
			else{
				if( d.causa_modo_de_culminación === "Destitución rechazada"){
					absoluciones = absoluciones + 1
					dot_container.append(`<span class="dot dot7"></span>`)
				}else{
					if( d.causa_modo_de_culminación === "Renunció antes del juicio"){
						renuncias = renuncias + 1
						dot_container.append(`<span class="dot dot10"></span>`)
					}else{
						otros = otros + 1
						dot_container.append(`<span class="dot dot8"></span>`)
					}
					
				}
				
			}	
		}else{
			dot_container.append(`<span class="dot dot8 opacity25"></span>`)
		}
		
	})

	contador_container_2.text(juicios_politicos.length - 2)
	$(".total_juicios").text(juicios_politicos.length - 2)
	contador_container.text(renuncias)
	contador_container_3.text(destituidos)
	contador_container_4.text(absoluciones)
	

}

const viz11= () =>{
	const dot_container = $("#viz11  > .viz-container > .dot-container")
	const contador_container = $("#viz11  > .viz-container > .viz-footer > .viz-footer-col-2 > .contador > .viz-numero")
	const contador_container_2 = $("#viz11  > .viz-container > .viz-footer > .viz-footer-col-1 >.viz-footer-col-1-numero > .viz-numero")
	let num = 0

	causas_cerradas.sort((a, b) => {
		if(a.juez_nombre_apellido.length < 2) return -1
		return 1
	}).map((c)=>{
		if(c.juez_nombre_apellido.length < 2){
			dot_container.append(`<span class="dot dot6"></span>`)
			num = num + 1
		}else{
			dot_container.append(`<span class="dot dot0 opacity25"></span>`)
		}
	})

	contador_container.text(num)
	contador_container_2.text(num)
	$(".total_incompletas").text(num)

}

const situacion_drawer = (dot_container, d) => {
	const norm_estado = normalizacion_situacion[d.NORM_estado]
	contador_situacion[norm_estado].contador += 1;
	color = contador_situacion[norm_estado].color

	dot_container.append(`<span 
		class="dot dot8 info" 
		data-nombre="${d.juez_nombre_apellido}"
		data-anio="${d.anio}"
		data-estado="${d.estado}"
		data-denunciante="${d.denunciante_nombre}"
		data-situacion="${d.NORM_estado}"
		onmouseover="hoverdiv(event,'show')" 
		onmouseout="hoverdiv(event,'hide')"
		style="background-color:${color}"
		></span>`)
}

const estado_drawer = (dot_container, d) => {
	contador_estado[d.estado].contador += 1;

	const color = contador_estado[d.estado].color
	dot_container.append(`<span 
		class="dot dot8 info" 
		data-nombre="${d.juez_nombre_apellido}"
		data-anio="${d.anio}"
		data-estado="${d.estado}"
		data-denunciante="${d.denunciante_nombre}"
		data-situacion="${d.NORM_estado}"
		onmouseover="hoverdiv(event,'show')" 
		onmouseout="hoverdiv(event,'hide')"
		style="background-color:${color}"
		></span>`)
}

const demora_drawer = (dot_container, d) => {
	const fecha = new Date(d.fecha_dispone_articulo_11)
	const date = monthDiff(fecha,hoy)
	let color
	if(date === NaN) console.log(d)

	if (date <= 6 ) {
		color = contador_demora.menor_6.color;
		contador_demora.menor_6.contador += 1;
	}
	if (date <= 12 && date > 6) {
		color = contador_demora.entre_12_6.color;
		contador_demora.entre_12_6.contador += 1;
	}
	if (date <= 18 && date > 12) {
		color = contador_demora.entre_18_12.color;
		contador_demora.entre_18_12.contador += 1;
	}
	if (date <= 24 && date > 18) {
		color = contador_demora.entre_24_18.color;
		contador_demora.entre_24_18.contador += 1;
	}
	if (date <= 30 && date > 24) {
		color = contador_demora.entre_30_24.color;
		contador_demora.entre_30_24.contador += 1;
	}
	if (date <= 36 && date > 30) {
		color = contador_demora.entre_36_30.color;
		contador_demora.entre_36_30.contador += 1;
	}
	if(date>36){
		color = contador_demora.mayor_36.color;
		contador_demora.mayor_36.contador += 1;
	}
	dot_container.append(`<span 
	class="dot dot8 info" 
	data-nombre="${d.juez_nombre_apellido}"
	data-anio="${d.anio}"
	data-estado="${d.estado}"
	data-denunciante="${d.denunciante_nombre}"
	data-situacion="${d.NORM_estado}"
	onmouseover="hoverdiv(event,'show')" 
	onmouseout="hoverdiv(event,'hide')"
	style="background-color:${color}"
	></span>`)
}

const genero_drawer = (dot_container, d) => {
	let color
	if(d.genero_est === "Hombre"){
		contador_genero.hombre.contador += 1
		color = contador_genero.hombre.color
	}
	if(d.genero_est === "Mujer"){
		contador_genero.mujer.contador += 1
		color = contador_genero.mujer.color
	}
		
	if(d.genero_est === "Mixto"){
		contador_genero.mixto.contador += 1
		color = contador_genero.mixto.color
	}
	dot_container.append(`<span 
		class="dot dot8 info" 
		data-nombre="${d.juez_nombre_apellido}"
		data-anio="${d.anio}"
		data-estado="${d.estado}"
		data-denunciante="${d.denunciante_nombre}"
		data-situacion="${d.NORM_estado}"
		onmouseover="hoverdiv(event,'show')" 
		onmouseout="hoverdiv(event,'hide')"
		style="background-color:${color}"
		></span>`)
}

const selected_options = multiselectId => $(`${multiselectId} option:selected`).toArray()
	.map(option => _.pick(option, [ "label", "value" ]));

const obtener_filtros = () => {
	const anios = selected_options('#anio-multiselect');
	const estados = selected_options('#estado-multiselect');
	const resultados = selected_options('#resultado-multiselect');
	const duraciones = $("#duracion-multiselect option:selected").toArray()
		.map(it => ({ label: it.label, min: $(it).attr("data-min"), max: $(it).attr("data-max") }));
	const generos = selected_options('#genero-multiselect');

	const filters = [
		{
			selected_options: _.map(anios, it => ({ ...it, value: _.toNumber(it.value) })),
			obtener_valor: d => _.get(d, "anio"),
			category: "anio"
		},
		{
			selected_options: estados,
			obtener_valor: d => _.get(d, "estado"),
			category: "estado"
		},
		{
			selected_options: resultados,
			obtener_valor: d => _.get(d, "NORM_estado"),
			category: "resultado"
		},
		{
			selected_options: duraciones,
			obtener_valor: d => monthDiff(new Date(_.get(d, "fecha_dispone_articulo_11")), hoy),
			category: "duracion",
			is_range: true
		},
		{
			selected_options: generos,
			obtener_valor: d => _.get(d, "genero_est"),
			category: "genero"
		},
	];

	return _.reject(filters, { category: categoria_principal });
};

const causas_filtradas_por_categoria = () => {
	const filters = obtener_filtros();

	return casusas_ordenadas.filter(d => 
		_.every(filters, ({ selected_options, obtener_valor, is_range }) => {
			const value = obtener_valor(d);
			const filter_applies = is_range? _.some(selected_options, ({ min, max }) => (!min || value > min) && (!max || value <= max)) : _.includes(_.map(selected_options, "value"), value);
			return _.isEmpty(selected_options) || filter_applies;
		})
	)
}

const vizFinal= (option) =>{
	const dot_container = $("#vizFinal  > .viz-container > .dot-container")
	$(".viz-ref").empty()
	dot_container.empty()

	if(option === "init"){
		casusas_ordenadas = casusas.map((d)=>{
			dot_container.append(`<span 
				class="dot dot8 opacity25 info" 
				data-nombre="${d.juez_nombre_apellido}"
				data-anio="${d.anio}"
				data-estado="${d.estado}"
				data-denunciante="${d.denunciante_nombre}"
				data-situacion="${d.NORM_estado}"
				onmouseover="hoverdiv(event,'show')" 
				onmouseout="hoverdiv(event,'hide')"
				></span>`)
		});
	}
	else {
		categoria_principal = option;
		$(`[id$=multiselect-container]`).css('display', 'block');
		$(`#${categoria_principal}-multiselect-container`).css('display', 'none');
		draw_filter_tags();
	}


	if(option === "resultado"){
		_.forEach(contador_situacion, (contador) => _.update(contador, "contador", () => 0));
		casusas_ordenadas = causas_cerradas.filter((d) => {
			return  d.situacion.toLowerCase() !== 'acumulados' 
					&& d.situacion !== ''
					&& d.NORM_estado !== 'Renuncia'
					&& d.NORM_estado !== 'Sanción revocada'
					&& d.NORM_estado !== 'Sin definir'
		}).sort((a, b) => {
			if (a.NORM_estado < b.NORM_estado) return -1;
			if (a.NORM_estado > b.NORM_estado) return 1;
			return 0;
		})
		
		const causas_filtradas = causas_filtradas_por_categoria();
		causas_filtradas.forEach(d => situacion_drawer(dot_container, d));

		for (const situacion in contador_situacion) {
			color = contador_situacion[situacion].color;
			const porcentaje = (contador_situacion[situacion].contador/casusas.length)*100
			const p = Math.round(porcentaje * 100) / 100
			$(".viz-ref").append(`<div class="dot-ref-container">
							<span class="dot-ref" style="background-color:${color}"></span>
							<span class="dot-ref-label chivo">${contador_situacion[situacion].label}</span>
							<span class="dot-ref-contador chivo">${contador_situacion[situacion].contador}</span>
							<span class="dot-ref-porcentaje chivo">${p}%</span>

						</div>`)
		}		
	}

	if(option === "estado"){
		_.forEach(contador_estado, (contador) => _.update(contador, "contador", () => 0));
		casusas_ordenadas = casusas.sort((a, b) => {
			if (a.estado == 'cerrados') {
				return 1;
			}
			if (a.estado == 'abierto') {
				return -1;
			}
		})
		
		const causas_filtradas = causas_filtradas_por_categoria();
		causas_filtradas.forEach(d => estado_drawer(dot_container, d));

		for (const estado in contador_estado) {
			color = contador_estado[estado].color;
			const porcentaje = (contador_estado[estado].contador/casusas.length)*100
			const p = Math.round(porcentaje * 100) / 100
			$(".viz-ref").append(`<div class="dot-ref-container">
							<span class="dot-ref" style="background-color:${color}"></span>
							<span class="dot-ref-label chivo">${contador_estado[estado].label}</span>
							<span class="dot-ref-contador chivo">${contador_estado[estado].contador}</span>
							<span class="dot-ref-porcentaje chivo">${p}%</span>

						</div>`)
		}
	}

	if(option === "duracion"){
		_.forEach(contador_demora, (contador) => _.update(contador, "contador", () => 0));
		casusas_ordenadas = causas_abiertas.sort((a, b) => {
			const date_a = new Date(a.fecha_dispone_articulo_11);
			const date_b = new Date(b.fecha_dispone_articulo_11);
			return date_a > date_b ? 1 : -1;
		})
		
		const causas_filtradas = causas_filtradas_por_categoria();
		causas_filtradas.forEach(d => demora_drawer(dot_container, d));

		for (const demora in contador_demora) {
			color = contador_demora[demora].color;
			const porcentaje = (contador_demora[demora].contador/causas_abiertas.length)*100
			const p = Math.round(porcentaje * 100) / 100
			$(".viz-ref").append(`<div class="dot-ref-container">
							<span class="dot-ref" style="background-color:${color}"></span>
							<span class="dot-ref-label chivo">${contador_demora[demora].label}</span>
							<span class="dot-ref-contador chivo">${contador_demora[demora].contador}</span>
							<span class="dot-ref-porcentaje chivo">${p}%</span>

						</div>`)
		}
	}

	if(option === "genero"){
		_.forEach(contador_genero, (contador) => _.update(contador, "contador", () => 0));
		casusas_ordenadas = casusas
				.filter((d) => d.juez_nombre_apellido !== "" && d.genero_est !== "Desconocido")
				.sort((a, b) => {
					if (a.genero_est < b.genero_est) return 1;
					if (a.genero_est > b.genero_est) return -1;
					return 0;
				})
				
		const causas_filtradas = causas_filtradas_por_categoria();
		causas_filtradas.forEach(d => genero_drawer(dot_container, d));

		for (const genero in contador_genero) {
			color = contador_genero[genero].color;
			const porcentaje = (contador_genero[genero].contador/casusas.length)*100
			const p = Math.round(porcentaje * 100) / 100
			$(".viz-ref").append(`<div class="dot-ref-container">
							<span class="dot-ref" style="background-color:${color}"></span>
							<span class="dot-ref-label chivo">${contador_genero[genero].label}</span>
							<span class="dot-ref-contador chivo">${contador_genero[genero].contador}</span>
							<span class="dot-ref-porcentaje chivo">${p}%</span>

						</div>`)
		}	
	}

}

$(".filtro").change(function(){
	const op = $(this).val()
	vizFinal(op);
})

const deselect_option = (category, value, label) => {
	$(`#${category}-multiselect`).multiselect("deselect", value);
	$(`#${category}-multiselect`).multiselect("deselect", label);
	draw_filter_tags();
	vizFinal(categoria_principal);
};

const draw_filter_tag = ({ label, value }, category) => $("#search-filters-tags")
	.append(`<span class="badge badge-pill badge-light"><span>${label}</span><span class="far fa-times-circle" onclick="deselect_option('${category}', '${value}', '${label}')"></span></span>`);

const draw_filter_tags = () => {
	const filters = obtener_filtros();

	$("#search-filters-tags").empty();

	_.forEach(filters, ({ selected_options, category }) => _.forEach(selected_options, option => draw_filter_tag(option, category)));
}

const apply_filters = () => {
	if (!categoria_principal) return;

	vizFinal(categoria_principal);
}

$("#apply-filters").on("click", apply_filters)

function hoverdiv(e,event){

	let situacion = $( e.target ).data("situacion");
	let nombre = $( e.target ).data("nombre");
	let anio = $( e.target ).data("anio");
	let estado = $( e.target ).data("estado");
	let denunciante = $( e.target ).data("denunciante");
	
	if (situacion === undefined || situacion === 'undefined' || situacion.length < 1) situacion = 'Sin definir'
	if (nombre === undefined || nombre === 'undefined' || nombre.length < 1) nombre = 'Sin definir'
	if (anio === undefined || anio === 'undefined' || anio.length < 1) anio = 'Sin definir'
	if (estado === undefined || estado === 'undefined' || estado.length < 1) estado = 'Sin definir'
	if (denunciante === undefined || denunciante === 'undefined' || denunciante.length < 1) denunciante = 'Sin definir'

	$("#tooltip-denunciado").text(nombre)
	$("#tooltip-anio").text(anio)
	$("#tooltip-estado").text(estado)
	$("#tooltip-denunciante").text(denunciante)
	$("#tooltip-situacion").text(situacion)

    var left  = e.clientX + 10 + "px";
    var top  = e.clientY - 8 + "px";

    var div = document.getElementById('tooltip-container');

    div.style.left = left;
    div.style.top = top;
	if(event === 'show'){
		$("#tooltip-container").show()
		$(e.target).addClass('overRed')
	}else{
		$("#tooltip-container").hide()
		$(e.target).removeClass('overRed')
	} 
    
    return false;
}
