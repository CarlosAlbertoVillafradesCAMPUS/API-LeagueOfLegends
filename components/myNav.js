import myTargets from "./myTargets.js"
export default {
    API: "https://ddragon.leagueoflegends.com/cdn/13.8.1/data/es_ES/champion.json",
   selectNav(){
        this.championsAll()
    },
    championsAll(){
        document.querySelector("[name='selectCategoria']").addEventListener("change", (e) => {
            if (e.target.value == "") {
                myTargets.fragmentTargets()
            }else {
                this.funcionamientoButtons(e.target.value)
            }
            
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
            let buttonInfo = document.querySelectorAll(".buttonInfo");
        for (let i = 0; i < buttonInfo.length; i++) {
            buttonInfo[i].addEventListener("click", (e) => {
                myTargets.fragmentModal(e)
            })
            
        }
        })
    },

}