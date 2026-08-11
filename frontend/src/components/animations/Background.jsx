// A single fixed layer behind the whole page: the content scrolls over it
// rather than it scrolling with the content, which is why it is rendered once
// per page and not once per section.
//
// The three fields are the Brand/*-light tokens, which is what the design's
// "shape lime / sunny / blue" resolve to once blurred. They are larger than
// the viewport and deliberately not clipped, so they run off its edges --
// safe because body already hides horizontal overflow and this layer is fixed
// and non-interactive.
function Background() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none bg-background-white"
    >
      <span className="blob blobGreen" />
      <span className="blob blobYellow" />
      <span className="blob blobBlue" />
    </div>
  );
}

export default Background;
