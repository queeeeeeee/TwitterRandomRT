function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function OnRandom(response) {

    var find = document.querySelectorAll('[aria-label="Timeline: Retweeted by"]');
    if (find.length == 0) {
        find = document.querySelectorAll('[aria-label="타임라인: 리트윗함"]');
    }
    var element = find[0];

    var prevY = 0;

    element.parentNode.parentNode.scroll(0, 0);
    await sleep(500);
    while (true) {
        var currentY = element.parentNode.parentNode.scrollTop + 200;

        if (currentY == prevY)
            break;
        element.parentNode.parentNode.scroll(0, currentY);

        await sleep(500);

        prevY = currentY;
    }

    element.parentNode.parentNode.scroll(0, getRandomInt(0, prevY));
    await sleep(500);
    var find = element.querySelectorAll('[data-testid="cellInnerDiv"]');

    var index = getRandomInt(0, find.length);
    find[index].scrollIntoView();
    await sleep(500);
    find[index].style.backgroundColor = "dimgrey";
}

chrome.runtime.onMessage.addListener((obj, sender, response) => {
    OnRandom(response);
});
