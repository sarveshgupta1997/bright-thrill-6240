
import navbar from "./navbar.js"
import baseURL from "./baseURL.js"
document.getElementById("navbar").innerHTML=navbar();


let token = localStorage.getItem("token");
let loggedUserId = localStorage.getItem("loggedUserId");

let dropdown_content= document.getElementById("nav-dropdown-content");
if(token){   
    dropdown_content.innerHTML= `
    <button id="nav-mid-dropdown-btn1" onclick="location.href='/frontend/update_user.html'">Account Details</button>
    <button id="nav-mid-dropdown-btn2">Order History</button>
    <button id="nav-mid-dropdown-btn3">Log out</button>
    `;
    let logout_btn = document.getElementById("nav-mid-dropdown-btn3");
    
    logout_btn.addEventListener("click",()=>{
        localStorage.clear();
        dropdown_content.innerHTML= `
        <button id="nav-mid-dropdown-btn1" onclick="location.href='/frontend/login.html'">Sign In</button>
        <button id="nav-mid-dropdown-btn2" onclick="location.href='/frontend/signup.html'">Create Account</button>
        `;
    })
}
getUserDetails(loggedUserId);

let form = document.querySelector("form");

async function getUserDetails(loggedUserId){
    try {
        let url = baseURL+"/users/"+loggedUserId;
        // console.log(url)
        let res = await fetch(url);
        let data = await res.json();
        form.fname.value=data.fname
        form.lname.value=data.lname
        form.email.value=data.email
        form.pass.value=data.pass
    } catch (error) {
        alert(error.message)
    }
};

form.addEventListener("submit",(event)=>{       
    event.preventDefault();
    let obj={
        fname: form.fname.value,
        lname: form.lname.value,
        email: form.email.value,
        pass: form.pass.value
    }
    updateInDb(obj,loggedUserId);
})

async function updateInDb(obj,loggedUserId){
    try {
        let url = baseURL+"/users/update/"+loggedUserId;
        let res = await fetch(url,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(obj)
        });
        let data = await res.json();
        alert(data.Message);

    } catch (error) {
        alert(error.message)
    }
};