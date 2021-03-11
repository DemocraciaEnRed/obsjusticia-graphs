
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
		color: paletaColores.azul
	},
	mujer:{
		contador: 0,
		label:'Mujer',
		color: paletaColores.rosa
	},
	mixto:{
		contador: 0,
		label:'Mixto',
		color: paletaColores.naranja
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
		color:"#f85fd5"
	},
	'caducado':{
		contador: 0,
		label:'Caducado',
		color:"#22b3ee"
	},
	'sancion':{
		contador: 0,
		label:'Sanción',
		color:"#ac5522"
	},
	'juicio-político':{
		contador: 0,
		label:'Juicio Político',
		color:"#da2222"
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
	mayor:{
		contador: 0,
		label: 'Mayor a<br />36 meses',
		color: '550000'
	},
	treinta_meses:{
		contador: 0,
		label: 'Menor a<br />30 meses',
		color: '#f00'
	},
	tresintayseis_meses:{
		contador: 0,
		label: 'Menor a<br />36 meses',
		color: '#994646'
	},
	veinticuatro_meses:{
		contador: 0,
		label: 'Menor a<br />24 meses',
		color: '#ff5162'
	},
	dieciocho_meses:{
		contador: 0,
		label: 'Menor a<br/>18 meses',
		color: '#facd35'
    },
	doce_meses:{
		contador: 0,
		label: 'Menor a<br/>12 meses',
		color: '#56df26'
    },
	seis_meses:{
		contador: 0,
		label: 'Menor a<br/>6 meses',
		color: '#129921'
	}
}


const contador_estado = {
	cerrados:{
		contador: 0,
		label:'Cerrado',
		color: paletaColores.celeste
	},
	abierto:{
		contador: 0,
		label:'Abierto',
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