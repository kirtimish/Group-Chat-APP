
async function login(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj = {
        email,
        password
    }

    console.log(obj.email);

    try {
        const res = await axios.post('http://localhost:3000/user/login',obj)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}