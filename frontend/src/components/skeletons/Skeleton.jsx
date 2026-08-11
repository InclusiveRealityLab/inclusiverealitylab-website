// A grey block standing in for content that has not arrived yet.
//
// The point of a skeleton over a spinner is that it occupies the space the real
// thing will occupy, so nothing on the page moves when the fetch resolves. That
// only holds if these mirror the real components' dimensions -- each variant
// below reuses the same sizing classes as the component it stands in for, and
// the pairs are noted so they stay together.
//
// The pulse is decorative, so it is dropped under prefers-reduced-motion.
function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-background-invalid animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}

export default Skeleton;
