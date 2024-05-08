
export const validData = (email,password,form,name) =>{
   const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

   const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  if(form === true){
   if(!isEmailValid){
    return "Email Id is not Valid"
   }

   if(!isPasswordValid){
    return "Password is Not Valid"
   }

   return null;
  } else if(form === false){
    if(!name){
      return "This Field is required"
    }
    if(!isEmailValid){
      return "Email Id is not Valid"
     }
  
     if(!isPasswordValid){
      return "Password is Not Valid"
     }

     return null;
  }
}