var script1 = document.body;

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    console.log("in bind buttons");
    document.getElementById('stusub').addEventListener('click', function (event) { searchStudent(); });
    //document.getElementById('Del').addEventListener('click', function (event) { deleteStudent(); });
}

function searchStudent() {
    console.log("inside searchStudent function");
    var req = new XMLHttpRequest();
    var inputs = { FirstName: null, LastName: null };
    inputs.FirstName = document.getElementById("fname").value;
    inputs.LastName = document.getElementById("lname").value;
    console.log("searchStudent: " + inputs);
    var values = JSON.stringify(inputs);
    console.log(values);
    req.open("POST", "http://flip3.engr.oregonstate.edu:5931/findStudent", true);
    req.setRequestHeader('Content-Type', 'application/json');
    /*req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            console.log("success");
        }
        else {
            console.log("Error in Network Request");
        }

    });*/
    req.send(values);
    event.preventDefault();
}


function deleteStudent() {
    console.log("in delete Student function");
    var req = new XMLHttpRequest();
    var student = {};
    student.firstName = document.getElementById("fn");
    student.lastName = document.getElementById("ln");
    var url = "http://flip3.engr.oregonstate.edu:5931/deleteStudent?firstName=" + student.firstName + "&lastName=" + student.lastName;
    req.open("GET", url, true);
    req.send(null);
    event.preventDefault();
}