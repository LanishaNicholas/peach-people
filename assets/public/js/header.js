 $(document).ready(function(){

    // Add scroll event listener for animation effect
    window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
    });

    
    /*const cookieConsent = $('.cookie-consent');
    const acceptCookiesButton = $('#accept-cookies');
    const overlay = $('.cookie-consent-overlay');
    
    // Check if user has already given consent
    if (!sessionStorage.getItem('cookieConsentGiven')) {
        
        if ($(window).width() <= 768) {
            // For mobile and tablet views
            cookieConsent.show();
        }else{
            var cookieCon = document.querySelector(".cookie-consent");
            cookieCon.style.bottom = "0";
        }
        overlay.show();
        $('body').css('overflow', 'hidden');
    }else{
        cookieConsent.hide();
    }


    acceptCookiesButton.on('click', function() {
        sessionStorage.setItem('cookieConsentGiven', 'true');
        // Hide the cookie consent message based on screen size
        if ($(window).width() <= 1024) {
            // For mobile and tablet views
            cookieConsent.hide();
        } else {
            // For larger screens
            cookieConsent.css('bottom', '-100px');
        }
        overlay.hide();
        // Enable scrolling on the body again
        $('body').css('overflow', 'auto');
    });*/

     //new cookie setting------------ modified 05/02/2024

     const hasAcceptedCookies    = sessionStorage.getItem("cookieConsentAccepted");
     const overlay               = document.getElementById("overlay");
     const necessaryCookie       = sessionStorage.getItem("necessaryCheckbox");
 
     
 
     // Hide the popup and overlay
     function hideCookie() {
         overlay.style.display = "none";
         $("#cookieConsent").hide();
     }
      
 
     if (hasAcceptedCookies == "true" || necessaryCookie == "true") {
         hideCookie();
     }else{
         console.log('on reload');
         overlay.style.display = "block";
         $("#cookieConsent").show();
     }
 
     $("#customizeBtn").click(function () {
         $(".customizecookie").toggleClass("d-none");
         $("#cookieConsent").hide();
     });
 
    
 
     //Button click - Accept
     $('#acceptBtn').click(function(){
         sessionStorage.setItem("cookieConsentAccepted", "true");
         sessionStorage.setItem("marketingCookie", "true");
         hideCookie();
         // location.reload();
     });
 
     //Button click - save and close
     $('#saveAndCloseCookies').click(function(){
         
         var necessaryCheckboxChecked = $("#necessaryCheckbox").prop("checked");
         var marketingCheckBoxChecked = $("#marketingCheckBox").prop("checked");
 
         if(marketingCheckBoxChecked == false){
             sessionStorage.setItem("marketingCookie", "false");
         }else{
             sessionStorage.setItem("marketingCookie", "true");
         }
 
         sessionStorage.setItem("cookieConsentAccepted", "true");
         sessionStorage.setItem("necessaryCheckbox", "true");
         
         $('.customizecookie').hide();
         overlay.style.display = "none";
 
         location.reload();
 
     });
 
     //Reject button
     $('#rejectBtn').click(function(){
         sessionStorage.setItem("marketingCookie", "false");
         sessionStorage.setItem("cookieConsentAccepted", "false");
         sessionStorage.setItem("necessaryCheckbox", "true");
 
         hideCookie();
     });
 
     //Read more button click
     $('#readMorePrivacy').click(function(){
 
         var language = sessionStorage.getItem("selectedLanguage");
         window.location.href = '../../views/'+ language +'/privacy.html';
     });
 
     // Check if the session variable 'marketingCookie' is true
    if (sessionStorage.getItem('marketingCookie') === 'true') {
        var googleTagScript = document.createElement('script');
        googleTagScript.async = true;
        googleTagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-DMTCYLY5M4';
        document.head.appendChild(googleTagScript);

        // Add Google Tag configuration dynamically
        var googleTagConfig = document.createElement('script');
        googleTagConfig.innerHTML = "window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());   gtag('config', 'G-DMTCYLY5M4');";
        document.head.appendChild(googleTagConfig);

        // Add Meta Pixel Code dynamically
        var metaPixelScript = document.createElement('script');
        metaPixelScript.innerHTML = "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '297517359558547');fbq('track', 'PageView');";
        document.head.appendChild(metaPixelScript);

        // Add Meta Pixel Code noscript dynamically
        var metaPixelNoscript = document.createElement('noscript');
        metaPixelNoscript.innerHTML = "<img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=297517359558547&ev=PageView&noscript=1'/>";
        document.head.appendChild(metaPixelNoscript);
        
    }



    const subscribe = $('.subscribeNews');
    subscribe.on('click',function(){
        event.preventDefault();
        //console.log('click subscription button');
        const newsletter        = $('#newsletter').val();
        const language          = $(this).data('language');
        //console.log(language);

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

        //console.log(storedLanguageCode);

        const formData = {
            newsletter : newsletter,
            language   : language,
            country    : country,
        }
        if(newsletter != ""){
            $.ajax({
                url: "http://127.0.0.1:5501/subscribe-newsletter",
                type: "POST",
                data:formData,
                success: function(response) {
                    //alert("Email sent successfully!");
                    if(language == "English"){
                        ms.Notification({
                            type : "success",
                            message: "Subscription successful! Thank you for subscribing."
                        });
                    }else if(language == "Norwegian"){
                        ms.Notification({
                            type : "success",
                            message: "Abonnementet er vellykket! Takk for at du abonnerer."
                        });
                    }else if(language == "Swedish"){
                        ms.Notification({
                            type : "success",
                            message: "Prenumerationen lyckades! Tack för att du prenumererar."
                        });
                    }else if(language == "Finnish"){
                        ms.Notification({
                            type : "success",
                            message: "Tilauksesi onnistui! Kiitos tilauksestasi."
                        });
                    }else if(language == "Icelandic"){
                        ms.Notification({
                            type : "success",
                            message: "Áskriftin tókst! Þakka þér fyrir að skrá þig."
                        });
                    }else if(language == "German"){
                        ms.Notification({
                            type : "success",
                            message: "Anmeldung erfolgreich! Vielen Dank für die Anmeldung."
                        });
                    }else if(language == "French"){
                        ms.Notification({
                            type : "success",
                            message: "Abonnement réussi ! Merci de vous être abonné."
                        });
                    }else if(language == "Danish"){
                        ms.Notification({
                            type : "success",
                            message: "Abonnementet er oprettet med succes! Tak fordi du tilmeldte dig."
                        });
                    }
                   
                    $('#newsletter').val("");
                },
                error: function(xhr, status, error) {
                    //alert("Error sending email. Please try again later.");
                    if(language == "English"){
                        ms.Notification({
                            type : "error",
                            message: "Subscription failed. Please try again later."
                        });
                    }else if(language == "Norwegian"){
                        ms.Notification({
                            type : "error",
                            message: "Abonnementet mislyktes. Vennligst prøv igjen senere."
                        });
                    }else if(language == "Swedish"){
                        ms.Notification({
                            type : "error",
                            message: "Prenumerationen misslyckades. Försök igen senare."
                        });
                    }else if(language == "Finnish"){
                        ms.Notification({
                            type : "error",
                            message: "Tilaus epäonnistui. Yritä uudelleen myöhemmin."
                        });
                    }else if(language == "Icelandic"){
                        ms.Notification({
                            type : "error",
                            message: "Áskrift mistókst. Vinsamlegast reynið aftur seinna."
                        });
                    }else if(language == "German"){
                        ms.Notification({
                            type : "error",
                            message: "Anmeldung fehlgeschlagen. Bitte versuchen Sie es später erneut."
                        });
                    }else if(language == "French"){
                        ms.Notification({
                            type : "error",
                            message: "Abonnement échoué. Veuillez réessayer plus tard."
                        });
                    }else if(language == "Danish"){
                        ms.Notification({
                            type : "error",
                            message: "Abonnementet mislykkedes. Prøv igen senere."
                        });
                    }

                }
            });

        }else{
            if(language == "English"){
                ms.Notification({
                    type : "error",
                    message: "Please fill in your email address."
                });
            }else if(language == "Norwegian"){
                ms.Notification({
                    type : "error",
                    message: "Vennligst fyll inn din e-postadresse."
                });
            }else if(language == "Swedish"){
                ms.Notification({
                    type : "error",
                    message: "Vänligen fyll i din e-postadress."
                });
            }else if(language == "Finnish"){
                ms.Notification({
                    type : "error",
                    message: "Täytä sähköpostiosoitteesi, kiitos."
                });
            }else if(language == "Icelandic"){
                ms.Notification({
                    type : "error",
                    message: "Vinsamlegast fylltu út netfangið þitt."
                });
            }else if(language == "German"){
                ms.Notification({
                    type : "error",
                    message: "Bitte geben Sie Ihre E-Mail-Adresse ein."
                });
            }else if(language == "French"){
                ms.Notification({
                    type : "error",
                    message: "Veuillez remplir votre adresse e-mail."
                });
            }else if(language == "Danish"){
                ms.Notification({
                    type : "error",
                    message: "Venligst udfyld din e-mailadresse."
                });
            }
            
        }

    });

   
});
 
 