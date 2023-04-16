console.log("Welcome to Note-taking Site");
showNotes();

// code to add data in local storage from text area 
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");
    let notes = localStorage.getItem('notes');
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let inputData={
        Title : addTitle.value,
        Txt : addTxt.value
    }
    notesObj.push(inputData);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value="";
    showNotes();
})

// fuction to show element from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let  html="";
    notesObj.forEach((element,index) => {
        html+=
         `<div class="noteCard card mx-2 my-2" style="width: 18rem;">
           <div class="card-body">
            <h5 class="card-title">${element.Title}</h5>
            <p class="card-text" id="card-text">${element.Txt}</p>
            <button id=${index} onClick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
          </div>
      </div>`
    });

    let myNote=document.getElementById('notes');
    if(notesObj.length!=0){
        myNote.innerHTML=html;
    }
    else{
        myNote.innerHTML=`<strong>Nothing to show . Please add a note above in "Add a Note" section !</strong> `;
    }
}

// fuction to delete node
function deleteNote(index){
    let notes=localStorage.getItem('notes');
    let notesObj;
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
        notesObj.splice(index,1);
    }
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

// code  to search note

let search=document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let searchVal=search.value.toLowerCase();
    //console.log(searchVal); 

    let noteCard=document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardTitle=element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        let cardTxt=element.getElementsByTagName('p')[0].innerText.toLowerCase();
        
        if(cardTxt.includes(searchVal) || cardTitle.includes(searchVal)){
           element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })

})