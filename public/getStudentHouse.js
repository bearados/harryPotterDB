var script1 = document.body;

document.addEventListener('DOMContentLoaded', getStudentHouse);



function getStudentHouse() {
    var houseNum = document.getElementById("studHouse").value;
    var selected = document.getElementById(houseNum);
    selected.selected = "selected";

}