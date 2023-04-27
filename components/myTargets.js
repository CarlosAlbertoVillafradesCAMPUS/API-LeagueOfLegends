export default {
    API: "http://ddragon.leagueoflegends.com/cdn/13.8.1/data/es_ES/champion.json",

    async fragmentTargets(){
        const ws = new Worker("storage/wsMyTargets.js", {type:"module"});
        ws.postMessage({module:"showMyTargets", data: this.API})

        ws.addEventListener("message", (e) => {
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelector("#containerChampions").append(...doc.body.children)
            ws.terminate()
        })
    }
}