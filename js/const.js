let juiciosp
const colorAnio = [
	'#FF6633',
	'#FFB399',
	'#FF33FF',
	'#FFFF99',
	'#00B3E6',
	'#E6B333',
	'#3366E6',
	'#999966',
	'#99FF99',
	'#B34D4D',
	'#80B300',
	'#809900',
	'#E6B3B3',
	'#6680B3',
	'#66991A',
	'#FF99E6',
	'#CCFF1A',
	'#FF1A66',
	'#E6331A',
	'#33FFCC',
	'#66994D',
	'#B366CC',
	'#4D8000',
	'#B33300',
	'#CC80CC',
	'#66664D',
	'#991AFF',
	'#E666FF',
	'#4DB3FF',
	'#1AB399',
	'#E666B3',
	'#33991A',
	'#CC9999',
	'#B3B31A',
	'#00E680',
	'#4D8066',
	'#809980',
	'#E6FF80',
	'#1AFF33',
	'#999933',
	'#FF3380',
	'#CCCC00',
	'#66E64D',
	'#4D80CC',
	'#9900B3',
	'#E64D66',
	'#4DB380',
	'#FF4D4D',
	'#99E6E6',
	'#6666FF',
];

const colorArrayDemora = [
	'#950707',
	'#F00',
	'#bcd50a',
	'#e3fb35',
	'#029b02',
	'#42ff42',
];

const paletaColores = {
	celeste : '#00B1AF',
	gris: '#B2B2B2',
	verde: '#9DD14B',
	rojo:'#DE2C13',
	naranja: '#F19A1E',
	rosa:'#AA57BC',
	azul:'#0061C6',
	naranja: '#F19A1E'

}
const generoIcon = ['fa-male', 'fa-female', 'fa-transgender'];
const normalizacion_situacion = {
	'Caducado':'caducado',
	'Desestimado':'desestimado',
	'Juicio Político':'juicio-político',
	'Renuncia':'renuncia',
	'Sanción':'sancion',
	'Sanción revocada':'sancion-revocada',
	'Sin definir':'sin-definir'
}
  
const descripciones = {
	todos: 'Se muestran todas las causas.',
	anio: 'Se muestran todas las causas. Se colorean por año',
	juez: 'Se muestran todas las causas. Se colorean por juez',
	estado:'Se muestran todas las causas. Se colorean por estado Abierto o Cerrado',
	situacion: 'Se muestran solo las causas cerradas. Se colorea por situacion',
	demora:'Se muestran solo las causas abiertas. Se colorean segun el tiempo que llevan abierta. 1 año verde, 2 años amarillo, 3 años rojo.',
	completos:'Se muestran las casusas segun si tiene o no los datos del juez denunciado',
};



const contadorFuente = (numero, causas) => {
    const fontSize =  Math.round((numero * 150) / causas + 50);
    if(fontSize < 10 ) return 5
    if (fontSize > 100 ) return 100
    return fontSize
};

const getRandomColor = () =>{
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

