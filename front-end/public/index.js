console.log("index.js is running")

const userDisplay = document.querySelector("#display-users")
const loginBtn = document.querySelector("#login")
const formDisplay = document.querySelector("#formDisplay")

axios.get('http://localhost:3000/display-users')
    .then(function(response) {
        //remove previously displayed data
        while (userDisplay.children.length > 0) {
            userDisplay.removeChild(userDisplay.firstChild)
        }

        const userArr = response.data
        console.log(userArr)
        userArr.forEach(displayVisits)

    })
    .catch(function(err) {
        console.log(err)
    });  

function displayVisits (obj){
    console.log(obj.firstName)
    let entry = document.createElement('p')
    entry.innerHTML = `${obj.firstName} ${obj.lastName} visited the page ${obj.visits} times.`
    userDisplay.appendChild(entry)
}

loginBtn.addEventListener("click", function(){
    
})