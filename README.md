# Swift Changer

This JQuery Plugin is used to split a large form into smaller parts.

It navigates "Previous" and "Next" section of a form and finally shows a preview



## Installation

```javascript
<script src="<?= BASE_URL ?>/assets/js/plugins/swift-changer/swift-changer.js"></script>
```



```javascript
function validationRule() {
    if(validationFailed){
        return false;
    }

    //other wise return true.
    return true;
}

 $('form').swiftForm(validationRule); //Or use null
```



## Rules

Each section must have **.formSection** class

```html
<div class="formSection">
	
</div>  

<!-- OR -->
    
<section class="formSection">
	
</section>  
```



First section must have a div with **.sectionNavigation** class and a Next button within it-

```html
<div class="formSection">
	<!-- other markups -->
    
	<div class="sectionNavigation">
    	<button class="goToNextSection" type="button">Next</button>
	</div>
</div>  
```



Middle section(s) must have the following .sectionNavigation -

```html
<div class="formSection">
	<!-- other markups -->
    
    <div class="sectionNavigation">
	    <button class="goToPrevSection" type="button">Back</button>
    	<button class="goToNextSection" type="button">Next</button>
	</div>
</div>    
```



Last section must have the following .sectionNavigation markup

```html
<div class="formSection">
	<!-- other markups -->
    
    <div class="sectionNavigation">
	    <button class="goToPrevSection" type="button">Back</button>
    	<button id="showPreview">Preview</button>
	</div>
</div>    
```



Each input must have **.formControl** class.

```html
<div class="field">
	<label class="">Name</label>
    <input class="validate formControl dontEnable" type="text" value="Saumitra" disabled>
</div>
```



**.dontEnable** class is used to prevent removing "disabled" attribute by the plugin

```html
<div class="field">
	<label class="">Name</label>
    <input class="validate formControl dontEnable" type="text" value="Saumitra" disabled>
</div>
```



## Form Template

In order to work properly, the form html must have the following structures -

```html
<form class="classic" id="application-form" action="applicant-info_.php" type="post" enctype="multipart/form-data">
    <div class="formSection">
        <div class="field">
            <label class="">Name</label>
            <input class="validate formControl" type="text" data-swift-required="required" data-swift-title="Hello" value="">
        </div>
        <div class="field">
            <label class="">Name</label>
            <input class="validate formControl dontEnable" type="text" value="Saumitra" disabled>
        </div>
        <div class="field">
            <label class="">Father Name</label>
            <input class="validate formControl" type="text">
        </div>
        <div class="field">
            <label class="">Father Name</label>
            <select class="formControl">
                <option></option>
                <option>1</option>
            </select>
        </div>
        <div class="field">
            <span class="serial-no">04</span>
            <label class="">Textarea</label>
            <div class="checkbox-group">
                <label>
                    <input class="formControl" type="checkbox" name="" id="">One
                </label>
                <label>
                    <input class="formControl" type="checkbox" name="" id="">Two
                </label>
                <label>
                    <input class="formControl" type="checkbox" name="" id="">Three
                </label>
            </div>
        </div>
        <div class="field">
            <span class="serial-no">04</span>
            <label class="">Textarea</label>
            <div class="radio-group">
                <label>
                    <input type="radio" class="formControl" name="abc" id="">Test
                </label>
                <label>
                    <input type="radio" class="formControl" name="abc" id="">Test
                </label>
                <label>
                    <input type="radio" class="formControl" name="abc" id="">Test
                </label>
            </div>
        </div>
        <div class="sectionNavigation">
            <button class="goToNextSection" type="button">Next</button>
        </div>
    </div>
    <div class="formSection" style="display: none;">
        <div class="field">
            <label class="">Name 2</label>
            <input class="validate formControl" type="text" value="Saumitra" readonly>
        </div>

        <div class="field">
            <label class="">Name</label>
            <input class="validate formControl dontEnable" type="text" value="Saumitra" disabled>
        </div>

        <div class="field">
            <label class="">Father Name</label>
            <input class="validate formControl" type="text">
        </div>

        <div class="field">
            <label class="">Father Name</label>
            <select class="formControl">
                <option></option>
                <option>1</option>
            </select>
        </div>

        <div class="field">
            <span class="serial-no">04</span>
            <label class="">Textarea</label>
            <div class="checkbox-group">
                <label>
                    <input class="formControl" type="checkbox" name="" id="">One
                </label>
                <label>
                    <input class="formControl" type="checkbox" name="" id="">Two
                </label>
                <label>
                    <input class="formControl" type="checkbox" name="" id="">Three
                </label>
            </div>
        </div>


        <div class="field">
            <span class="serial-no">04</span>
            <label class="">Textarea</label>
            <div class="radio-group">
                <label>
                    <input type="radio" class="formControl" name="abc" id="">Test
                </label>
                <label>
                    <input type="radio" class="formControl" name="abc" id="">Test
                </label>
                <label>
                    <input type="radio" class="formControl" name="abc" id="">Test
                </label>
            </div>
        </div>

        <div class="sectionNavigation">
            <button class="goToPrevSection" type="button">Back</button>
            <button id="showPreview">Preview</button>
        </div>
    </div>

    <div id="submitSection" style="display: none;">
        <button id="closePreview">Back to form</button>
        <button id="submit">Submit Form</button>
    </div>
</form>
```

