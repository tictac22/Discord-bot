const fetch = require('cross-fetch');
const ytdl = require('ytdl-core');
const {YOUTUBE_KEY} = require("../config.json")
module.exports = async param => {
    const linkto = encodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${YOUTUBE_KEY}&q=${param}`)
    const youtubeVideoData = await fetch(linkto)
    const youtubeVideoDataJson = await youtubeVideoData.json();
    return {
        youtubeUrl:`https://www.youtube.com/watch?v=${youtubeVideoDataJson.items[0].id.videoId}`,
        videoTitle:youtubeVideoDataJson.items[0].snippet.title
    }
}