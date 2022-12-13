async function chat(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const chats = {
        chats: event.target.chats.value
    }

    try {
        const res = await axios.post('http://localhost:3000/user/chatNow',chats, {headers: {"Authorization": token}})
        if(res.status == 201){
            console.log(res);
            showList(chats)
        }
    } catch (error) {
        console.log('cannot post message',error)
    }

}

function showList(user) {
    const parentNode = document.getElementById('chats-Display')

    const childHTML = `<li id='${user.id}'> ${user.chats} -- </li>`

    parentNode.innerHTML += childHTML;
}

window.addEventListener('DOMContentLoaded',async () => {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.get('http://localhost:3000/user/getChats',{headers: {"Authorization": token}})
        console.log(res)

        if(res.status === 201){
            console.log(res.data.data)
            for(let i=0;i<res.data.data.length;i++){
                const name = res.data.data[i].user.username;
                const message = res.data.data[i].message;
                const id = res.data.data[i].id;
                const parentNode = document.getElementById('chats-Display')

                const childHTML = `<div id='${id}'> ${name} --- ${message} </div>`

                parentNode.innerHTML += childHTML;
            }
        }
    } catch (error) {
        console.log('Could not get messages', error)
    }
})