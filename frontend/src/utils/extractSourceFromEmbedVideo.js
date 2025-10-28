function extractSourceFromEmbedVideo(embedTag) {
  const videoSrcRegex = /src="([^"]+)"/i
;
  const videoSrc = embedTag.match(videoSrcRegex);

  // const videoTag = em.match(videoTagRegex);
 

  // return { intro: intro, videoTag: `${videoTag}</iframe>` };
  return videoSrc ? videoSrc[1] : null;
}

export default extractSourceFromEmbedVideo;
