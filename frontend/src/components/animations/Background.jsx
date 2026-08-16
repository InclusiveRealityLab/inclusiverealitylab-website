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
      className="fixed inset-0 -z-10 pointer-events-none bg-background-primary"
    >
      <span className="blob blobGreen" />
      <span className="blob blobYellow" />
      <span className="blob blobBlue" />

      {/* The design veils the fields with a 50% white layer, which is what
          gives them their haze -- without it the tints read far too strong.
          It sits last so it covers all three, and inside this container so it
          stays behind the page content. */}
      <span className="absolute inset-0 bg-element-white/50" />
    </div>
  );
}

export default Background;
