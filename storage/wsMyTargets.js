import fecthApi from "../API/fecthApi.js"
export let wsMyTargets = {
    async showMyTargets(urlAPI){
        const dataAPI = await fecthApi.fetchData(urlAPI)
        //trasformar el objeto de detaAPI por un array
        let arrayData = Object.entries(dataAPI.data);
        console.log(arrayData);
        let plantilla = ""
        console.log(arrayData[9]);
        for (let i = 20; i < 40; i++) {
            let dataChampion = arrayData[i][1];
        plantilla += `
        <div class="col-5 col-lg-3  p-3 champions">
            <div>
                <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataChampion.id}_0.jpg" alt="imgChampions">
            </div>
            <div class="text-center text-white">
                <h2>${dataChampion.name}</h2>
                <p>${dataChampion.title}</p>
                <p>rol: ${dataChampion.tags[0]}</p>
                <button class="btn btn-primary w-100 buttonInfo" id=${dataChampion.id}>mas info</button>
            </div>
        </div>`
            
        }
    return plantilla
    },
    async showModal(info){
        let dataChampion = await fecthApi.fetchData(info.URL);
        let infoChampion = dataChampion.data[`${info.champion}`]
        console.log(infoChampion);
        let plantilla = `
        <div id="ventanaModal" class="modal">
        <div class="modal-content">
            <span class="cerrar">&times;</span>
            <h2>${infoChampion.name}</h2>
            <p>${infoChampion.title}</p>
        </div>
      </div>`
      console.log(plantilla);
      return plantilla
    },
   async searchCampeones(info){
    const dataAPI = await fecthApi.fetchData(info.URL)
    //trasformar el objeto de detaAPI por un array
    let arrayData = Object.entries(dataAPI.data);
    let text = info.text.charAt(0).toUpperCase() + info.text.slice(1);
    console.log(text);
    const result = arrayData.filter(champion => champion[0].includes(text));
    console.log(result);
    let plantilla = ""
    result.forEach((val,id) => {
        let dataChampion = val[1];
        plantilla += `
        <div class="col-5 col-lg-3  p-3 champions">
            <div>
                <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataChampion.id}_0.jpg" alt="imgChampions">
            </div>
            <div class="text-center text-white">
                <h2>${dataChampion.name}</h2>
                <p>${dataChampion.title}</p>
                <p>rol: ${dataChampion.tags[0]}</p>
                <button class="btn btn-primary w-100 buttonInfo" id=${dataChampion.id}>mas info</button>
            </div>
        </div>`
    });
return plantilla
    }
    
}
self.addEventListener("message", async (e) => {
    const respuesta = await wsMyTargets[`${e.data.module}`](e.data.data);
    postMessage(respuesta)
})