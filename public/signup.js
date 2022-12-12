
function signup(event) {
    const username = event.target.username.value;
    const email = event.target.emailId.value;
    const phoneNumber = event.target.phoneNumber.value;
    const password = event.target.password.value;

    const userObj = {
        username,
        email,
        phoneNumber,
        password
    }

    console.log(userObj);

    axios.post('http://localhost:3000/user/signup', userObj)
    .then(res => {
        if(res.status === 201){
            console.log(res);
        } else {
            console.log('sigup unsuccessfull')
        }
    })
    .catch(err => {
        console.log('something went wrong', err)
    })
}