const firstNameInput = document.getElementById('firstname-input');
const lastNameInput = document.getElementById('lastname-input');
const userNameInput = document.getElementById('username-input');
const emailInput = document.getElementById('email-input');
const submitBtn = document.getElementById('submit-btn');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');
const dataList = document.querySelector('.collection');

const database = firebase.database();
const rootRef = database.ref('users');

rootRef.orderByKey().on('value', snapshot =>{
    displayDatabase(snapshot.val());
})

function displayDatabase(data){
    removeData();
    const dataBaseData = document.createElement('li');
    dataBaseData.className = "collection-item";
    let html = "";
    if(data === null){
        html = `
            <span>The Database Is Currently Empty!</span>
        `;
        dataBaseData.innerHTML = html;
    }else{
        let users = Object.keys(data);
        html = "";

        users.map((user) =>{
            let info = data[user]
            html += `
                <div class="container">
                    <h4 id="user-id">Username: ${info.username}</h4>
                    <span class="paragraph">First Name: ${info.first_name}</span>
                    <br>
                    <span class="paragraph">Last Name: ${info.last_name}</span>
                    <br>
                    <span class="paragraph">Email: ${info.email}</span>
                    <br>
                </div>
                `;
        })

        dataBaseData.innerHTML = html;
    }
    dataList.appendChild(dataBaseData);
}

function removeData(){
    dataList.innerHTML = "";
}

submitBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    if(userNameInput.value === "" || firstNameInput.value === "" || lastNameInput.value === "" || emailInput.value === ""){
        showAlert("Please Fill In All of The Fields!", "warning");
    }else{
        const newData = {
            first_name: firstNameInput.value,
            last_name: lastNameInput.value,
            username: userNameInput.value,
            posts: [],
            email: emailInput.value
        };
        rootRef.child(newData.username).set(newData);
        showAlert("Data Has Been Uplaoded to Database!", "success"); 
    }
});

editBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    if(userNameInput.value === ""){
        showAlert("A Username is required inorder to make changes!", "warning");
    }else{
        const updatedData = {
            username: userNameInput.value,
            first_name: firstNameInput.value,
            last_name: lastNameInput.value,
            email: emailInput.value
        }

        rootRef.child(updatedData.username).update(updatedData);
        showAlert(`User: ${updatedData.username}'s data has been updated!`, "success");
        clearInputs();
    }
})

deleteBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    if(userNameInput.value !== '' && (firstNameInput.value === "" && lastNameInput.value === "" && emailInput.value === "")){
        rootRef.child(userNameInput.value).remove().then(() =>{
            showAlert(`User: ${userNameInput.value} has Successfuly been Removed from the Database!`, 'success');
            clearInputs();
        })
        .catch(err =>{
            showAlert(err, 'warning');
        });
    }else{
        showAlert("Username is Required to Remove a User! And/Or do not include any other field!", "warning");
    }
})

function clearInputs(){
    firstNameInput.value = "";
    lastNameInput.value = "";
    userNameInput.value = "";
    emailInput.value = "";
}

function showAlert(message, className){
    console.log(message, className)
    const alert = document.createElement('div');
    const body = document.querySelector('.input-container');
    const main = document.body;

    if(className === "warning"){
        alert.className = "container #d32f2f red darken-2 center warning alert"
    }

    if(className === "success"){
        alert.className = "container #00c853 green accent-4 center success alert"
    }

    alert.innerHTML = `
        <span class="paragraph">${message}</span>
    `;

    if(document.querySelector('.alert') === null){
        main.insertBefore(alert, body);
        setTimeout(() =>{
            alert.remove();   
        }, 3000);
    }
}
