// Alternative logo implementations you can use:

// Option 1: Logo only (no text)
<div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
  <img 
    src="/logo.png" 
    alt="Keplix Logo" 
    className="h-10 w-auto"
  />
</div>

// Option 2: Logo with text (current implementation)
<div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
  <img 
    src="/logo.png" 
    alt="Keplix Logo" 
    className="h-8 w-auto mr-2"
  />
  <div className="text-2xl font-bold text-white">
    <span className="text-red-500">K</span>eplix
  </div>
</div>

// Option 3: Different logo for light/dark themes
<div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
  <img 
    src={isScrolled ? "/logo-white.png" : "/logo.png"}
    alt="Keplix Logo" 
    className="h-8 w-auto transition-all duration-300"
  />
</div>

// Option 4: SVG logo (recommended for scalability)
<div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
  <img 
    src="/logo.svg" 
    alt="Keplix Logo" 
    className="h-8 w-auto"
  />
</div>
