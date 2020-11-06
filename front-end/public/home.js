console.log("indexLogin.js running...")

const displayUsers = document.querySelector("#displayUsers")
const usersHeading = document.querySelector("#usersHeading")
const signUpForm = document.querySelector("#signUpForm")
const loginForm = document.querySelector("#loginForm")

axios.get('http://localhost:3000/display-users')
    .then(function(response){
        console.log(response.data)
        let userArr = response.data
        displayHeading()
        userArr.forEach(renderUser)
    })
    .catch(function(err){
        console.log(err)
    })

function renderUser(obj){
    console.log(obj)
    let userDiv = document.createElement('div')
    let pInfo = document.createElement('p')
    pInfo.innerHTML = `<b>${obj.fullName}</b> has visited the site <b>${obj.visits}</b> times.`
    userDiv.appendChild(pInfo)
    displayUsers.appendChild(userDiv)
};

function displayHeading(){
    let heading = document.createElement('h2')
    let line = document.createElement('hr')
    heading.innerHTML = "Registered Users"
    usersHeading.appendChild(line)
    usersHeading.appendChild(heading)
    usersHeading.appendChild(line)
};

function checkHighest(array){
    array.forEach(function(obj){
        
    })
}

loginForm.addEventListener("submit", function(event){
    console.log("submit btn HIT!")
    event.preventDefault()
    console.log(loginForm)
    
    var formData = new FormData(loginForm)
    console.log("form data:")
    console.log(formData)

    axios.post('http://localhost:3000/login', formData)
        .then(function(response) {
            const user = response.data[0]
            console.log("In post response")
            console.log(user)
            let id = user._id
            console.log(id)
            let changeVisits = user.visits + 1
            console.log(changeVisits)

            axios.patch(`http://localhost:3000/users/${id}`, { visits: changeVisits })
                .then(function(response){
                    let update = response.data
                    console.log(update)
                    while (displayUsers.children.length > 0){
                        displayUsers.removeChild(displayUsers.firstChild)
                    }
                    update.forEach(renderUser)
                })
                .catch(function(err) {
                    console.log(err)
                })

        })
        .catch(function(err) {
            console.log(err)
        })  
    loginForm.reset()
});

signUpForm.addEventListener("submit", function(event){
    console.log("submit btn HIT!")
    event.preventDefault()

    var formData = new FormData(signUpForm)
    console.log("form data:")
    console.log(formData)
    
    axios.post('http://localhost:3000/sign-up', formData)
        .then(function(response) {
            const newUser = response.data
            console.log("post sent")
            console.log(newUser)
            renderUser(newUser)
        })
        .catch(function(err) {
            console.log(err)
        })
    signUpForm.reset()
});