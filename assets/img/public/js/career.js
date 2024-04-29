$(document).ready(function(){
    var selectedLocation = "";
    const modal = $("#myModal");
    const openModalButtons = $(".open-modal");
    const closeModalButton = $(".close");
    const applicationForm = $("#applicationForm");
    const positionTitle   = $("#job");


    //for location search
    $(".locationDrp a").on("click", function(e) {
        e.preventDefault();
        //$(".companybtn").text("Select company");
        selectedLocation = $(this).text();
        $(".locationbtn").text(selectedLocation);
        $(".selected-option").text(selectedLocation).show();
        $(".locationDrp").hide();
        var foundResults = false; 

        $('.position-info').each(function() {
            var positionLocation = $(this).find('.position-details.location').text().toLowerCase();
      
            if (positionLocation.includes(selectedLocation.toLowerCase())) {
                $(this).closest('.position-card').show();
                foundResults = true;
            } else {
                $(this).closest('.position-card').hide();
            }
        });

        if (!foundResults) {
            $(".no-results-message").show();
        } else {
            $(".no-results-message").hide();
        }
    });
    
    $(".locationlist").on("mouseleave", function() {
        $(".selected-option").hide();
    });
    
    $(".locationbtn").on("click", function(e) {
        e.stopPropagation();
        $(".locationDrp").toggle();
    });
    
    $(document).on("click", function(e) {
        if (!$(".locationlist").is(e.target) && $(".locationlist").has(e.target).length === 0) {
          $(".locationDrp").hide();
        }
    });

    //for company search
    $(".companyDrp a").on("click", function(e) {
        e.preventDefault();
        selectedCompany = $(this).text();
        $(".companybtn").text(selectedCompany);
        $(".selected-company").text(selectedCompany).show();
        $(".companyDrp").hide();

        var foundResults = false; 

        $('.position-info').each(function() {
            var positionLocation = $(this).find('.position-details.company').text().toLowerCase();
      
            if (positionLocation.includes(selectedCompany.toLowerCase())) {
                $(this).closest('.position-card').show();
                foundResults = true;
            } else {
                $(this).closest('.position-card').hide();
            }
        });

        if (!foundResults) {
            $(".no-results-message").show();
        } else {
            $(".no-results-message").hide();
        }
    });

    $(".companylist").on("mouseleave", function() {
        $(".selected-company").hide();
    });
    
    $(".companybtn").on("click", function(e) {
        e.stopPropagation();
        $(".companyDrp").toggle();
    });
    
    $(document).on("click", function(e) {
        if (!$(".companylist").is(e.target) && $(".companylist").has(e.target).length === 0) {
          $(".companyDrp").hide();
        }
    });
    

    openModalButtons.on("click", function() {
        event.preventDefault();
        const job = $(this).data("job");
        positionTitle.val(job);
        modal.css("display", "block");
    });

    closeModalButton.on("click", function() {
        modal.css("display", "none");
    });

    $(window).on("click", function(event) {
        if (event.target === modal[0]) {
            modal.css("display", "none");
        }
    });

    applicationForm.on("submit", function(event) {
        event.preventDefault();

        const  position    = $('#job').val();
        const  fullName    = $('#fullName').val();
        const  phone       = $('#phone').val();
        const  email       = $('#email').val();
        const  aboutyou    = $('#aboutyou').val();
        const attachmentInput = $('#attachment')[0];
        const attachment = attachmentInput && attachmentInput.files ? attachmentInput.files[0] : null;

        var dataLang = $(".modelBtn").data("lang");
        //console.log(dataLang);

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
        
        
        var formData = new FormData(); // Create a new FormData object
        formData.append('job', position);
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('aboutyou', aboutyou);
        formData.append('country', country);
        
        if (attachment) {
            formData.append('attachment', attachment); // Add the CV file to formData only if a file is selected
        }

        $.ajax({
            url: "http://127.0.0.1:5501/submit-form",
            type: "POST",
            data: formData,
            processData: false,  // Important!
            contentType: false,  // Important!
            success: function(response) {
                $('#fullName').val("");
                $('#phone').val("");
                $('#email').val("");
                $('#aboutyou').val("");
                modal.css("display", "none");
                //alert("Email sent successfully!");
                if(dataLang == "en"){
                    /*Swal.fire(
                        'Got your resume!',
                        'We’re grateful for the opportunity to learn more about you. Stay tuned!',
                        'success'
                    )*/
                    ms.Notification({
                        type : "success",
                        message: "Got your resume! We’re grateful for the opportunity to learn more about you. Stay tuned!"
                    });
                }

                if(dataLang == "dk"){
                    /*Swal.fire(
                        'Modtog dit CV!',
                        'Vi er taknemmelige for muligheden for at lære dig bedre at kende. Bliv hængende!',
                        'success'
                    )*/
                    ms.Notification({
                        type : "success",
                        message: "Modtog dit CV! Vi er taknemmelige for muligheden for at lære dig bedre at kende. Bliv hængende!"
                    });
                }

                if(dataLang == "fn"){
                    /*Swal.fire(
                        'Saimme ansioluettelosi!',
                        'Olemme kiitollisia mahdollisuudesta tutustua sinuun paremmin. Pysy kuulolla!',
                        'success'
                    )*/
                    ms.Notification({
                        type : "success",
                        message: "Saimme ansioluettelosi! Olemme kiitollisia mahdollisuudesta tutustua sinuun paremmin. Pysy kuulolla!"
                    });
                }

                if(dataLang == "fr"){
                    /*Swal.fire(
                        'Nous avons reçu votre CV !',
                        'Nous sommes reconnaissants pour cette opportunité den apprendre davantage sur vous. Restez à laffût !',
                        'success'
                    )*/

                    ms.Notification({
                        type : "success",
                        message: "Nous avons reçu votre CV ! Nous sommes reconnaissants pour cette opportunité den apprendre davantage sur vous. Restez à laffût !"
                    });
                }

                if(dataLang == "gr"){
                    /*Swal.fire(
                        'Wir haben Ihren Lebenslauf erhalten!',
                        'Wir sind dankbar für die Gelegenheit, mehr über Sie zu erfahren. Bleiben Sie gespannt!',
                        'success'
                    )*/

                    ms.Notification({
                        type : "success",
                        message: "Wir haben Ihren Lebenslauf erhalten! Wir sind dankbar für die Gelegenheit, mehr über Sie zu erfahren. Bleiben Sie gespannt!"
                    });
                }

                if(dataLang == "ic"){
                    /*Swal.fire(
                        'Fengum ferilskrána þína!',
                        'Við erum þakklátir fyrir tækifærið að kynnast þér betur. Haltu þig áfram við!',
                        'success'
                    )*/

                    ms.Notification({
                        type : "success",
                        message: "Fengum ferilskrána þína! Við erum þakklátir fyrir tækifærið að kynnast þér betur. Haltu þig áfram við!"
                    });
                }

                if(dataLang == "no"){
                    /*Swal.fire(
                        'Vi fikk CV-en din!',
                        'Vi er takknemlige for muligheten til å bli bedre kjent med deg. Følg med videre!',
                        'success'
                    )*/
                    ms.Notification({
                        type : "success",
                        message: "Vi fikk CV-en din! Vi er takknemlige for muligheten til å bli bedre kjent med deg. Følg med videre!"
                    });
                }

                if(dataLang == "sv"){
                    /*Swal.fire(
                        'Vi fick ditt CV!',
                        'Vi är tacksamma för möjligheten att lära känna dig bättre. Håll ögonen öppna!',
                        'success'
                    )*/

                    ms.Notification({
                        type : "success",
                        message: "Vi fick ditt CV! Vi är tacksamma för möjligheten att lära känna dig bättre. Håll ögonen öppna!"
                    });
                }
                
                
            },
            error: function(xhr, status, error) {
                //alert("Error sending email. Please try again later.");
                if(dataLang == "en"){
                    /*Swal.fire(
                        'Error sending email. Please try again later.',
                        'error'
                    )*/

                    ms.Notification({
                        type : "error",
                        message: "Error sending email. Please try again later."
                    });
                }

                if(dataLang == "dk"){
                    /*Swal.fire(
                        'Fejl ved afsendelse af e-mail. Prøv igen senere.',
                        'error'
                    )*/

                    ms.Notification({
                        type : "error",
                        message: "Fejl ved afsendelse af e-mail. Prøv igen senere."
                    });
                }

                if(dataLang == "fn"){
                    /*Swal.fire(
                        'Virhe sähköpostin lähetyksessä. Yritä uudelleen myöhemmin.',
                        'error'
                    )*/

                    ms.Notification({
                        type : "error",
                        message: "Virhe sähköpostin lähetyksessä. Yritä uudelleen myöhemmin."
                    });
                }

                if(dataLang == "fr"){
                    /*Swal.fire(
                        'Erreur lors de lenvoi de lemail. Veuillez réessayer plus tard.',
                        'error'
                    )*/

                    ms.Notification({
                        type : "error",
                        message: "Erreur lors de lenvoi de lemail. Veuillez réessayer plus tard."
                    });
                }

                if(dataLang == "gr"){
                    /*Swal.fire(
                        'Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.',
                        'error'
                    )*/

                    ms.Notification({
                        type : "error",
                        message: "Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut."
                    });
                }

                if(dataLang == "ic"){
                    /*Swal.fire(
                        'Villa við að senda tölvupóst. Vinsamlegast reyndu aftur síðar.',
                        'error'
                    )*/
                    ms.Notification({
                        type : "error",
                        message: "Villa við að senda tölvupóst. Vinsamlegast reyndu aftur síðar."
                    });
                }

                if(dataLang == "no"){
                    /*Swal.fire(
                        'Feil ved sending av e-post. Vennligst prøv igjen senere.',
                        'error'
                    )*/

                    ms.Notification({
                        type : "error",
                        message: "Feil ved sending av e-post. Vennligst prøv igjen senere."
                    });
                }

                if(dataLang == "sv"){
                    /*Swal.fire(
                        'Fel vid skickande av e-post. Vänligen försök igen senare.',
                        'error'
                    )*/

                    ms.Notification({
                        type : "error",
                        message: "Fel vid skickande av e-post. Vänligen försök igen senare."
                    });
                }
                
            }
        });
        
        
    });
});