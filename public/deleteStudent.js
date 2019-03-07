var script1 = document.body;

document.addEventListener('DOMContentLoaded', bindButtons);
function bindButtons() {
    console.log("in bind buttons");
    setVals();
}


function setVals() {
    var box1 = document.getElementById("fname");
    var box2 = document.getElementById("lname");
/*
    box1.value = context.FirstName;
    box2.value = context.LastName;*/
}