document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("bt");
    var i = 0
    
    btn.onclick = function () {   
        document.getElementById("img").style.display = "none"          
        i++
        var myList = document.getElementById("lst")
        var litem = document.createElement("li");
        litem.innerHTML = "New Item";
        myList.appendChild(litem)
        console.log(i)

};    
});

// document.addEventListener("DOMContentLoaded", function() {
//     var btn = document.getElementById("bt");
//     var i = 0; // Initialize i outside the click event function

//     btn.onclick = function () {
//         i++;
//         var myList = document.getElementById("lst");
//         var litem = document.createElement("li");
//         litem.innerHTML = "New Item";
//         myList.appendChild(litem);
//         console.log(i);
//     };    
// });

