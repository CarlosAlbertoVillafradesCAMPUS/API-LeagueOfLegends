export default {
    API: "http://ddragon.leagueoflegends.com/cdn/13.8.1/data/es_ES/champion.json",

    fragmentTargets(){
        const ws = new Worker("storage/wsMyTargets.js", {type:"module"});
        ws.postMessage({module:"showMyTargets", data: this.API})

        ws.addEventListener("message", (e) => {
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            let containerChampions = document.querySelector("#containerChampions")
                    containerChampions.innerHTML = null
                    containerChampions.append(...doc.body.children)
            ws.terminate()
            let buttonsInfo = document.querySelectorAll(".buttonInfo");
            for (let i = 0; i < buttonsInfo.length; i++) {
                buttonsInfo[i].addEventListener("click", (e) => {
                    this.fragmentModal(e)
                })
                
            }
        })
    },
    fragmentModal(e){
        let idChampion = e.target.id;
        console.log(idChampion);
        
        let newUrl = `https://ddragon.leagueoflegends.com/cdn/13.8.1/data/es_ES/champion/${idChampion}.json`;
        const ws = new Worker("storage/wsMyTargets.js", {type:"module"});

        ws.postMessage({module:"showModal", data:{URL:newUrl, champion: idChampion}});

        ws.addEventListener("message", (e) => {
            console.log(e.data);
            document.querySelector("#containerModal").innerHTML = e.data
            ws.terminate()

            //cerrar el modal dando click en la X
            document.getElementsByClassName("cerrar")[0].addEventListener("click", (e) => {
                document.querySelector("#containerModal").innerHTML = null
            })
            //cerrar el modal dando click fuera del modal
            window.addEventListener("click", (e) => {
                if (e.target.id == "ventanaModal") {
                    document.querySelector("#containerModal").innerHTML = null
                  }
                
            })
        })
    },
    search(){
        document.querySelector("#search").addEventListener("input", (e)=>{
            let valor = e.target.value;
            if (valor != "") {
                const ws = new Worker("storage/wsMyTargets.js", {type:"module"});
                ws.postMessage({module: "searchCampeones", data:{text: valor, URL: this.API}})

                ws.addEventListener("message", (e) => {
                    let doc = new DOMParser().parseFromString(e.data, "text/html");
                    let containerChampions = document.querySelector("#containerChampions")
                    containerChampions.innerHTML = null
                    containerChampions.append(...doc.body.children)
                    ws.terminate()
                    let buttonsInfo = document.querySelectorAll(".buttonInfo");
                    for (let i = 0; i < buttonsInfo.length; i++) {
                        buttonsInfo[i].addEventListener("click", (e) => {
                            this.fragmentModal(e)
                        })
                        
                    }
                })
            }else{
                this.fragmentTargets()
            }
        })
    }
}