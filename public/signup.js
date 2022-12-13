
async function signUp(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.emailId.value;
    const phoneNumber = event.target.phoneNumber.value;
    const password = event.target.password.value;

    const obj = {
        username,
        email,
        phoneNumber,
        password
    }

    console.log(obj.email);

    try {
        const res = await axios.post('http://localhost:3000/user/signup',obj)
        if(res.status === 201){
            alert('User created succesfully')
            window.location.href = './login.html'
        }  else if(res.status === 207){
            alert(res.data.message);
        }
        
    } catch (error) {
        console.log(error, "error came")
    }
}