/*
Room messaging service - made by UserCoder12345.
Works on ourworldoftext.com
This is the host script. The client is available in the repo
*/

w.broadcastReceive(1);

function writes(s, color, loc) {
    for (const ch of s) {
        writeCharTo(ch, color, ...loc, true);
        loc = coordinateAdd(...loc, 0, 0, 1, 0);
    }
};

var main_location = cursorCoords;
var main_location2 = coordinateAdd(...main_location, 0, 0, 0, 1);
var users = [];
var interval;

window.addEventListener("beforeunload", function() {
    network.cmd("room-exit", true);
    writes("Room test thingy - SCRIPT STOPPED                                                                   ")
});

function show_users() {
    if (users.length !== 0) {
        writes("Room test thingy - connected users: " + users.join(', '), 0x000000, main_location + "                                   ");
    } else {
        writes("Room test thingy - connected users: none :(", 0x000000, main_location + "                                               ");
    }
}

interval = setInterval(show_users, 1000);

w.on("cmd", e => {
    var msg = e.data;
    if (msg === "room-join") {
        users.push(e.username);
    } else if (msg.startsWith("room-msg")) {
        var msgarray = msg.split("room-msg ");
        w.doAnnounce(e.username + " says " + msgarray[1]);
    } else if (msg === "room-exit") {
        users = users.filter(user => user !== e.username);
    }
});

menu.addOption("Send message", function() {
    var toSend = prompt("Type a message to send");
    if (toSend) {
        network.cmd("room-msg " + toSend, true);
    }
});
