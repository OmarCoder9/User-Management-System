const initialUsers = [
  {
    id: 1,
    name: "Omar Ahmed",
    email: "omar.ahmed9806@gmail.com",
    age: 19,
    specialty: "Backend Developer",
  },
  {
    id: 2,
    name: "Jana Tamer",
    email: "janatamer583@gmail.com",
    age: 20,
    specialty: "Frontend Developer",
  },
  {
    id: 3,
    name: "Gumball Watterson",
    email: "gumball@gmail.com",
    age: 26,
    specialty: "Manager",
  },
  {
    id: 4,
    name: "Eren Yeger",
    email: "Rumbling@gmail.com",
    age: 19,
    specialty: "Penteration Tester",
  },
  {
    id: 5,
    name: "Levi Ackerman",
    email: "Levi@gmail.com",
    age: 23,
    specialty: "Data Analyst",
  },
];

let initialCounter = 5;
displayUsers(initialUsers);
const popup = document.getElementById("userPopup");
const openBtn = document.getElementById("openPopup");
const addBtn = document.getElementById("addUser");
const errorMessage = document.getElementById("errorMessage");

openBtn.onclick = () => {
  popup.style.display = "flex";
};

window.onclick = (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
};

addBtn.onclick = () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const specialty = document.getElementById("specialty").value.trim();

  errorMessage.textContent = "";

  if (!name || !email || !age || !specialty) {
    errorMessage.textContent = "All fields are required!";
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    errorMessage.textContent = "Name must contain letters only.";
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errorMessage.textContent = "Enter a valid email.";
    return;
  }

  if (isNaN(age) || age <= 0) {
    errorMessage.textContent = "Age must be a positive number.";
    return;
  }

  if (editUserId) {
    const confirmEdit = confirm("Are you sure you want to update this user?")
    // if(!confirmEdit)return;
    const user = initialUsers.find((u) => u.id === editUserId);
    user.name = name;
    user.email = email;
    user.age = age;
    user.specialty = specialty;

    editUserId = null;
    addBtn.textContent = "Add";
  } else {
    initialCounter += 1;
    initialUsers.push({
      id: initialCounter,
      name,
      email,
      age,
      specialty,
    });
  }

  popup.style.display = "none";
  displayUsers(initialUsers);

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
};

const searchInput = document.getElementById("searchInput");
const specialityFilter = document.getElementById("specialtyFilter");
const filterUsers = () => {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedSpecialty = specialityFilter.value;
  const filteredUsers = initialUsers.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(searchValue);
    const matchesSpeciality =
      selectedSpecialty === "" || user.specialty === selectedSpecialty;

    return matchesName && matchesSpeciality;
  });
  displayUsers(filteredUsers);
};
searchInput.addEventListener("input", filterUsers);
specialityFilter.addEventListener("change", filterUsers);

function displayUsers(users) {
  const container = document.getElementById("usersContainer");
  container.innerHTML = "";

  if (users.length === 0) {
    container.innerHTML = `
      <div id="emptyState" class="empty-state">
        <h3>No Users Found</h3>
        <p>Try adjusting your search or add a new user</p>
      </div>`;
    return;
  }

  users.forEach((user) => {
    container.innerHTML += `
      <div class="user-card"> 
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Age: ${user.age}</p>
        <p>Specialty: ${user.specialty}</p>

        <div class="card-actions">
          <button onclick="editUser(${user.id})" class="btn-edit">Edit</button>
          <button onclick="deleteUser(${user.id})" class="btn-delete">Delete</button>
        </div>
      </div>
    `;
  });
}

function deleteUser(id) {
  const user = initialUsers.find((user) => user.id === id);
  if (!user) return;

  const confirmDelete = confirm(`Are you sure you want to delete ${user.name}`);

  if (confirmDelete) {
    const index = initialUsers.findIndex((user) => user.id === id);
    if (index !== -1) {
      initialUsers.splice(index, 1);
      displayUsers(initialUsers);
    }
  }
}

let editUserId = null;

function editUser(id) {
  const user = initialUsers.find((user) => user.id === id);
  if (!user) return;

  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("age").value = user.age;
  document.getElementById("specialty").value = user.specialty;

  editUserId = id;
  addBtn.textContent = "Update";

  popup.style.display = "flex";
}
