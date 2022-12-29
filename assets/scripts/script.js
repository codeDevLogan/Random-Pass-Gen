// Assignment code here

const lowerCaseArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
const upperCaseArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numericArray = '1234567890'.split('');
const specArray = '!@#$%^&*()_+-={}[]:;<>,.?/~'.split('');

let passLength;
let hasLowerCase;
let hasUpperCase;
let hasNum;
let hasSpecCase;
let numOfTypes = 0;

function getYorN(msg){
  let YorN = confirm(msg);
  numOfTypes++;
  return YorN;
}
/* getRandom
Use: The getRandom function is used to get random numbers between given parameters.
Call with: variable = getRandom(lowerLim, upperLim);
variable being the location you want the randomly generated number stored.
lowerLim being the lower limit number so the function will not return a number less than this.
upperLim being the upper limit number so the function will not return a number greater than this.
*/
function getRandom(lowerLim, upperLim){
  let randomNum = Math.random().toString().split('');
  while (randomNum[2] < lowerLim || randomNum[2] > upperLim){
    randomNum = Math.random().toString().split('');
  }
  return randomNum[2];
}
function isValidPassLength(passToCheck){
  if(passToCheck < 8 || passToCheck > 128){
    alert("Invalid Password Length please try again.");
    generatePassword();
  }
  return true;
}
function getUserAnswers(){
  hasLowerCase = getYorN("Would you like the password to include: Lower Case Characters?");
  hasUpperCase = getYorN("Would you like the password to include: Upper Case Characters?");
  hasNum = getYorN("Would you like the password to include: Numeric Characters?");
  hasSpecCase = getYorN("Would you like the password to include: Special Characters?");
}
function confirmUserAnsweredNonNull(){
  if(!hasLowerCase && !hasUpperCase && !hasNum && !hasSpecCase){
    if(confirm("You have selected no character types for your password. This will generate a blank password. Would you like to generate a new password?")){
      generatePassword();
    }else{
      return true;
    }
  }else{
    return false;
  }
}
/* hasThatType
Use: This function checks through a given string against the given character type's array to ensure the given string contains at least one instance of that character type.
Call with: hasThatType(varToCheck, typeToCheck)
varToCheck: This is the given string that is being looked through for the character type.
typeToCheck: This is the given character type indicator.
*/
function hasThatType(varToCheck, typeToCheck){
  let arrayToCheck = varToCheck.split('');
  if(typeToCheck==1){
    for(let i=0; i<arrayToCheck.length;i++){
      for(let j=0; j<lowerCaseArray.length; j++){
        if(arrayToCheck[i] == lowerCaseArray[j]){
          return true;
        }
      }
    }
  }
  if(typeToCheck==2){
    for(let i=0; i<arrayToCheck.length;i++){
      for(let j=0; j<upperCaseArray.length; j++){
        if(arrayToCheck[i] == upperCaseArray[j]){
          return true;
        }
      }
    }
  }
  if(typeToCheck==3){
    for(let i=0; i<arrayToCheck.length;i++){
      for(let j=0; j<numericArray.length; j++){
        if(arrayToCheck[i] == numericArray[j]){
          return true;
        }
      }
    }
  }
  if(typeToCheck==4){
    for(let i=0; i<arrayToCheck.length;i++){
      for(let j=0; j<specArray.length; j++){
        if(arrayToCheck[i] == specArray[j]){
          return true;
        }
      }
    }
  }
  return false;
}

function generatePassword(){
  let passToReturn = "";
  let randomNumForCharacterGen = getRandom(1, 4);
  console.log("Generate Password");
  console.log(randomNumForCharacterGen);
  passLength = window.prompt("How long would you like the password to be?");
  isValidPassLength(passLength);
  getUserAnswers();
  if(confirmUserAnsweredNonNull()){
    for(let i=0;i<passLength;i++){
      passToReturn = passToReturn+" ";
    }
    console.log("Answers were null");
    return passToReturn;
  }
  while(passToReturn.length<passLength){
    if(randomNumForCharacterGen == 1){
      console.log("Random Number Check");
      if(hasLowerCase){
        //console.log("Has Lower Case");
        passToReturn = passToReturn + lowerCaseArray[getRandom(0, (lowerCaseArray.length-1))];
        console.log(hasThatType(passToReturn, randomNumForCharacterGen));
        if(hasThatType(passToReturn, randomNumForCharacterGen)){
          numOfTypes--;
        }
      }
    }
    if(randomNumForCharacterGen == 2){
      console.log("Random Number Check");
      if(hasUpperCase){
        //console.log("Has Upper Case");
        passToReturn = passToReturn + upperCaseArray[getRandom(0, (upperCaseArray.length-1))];
        if(!hasThatType(passToReturn, randomNumForCharacterGen)){
          numOfTypes--;
        }
      }
    }
    if(randomNumForCharacterGen == 3){
      console.log("Random Number Check");
      if(hasNum){
        //console.log("Has Numbers");
        passToReturn = passToReturn + numericArray[getRandom(0, (numericArray.length-1))];
        if(!hasThatType(passToReturn, randomNumForCharacterGen)){
          numOfTypes--;
        }
      }
    }
    if(randomNumForCharacterGen == 4){
      console.log("Random Number Check");
      if(hasSpecCase){
        //console.log("Has Spec Case");
        passToReturn = passToReturn + specArray[getRandom(0, (specArray.length-1))];
        if(!hasThatType(passToReturn, randomNumForCharacterGen)){
          numOfTypes--;
        }
      }
    }
    randomNumForCharacterGen = getRandom(1, 4);
    // The point of this if statement is to ensure the password generated will contain each of the requested character types at least once.
    console.log(numOfTypes);
    console.log(randomNumForCharacterGen);
    if(passToReturn.length === passLength-1 && numOfTypes <= 0){
      passToReturn = '';
    }
  }
  console.log(passToReturn);
  return passToReturn;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
