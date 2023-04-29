import myTargets from "./myTargets.js"
export default {
    API: "http://ddragon.leagueoflegends.com/cdn/13.8.1/data/es_ES/champion.json",
    buttonsNav(){
        this.championsAll(),
        this.championsTanks()
    },
    championsAll(){
        document.querySelector("#All").addEventListener("click", (e) => {
            myTargets.fragmentTargets()
        })
    },
    championsTanks(){
        //Button tanque
        document.querySelector("#Tank").addEventListener("click", (e) => {
            let id = e.target.id;
            this.funcionamientoButtons(id)
          
        })
        //Button Luchadores
        document.querySelector("#Fighter").addEventListener("click", (e) => {
            let id = e.target.id;
            this.funcionamientoButtons(id)
        })
         //Button Luchadores
         document.querySelector("#Assassin").addEventListener("click", (e) => {
            let id = e.target.id;
            this.funcionamientoButtons(id)
        })
         //Button Luchadores
         document.querySelector("#Marksman").addEventListener("click", (e) => {
            let id = e.target.id;
            this.funcionamientoButtons(id)
        })
         //Button Luchadores
         document.querySelector("#Mage").addEventListener("click", (e) => {
            let id = e.target.id;
            this.funcionamientoButtons(id)
        })
         //Button Luchadores
         document.querySelector("#Support").addEventListener("click", (e) => {
            let id = e.target.id;
            this.funcionamientoButtons(id)
        })
        

    },
    funcionamientoButtons(id){
        const ws = new Worker("storage/wsMyTargets.js", {type:"module"});
        ws.postMessage({module:"filterTanks", data:{url: this.API, opcion: id}});

        ws.addEventListener("message", (e) => {
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            let containerChampions = document.querySelector("#containerChampions")
            containerChampions.innerHTML = null
            containerChampions.append(...doc.body.children)
            ws.terminate()
            let buttonsInfo = document.querySelectorAll(".buttonInfo");
        for (let i = 0; i < buttonsInfo.length; i++) {
            buttonsInfo[i].addEventListener("click", (e) => {
                myTargets.fragmentModal(e)
            })
            
        }
        })
    },

}