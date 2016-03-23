window.addEventListener('load',init,false);
var canvas=null; 
var ctx = null;
var cont1=0, cont2=0,matrizMundo;
matrizMundo=[[-1,-1,-1,-1,-1,-1,-1,-1],
		     [-1,-1,-1,-1,-1,-1,-1,-1],
		     [-1,-1,-1,-1,-1,-1,-1,-1],
		     [-1,-1,-1,-1,-1,-1,-1,-1],
		     [-1,-1,-1,-1,-1,-1,-1,-1],
		     [-1,-1,-1,-1,-1,-1,-1,-1],
		     [-1,-1,-1,-1,-1,-1,-1,-1],
		     [-1,-1,-1,-1,-1,-1,-1,-1]];


function init(){
 canvas=document.getElementById('canvas');
 ctx=canvas.getContext('2d');

 run();
}

function run(){
 setTimeout(run,50);
 pintarTablero(ctx);
}

function  guardar(){

    var guar = "";

    for(i = 0; i<8; i++){
		for (j = 0; j<8; j++){

            guar += matrizMundo[i][j]+",";    
        }
    }
   	alert("guardado...");
    document.getElementById("variable").value = guar;
	document.getElementById("form").submit();

}
function pintarTablero(ctx){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var val = 0,i,j,x=0,y=0;
         for(i = 0;i<8;i++){
			 for (j = 0;j<8;j++){
				 x = ((370 - i*50)+(j*50));
				 y =  (80+(i*25) + 25*j);
				val = matrizMundo[i][j];
				fondo = new Image();
				switch(val){
				case 0:
					fondo.src='Hunter/cuadro.png';
					break;			
				case 1:
				    y-=20;
					fondo.src='Hunter/caja1.png';
					break;
				case 6:
				    y-=40;
					fondo.src='Hunter/caja2.png';
					break;
				case 11:
					y-=60;
					fondo.src='Hunter/caja3.png';
					break;
				case 16:
					fondo.src='dezplazamientos/luzOff.png';
					break;
				case 18:
					y-=30;
					fondo.src='Hunter/cuadroHunterDerecha.png';
					break;
				case -1:
					fondo.src='dezplazamientos/inicial.png';
					break;
				}
				 ctx.drawImage(fondo, x, y);
			}
		 }
	}


function cambiarMatriz(val){

	if (val != null){
		    matrizMundo[cont2][cont1]=val;
			cont2++;
			if(val==18){
				document.getElementById('btHunter').onclick = function() {
  				document.getElementById('btHunter').disabled = false;
				};
			}
			if(val==16){
				document.getElementById('btLuz').onclick = function() {
  				document.getElementById('btLuz').disabled = false;
				};
			}
			if(cont2>7){
				cont1++;
				cont2=0;
			}else if(cont1>7)
				alert("Fin del Mundo, Guarde");
	}
}



