class InvalidDataError extends Error {
    constructor(message) {
      super(message);
      this.name = "MyException";
    }
  }

class BMICalculator {

    static heightInRange(height) {
        if (height < 0.5) {
            throw new InvalidDataError('Height must be at least 0.5 meters')
        }
        if (height > 2.6) {
            throw new InvalidDataError('Height must not be more than 2.6 meters')
        }
        return true
    }

    static weightInRange(weight) {
        if (weight < 10) {
            throw new InvalidDataError('Weight must be at least 10 kilograms')
        }
        if (weight > 150) {
            throw new InvalidDataError('Weight must not be more than 150 kilograms')
        }
        return true
    }
  
    static bmi(height, weight) {
        if ( BMICalculator.heightInRange(height) && BMICalculator.weightInRange(weight) ) {
            return weight/(height * height)
        }
    }
}

function bmi(){

    // debugger
    /* Using Javascript & DOM Selectors */ 
    let height = document.getElementsByClassName("height_input")[0].value; /* https://www.w3schools.com/jsref/met_document_getelementsbyclassname.asp */
    /* let feet = document.querySelector(".feet").value; */

    /* Using Javascript & JQuery Selector */
    let feet2 = $(".height_input")[0].value /* https://www.w3schools.com/jquery/jquery_ref_selectors.asp */

    var clearBtn = document.getElementById("clear");
    var calcBtn = document.getElementById("bmi");

    if (clearBtn.getAttribute("usrOn") == "0") {
        clearBtn.setAttribute("usrOn", "1")
        /* store away original background color and opacity */
        clearBtn.setAttribute("origC", getComputedStyle(clearBtn).backgroundColor);
        clearBtn.setAttribute("origO", getComputedStyle(clearBtn).opacity);
    } 

    /* flip to calcBtn background color and opacity */
    let color=calcBtn.getAttribute("origC");
    let opacity=getComputedStyle(calcBtn).opacity;

    // clearBtn.setAttribute("style", "background-color: " + color);
    // Not advisable to do the above: https://www.w3schools.com/jsref/met_element_setattribute.asp 
    clearBtn.style.backgroundColor=color;
    clearBtn.style.opacity=opacity;

    let weight = document.querySelector(".weight_input").value;

    if (document.getElementById('m').checked) {
        var aUnit = 'm'     
    } else {
        var aUnit = 'cm';
        height /= 100;
    }

    debugger
    if (document.querySelector(".output_space > p").innerHTML=="The Output Area") {
        document.querySelector(".output_space > p").innerHTML=""
    }

    try {
        bmi = BMICalculator.bmi(height, weight)
        if (bmi < 18.5) {
            document.querySelector(".output_space > p").innerHTML += "Your Body Mass Index (BMI) is: "+(Math.round(bmi*100/100)).toFixed(2)+"<br>"+" Index Value is Under Weight"+"<br>";
        } else if ((bmi >= 25) && (bmi <= 29.9)) {
            document.querySelector(".output_space > p").innerHTML += "Your Body Mass Index (BMI) is: "+(Math.round(bmi*100/100)).toFixed(2)+"<br>"+" Index Value is Over Weight"+"<br>";
        } else if (bmi >= 30) {
            document.querySelector(".output_space > p").innerHTML += "Your Body Mass Index (BMI) is: "+(Math.round(bmi*100/100)).toFixed(2)+"<br>"+" Index Value is Obesse"+"<br>";
        } else {
            document.querySelector(".output_space > p").innerHTML += "Your Body Mass Index (BMI) is: "+(Math.round(bmi*100/100)).toFixed(2)+"<br>"+" Index Value normal"+"<br>";
        }
    }
    catch (err) {
        document.querySelector(".output_space > p").innerHTML += err
    }
}

function clear(){
    debugger
    document.querySelector(".output_space > p").innerHTML = "The Output Area";

    /* Restore Original Color and Opacity */
    this.setAttribute("usrOn", "0")
    let origO=this.getAttribute("origO")
    let origC=this.getAttribute("origC")

    /* These won't work for non-user defined attributes 
    this.setAttribute("opacity", origO);
    this.setAttribute("backgroundColor", origC);
    */
   this.style.backgroundColor=origC;
   this.style.opacity=origO;

   let inWeight = document.querySelector(".weight_input");
   /* inWeight.style.placeholder="kg" */
   inWeight.value=""
   /*document.querySelector(".weight").style.opacity=1;
   document.querySelector(".weight").style.backgroundColor="#FFFFFF";*/
   let inHeight = document.querySelector(".height_input"); 
   /* inHeight.style.placeholder="cm or m" */
   inHeight.value=""
   /*document.querySelector(".height").style.opacity=1;
   document.querySelector(".height").style.backgroundColor=rgb(255,255,255);*/
   let mButton=document.getElementById('m')
   let cmButton=document.getElementById('cm')
   if (mButton.checked == false) {
        cmButton.checked = false;
        mButton.checked = true;
   }
}

if(document.getElementById("bmi") != null){
    document.querySelector("#bmi").addEventListener("click", bmi);
}
if(document.getElementById("clear") != null){
    document.querySelector("#clear").addEventListener("click", clear);
}
