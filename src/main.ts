const recuperationAfficherDrapeau = document.querySelector(".affichageDrapeau")! as HTMLDivElement
const recuperationBoutons = document.querySelector(".boutons")! as HTMLDivElement
const recuperationResultat = document.querySelector(".resultat")! as HTMLDivElement
const recuperationContainerDrapeau = document.querySelector(".containerDrapeau")! as HTMLDivElement

fetch("https://restcountries.com/v3.1/all").then(function(response){
    let contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json")!== -1 ){
        return response.json().then(function(datas) {
            startApplication(datas)
        })
    }  else {
        document.querySelector(".containerDrapeau")!.textContent="Les informations récupérées ne sont pas au format JSON";
    }
})

type Pays = {
    name:string;
    drapeau:string;
    alt:string;
}

type Datas = {
    flags:{
        alt:string;
        svg:string;
    };
    translations: {
        fra: {
            communs: string
            [props:string]:any
        }
        [props:string]:any
        
    }
    [props:string]:any
}


let listePays:Pays[]=[]
let randomPays:Pays;
let pays:Pays;
let creationDeBoutonAppele=false;

function startApplication(datas:Datas[]){
    // console.log(datas)
    for(let i=0;i<datas.length;i++){
        // console.log(datas[i].translations.fra.common)
        // console.log(datas[i].flags.svg)
        pays={
            name:datas[i].translations.fra.common,
            drapeau:datas[i].flags.svg,
            alt:datas[i].flags.alt
        } 
        listePays.push(pays)
    }
    randomPays=getRandomPays(listePays);
    recuperationAfficherDrapeau.innerHTML=`<img alt="${randomPays.alt}" src=${randomPays.drapeau}>`
    let nouveauTableauSolutions=listeResultat(randomPays.name,listePays)
    for (let i = 0; i < nouveauTableauSolutions.length; i++) {
        recuperationBoutons.innerHTML += `<button class="${nouveauTableauSolutions[i]} ">${nouveauTableauSolutions[i]}</button>`;
    }


    let recuperationBoutonsClique = document.querySelectorAll("button")
    
    recuperationBoutonsClique.forEach(bouton=>{
        bouton.addEventListener("click",function(){
            const classeBoutonClique = bouton.textContent;
            if(classeBoutonClique===randomPays.name){
                recuperationResultat.innerHTML="Bravo vous avez trouvé la bonne réponse"
               
            }else{
                recuperationResultat.innerHTML="Vous n'avez pas la bonne réponse"
                
            }
            if (!creationDeBoutonAppele) {
                creationDeBouton();
                creationDeBoutonAppele = true;
            }
        })
    })

}

function getRandomPays(in_listePays:Pays[]):Pays{
    const random=Math.floor(Math.random() * in_listePays.length)
    return in_listePays[random];
}

function listeResultat(in_randomPays:string,in_listePays:Pays[]){
    let nouveauxTableau=[]
    for(let i=0;i<3;i++){
        const randomListeResultat=Math.floor(Math.random() * in_listePays.length)
        nouveauxTableau.push(in_listePays[randomListeResultat].name);
     
    }
    nouveauxTableau.push(in_randomPays)
    shuffleArray(nouveauxTableau);
    return nouveauxTableau
}


function shuffleArray(array:any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function creationDeBouton() {
    let bouton = document.createElement("button");
    let texteBouton = document.createTextNode("Changer de drapeau");
    bouton.appendChild(texteBouton);
    recuperationContainerDrapeau.insertAdjacentElement("beforeend",bouton)

    bouton.addEventListener("click",function(){
        window.location.reload();
    })
}


// function validationDuResultat(in_paysCorrect:string){

//     const recuperat

//     if(in_paysCorrect===)
// }