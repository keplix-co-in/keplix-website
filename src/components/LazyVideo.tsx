import React, { useEffect, useRef, useState } from 'react';

/**
 * Autoplaying, muted, looping <video> that doesn't download until it is near
 * the viewport.
 *
 * Why not just preload="none": `autoPlay` overrides it. Lighthouse on the live
 * home page showed both hero-animation.mp4 (inside a `hidden lg:block` panel)
 * and mapani.mp4 (below the fold) downloading on first load on a phone — about
 * 2 MB of the page's 2.5 MB.
 *
 * Here `src` isn't set until an IntersectionObserver fires. An element inside
 * a display:none parent never intersects, so the desktop-only hero video
 * never downloads on mobile. The prerendered HTML has no src either, so
 * server and client markup match on hydration.
 */
type Props = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> & { src: string };

const LazyVideo: React.FC<Props> = ({ src, children, ...rest }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      {...rest}
    >
      {children}
    </video>
  );
};

export default LazyVideo;
