export default {
    buttonPrincipal(){
        document.querySelector(".boton").addEventListener("click", (e) => {
            document.querySelector(".containerBody").removeAttribute("style");
            document.querySelector(".boton").setAttribute("style","display: none;")
            document.querySelector(".subTitle").removeAttribute("style");
            window.scrollTo(0, 640);
        })
    },
    switch(){
        document.querySelector(".sonido").addEventListener("click", (e) => {
            let sonido = document.querySelector(".sonido");
            let audio = document.querySelector(".audio");

            if (sonido.checked == true){
                audio.muted = false;
              } else {
                audio.muted = true;
              }
        })
    }
}