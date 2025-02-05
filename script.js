let chatslog = [];

function getLastMessages(chatLog, maxMessages = 10) {
    const lastMessages = chatLog.slice(-maxMessages * 2);
    let formattedChat = [];
    for (let i = 0; i < lastMessages.length; i += 2) {
        formattedChat.push(`user: ${lastMessages[i]}. bot: ${lastMessages[i + 1]}`);
    }
    
    return formattedChat.join(' ');
}


async function sendMessage(){
    let prompt = `Your name is ManoMitra developed by Divyansh Kumar. You are a CBT-based therapy chatbot designed to help users manage stress, anxiety, and negative thought patterns using Cognitive Behavioral Therapy techniques. Respond with empathy, structured guidance, and practical exercises. Avoid diagnosing or giving medical advice.

Response Guidelines:

Be empathetic and supportive.
Use open-ended questions to encourage reflection.
Guide users through CBT techniques like cognitive restructuring, thought journaling, and mindfulness.
Keep responses clear and very concise and very short.
Encourage self-awareness and positive reinforcement.
previous chats: "${getLastMessages(chatslog, 10)}"
give response in 2 section for example: "message response from you <> mood status ('<i class="fa-solid fa-face-tired"></i>' , '<i class="fa-solid fa-face-tired"></i>', '<i class="fa-solid fa-face-surprise"></i>', '<i class="fa-solid fa-face-smile-beam"></i>', '<i class="fa-solid fa-face-sad-tear"></i>', '<i class="fa-solid fa-face-sad-cry"></i>', '<i class="fa-solid fa-face-meh"></i>', '<i class="fa-solid fa-face-laugh-beam"></i>', '<i class="fa-solid fa-face-frown-open"></i>', '<i class="fa-solid fa-face-frown"></i>', '<i class="fa-solid fa-face-angry"></i>') choose any one mood imoje"
remember each separate with the '<>'  for example "this is very intersting.<> <i class="fa-solid fa-face-tired"></i>"`
    let text = document.getElementById('userchat').value;
    if(text!=''){
        let chats = document.querySelector('.chats');
        let userchat = document.createElement('div');
        userchat.classList.add('userchat');
        userchat.innerHTML = `<div class="usericon">
                            <i class="fa-solid fa-circle-user fa-lg"></i>
                        </div><div class="user-content">${text}</div>`;
        chats.append(userchat);
        console.log(text)

        let botchat = document.createElement('div');
        botchat.classList.add('botchat');
        botchat.innerHTML = ` <div class="boticon">
                            <i class="fa-solid fa-robot fa-lg"></i>
                        </div>
                        <div class="bot-content">
                            <div class="loader"></div>
                        </div>`;
        chats.append(botchat);
        chatslog.push(text);
        document.getElementById('userchat').value='';
        scrollToBottom();
        let responce = await puter.ai.chat(prompt+', user message please answer it: '+text)
        let str = responce.message.content;
        let bot = str.split('<>')
        botchat.querySelector('.bot-content').innerHTML = `<p>${bot[0]}</p><button class="btn text-light audio-btn" onclick="playaudio(this);"><i class="fa-regular fa-circle-play"></i></button>`;
        console.log(bot[1])
        document.getElementById('status').innerHTML = `<b><u>${bot[1]}</u></b>`;
        scrollToBottom();
        chatslog.push(bot[0]);
        console.log(chatslog)
    }   

}

function playaudio(btn){
    let text = btn.parentNode.firstElementChild.innerText;
    puter.ai.txt2speech(text, language = 'en-IN').then((audio)=>{
        audio.play();
    });
}

function scrollToBottom() {
    let div = document.querySelector('.chats');
    div.scrollTop = div.scrollHeight;
}
