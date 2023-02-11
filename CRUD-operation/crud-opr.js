function validateForm() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var email = document.getElementById("email").value;

  if (name == "") {
    alert("name is required ");
    return false;
  }

  if (age == "") {
    alert("age is required");
    return false;
  } else if (age < 1) {
    alert("age must be greater than one");
    return false;
  }

  if (address == "") {
    alert("address is required");
    return false;
  }

  if (email == "") {
    alert("email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email address");
    return false;
  }

  return true;
}

function showData() {
  var peoplelist;
  if (localStorage.getItem("peoplelist") == null) {
    peoplelist = [];
  } else {
    peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
  }

  var html = "";
  peoplelist.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.address + "</td>";
    html += "<td>" + element.email + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button></td>';
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();

function AddData() {
  if (validateForm() == true) {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    var peoplelist;
    if (localStorage.getItem("peoplelist") == null) {
      peoplelist = [];
    } else {
      peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    peoplelist.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });

    localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
}

function deleteData(index) {
  var peoplelist;
  if (localStorage.getItem("peoplelist") == null) {
    peoplelist = [];
  } else {
    peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
  }

  peoplelist.splice(index, 1);
  localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
  showData();
}

function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  var peoplelist;
  if (localStorage.getItem("peoplelist") == null) {
    peoplelist = [];
  } else {
    peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
  }

  document.getElementById("name").value = peoplelist[index].name;
  document.getElementById("age").value = peoplelist[index].age;
  document.getElementById("address").value = peoplelist[index].address;
  document.getElementById("email").value = peoplelist[index].email;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true)
      peoplelist[index].name = document.getElementById("name").value;
    peoplelist[index].age = document.getElementById("age").value;
    peoplelist[index].address = document.getElementById("address").value;
    peoplelist[index].email = document.getElementById("email").value;

    localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
    showData();

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";

    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "none";
  };
}
