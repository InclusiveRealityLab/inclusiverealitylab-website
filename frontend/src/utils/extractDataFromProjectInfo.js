function extractDataFromProjectInfo(projectInformation) {
  const videoTagRegex = /<iframe\b[^>]*>[\s\S]*?<\/iframe>/i;
  const intro = projectInformation.replace(videoTagRegex, "").trim();

  const videoTag = projectInformation.match(videoTagRegex);
 

  return { intro: intro, videoTag: `${videoTag}</iframe>` };
}

export default extractDataFromProjectInfo;
