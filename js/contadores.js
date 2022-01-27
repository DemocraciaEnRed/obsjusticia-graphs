const contadores_init = {
	
	contador_anio: false,
	contador_situacion: false,
	contador_estado: false,
	contador_demora: false,
	contador_genero: false

}
const contador_completos = {
	incompletos:{
		contador: 0,
		label:'Incompletos',
		color: paletaColores.rojo
	},
	completos:{
		contador: 0,
		label:'Completos',
		color: paletaColores.verde
	}
	
}


const contador_anio = {}
for (let a = 1998; a < 2021; a++) {
	contador_anio[a] = {
		contador:0,
		label:a,
		color:colorAnio[a-1998]
	}
}

const contador_todos = {
    todos:{
        contador:0,
        label:"Causas",
        color: paletaColores.celeste
    }
}

const contador_juicio_politico = {
	destituido:{
        contador:0,
        label:"Destituido",
        color: paletaColores.rojo
	},
	renuncio:{
		contador:0,
        label:"Renunció",
        color: paletaColores.azul
		
	},
	otro:{
		contador:0,
        label:"Otro",
        color: paletaColores.celeste

	}
}

const contador_desestimadas = {
    desestimadas:{
        contador:0,
        label:"Desestimadas",
        color: paletaColores.rojo
    },
    no_desestimadas:{
        contador:0,
        label:"No desestimadas",
        color: paletaColores.verde
    }
}

const contador_caducadas = {
    no_caducada:{
        contador:0,
        label:"No caducados",
        color: paletaColores.verde
    },
    caducadas:{
        contador:0,
        label:"Caducados",
        color: paletaColores.rojo
    }
}

const contador_genero = {
	hombre:{
		contador: 0,
		label:'Hombre',
		color: paletaColores.violeta
	},
	mujer:{
		contador: 0,
		label:'Mujer',
		color: paletaColores.verde
	},
	mixto:{
		contador: 0,
		label:'Mixto',
		color: paletaColores.azul
	},
	// desconocido:{
	// 	contador: 0,
	// 	label:'Desconocido',
	// 	color:"#000"
	// }
};


const contador_situacion = {
	'desestimado':{
		contador: 0,
		label:'Desestimado',
		color: paletaColores.azul
	},
	'caducado':{
		contador: 0,
		label:'Caducado',
		color: paletaColores.rojo
	},
	'sancion':{
		contador: 0,
		label:'Sanción',
		color: paletaColores.verde
	},
	'juicio-político':{
		contador: 0,
		label:'Juicio Político',
		color: paletaColores.amarillo
	},
	// 'renuncia':{
	// 	contador: 0,
	// 	label:'Renuncia',
	// 	color:"#0f0"
	// },
	
	// 'sancion-revocada':{
	// 	contador: 0,
	// 	label:'Sanción revocada',
	// 	color:"#000"
	// },
	// 'sin-definir':{
	// 	contador: 0,
	// 	label:'Sin definir',
	// 	color:"#000"
	// }
}

const contador_demora = {
	entre_3_2:{
		contador: 0,
		label: '3 - 2 años',
		color: paletaColores.verde
    },
	entre_2_1:{
		contador: 0,
		label: '2 - 1 años',
		color: paletaColores.amarillo
    },
	menor_1:{
		contador: 0,
		label: 'Menos de 1 año',
		color: paletaColores.rojo
	}
}


const contador_estado = {
	cerrados:{
		contador: 0,
		label:'Cerrado',
		color: paletaColores.rojo
	},
	abierto:{
		contador: 0,
		label:'Activo',
		color: paletaColores.verde
	}
}


const contador_sancion = {
	sancionado:{
		contador: 0,
		label:'Sancionado',
		color: paletaColores.rojo
	},
	sin_sancion:{
		contador: 0,
		label:'Sin sanción',
		color: paletaColores.gris
	}
}