$(document).ready(function() {
    $("#submit").click(submitclicked);

    function submitclicked(event) {
        let inputs = $("input, textarea"); 
        let formValid = true;
        
        inputs.each(function() {
            if (($(this).val() === "")) {
                event.preventDefault();
                alert("Kindly, fill out all the fields!")
                $(this).css("border", "2px solid rgb(254, 69, 62)"); 
                console.log("Form is not valid");
                formValid = false; 
                return false; 
            }
            
        });
        
        if (formValid) {
            console.log("Form is valid");
        }
    }
    
    
    $("input, textarea").on("input", function() {
        $(this).css("border", ""); 
    });
});
