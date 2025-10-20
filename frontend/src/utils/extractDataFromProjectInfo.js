function extractDataFromProjectInfo(projectInformation) {
  const videoTag = /<iframe (.*?)<\/iframe>/i;
  const intro = projectInformation.replace(videoTag, "").trim();

  return { intro: intro, videoTag: `${projectInformation.match(videoTag)}</iframe>` };
}

export default extractDataFromProjectInfo;
