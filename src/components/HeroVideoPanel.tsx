import React from 'react';

const HeroVideoPanel: React.FC = () => {
  return (
    <div className="relative hidden lg:block">
      <video
        src="/hero-animation.mp4"
        autoPlay
        loop
        muted
        playsInline
        // This panel is hidden below lg, but a <video> with the default
        // preload still downloads on a phone that will never show it.
        // preload="none" defers the fetch until playback is attempted, which
        // for a display:none element does not happen.
        preload="none"
        className="aspect-[849/514] w-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HeroVideoPanel;
