async function chat(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');

    let groupId = localStorage.getItem('goupId')
    console.log(groupId)

    let name = localStorage.getItem('name');
    const chats = {
        chats: event.target.chats.value
    }

    try {
        const res = await axios.post(`http://localhost:3000/message/allMsg/${groupId}`,chats, {headers: {"Authorization": token}})
        if(res.status == 201){
            console.log(res)
            // showList(chats)
            event.target.chats.value = '';

            saveToLocalStorage(res.data.arr);
        }
    } catch (error) {
        console.log('cannot post message',error)
    }

}

function showChatsOnScreen() {
    let name = localStorage.getItem('name')
    let groupId = localStorage.getItem('groupId')

    let chatArray = localStorage.getItem(`msg${groupId}`)

    console.log(chatArray)
    let newChatarray = JSON.parse(chatArray)
    console.log(newChatarray)

    let chatContainer = document.querySelector('.chat-container-div')
    chatContainer.innerHTML = '';

    newChatarray.forEach(chat => {
        if(name == chat.name){
            let child = `<div class= "msg-div" >
            <div class= "resize-sent">
                <div class= "sent" id=${chat.id}>
                  <p class="sent-name">${chat.name}</p>
                  <p class="sent-msg">${chat.message}</p>
                  <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
                
                  </div>
            </div>
         </div>`

         chatContainer.innerHTML += child;
        } else {
            let child = `<div class="msg-div">
            <div class="resize-received">
              <div class="received" id=${chat.id}>
                <p class="received-name">${chat.name}</p>
                <p class="received-msg">${chat.message}</p>
                <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
              </div>
            </div>
          </div>`
          chatContainer.innerHTML += child

        }
    });
}

window.addEventListener('DOMContentLoaded',async () => {
    const token = localStorage.getItem('token');
    let groupId = localStorage.getItem('groupId')
    console.log(groupId)

    let groupName = localStorage.getItem('groupName');
    let lastId;

    const messages = JSON.parse(localStorage.getItem('msg')); //converts into obj

    if(messages == undefined || messages.length == 0){
      lastId =0;
    }
    else{
      lastId = messages[messages.length-1].id;
    }

    try {

        getMessage(groupId);
        getUsers(groupId);
        
    } catch (error) {
        console.log('Could not get messages', error)
    }
})

function saveToLocalStorage(arr){
    let groupId = localStorage.getItem('groupId')
    console.log(groupId)

    let chatArray = [];
    let oldMessages = JSON.parse(localStorage.getItem('msg'))

    if(oldMessages == undefined || oldMessages.length == 0){
        
        chatArray = chatArray.concat(arr)

    } else {
        chatArray = [];
        chatArray = chatArray.concat(oldMessages,arr)
    }

    console.log(typeof(chatArray))
    let parseChat = JSON.stringify(chatArray)
    console.log(typeof(parseChat))

    localStorage.setItem(`msg${groupId}`, parseChat);
    console.log(localStorage.getItem(`msg${groupId}`))

    console.log((JSON.parse(localStorage.getItem(`msg${groupId}`))).length)
    showChatsOnScreen();
}

async function getMessage(groupId){
    console.log(groupId)
    const token = localStorage.getItem('token')

    let lastId;
    const messages = JSON.parse(localStorage.getItem(`msg${groupId}`))

    if(messages == undefined || messages.length == 0){
        lastId = 0;
    } else{
        lastId = messages[messages.length - 1].id;
    }

    try {
        let res = await axios.get(`http://localhost:3000/message/getMsg/${groupId}?msg=${lastId}`,{headers: {'Authorization': token}})
        console.log(res.data.arr)

        saveToLocalStorage(res.data.arr)

    } catch (error) {
        console.log(error)
    }
}

async function getUsers(groupId) {
    const token = localStorage.getItem('token')

    try {
        let res = await axios.get(`http://localhost:3000/group/fetchUsers/${groupId}`, {headers: {'Authorization' : token }})
        console.log(res.data)

        res.data.forEach( data => addGroupUsersToScreen(data))
    } catch (error) {
        console.log(error)
    }
}
function addGroupUsersToScreen(data) {
    const userParent = document.getElementById('group')
    let child = `<div style="width:100%;color:white" class="group-style">
    <button class="user-btn">${data.name}</button>
    <button class="add-user" >+</button>
    <button class="remove-user">-</button>
    <button class="delete-group">r</button>
  </div>`
  userParent.innerHTML += child
}