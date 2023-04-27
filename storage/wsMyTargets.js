import fecthApi from "../API/fecthApi.js"
export let wsMyTargets = {
    async showMyTargets(urlAPI){
        const dataAPI = await fecthApi.fetchData(urlAPI)
        //trasformar el objeto de detaAPI por un array
        let arrayData = Object.entries(dataAPI.data);
        let plantilla = ""
        console.log(arrayData[9]);
        for (let i = 20; i < 40; i++) {
            let dataChampion = arrayData[i][1];
        plantilla += `
        <div class="col-3 p-3 champions">
            <div>
                <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataChampion.id}_0.jpg" alt="imgChampions">
            </div>
            <div class="text-center">
                <h2>${dataChampion.name}</h2>
                <p>${dataChampion.title}</p>
                <p>rol: ${dataChampion.tags[0]}</p>
                <button class="btn btn-primary w-100">mas info</button>
            </div>
        </div>`
            
        }
    return plantilla
    }
}
self.addEventListener("message", async (e) => {
    const respuesta = await wsMyTargets[`${e.data.module}`](e.data.data);
    postMessage(respuesta)
})