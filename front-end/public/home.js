console.log("indexLogin.js running...")

const displayUsers = document.querySelector("#displayUsers")
const signUpForm = document.querySelector("#signUpForm")
const loginForm = document.querySelector("#loginForm")

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
                .then(function(x){
                    console.log(x)
                })
                .catch(function(err) {
                    console.log(err)
                })

        })
        .catch(function(err) {
            console.log(err)
        })  
    
});

signUpForm.addEventListener("submit", function(event){
    console.log("submit btn HIT!")
    event.preventDefault()

    var formData = new FormData(signUpForm)
    console.log("form data:")
    console.log(formData)
    
    axios.post('http://localhost:3000/sign-up', formData)
        .then(function(response) {
            const newUser = response
            console.log("post sent")
            console.log(newUser)
        })
        .catch(function(err) {
            console.log(err)
        })
    signUpForm.reset()
});

axios.get('http://localhost:3000/display-users')
    .then(function(response){
        console.log(response.data)
        let userArr = response.data

        let heading = document.createElement('h2')
        let line = document.createElement('hr')
        heading.innerHTML = "Registered Users"
        displayUsers.appendChild(line)
        displayUsers.appendChild(heading)
        displayUsers.appendChild(line)

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
}
