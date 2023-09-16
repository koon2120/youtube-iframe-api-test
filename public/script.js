
//create url params
let url_params = new URLSearchParams(window.location.search)

//get video id
let vidoid_params = ""
if (url_params.get("v")) {
  vidoid_params = url_params.get("v")
} else {
  vidoid_params = "DTgVOR4mrFY"
}

//get loop status
let video_loop_status = false
if (url_params.get("loop")) {
  if (url_params.get("loop") == "true") {
    video_loop_status = true
    document.getElementById("loop_yt").checked = true
  } else if (url_params.get("loop") == "false") {
    video_loop_status = false
    document.getElementById("loop_yt").checked = false
  }
}

//convert to hh:mm:ss
String.prototype.toHHMMSS = function () {
  let sec_num = parseInt(this, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  let hh_mm_ss_return = ""
  if (hours != 0) {
    hh_mm_ss_return += hours + ":"
  }
  hh_mm_ss_return += minutes + ":" + seconds
  return hh_mm_ss_return;
}

//scroll_focus_status
let scroll_focus = false

//add youtube video player and configure
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '360',
    width: '640',
    videoId: vidoid_params,
    playerVars: {
      "autoplay": 0,
      "color": "white",
      "controls": 0,
      "disablekb": 0,
      "fs": 0,
      "rel": 0,
      "start": 0,
      "cc_load_policy": 0
    },
    events: {
      'onStateChange': onPlayerStateChange,
      'onReady': onPlayerReady
    }
  });

  var iframeWindow = player.getIframe().contentWindow;
  var lastTimeUpdate = 0;
  window.addEventListener("message", function (event) {
    if (event.source === iframeWindow) {
      var data = JSON.parse(event.data);
      if (
        data.event === "infoDelivery" &&
        data.info &&
        data.info.currentTime
      ) {
        var time = Math.floor(data.info.currentTime);
        if (time !== lastTimeUpdate) {
          lastTimeUpdate = time;
          document.getElementById("display_scroll_yt").innerHTML = String(lastTimeUpdate).toHHMMSS() + " of " + String(player.getDuration()).toHHMMSS() + " : ";
          if (scroll_focus == false) {
            document.getElementById("scroll_yt").value = Math.floor((lastTimeUpdate/player.getDuration())*100)
          }
        }
      }
    }
  });
}

//for new video request
function videoid_yt_enter() {
  if (document.getElementById("video_source").value.length == 11) {
    window.location.replace("http://" + window.location.hostname + "/watch?v=" + document.getElementById("video_source").value)
  } else if (document.getElementById("video_source").value.slice(0, 32) == "https://www.youtube.com/watch?v=") {
    window.location.replace("http://" + window.location.hostname + "/watch?v=" + document.getElementById("video_source").value.slice(32, 43))
  }
}

//for scroll video change
function scroll_yt_change() {
  player.seekTo(Math.floor((document.getElementById("scroll_yt").value/100)*player.getDuration()),true)
}

function scroll_yt_down() {
  scroll_focus = true
}

function scroll_yt_up() {
  scroll_focus = false
}

//for play video
function playvideo_yt() {
  player.playVideo()
}

//for pause video
function pausevideo_yt() {
  player.pauseVideo()
}

//for loop video
function loop_video_yt() {
  video_loop_status = document.getElementById("loop_yt").checked
}

//for mute video
function mute_video_yt() {
  player.mute()
  document.getElementById("mute").disabled = true
  document.getElementById("unmute").disabled = false
}

//for unmute video
function unmute_video_yt() {
  player.unMute()
  document.getElementById("mute").disabled = false
  document.getElementById("unmute").disabled = true
}

//for back to start video
function back_to_start_yt() {
  player.seekTo(0, true)
}

//for go to end video
function go_to_end_yt() {
  player.seekTo(player.getDuration(), true)
  document.getElementById("scroll_yt").value = 100
  document.getElementById("display_scroll_yt").innerHTML = String(player.getDuration()).toHHMMSS() + " of " + String(player.getDuration()).toHHMMSS() + " : ";
}

//listen event state change
start_status = 0
function onPlayerStateChange(event) {
  if (start_status != 1) {
    document.getElementById("display_volume_yt").innerHTML = "volume " + player.getVolume() + " : "
    start_status = 1
  }
  if (event.data == YT.PlayerState.PLAYING) {
    document.getElementById("play").disabled = true
    document.getElementById("pause").disabled = false
  } else if (event.data == YT.PlayerState.PAUSED) {
    document.getElementById("play").disabled = false
    document.getElementById("pause").disabled = true
  } else if (event.data == YT.PlayerState.ENDED && video_loop_status) {
    player.seekTo(0, true)
  }
}

//listen event player ready
function onPlayerReady() {
  document.getElementById("controls").style = "display: block"
  document.getElementById("play").disabled = false
  document.getElementById("pause").disabled = true
  if (player.isMuted() == true) {
    document.getElementById("mute").disabled = true
    document.getElementById("unmute").disabled = false
  } else if (player.isMuted() == false) {
    document.getElementById("mute").disabled = false
    document.getElementById("unmute").disabled = true
  }
}

//for volume change
function volume_yt_change() {
  player.setVolume(document.getElementById("volume_yt").value)
  document.getElementById("display_volume_yt").innerHTML = "volume " + document.getElementById("volume_yt").value + " : "
}

//for time change
function video_timed_change() {
  if (document.getElementById("video_timed").value != "") {
    player.seekTo(Number(document.getElementById("video_timed").value), true)
    document.getElementById("display_video_timed_yt").innerHTML = "video time " + document.getElementById("video_timed").value + " : ";
  } else {
    player.seekTo(0, true)
    document.getElementById("display_video_timed_yt").innerHTML = "video time " + 0 + " : ";
  }
}