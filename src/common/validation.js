const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

const validate = {
  name: (value) => {
     return value.trim().length < 6
        ? { name: true, nameError: "Name must be atleast 6 characters long" }
        : { name: false, nameError: false }
  },
  email: (value) => {
    return emailRegex.test(value)
      ? { email: false, emailError: false }
      : { email: true, emailError: "Please enter a valid email address" }
  },

  message: (value)=>{
    const numOfWords = value.trim().split(/\s+/).length;

    if(numOfWords < 10 || numOfWords > 100){
      return {message: true, messageError: "Describe your message in 10 to 100 words"}
    }else{
      return {message: false, messageError: false}
    }
  },
};

export default validate;
