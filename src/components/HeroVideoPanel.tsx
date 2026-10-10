import React from 'react';
import LazyVideo from './LazyVideo';

const HeroVideoPanel: React.FC = () => {
  return (
    <div className="relative hidden lg:block">
      <LazyVideo
        src="/hero-animation.mp4"
        className="aspect-[849/514] w-full object-cover"
      >
        Your browser does not support the video tag.
      </LazyVideo>
    </div>
  );
};

export default HeroVideoPanel;
