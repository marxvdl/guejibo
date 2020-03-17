let currentGameroom = null;

export function join(code) {
    client.main.wsSend({
        action: 'join',
        code: code
    });
}

export function doJoin(data) {
    if (data.success) {
        let gr = global.gameroom = data.gameroom;

        $('#status').text('Waiting...');
        $('#game-name').text(gr.game.name)
        $('#gr-owner').text(gr.owner.name);
        for (let user of gr.members) {
            $('#users').append(`<li id="user-${user.id}">${user.name}</li>`)
        }
        $('#gameroom-panel').fadeIn();

        currentGameroom = gr.id;
    }
    else {
        console.log(`Error: could not join game: data.error`)
    }
}

export function sayReady(data) {
    if (currentGameroom == data.gameroom) {
        client.main.wsSend({
            action: 'im-ready',
            gameroom: data.gameroom
        });
    }
}

export function markPlayerAsReady(user, gameroomId) {
    if (gameroomId in client.main.gameRoomMembers === false)
        return;

    const gr = client.main.gameRoomMembers[gameroomId];

    if (user.id in gr === false)
        gr[user.id] = user;

    gr[user.id].online = true;
    let statusQuery = `#gr${gameroomId}-user${user.id}`;
    let statusElement = $(statusQuery);

    if (!statusElement.length) {
        let li = $(`<li>${user.name} <span class="userstatus" id="gr${gameroomId}-user${user.id}"></span></li>`);
        $(`#ul-gr${gameroomId}`).append(li);
        statusElement = $(statusQuery);
    }

    statusElement.text('online');
    statusElement.removeClass('failure').addClass('success');

    console.log(client.main.gameRoomMembers);
}

export function checkPlayersReady(gameroomId) {
    client.main.wsSend({
        action: 'check-players-ready',
        gameroom: gameroomId
    });

    let gr = client.main.gameRoomMembers[gameroomId];
    for (let userId in gr) {
        gr[userId].online = false;
    }

    setTimeout(
        () => {
            for (let userId in gr) {
                if (!gr[userId].online) {
                    let statusQuery = `#gr${gameroomId}-user${userId}`;
                    let statusElement = $(statusQuery);

                    statusElement.text('offline');
                    statusElement.removeClass('success').addClass('failure');
                }
            }
        },
        800
    );
}






