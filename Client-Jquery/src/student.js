export function join(code) {
    client.main.wsSend({
        action: 'join',
        code: code
    });
}
