
const letra = [
    "I'm not tryna ruin your fun",
    "You're just a little bit late, I guess you're already done",
    "There's this feeling I can't shake 'cause I'm too dumb",
    "I'm never doing the right thing, so I'm so stuck",
    "If you see me in America, I might say, \"Hi\"",
    "But if you meet me out in Europe, I'm a talkative guy",
    "Maybe we'll talk over scones around lunch some time",
    "And I've never been to France, so it might be nice",
    "But I can't take this paparazzi, jeez",
    "It's like the camera's always out and always starin' at me",
    "And if I say the wrong thing, they'll cut my tongue 'til it bleeds",
    "Always whippin' out their pitchforks when you try to speak",
    "(But that couldn't be me)",
    "Next day, I'm walkin' the road",
    "Kickin' rocks, it's my fault",
    "My life's the worst story told",
    "I'll be this way 'til I'm old",
    "I rip a page out the book",
    "I'm just so misunderstood",
    "I always think about her",
    "And when my life felt good",
    "I smoked a cig' on the porch",
    "It doesn't help me at all",
    "I wonder, \"What's it all for?\"",
    "Is this the girl I adored?",
    "And I know I can't afford",
    "Watchin' her walk out the door",
    "So I keep it to myself",
    "And keep my feet on the floor"
];

const esperar = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

async function reproducirLetra() {

    console.clear();

    for (let i = 0; i < letra.length; i++) {

        // Mostrar la siguiente línea
        console.log("🎵 " + letra[i] + ".");

        // Esperar 2 segundos
        await esperar(2000);

        // Borrar la línea anterior
        if (i < letra.length - 1) {
            process.stdout.write("\x1B[1A\r\x1B[2K\x1B[1B\r");
        }
    }
}

reproducirLetra();
