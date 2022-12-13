async function chat(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const chat = {
        chats: event.target.chats.value
    }

    try {
        const res = axios.post('http://localhost:3000/chatNow',chat, {headers: {"Authorization": token}})
        if(res.status == 201){
            console.log(res);
            showList(chats)
        }
    } catch (error) {
        console.log(error)
    }

}

function showList(user) {
    const parentNode = document.getElementById('chats-Display')

    const childHTML = `<li id='${user.id}'> ${user.chats} -- </li>`

    parentNode.innerHTML += childHTML;
}