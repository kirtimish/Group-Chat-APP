async function chat(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const chats = {
        chats: event.target.chats.value
    }

    try {
        const res = await axios.post('http://localhost:3000/user/chatNow',chats, {headers: {"Authorization": token}})
        if(res.status == 201){
            console.log(res.data)
            console.log(res.data.username);
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
    let lastId;

    const messages = JSON.parse(localStorage.getItem('msg')); //converts into obj

    if(messages == undefined || messages.length == 0){
      lastId =0;
    }
    else{
      lastId = messages[messages.length-1].id;
    }

    try {
        setTimeout(async() => {
            const res = await axios.get('http://localhost:3000/user/getChats',{headers: {"Authorization": token}})
        console.log(res)

        const name = res.data.username;
        localStorage.setItem('name',name);

        var newArr = res.data.messageTobeSend
        saveToLocalStorage(newArr)

        if(res.status === 201){
            console.log(res.data.messageTobeSend)
            const parentNode = document.getElementById('chats-Display')

            parentNode.innerHTML = '';
            for(let i=0;i<res.data.messageTobeSend.length;i++){
                const name = localStorage.getItem('name')
                const message = res.data.messageTobeSend[i].message;
                const id = res.data.messageTobeSend[i].id;

                const childHTML = `<div id='${id}'> ${name} --- ${message} </div>`

                parentNode.innerHTML += childHTML;
            }
        }
        } , 1000)
        
    } catch (error) {
        console.log('Could not get messages', error)
    }
})

function saveToLocalStorage(arr){
    let chatArray = [];
    let oldMessages = JSON.parse(localStorage.getItem('msg'))

    if(oldMessages == undefined || oldMessages.length == 0){
        
        chatArray = chatArray.concat(arr)

    } else {
        chatArray = [];
        chatArray = chatArray.concat(oldMessages,arr)
    }

    localStorage.setItem('msg',JSON.stringify(chatArray));
    console.log((JSON.parse(localStorage.getItem('msg'))).length)

}