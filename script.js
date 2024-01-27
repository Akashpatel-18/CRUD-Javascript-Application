document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var phoneNumber = document.getElementById("phoneNumber").value
    var genderRadios = document.getElementsByName('gender');
    var interestsCheckboxes = document.getElementsByName('interests');

    var selectedGender = Array.from(genderRadios).find(radio => radio.checked);
   
    var selectedInterests = Array.from(interestsCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

    if(!selectedGender){
        alert("Please select Gender")
        return;
    }else if(selectedInterests.length === 0){
        alert("Please select Interests")
        return;
    }
    
    $('#exampleModal').modal('hide');
    console.log(name, email, phoneNumber, selectedGender.value, selectedInterests)

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementsByName('gender').forEach(radio => radio.checked = false);
    document.getElementsByName('interests').forEach(checkbox => checkbox.checked = false);

})

 
   

