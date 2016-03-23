window.addEventListener('load',init,false);
var canvas=null,ctx=null, fondo = null, dx=10,dy=10, y = 0, x = 300;

//inicializacion
function init(){
 canvas=document.getElementById('canvas');
 ctx=canvas.getContext('2d');
 run();
}
// hilo de pintado del canvas
function run(){

	setTimeout(run,40);
    paint(ctx);
}
//funcion que dibuja en el canvas el mensaje rebotando en las paredes
function paint(ctx){
	ctx.clearRect(0,0,canvas.width,canvas.height);


	y += dy;
	x += dx;
	 // controla que el mensaje no salga de arriba ni de abajo.
	 if(y + 200 >canvas.height || y < 0){
	 	dy=-dy;
	 }
	 // controla que el mensaje no salga de la izquierda ni de la derecha.
	 if(x + 600 >canvas.width || x < 0){
	 	dx=-dx;
	 }
	 // 
	fondo = new Image();
	fondo.src = 'Hunter/titulo.png';
	ctx.drawImage(fondo, x, y);

}

