function loadTable() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.mecallapi.com/api/users");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let content = "";
      const response = JSON.parse(this.responseText);
      for (let object of response) {
        content += "<tr>";
        content += `<td>${object["id"]}</td>`;
        content += `<td><img width="50px" src="${object["avatar"]}" class="avatar"></td>`;
        content += `<td> ${object["username"]}</td>
        <td> ${object["fname"]}</td>
        <td> ${object["lname"]}</td>`;
        content += `<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(${object["id"]})">Edit</button> <button type="button" class="btn btn-outline-danger" onclick="userDelete(${object["id"]})">Del</button></td>`;
        content += "</tr>";
      }
      let mytable = document.getElementById("mytable");
      mytable.innerHTML = content;
    }
  };
}

loadTable();

function showUserCreateBox() {
  Swal.fire({
    title: "Create User",
    html:
      '<input id="id" type="hidden">' +
      '<input id="fname" class="swal2-input" placeholder="First">' +
      '<input id="lname" class="swal2-input" placeholder="Last">' +
      '<input id="username" class="swal2-input" placeholder="Username">' +
      '<input id="email" class="swal2-input" placeholder="Email">',
    // focusConfirm: false,
    preConfirm: () => {
      userCreate();
    },
  });
}

function userCreate() {
  const username = document.getElementById("username").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://www.mecallapi.com/api/users/create");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(
    JSON.stringify({
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: "https://www.mecallapi/users/cat.png",
    })
  );

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      Swal.fire(response["message"]);
      loadTable();
    }
  };
}

function showUserEditBox(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.mecallapi.com/api/users/" + id);
  xhr.send();
  xhr.onreadystatechange = function () {
    if ((this.readyState == 4) & (this.status == 200)) {
      const response = JSON.parse(this.responseText);
      const user = response["user"];
      Swal.fire({
        title: "Edit User",
        html: `<input id="id" type="hidden" value='${user["id"]}'>
          <input id="fname" class="swal2-input" placeholder="First" value="${user["fname"]}">
          <input id="lname" class="swal2-input" placeholder="Last" value="${user["lname"]}">
          <input id="username" class="swal2-input" placeholder="Username" value="${user["username"]}">
          <input id="email" class="swal2-input" placeholder="Email" value="${user["email"]}">`,
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        },
      });
    }
  };
}

function userEdit() {
  const id = document.getElementById("id").value;
  const username = document.getElementById("username").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "https://www.mecallapi.com/api/users/update");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(
    JSON.stringify({
      id: id,
      username: username,
      fname: fname,
      lname: lname,
      email: email,
      avatar: "https://www.mecallapi/users/cat.png",
    })
  );
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      Swal.fire(response["message"]);
      loadTable();
    }
  };
}

function userDelete(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "https://www.mecallapi.com/api/users/delete");
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.send(
    JSON.stringify({
      id: id,
    })
  );
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      const response = JSON.parse(this.responseText);
      Swal.fire(response["message"]);
      loadTable();
    }
  };
}
