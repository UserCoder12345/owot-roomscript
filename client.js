/*
Room messaging service - made by UserCoder12345.
Works on ourworldoftext.com
This is the client script. The host is available in the repo
*/
menu.addOption("Send message", function() {
    var toSend = prompt("Type a message to send");
    if (toSend) {
        network.cmd("room-msg " + toSend, true);
    }
});

menu.addOption("Exit room",function(){network.cmd("room-exit",true)});
network.cmd("join-room",true);

window.addEventListener("beforeunload", function() {
    network.cmd("room-exit", true);
});
