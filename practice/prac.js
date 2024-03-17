
window.onload = binding;

function binding(){

    btn = document.getElementById("pushbtn");
    para = document.getElementById("para");
    
    btn.onclick = hide;    
    
}

function hide() {
para.style.display = "none";
}
