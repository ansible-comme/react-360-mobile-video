# react-360-mobile-video
Adds user gesture to play video &amp; audio with sound in **mobile** React-360 apps

### index.html
```
  <div id="container">
    <div id="buttonHold">
    <button id="playbutton">
      Enable Sound for Mobile & Begin VR
    </button>
    <video id="video" width="0" height="0">
      <source src="video.mp4" />
    </video>
    </div>
  </div>
```
### index.html <script>
```
  let videoElem = document.getElementById("video");
  let playButton = document.getElementById("playbutton");
  playButton.addEventListener("click", playVideo, false);

  async function playVideo() {
    try {
      await videoPlayUnmutePause();
      enterApp();
    } catch(err) {
      console.log(err);
    }
  }

  function videoPlayUnmutePause() {
    videoElem.play();
    videoElem.muted = false;
    videoElem.pause();
    const elem = document.getElementById('buttonHold');
    elem.parentNode.removeChild(elem);
  }

  function enterApp() {
    // Initialize the React 360 application
    React360.init(
      'index.bundle?platform=vr&dev=true',
      document.getElementById('container'),
      {
        assetRoot: 'static_assets/',
      }
    );
  }
  <script src="./client.bundle?platform=vr"></script>

```
### client.js
  ```
  const player = r360.compositor.createVideoPlayer('myplayer');
  player.setSource(r360.getAssetURL('video.mp4'));
  player.setMuted(false);
 ```
**^ note: without the `setMuted(false)` - video will still play as muted!**

### index.js
```
componentDidMount() {
  Environment.setBackgroundVideo('myplayer');
  VideoModule.resume('myplayer');
}
```

You can initialize source empty and it still works:
`<source src="" />` but it throws an `Uncaught (in promise) DOMException`

Also, once you move into react the src doesn't have to match the initial one. Once user has had the initial click interaction *ANY* video seems to play with sound.
`player.setSource(r360.getAssetURL('altVideo.mp4'));`

The initial HTML script just loads, plays and then pauses the video (I then just remove it from the DOM). `await` makes sure this is successful, then we `enterApp()`.
Any error should be logged by the console.

Further reading: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play#Example
