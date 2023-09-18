function videoid_yt_enter() {
    if (document.getElementById("video_source").value.length == 11) {
      window.location.replace("http://" + window.location.hostname + "/watch?v=" + document.getElementById("video_source").value)
    } else if (document.getElementById("video_source").value.slice(0,17) == "https://youtu.be/") {
      window.location.replace("http://" + window.location.hostname + "/watch?v=" + document.getElementById("video_source").value.slice(17,28))
    } else if (document.getElementById("video_source").value.slice(0, 32) == "https://www.youtube.com/watch?v=") {
      window.location.replace("http://" + window.location.hostname + "/watch?v=" + document.getElementById("video_source").value.slice(32, 43))
    }
  }