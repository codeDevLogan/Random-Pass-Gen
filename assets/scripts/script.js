// Assignment code here

const lowerCaseArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
const upperCaseArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numericArray = '1234567890'.split('');
const specArray = '!@#$%^&*()_+-={}[]:;<>,.?/~'.split('');
let boolArray = [false, false, false, false];

let passLength;
let hasLowerCase;
let hasUpperCase;
let hasNum;
let hasSpecCase;
let numOfTypes = 0;

/* getYorN

*/
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
/* isValidPasswordLength
Use: This function checks the requested passwordLength value to ensure it does not exceed the upper limit and does not fall below the lower limit. It also assures that the length is a number.
Use with: isValidPassLength(passToCheck);
passToCheck: This is the variable recieved from the call statement that is used to check against the upper and lower limits. As well as the character type assurances.
*/
function isValidPassLength(passToCheck){
  for(let i=0;i<passToCheck.length; i++){
    for(let j=0;j<upperCaseArray.length; j++){
      if(passToCheck[i] == upperCaseArray[j]){
        alert("Invalid Password Length please try again.");
        return false;
      }
    }
  }
  for(let i=0;i<passToCheck.length; i++){
    for(let j=0;j<lowerCaseArray.length; j++){
      if(passToCheck[i] == lowerCaseArray[j]){
        alert("Invalid Password Length please try again.");
        return false;
      }
    }
  }
  for(let i=0;i<passToCheck.length; i++){
    for(let j=0;j<specArray.length; j++){
      if(passToCheck[i] == specArray[j]){
        alert("Invalid Password Length please try again.");
        return false;
      }
    }
  }
  if(passToCheck < 8 || passToCheck > 128){
    alert("Invalid Password Length please try again.");
    return false;
  }
  return true;
}
/* getUserAnswers
Use: This function collects data from the user to be stored in the global data points. For best user experience this should only be called once inside the generatePassword function.
Call with: getUserAnswers();
*/
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
Call with: hasThatType(varToCheck, typeToCheck);
varToCheck: This is the given string that is being looked through for the character type.
typeToCheck: This is the given character type indicator.
*/
function hasThatType(varToCheck, typeToCheck){
  let arrayToCheck = varToCheck.split('');
  if(typeToCheck == 1 && !(boolArray[0])){
    for(let i=0; i<arrayToCheck.length;i++){
      for(let j=0; j<lowerCaseArray.length; j++){
        if(arrayToCheck[i] == lowerCaseArray[j]){
          boolArray[0] = true;
          return true;
        }
      }
    }
  }
  if(typeToCheck == 2 && !(boolArray[1])){
    for(let i=0; i<arrayToCheck.length;i++){
      for(let j=0; j<upperCaseArray.length; j++){
        if(arrayToCheck[i] == upperCaseArray[j]){
          boolArray[1] = true;
          return true;
        }
      }
    }
  }
  if(typeToCheck == 3 && !(boolArray[2])){
    for(let i=0; i<arrayToCheck.length;i++){
      for(let j=0; j<numericArray.length; j++){
        if(arrayToCheck[i] == numericArray[j]){
          boolArray[2] = true;
          return true;
        }
      }
    }
  }
  if(typeToCheck == 4 && !(boolArray[3])){
    for(let i=0; i<arrayToCheck.length;i++){
      for(let j=0; j<specArray.length; j++){
        if(arrayToCheck[i] == specArray[j]){
          boolArray[3] = true;
          return true;
        }
      }
    }
  }
  return false;
}

/* generatePassword
Use: This function acts as the main through put of the program. The majority of functions are run here and this handles the logic of the button.
Call with: generatePassword();
*/
function generatePassword(){
  let passToReturn = "";
  let randomNumForCharacterGen = getRandom(1, 4);
  console.log("Generate Password");
  console.log(randomNumForCharacterGen);
  passLength = window.prompt("How long would you like the password to be? (Between 8 and 128 characters in length)");
  while(!isValidPassLength(passLength)){
    passLength = window.prompt("How long would you like the password to be? (Between 8 and 128 characters in length)");
  }
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
        //console.log(hasThatType(passToReturn, randomNumForCharacterGen));
        if(hasThatType(passToReturn, randomNumForCharacterGen)){
          numOfTypes--;
        }
      }
    }
    if(randomNumForCharacterGen == 2){
      //console.log("Random Number Check");
      if(hasUpperCase){
        //console.log("Has Upper Case");
        passToReturn = passToReturn + upperCaseArray[getRandom(0, (upperCaseArray.length-1))];
        if(hasThatType(passToReturn, randomNumForCharacterGen)){
          numOfTypes--;
        }
      }
    }
    if(randomNumForCharacterGen == 3){
      //console.log("Random Number Check");
      if(hasNum){
        //console.log("Has Numbers");
        passToReturn = passToReturn + numericArray[getRandom(0, (numericArray.length-1))];
        if(hasThatType(passToReturn, randomNumForCharacterGen)){
          numOfTypes--;
        }
      }
    }
    if(randomNumForCharacterGen == 4){
      //console.log("Random Number Check");
      if(hasSpecCase){
        //console.log("Has Spec Case");
        passToReturn = passToReturn + specArray[getRandom(0, (specArray.length-1))];
        if(hasThatType(passToReturn, randomNumForCharacterGen)){
          numOfTypes--;
        }
      }
    }
    randomNumForCharacterGen = getRandom(1, 4);
    //console.log(numOfTypes);
    //console.log(randomNumForCharacterGen);
    // The point of this if statement is to ensure the password generated will contain each of the requested character types at least once.
    if(passToReturn.length === passLength-1 && numOfTypes <= 0){
      passToReturn = '';
    }
  }
  //console.log(passToReturn);
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
