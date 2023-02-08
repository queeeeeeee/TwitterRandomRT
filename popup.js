async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  return tabs[0];
}

const OnResult = (result) => {
  document.getElementsByName("result")[0].innerHTML = result;
};

const OnRandom = async () => {
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "Random",
  }, OnResult);
}

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  if (activeTab.url.includes("twitter.com") && activeTab.url.includes("retweets")) {
    const container = document.getElementsByName("container")[0];
    container.innerHTML = '';

    var button = document.createElement('button');
    button.onclick = OnRandom;
    button.innerHTML = "추첨하기";
    container.appendChild(button);

  } else {
    const container = document.getElementsByName("container")[0];
    container.innerHTML = '트윗의 리트윗 페이지를 열어주세요.';
    var button = document.getElementsByClassName("RandomButton")[0];
    if(button != null)
        button.parentNode.removeChild(button);
  }
});

