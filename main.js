const initialUsers = [
    {
        id: 1,
        name: "Omar Ahmed",
        email: "omar.ahmed9806@gmail.com",
        age: 21,
        specialty: "Backend Developer"
    },
    {
        id: 2,
        name: "Jana Tamer",
        email: "janaTamer583@gmail.com",
        age: 20,
        specialty: "Frontend Developer"
    },
    {
        id: 3,
        name: "Gumball Watterson",
        email: "gumball@gmail.com",
        age: 26,
        specialty: "Manager"
    },
    {
        id: 4,
        name: "Eren Yeger",
        email: "Rumbling@gmail.com",
        age: 19,
        specialty: "Penteration Tester"
    },
    {
        id: 5,
        name: "Levi Ackerman",
        email: "Levi@gmail.com",
        age: 23,
        specialty: "Data Analyst"
    }
];
  
  
  displayUsers(initialUsers)
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
    initialUsers.push({id: initialUsers.length + 1, name, email, age, specialty})
    popup.style.display = "none";
    displayUsers(initialUsers)    
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("specialty").value = "";
  };
  
  
  const searchInput = document.getElementById("searchInput");
  const specialityFilter = document.getElementById("specialtyFilter");
  const filterUsers = () => {
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedSpecialty = specialityFilter.value;
    const filteredUsers = initialUsers.filter(user => {
      const matchesName = user.name.toLowerCase().includes(searchValue);
      const matchesSpeciality = selectedSpecialty === "" || user.specialty === selectedSpecialty;
  
      return matchesName && matchesSpeciality;
    })
    displayUsers(filteredUsers);
  }
  searchInput.addEventListener("input", filterUsers)
  specialityFilter.addEventListener("change", filterUsers)
  function displayUsers(users){
    const container = document.getElementById("usersContainer");
    container.innerHTML = "";
    if(users.length === 0){
      container.innerHTML = `<div id="emptyState" class="empty-state">
                  <h3>No Users Found</h3>
                  <p>Try adjusting your search or add a new user</p>
              </div>`;
        return;
    }
    users.forEach(user=>{
      container.innerHTML += `
        <div class="user-card"> 
          <h3>Name: ${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Age: ${user.age}</p>
          <p>Specialty: ${user.specialty}</p>
        </div>
      `;
    })
  }
