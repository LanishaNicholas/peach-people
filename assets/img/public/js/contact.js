$(document).ready(function(){
    var name        = $('#name');
    var email       = $('#email');
    var phone       = $('#phone');
    var message     = $('#message');
    var privacy     = $('#privacy');
    var contactBtn  = $('#contactBtn');
    var errMsg      = $('.errMsg');

    contactBtn.on('click',function(){
        event.preventDefault();
        //console.log('submit button click');
        contactName     = name.val();
        contactEmail    = email.val();
        contactPhone    = phone.val();
        contactMsg      = message.val();


        var storedLanguageCode  = sessionStorage.getItem('languageCode');
        var country = "";
        if(storedLanguageCode == "no"){
            country  = "Norway";
        }else if(storedLanguageCode == "sv"){
            country = "Sweden";
        }else if(storedLanguageCode == "fi"){
            country = "Finland";
        }else if(storedLanguageCode == "is"){
            country = "Iceland";
        }else if(storedLanguageCode == "de"){
            country = "Germany";
        }else if(storedLanguageCode == "fr"){
            country = "France";
        }else if(storedLanguageCode == "da"){
            country = "Denmark";
        }else if(storedLanguageCode == "en"){
            country = "United States";
        }

        const formData = {
            name    : contactName,
            email   : contactEmail,
            phone   : contactPhone,
            message : contactMsg,
            country : country,
        };
        

        
        if(contactName != "" && contactEmail != "" && contactPhone != "" && contactMsg != "" && privacy.is(':checked')){

            $.ajax({
                url: "http://127.0.0.1:5501/submit-contactform",
                type: "POST",
                data:formData,
                success: function(response) {
                    //alert("Email sent successfully!");
                    name.val("");
                    email.val("");
                    phone.val("");
                    message.val("");
                    privacy.prop('checked', false);

                    $("#successMessage").addClass("show");

                },
                error: function(xhr, status, error) {
                    //alert("Error sending email. Please try again later.");
                    $("#errorMessage").addClass("show");
                }
            });

        }else{
            console.log("error msg");
            if(contactName == ""){
                //console.log('contact name');
                name.css('border-bottom', '2px solid red');
            }

            if(contactEmail == ""){
                //console.log('contact email');
                email.css('border-bottom', '2px solid red');
            }

            if(contactPhone == ""){
                //console.log('contact phone');
                phone.css('border-bottom', '2px solid red');
            }

            if(contactMsg == ""){
                //console.log('message');
                message.css('border-bottom', '2px solid red');
            }
            if(!privacy.is(':checked')){
                //console.log('not checked')
                ms.Notification({
                    type : "error",
                    message: "Please accept the temrs and condition"
                });
            }
            
        }
    });
});