
async function login(event) {
    event.preventDefault();

    const email = event.target.emailId.value;
    const password = event.target.password.value;

    const obj = {
        email,
        password
    }

    email.value = '';
    password.value = '';
    
    console.log(obj.email);

    try {
        const res = await axios.post('http://localhost:3000/user/login',obj)
        alert(res.data.success);
    } catch (error) {
        console.log(error)
    }
}