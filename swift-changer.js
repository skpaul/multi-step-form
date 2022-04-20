/*
SwiftChanger

Description:
This plugin enables to switch between differen formSections within a form.
This is useful in a large form.
Using this plugin, you can split a large form into smaller section using .formSection class. 

*/


(function ($) {
    $.fn.swiftChanger = function(validationRules) {
        // this.find(prevButtonClassName).bind("click.swiftChanger",function(event){
        $(".goToPrevSection").bind("click.swiftChanger",function(event){
            event.preventDefault();
            var section = $(this.closest('.formSection'));
            section.css("display", "none");
            section.prev().css("display", "block");

            $element = $(section).prev().find("p:first-child");
            $('html,body').animate({
                scrollTop: $element.offset().top - 50
            }, 1000);
        });

        function showError($message, $element){
            $.sweetModal({
                content: $message,
                icon: $.sweetModal.ICON_WARNING
            });

            $element.addClass("error");

            $('html,body').animate({
                scrollTop: $element.offset().top - 50
            }, 1000);

            var name = $element.attr("name");
            var classes = $element.attr("class");
            console.log("name:" + name + ", classes:" + classes);
        }
        
      
        $(".goToNextSection").bind("click.swiftChanger",function(event){
            event.preventDefault();
            var section = $(this.closest('.formSection'));
           
            var hasError = false;
            var message="";

            //.validate loop starts -->
            // section.find(".validate").each(function(index, element ) {
            $(".validate", section).each(function(index, element ) {
                
                $element = $(element);
                if(($element).hasClass("checkVisibility")){
                    // debugger;
                    var closestToggleVisibleWrapper = $element.closest(".toggleVisibleWrapper");
                    if(typeof closestToggleVisibleWrapper != typeof undefined ){
                        if(closestToggleVisibleWrapper.hasClass("hidden")){
                           return
                        }
                    }
                }
                if($element.parent('.field').hasClass("hidden"))  return;

                 // $(this).closest("article").find(".toggleVisibleWrapper").removeClass("hidden");
               
                

                /*
                    Sometimes, label may contain extra words. Only in that case, use
                    data-title. So, if data-title exists, take title from it.
                    But in general cases, take title from label tag.
                */
                var title = $element.attr("data-title");
                if ( typeof title == typeof undefined) {
                    title = $element.parent('.field').find("label").html();
                }

                var value = $element.val(); //don't use trim() here

                var isRequired = $element.attr('data-required');
                if (isRequired !== false && typeof isRequired !== typeof undefined) {
                    if($element.is(':checkbox')){
                        var checked = $element.is(':checked');
                        if (!checked) {
                            hasError = true;
                            message = "<strong>" + title + "</strong>" + " required.";
                            showError(message, $element);
                            return false;
                        }
                    }

                    if(isRequired == "required" && value == ""){
                        hasError = true;
                        // console.log($this.attr('name'));
                        message = "<strong>" + title + "</strong>" + " required.";
                        showError(message, $element);
                        return false;
                        // return;
                    }
                }

                function isDoubleByte(str) {
                    for (var i = 0, n = str.length; i < n; i++) {
                        if (str.charCodeAt( i ) > 255) { return true; }
                    }
                    return false;
                }

                // if($.trim(String(value)) != ''){
                //     var langBangla = $element.attr("data-bangla");
                //     if (langBangla !== false && typeof langBangla !== typeof undefined) {
                //         //allow bangla
                //     }
                //     else{ //dont allow bangla --->
                //         let isInvalid = isDoubleByte($.trim(String(value)));
                //         if(isInvalid){
                //             hasError = true;
                //             // console.log($this.attr('name'));
                //             message = "<strong>" + title + "</strong>"  + " must be in english.";
                //             showError(message, $element);
                //             return false;
                //         }
                //     } //<----dont allow bangla
                // }

                if($.trim(String(value)) != ''){
                    let isInvalid = isDoubleByte($.trim(String(value)));
                    if(isInvalid){
                        hasError = true;
                        // console.log($this.attr('name'));
                        message = "<strong>" + title + "</strong>"  + " must be in english.";
                        showError(message, $element);
                        return false;
                    }
                }

                // var dataLang = $element.attr("data-lang");
                // if (dataLang !== false && typeof dataLang !== typeof undefined) {
                //     if(dataLang == "english" && $.trim(value) != ''){
                //         let isInvalid = isDoubleByte($.trim(value));
                //         // alert(isValid);
                //         if(isInvalid){
                //             hasError = true;
                //             // console.log($this.attr('name'));
                //             message = "<strong>" + title + "</strong>"  + " must be in english.";
                //             showError(message, $element);
                //             return false;
                //         }
                //     }
                // }

                var dataType = $element.attr("data-datatype");
                if (dataType !== false && typeof dataType !== typeof undefined) {
                    var length = $.trim(value).length;
                    if(isRequired == "required" || (isRequired == "optional" && length>0)){
                        switch (dataType) {
                            case "letters":
                                var re = /^[a-z\s]+$/i;
                                if(!re.test(value)){
                                    hasError = true;
                                    message = "<strong>" + title + "</strong>"  + " invalid." ;
                                    showError(message, $element);
                                    return false;
                                }                                
                                break;
                            case "email":
                                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if(!re.test(value)){
                                    hasError = true;
                                    message = "<strong>" + title + "</strong>"  + " invalid." ;
                                    showError(message, $element);
                                    return false;
                                }                                
                                break;
                            case "mobile":
                                if(!IsMobileNumberValid(value)){
                                    hasError = true;
                                    message = "<strong>" + title + "</strong>"  + " invalid." ;
                                    showError(message, $element);
                                    return false;
                                }
                                break;
                            case "integer":
                            case "float":
                            case "double":
                            case "decimal":
                                if(isNaN(value)){
                                    hasError = true;
                                    message= "<strong>" + title + "</strong>"  + " must be a valid number.";
                                    showError(message, $element);
                                    return false;
                                }
                                break;
                            case "date":
                                var dateValue = moment(value, "DD-MM-YYYY");
                                if(!dateValue.isValid()){
                                    hasError = true;
                                    message= "<strong>" + title + "</strong>"  + " invalid." ;
                                    showError(message, $element);
                                    return false;
                                }
                                
                                break;
                            default:
                                // hasError = true;
                                // message= "Datatype undefined for " + "<strong>" + title + "</strong>" + ".";
                                // return false;
                                break;
                        }
                    }
                }

                var minLength = $element.attr("data-minlen");
                if (minLength !== false && typeof minLength !== typeof undefined) {
                    var length = $.trim(value).length;
                    minLength = parseInt(minLength);
                    
                    //if required, must be valid. If optional and no data then skip otherwise must be valid.
                    if(isRequired == "required" || (isRequired == "optional" && length>0)){
                        if(length < minLength){
                            hasError = true;
                            // console.log($element.attr('name'));
                            message = "<strong>" + title + "</strong>"  + " must be equal or greater than " + minLength + " characters.";
                            showError(message, $element);
                            return false;
                        }
                    }
                }

                var maxLength = $element.attr("data-maxlen");
                if (maxLength !== false && typeof maxLength !== typeof undefined) {
                    var length = $.trim(value).length;
                    maxLength = parseInt(maxLength);
                    if(isRequired == "required" || (isRequired == "optional" && length>0)){
                        if(length > maxLength){
                            hasError = true;
                            console.log($element.attr('name'));
                            message = "<strong>" + title + "</strong>"  + " must be equal or less than "+ maxLength +" characters.";
                            showError(message, $element);
                            return false;
                        }
                    }
                }

                var exactLength = $element.attr("data-exactlen");
                if (exactLength !== false && typeof exactLength !== typeof undefined) {
                    var length = $.trim(value).length;
                    exactLength = parseInt(exactLength);
                    if(isRequired == "required" || (isRequired == "optional" && length>0)){
                        if(length !== exactLength){
                            hasError = true;
                            console.log($element.attr('name'));
                            message = "<strong>" + title + "</strong>"  + " must have "+ exactLength +" characters." ;
                            showError(message, $element);
                            return false;
                        }
                    }
                }

                var minValue = $element.attr("data-minval");
                if (minValue !== false && typeof minValue !== typeof undefined) {
                    //Specific datatype is must for minimum value validation. 
                    if (dataType !== false && typeof dataType === typeof undefined) {
                        hasError = true;
                        message= "Datatype undefined for " + "<strong>" + title + "</strong>" + ".";
                        showError(message, $element);
                        return false;
                    }

                    var length = $.trim(value).length;
                    if(isRequired == "required" || (isRequired == "optional" && length>0)){
                        if(dataType == "integer" || dataType == "float" || dataType == "double" || dataType == "decimal"){
                            if(isNaN(value)){
                                hasError = true;
                                message= "<strong>" + title + "</strong>"  + " must be a valid number.";
                                showError(message, $element);
                                return false;
                            }
                        }
                        
                        switch (dataType){
                            case "integer":
                                value = parseInt(value);
                                minValue = parseInt(minValue);
                                break;
                            case "float":
                            case "double":
                            case "decimal":
                                value = parseFloat(value);
                                minValue = parseFloat(minValue);
                                break;
                            case "date":
                                var value = moment(value, "DD-MM-YYYY");
                                if(!value.isValid()){
                                    hasError = true;
                                    message= "<strong>" + title + "</strong>"  + " invalid." ;
                                    showError(message, $element);
                                    return false;
                                }
                                minValue = moment(minValue, "DD-MM-YYYY");
                                break;
                            default: 
                                hasError = true;
                                message= "Datatype undefined for " + "<strong>" + title + "</strong>"  + ".";
                                showError(message, $element);
                                return false;
                        }
                        
                        if(value < minValue){
                            hasError = true;
                            message= "<strong>" + title + "</strong>"  + " must be equal or greater than " + minValue + ".";
                            showError(message, $element);
                            return false;
                        }
                    }
                }

                var maxValue = $element.attr("data-maxval");
                if (maxValue !== false && typeof maxValue !== typeof undefined) {
                    //Specific datatype is must for maximum value validation. 
                    if (dataType !== false && typeof dataType === typeof undefined) {
                        hasError = true;
                        message= "Datatype undefined for " + title + ".";
                        showError(message, $element);
                        return false;
                    }

                    var length = $.trim(value).length;
                    if(isRequired == "required" || (isRequired == "optional" && length>0)){
                        if(dataType == "integer" || dataType == "float" || dataType == "double" || dataType == "decimal"){
                            if(isNaN(value)){
                                hasError = true;
                                message= "<strong>" + title + "</strong>"  + " must be a valid number.";
                                showError(message, $element);
                                return false;
                            }
                        }
                        
                        switch (dataType){
                            case "integer":
                                value = parseInt(value);
                                maxValue = parseInt(maxValue);
                                break;
                            case "float":
                            case "double":
                            case "decimal":
                                value = parseFloat(value);
                                maxValue = parseFloat(maxValue);
                                break;
                            case "date":
                                var value = moment(value, "DD-MM-YYYY");
                                if(!value.isValid()){
                                    hasError = true;
                                    message= title + " invalid." ;
                                    showError(message, $element);
                                    return false;
                                }
                                maxValue = moment(maxValue, "DD-MM-YYYY");
                                break;
                            default: 
                                hasError = true;
                                message= "Datatype undefined for " + "<strong>" + title + "</strong>" + ".";
                                showError(message, $element);
                                return false;
                        }
                        
                        if(value > maxValue){
                            hasError = true;
                            message= "<strong>" + title + "</strong>"  + " must be equal or less than " + maxValue + ".";
                            showError(message, $element);
                            return false;
                        }
                    }
                }

                var exactValue = $element.attr("data-exactval");
                if (exactValue !== false && typeof exactValue !== typeof undefined) {
                    //Specific datatype is must for exactimum value validation. 
                    if (dataType !== false && typeof dataType === typeof undefined) {
                        hasError = true;
                        message= "Datatype undefined for " + title + ".";
                        showError(message, $element);
                        return false;
                    }

                    var length = $.trim(value).length;
                    if(isRequired == "required" || (isRequired == "optional" && length>0)){
                        if(dataType == "integer" || dataType == "float" || dataType == "double" || dataType == "decimal"){
                            if(isNaN(value)){
                                hasError = true;
                                message= "<strong>" + title + "</strong>"  + " must be a valid number.";
                                showError(message, $element);
                                return false;
                            }
                        }
                        
                        switch (dataType){
                            case "integer":
                                value = parseInt(value);
                                exactValue = parseInt(exactValue);
                                break;
                            case "float":
                            case "double":
                            case "decimal":
                                value = parseFloat(value);
                                exactValue = parseFloat(exactValue);
                                break;
                            case "date":
                                var value = moment(value, "DD-MM-YYYY");
                                if(!value.isValid()){
                                    hasError = true;
                                    message= "<strong>" + title + "</strong>"  + " invalid." ;
                                    showError(message, $element);
                                    return false;
                                }
                                exactValue = moment(exactValue, "DD-MM-YYYY");
                                break;
                            default: 
                                hasError = true;
                                message= "Datatype undefined for " + "<strong>" + title + "</strong>"  + ".";
                                showError(message, $element);
                                return false;
                        }
                        
                        if(value != exactValue){
                            hasError = true;
                            message= "<strong>" + title + "</strong>"  + " must be equal to " + exactValue + ".";
                            showError(message, $element);
                            return false;
                        }
                    }
                }
              });
            //<-------- .validate loop ends

            if (hasError) {
                hasError=false;
                // $(this).html(defaultButtonText);
                // $(this).removeAttr('disabled', 'disabled');
                $(this).css('pointer-events', '');
                return;
            }
            else{
                if (validationRules) {
                    if (validationRules() == false) {
                        return;
                    }
                }

                section.css("display", "none");
                section.next().css("display", "block");
              
                $element = $(section).next().find("p:first-child");
                $('html,body').animate({
                    scrollTop: $element.offset().top - 50
                }, 1000);
            }


          

        });

        $("#showPreview").click(function(e){
            var form = $("form");
            $('label.required').removeClass("required").addClass("white-required");
            $(".formSection", form).each(function(index, formSection) {
                $formSection  = $(formSection);
                $formSection.show(); //show all formSections
    
                var allFormControls = $(".formControl", $formSection);
    
                $(allFormControls).each(function(index, currentControl ) {
                    $currentControl = $(currentControl);
                    if($currentControl.hasClass("sectionNavigation")){
                        $currentControl.hide();
                    }

                    if(!$currentControl.hasClass("dontEnable")){
                        // $currentControl.attr("disabled", "disabled");
                        // $currentControl.css('pointer-events', 'none').css('');
                        $currentControl.css({'pointer-events':'none', 'border':'transparent', 'padding':'0', 'text-indent': '1px'});
                        $currentControl.css({'-webkit-appearance': 'none', '-moz-appearance': 'none', 'appearance':'none'});

                        if ($currentControl.is(":radio")) {
                            let checked = $currentControl.is(':checked');
                            if(checked){
                                $currentControl.addClass('hidden');
                            }
                            else{
                                $currentControl.closest('label').addClass('hidden');
                            }
                          
                        }

                        if ($currentControl.is("textarea")) {
                            $currentControl.css({'-webkit-appearance': 'none', '-moz-appearance': 'none', 'appearance':'none'});
                        }
                        //label.required::after
                    }
                });
            });
    
            $(".sectionNavigation").hide();
            $("#submitSection").show();
        });
    
        $("#closePreview").click(function(e){
            var form = $("form");
            $('label.white-required').addClass("required").removeClass("white-required");

            $(".formSection", form).each(function(index, element ) {
                $element  = $(element);
                var allFormControls = $(".formControl", $element);
                $(allFormControls).each(function(index, currentControl ) {
                   
                   
                    if($(currentControl).hasClass("dontEnable")){
                        //lagbe
                    }
                    else{
                        //   $currentControl.removeClass("previewMode");
                        $(this).css({'pointer-events':'', 'border':'1px solid rgba(172, 168, 168, 0.5)','padding':'5px 10px', '-webkit-appearance': '', '-moz-appearance': '', 'text-indent': '0px'});
                    }
                });
            });
    
            $("form .formSection:not(:last)").hide();
            $("#submitSection").hide();
            $(".sectionNavigation").show();
        });
    
    };
}(jQuery));



























