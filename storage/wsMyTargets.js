import fecthApi from "../API/fecthApi.js"
export let wsMyTargets = {
    async showMyTargets(urlAPI){
        const dataAPI = await fecthApi.fetchData(urlAPI)
        //trasformar el objeto de detaAPI por un array
        let arrayData = Object.entries(dataAPI.data);
        console.log(arrayData);
        let plantilla = "";
        console.log(arrayData[9]);
        for (let i = 20; i < 40; i++) {
            let dataChampion = arrayData[i][1];
        plantilla += `
        <div class="col-6 col-lg-3 p-2" >
        <div class="text-center rounded champions"  style="background-image: url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataChampion.id}_0.jpg);background-size: cover;">
              <div class="d-flex flex-column justify-content-between pt-3 w-100 h-100 info" >
                <div>
                <h2>${dataChampion.name.toUpperCase()}</h2>
                <p class="fs-5">"${dataChampion.title}"</p>
                </div>
                <div>
                <p class="fs-5 m-0">Rol:</p>
                <p class="m-0">${dataChampion.tags[0]} ${(dataChampion.tags[1] == undefined) ?"" :", " + dataChampion.tags[1]}</p>
                </div>
                <div class="w-100 fs-5  buttonInfo" id=${dataChampion.id}>Mas Info</div>
              </div>   
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
        <div  class="modal-content bg-transparent" style="position: relative;">
            <span class="cerrar" style="font-size:2rem; color:#c8aa6e; position: absolute; top: 5px;right: 20%;">x</span>
            <div class="container bg-dark text-white">
                <div class="row">
                    <div class="col-12 col-lg-2 mb-2">
                        <div class="d-flex justify-content-center">
                            <div class="mt-2">
                                <img src="http://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/${infoChampion.id}.png" alt="" width="130" height="124">
                            </div>
                        </div> 
                    </div>
                    <div class="col-12 col-lg-10 mb-2 frase">
                        <div style="height: 100%; display:flex; justify-content:center; align-items: center;">
                            <h1 class="fst-italic text-center" style="font-size:3rem ;color:#c8aa6e" >${infoChampion.name}</h1>
                        </div>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <div class="text-white rounded imgStyle" style="background-image: url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${infoChampion.id}_0.jpg);">
                            <div class="p-4 p-md-5" style="background-color: rgba(0, 0, 0, 0.4);">
                              <div id="banner" class="col-md-7 px-0">
                                <h1 class="display-4 fst-italic ">"${infoChampion.title}"</h1>
                                <p class="lead my-lg-3 fs-6" style=" color:#f0e6d2">${infoChampion.lore}</p>
                               </div>
                            </div>
                          </div>
                    </div>
                    <div class="col-12 col-lg-6 mb-3 mb-lg-0">
                        <div class="" style="height: 18rem; overflow: auto;" id="nav">
                            <div class="p-4">
                              <h2 class="fst-italic text-center" style="color:#c8aa6e" >Habilidades</h2>
                              <ol class="list-unstyled d-flex justify-content-center mb-0">
                              <li class="my-4 border-end" style="color:#f0e6d2; width: 25%;">
                              <div class="mb-2 w-100 d-flex justify-content-center">
                                <img src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/passive/${infoChampion.passive.image.full}" width="70" height="64">
                               </div>
                               <h6 class="text-center text-white mb-1">${infoChampion.passive.name}</h6>
                               <p class="px-2" style="text-align: justify;"> ${infoChampion.passive.description}</p>
                               </li>
                               <li class="my-4 border-end" style="color:#f0e6d2; width: 25%;">
                                <div class="mb-2 w-100 d-flex justify-content-center">
                                  <img src="http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${infoChampion.spells[0].image.full}" width="70" height="64">
                                 </div>
                                 <h6 class="text-center text-white mb-1">Q ${infoChampion.spells[0].name}</h6>
                                 <p class="px-2" style="text-align: justify;"> ${infoChampion.spells[0].description}</p>
                                 </li>
                                 <li class="my-4 border-end" style="color:#f0e6d2; width: 25%;">
                                    <div class="mb-2 w-100 d-flex justify-content-center">
                                        <img src="http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${infoChampion.spells[1].image.full}" width="70" height="64">
                                        </div>
                                        <h6 class="text-center text-white mb-1">W ${infoChampion.spells[1].name}</h6>
                                        <p class="text-center">${infoChampion.spells[2].description} </p>
                                </li>
                                <li class="my-4 border-end" style="color:#f0e6d2; width: 25%;">
                                    <div class="mb-2 w-100 d-flex justify-content-center">
                                        <img src="http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${infoChampion.spells[2].image.full}" width="70" height="64">
                                        </div>
                                        <h6 class="text-center text-white mb-1">E ${infoChampion.spells[2].name}</h6>
                                        <p class="text-center">${infoChampion.spells[2].description} </p>
                                </li>
                              </ol>
                            </div>
                           
                          </div>
                    </div>
                    <div class="col-12 col-lg-6" >
                        <h2 class="fst-italic text-center" style="color:#c8aa6e" >Skins</h2>
                        <div class="row mb-2" style="height: 18rem; overflow: auto;">
                        ${infoChampion.skins.map((val,id)=>{
                          let newplantilla = `<div class="col-4 px-2 px-lg-2 mb-2 h-100">
                            <div style="height: 100%; background-image:url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${infoChampion.id}_${val.num}.jpg); background-size: cover;">

                            </div>
                            </div>`
                            return newplantilla
                        }).join("")}
                        </div>
                    </div>
                </div>
            </div>
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
        <div class="col-6 col-lg-3 p-2" >
        <div class="text-center rounded champions"  style="background-image: url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataChampion.id}_0.jpg);background-size: cover;">
              <div class="d-flex flex-column justify-content-between pt-3 w-100 h-100 info" >
                <div>
                <h2>${dataChampion.name.toUpperCase()}</h2>
                <p class="fs-5">"${dataChampion.title}"</p>
                </div>
                <div>
                <p class="fs-5 m-0">Rol:</p>
                <p class="m-0">${dataChampion.tags[0]} ${(dataChampion.tags[1] == undefined) ?"" :", " + dataChampion.tags[1]}</p>
                </div>
                <div class="w-100 fs-5  buttonInfo" id=${dataChampion.id}>Mas Info</div>
              </div>   
            </div>
        </div>`
    });
return plantilla
    },

    async filterTanks(info){
        const dataAPI = await fecthApi.fetchData(info.url)
    //trasformar el objeto de detaAPI por un array
    let arrayData = Object.entries(dataAPI.data);
    let opcion = info.opcion
    
    const result = arrayData.filter(champion => champion[1].tags[0] == opcion || champion[1].tags[1] == opcion);
    let plantilla = "";

    result.forEach((val,id) => {
        let dataChampion = val[1];
        plantilla += `
        <div class="col-6 col-lg-3 p-2" >
        <div class="text-center rounded champions"  style="background-image: url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataChampion.id}_0.jpg);background-size: cover;">
              <div class="d-flex flex-column justify-content-between pt-3 w-100 h-100 info" >
                <div>
                <h2>${dataChampion.name.toUpperCase()}</h2>
                <p class="fs-5">"${dataChampion.title}"</p>
                </div>
                <div>
                <p class="fs-5 m-0">Rol:</p>
                <p class="m-0">${dataChampion.tags[0]} ${(dataChampion.tags[1] == undefined) ?"" :", " + dataChampion.tags[1]}</p>
                </div>
                <div class="w-100 fs-5  buttonInfo" id=${dataChampion.id}>Mas Info</div>
              </div>   
            </div>
        </div>`
    });
    return plantilla

    },
    
}
self.addEventListener("message", async (e) => {
    const respuesta = await wsMyTargets[`${e.data.module}`](e.data.data);
    postMessage(respuesta)
})