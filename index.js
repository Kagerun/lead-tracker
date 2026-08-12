const inputbtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
let myLeads = [];
const tabBtn = document.getElementById("tab-btn");
const delBtn = document.getElementById("delete-btn");
const leadsfromlocalStorage=JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsfromlocalStorage);



if (leadsfromlocalStorage){
    myLeads = leadsfromlocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

delBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    ulEl.innerHTML="";
    render(myLeads);
})

inputbtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value="";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})
function render(leads){
    let listItems = "";
    for (let i = 0; i<leads.length;i++){
        listItems += `
        <li> 
            <a href="${leads[i]}" target="_blank">${leads[i]}</a>
        </li>`
        ulEl.innerHTML= listItems;
    }
}
