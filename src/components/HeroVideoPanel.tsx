import React from 'react';

const HeroVideoPanel: React.FC = () => {
  return (
    <div className="relative hidden pt-[33px] lg:block">
      <video
        src="/hero-animation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="aspect-[849/514] w-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HeroVideoPanel;
