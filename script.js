var editId;

document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    if(editId !== undefined){

        var listData = JSON.parse(sessionStorage.getItem("session"))

        listData[editId].name = document.getElementById("name").value
        listData[editId].email = document.getElementById("email").value
        listData[editId].phoneNumber = document.getElementById("phoneNumber").value
        var genderRadios = document.getElementsByName('gender');
        listData[editId].gender = Array.from(genderRadios).find(radio => radio.checked).value
        listData[editId].enquiry = document.getElementById("enquiry").value
        listData[editId].message = document.getElementById('floatingTextarea').value

        sessionStorage.setItem("session", JSON.stringify(listData))
        show()
       
        editId = undefined;
        $('#exampleModal').modal('hide');
        return;

    } 
        var name = document.getElementById("name").value
        var email = document.getElementById("email").value
        var phoneNumber = document.getElementById("phoneNumber").value
        var genderRadios = document.getElementsByName('gender');
        var enquiry = document.getElementById("enquiry").value
        var message = document.getElementById('floatingTextarea').value
        // var interestsCheckboxes = document.getElementsByName('interests');
    
        var selectedGender = Array.from(genderRadios).find(radio => radio.checked);
    
        if(!selectedGender){
            alert("Please select Gender")
            return;
        }
       
        var gender = selectedGender.value
        var listData;
        if(sessionStorage.getItem("session") == null){
            listData = [];
        }else{
            listData = JSON.parse(sessionStorage.getItem("session"))
        }
    
        listData.push({name, email, phoneNumber, gender, enquiry, message})
        sessionStorage.setItem("session", JSON.stringify(listData))
        show()
    
    

    $('#exampleModal').modal('hide');
    
})

function edit(id) {
    console.log(id)
    editId = id;
    updatingLabel()
    var listData = JSON.parse(sessionStorage.getItem("session"))
    console.log(listData)
    document.getElementById('name').value = listData[editId].name
    document.getElementById('email').value = listData[editId].email
    document.getElementById('phoneNumber').value = listData[editId].phoneNumber
    document.querySelector('input[name="gender"][value="' + listData[editId].gender + '"]').checked = true
    document.getElementById('enquiry').value = listData[editId].enquiry
    document.getElementById('floatingTextarea').value = listData[editId].message

}

function trash(id){
    console.log(id)
    var confirmDelete = window.confirm("Do you want to Delete?")
    if(confirmDelete){
        
        var listData = JSON.parse(sessionStorage.getItem("session"))
        
        listData.splice(id,1)
        sessionStorage.setItem("session", JSON.stringify(listData))
        show()

    }
}

function show() {
    var listData;
    var table = document.getElementById('table')
    var tbody = document.getElementById('tbody')
    var noData = document.getElementById('noData')
    var html = ""
    if(JSON.parse(sessionStorage.getItem("session")) == null){
        listData = [];
    }else{
        listData = JSON.parse(sessionStorage.getItem("session"))
        noData.style.display = "none";
        
        listData.forEach(function (item,index) {
            html += `
            <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phoneNumber}</td>
            <td>${item.gender}</td>
            <td>${item.enquiry}</td>
            <td>${item.message}</td>
            <td>
              <i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="edit(${index})"></i
              ><i class="fa-solid fa-trash-can" onclick="trash(${index})"></i>
            </td>
          </tr>
            `
        })
        tbody.innerHTML = html;
    }
   }

   document.getElementById("openModal").addEventListener('click', function(){
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementsByName('gender').forEach(radio => radio.checked = false);
    document.getElementById("enquiry").value = "";
    document.getElementById("floatingTextarea").value = "";
    updatingLabel()
})

function updatingLabel(){
    if(editId !== undefined){
        document.getElementById("exampleModalLabel").innerHTML = "Edit Enquiry";
        document.getElementById('add').innerHTML = "Save";
    }else{
        
        document.getElementById("exampleModalLabel").innerHTML = "Add Enquiry";
        document.getElementById('add').innerHTML = "Submit";
    }
}

document.getElementById('topClose').addEventListener('click', function(){
    editId = undefined
    updatingLabel()
})

document.getElementById('bottomClose').addEventListener('click', function(){
    editId = undefined
    updatingLabel()
})
