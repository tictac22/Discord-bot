const fetch = require('cross-fetch');
const {YOUTUBE_KEY} = require("../config.json");
const isUrl = require('./isUrl');
const getMusicInfo = async (param) => {
    const url = isUrl(param);
    if(url) {
        return {
            link:param
        }
    }
    const linkto = encodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${YOUTUBE_KEY}&q=${param}`)
    const youtubeVideoData = await fetch(linkto)
    const youtubeVideoDataJson = await youtubeVideoData.json();
    return {
        link:`https://www.youtube.com/watch?v=${youtubeVideoDataJson.items[0].id.videoId}`,
        videoTitle:youtubeVideoDataJson.items[0].snippet.title
    }
}
module.exports = getMusicInfo