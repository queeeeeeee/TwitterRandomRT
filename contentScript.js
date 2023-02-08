
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

chrome.runtime.onMessage.addListener((obj, sender, response) => {

  var find = document.querySelectorAll('[aria-label="Timeline: Retweeted by"]');
  if(find.length == 0)
  {
    find = document.querySelectorAll('[aria-label="타임라인: 리트윗함"]');
  }
  var element = find[0];
  //find every span in child of elements
  var spans = element.getElementsByTagName("span");
  var arr = [];
  var index = 0;

  for(var i = 0; i<spans.length;i++)
  {
    if(spans[i].innerHTML.startsWith('@'))
    {
        arr[index++] = spans[i].innerHTML;
    }
  }
  var randomIndex = getRandomInt(0, arr.length);
  var result = arr[randomIndex];

  response(result);
});

