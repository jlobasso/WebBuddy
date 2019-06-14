/************* DO NOT USE CONST HERE **********/
/*THIS CONTENT AND VARS COULD BE OVERWRITTEN THROUGH EXECUTION*/


if(!window.contentScriptInjected){
    contentScriptInjected = true;

    /* we define vars here, once*/
    var hashtagElement = null;
    var hashtagText = null;
}

hashtagElement = document.querySelectorAll("._7UhW9.fKFbl.yUEEX.KV-D4.uL8Hv");
hashtagText = hashtagElement[0].innerText;

//TODO: CHEQUEAR SI EL TAG YA ESTA AGREGADO
//TODO: AGREGAR BOTON, DE YA AGREGADO O DE AGREGAR HASHTAG
//TODO: COMPORTAMIENTO DE AGREGAR HASHTAG