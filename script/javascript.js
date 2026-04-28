var selectedIndex = null;
var array1 = new Array();
array1.push({"SüteményNév":"Eszterházy","SüteményTípus":"szelet","ÁR":"2000"});
array1.push({"SüteményNév":"Oroszkrém","SüteményTípus":"torta","ÁR":"2500"});
printArray();
function printArray(){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    table.innerHTML="";
    var newRow;
    for (i = 0; i < array1.length; i++) {
        newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = array1[i].SüteményNév;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = array1[i].SüteményTípus;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = array1[i].ÁR;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = '<a onClick="onEdit('+i+')" class="edit">Edit</a>' + '<a onClick="onDelete('+i+')" class="del">Delete</a>';
    }
}
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex==null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function readFormData() {
    var formData = {};
    formData["SüteményNév"] = document.getElementById("SüteményNév").value;
    formData["SüteményTípus"] = document.getElementById("SüteményTípus").value;
    formData["ÁR"] = document.getElementById("ÁR").value;
    
    return formData;
}

function insertNewRecord(data) {
    array1.push({"SüteményNév":data.SüteményNév,"SüteményTípus":data.SüteményTípus,"ÁR":data.ÁR});
    
    printArray();
}

function resetForm() {
    document.getElementById("SüteményNév").value = "";
    document.getElementById("SüteményTípus").value = "";
    document.getElementById("ÁR").value = "";
   
    selectedIndex=null;
}
function onEdit(index) {
    document.getElementById("SüteményNév").value = array1[index].SüteményNév;
    document.getElementById("SüteményTípus").value = array1[index].SüteményTípus;
    document.getElementById("ÁR").value = array1[index].ÁR;
    
    selectedIndex=index;
}
function updateRecord(formData) {
    array1[selectedIndex].SüteményNév=formData.SüteményNév;
    array1[selectedIndex].SüteményTípus=formData.SüteményTípus;
    array1[selectedIndex].ÁR=formData.ÁR;
    
    printArray();
}
function onDelete(index) {
    if (confirm('Are you sure to delete this record ?')) {
        array1.splice(index, 1); // Deleting the entry with the specified index
        resetForm();
        printArray();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("SüteményNév").value == "") {
        isValid = false;
        document.getElementById("SüteményValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("SüteményValidationError").classList.contains("hide"))
            document.getElementById("SüteményValidationError").classList.add("hide");
    }
    return isValid;
}