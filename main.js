let title = document.getElementById('title');

let price = document.getElementById('price');

let taxes = document.getElementById('taxes');

let ads = document.getElementById('ads');

let discount = document.getElementById('discount');

let total = document.getElementById('total');

let count = document.getElementById('count');

let categorie = document.getElementById('categorie');

let submit = document.getElementById('submit');

let mood = 'creat'
 
let x;
 

//get total


function getTotal(){

    if (price.value != ''){

        let result = (+price.value) + (+taxes.value) - (+discount.value)

        total.innerHTML = result

        total.style.background = '#040';

    }else{

        total.innerHTML='';

        total.style.background='#950909';

    }

}
//cerat product
let dataPro;

if(localStorage.product!=null){

    //localstorage katkhzn les donnes fsite wst file dial json

    dataPro=JSON.parse(localStorage.product)

} else {

    dataPro = []

}

submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),

        price:price.value,

        taxes:taxes.value,

        ads:ads.value,

        discount:discount.value,

        total:total.innerHTML,

        count:count.value,

        categorie:categorie.value.toLowerCase(),
    }

    if(title.value != ''&& count.value<100){
        if(mood === 'creat' ){
            //dekhl les donnes dial newrpo flarray datapro
                if (newpro.count > 1){
    
                for(let i = 0 ; i <=newpro.count ;i++){
    
                    dataPro.push(newpro)
                }
                }else{
                    dataPro.push(newpro)
                    }
    
    
            }else{
                dataPro[x] = newpro
                mood = 'creat' 
                submit.innerHTML = 'creat'
                count.style.display="block"
            }
    
            localStorage.setItem('product',JSON.stringify(dataPro))
    
            console.log(dataPro)
    
            clearData()
    
            showData()
    }else{
        
    }
        
}
//clear inputs

function clearData(){
    title.value=''
    price.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    categorie.value=''
    taxes.value=''
}
//read

function showData(){
    getTotal()
    let table =''

    for(let i = 0 ; i < dataPro.length ; i++){

        table += `<tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].categorie}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`
        let x = i;
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelet = document.getElementById("deletAll")    
    if( dataPro.length > 0){

        btnDelet.innerHTML = `<button onclick="deletAll()"> delete all (${dataPro.length})</button>`

    }else{
        btnDelet.innerHTML = ''
    }

    

      
}
showData()

function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deletAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()

}

function updateData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    categorie.value = dataPro[i].categorie
    count.style.display = "none"
    getTotal()
    submit.innerHTML = 'update'
    mood = 'update'  
    scroll({
        top:0,
        behavior:'smooth',
    });
}

//search

let searchMood = 'title';

function getSearchMood (id){

    let search = document.getElementById('search')
    if (id === 'searchTitle'){

        searchMood = 'title'
    }else{
        searchMood = 'categorie'
    }
    search.placeholder='search by' + searchMood
    search.focus()
    search.value = ''
    showData()
    

}

function searchdata(value){
    let table='';
    for(let i = 0 ; i<dataPro.length;i++){
    if(searchMood=='title'){
        if(dataPro[i].title.includes(value.toLowerCase())){
            table += `<tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].categorie}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
        
    }
}else{
     
            if(dataPro[i].categorie.includes(value.toLowerCase())){
                table += `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].categorie}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`
        
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}