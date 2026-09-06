import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'badge' | 'inline' | 'simple' | 'mark' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean; // if true, renders on dark backgrounds
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'badge',
  size = 'md',
  inverted = false,
}) => {
  // Shared Monogram SVG Vector - Faithful cursive signature script 'RB' matching official logo attachment
  const renderMonogramPaths = (color = '#FFFFFF', strokeW = 13) => (
    <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Letter 'R': Entrance swash rising high, apex loop, and descending stem */}
      <path
        d="M 235 435 C 265 345 305 200 348 95 C 362 60 380 75 375 110 C 362 180 322 320 298 405 C 288 445 280 475 275 490"
        strokeWidth={strokeW}
      />
      {/* Letter 'R': Upper rounded bowl */}
      <path
        d="M 315 265 C 325 200 358 150 408 155 C 452 160 470 198 458 248 C 445 295 405 320 352 320"
        strokeWidth={strokeW - 1}
      />
      {/* Letter 'R': Leg kicking downwards */}
      <path
        d="M 358 315 C 375 365 398 440 415 505"
        strokeWidth={strokeW}
      />

      {/* Letter 'B': Ascender loop and descending spine */}
      <path
        d="M 425 290 C 455 195 500 120 535 128 C 562 135 555 185 528 250 C 490 340 448 425 422 485"
        strokeWidth={strokeW}
      />
      {/* Letter 'B': Upper bowl */}
      <path
        d="M 495 205 C 538 200 580 232 572 288 C 564 332 525 362 470 365"
        strokeWidth={strokeW - 1}
      />
      {/* Letter 'B': Lower bowl with authentic horizontal flourish flick to the right */}
      <path
        d="M 470 365 C 528 365 590 400 578 460 C 565 510 505 520 452 505 C 405 490 400 445 432 405 C 465 365 530 345 615 340"
        strokeWidth={strokeW - 1}
      />
    </g>
  );

  // Variant: 'mark' - Just the blue badge with the white signature RB monogram
  if (variant === 'mark') {
    const markDimensions =
      size === 'sm'
        ? 'w-9 h-9'
        : size === 'lg'
        ? 'w-16 h-16'
        : size === 'xl'
        ? 'w-24 h-24'
        : 'w-11 h-11';

    return (
      <div
        className={`inline-flex items-center justify-center bg-[#0050EE] rounded-xl shadow-sm select-none p-1.5 shrink-0 ${markDimensions} ${className}`}
        title="RIZQAL BAROKAH"
      >
        <svg
          viewBox="180 60 480 470"
          className="w-full h-full text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {renderMonogramPaths('#FFFFFF', 20)}
        </svg>
      </div>
    );
  }

  // Variant: 'badge' or 'full' - Exact replica of the official logo in the attachment
  // Solid Royal Blue background (#0050EE), white cursive RB monogram, bold italic serif RIZQAL BAROKAH,
  // and horizontal lines flanking PERALATAN RUMAH TANGGA
  if (variant === 'badge' || variant === 'full') {
    const widthClass =
      size === 'sm'
        ? 'w-44'
        : size === 'md'
        ? 'w-56 sm:w-64'
        : size === 'lg'
        ? 'w-72 sm:w-80'
        : size === 'xl'
        ? 'w-88 sm:w-96'
        : 'w-64';

    return (
      <div
        className={`relative inline-block select-none overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.01] ${widthClass} ${className}`}
        style={{ aspectRatio: '4/3' }}
        title="Logo Resmi RIZQAL BAROKAH - Peralatan Rumah Tangga"
      >
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background: Solid Royal Blue matching attachment */}
          <rect width="800" height="600" fill="#0050EE" />

          {/* Cursive Monogram "RB" */}
          {renderMonogramPaths('#FFFFFF', 13)}

          {/* Brand Name: RIZQAL BAROKAH in heavy italic slab-serif */}
          <text
            x="400"
            y="525"
            textAnchor="middle"
            fill="#FFFFFF"
            style={{
              fontFamily: "'Aleo', 'NewCenturySchlbk-BoldItalic', 'Rockwell', 'Georgia', serif",
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: '58px',
              letterSpacing: '0.05em',
            }}
          >
            RIZQAL BAROKAH
          </text>

          {/* Subtitle: Divider Lines & PERALATAN RUMAH TANGGA */}
          <g>
            {/* Left Divider Line */}
            <line
              x1="90"
              y1="565"
              x2="170"
              y2="565"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="square"
            />

            {/* Subtitle Text */}
            <text
              x="400"
              y="571"
              textAnchor="middle"
              fill="#FFFFFF"
              style={{
                fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
                fontWeight: 700,
                fontSize: '17px',
                letterSpacing: '0.26em',
              }}
            >
              PERALATAN RUMAH TANGGA
            </text>

            {/* Right Divider Line */}
            <line
              x1="630"
              y1="565"
              x2="710"
              y2="565"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="square"
            />
          </g>
        </svg>
      </div>
    );
  }

  // Variant: 'inline' - Optimized for the Navbar Header & Mobile Header
  // Retains the exact typography, bold italic serif, and sub-line from the attachment logo
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official Blue Monogram Badge */}
      <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-[#0050EE] rounded-xl shadow-md shrink-0 p-1 border border-blue-400/20">
        <svg
          viewBox="180 60 480 470"
          className="w-full h-full text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {renderMonogramPaths('#FFFFFF', 20)}
        </svg>
      </div>

      {/* Brand Text Lockup maintaining exact font shape & typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <span
            className={`text-lg sm:text-xl md:text-2xl leading-none tracking-wide ${
              inverted ? 'text-white' : 'text-[#0050EE]'
            }`}
            style={{
              fontFamily: "'Aleo', 'NewCenturySchlbk-BoldItalic', 'Rockwell', 'Georgia', serif",
              fontWeight: 900,
              fontStyle: 'italic',
            }}
          >
            RIZQAL BAROKAH
          </span>
        </div>

        {/* Subtitle matching official logo attachment with horizontal divider lines */}
        <div className="flex items-center gap-1.5 mt-1">
          <div
            className={`h-[1px] w-3 sm:w-5 ${
              inverted ? 'bg-white/60' : 'bg-[#0050EE]/60'
            }`}
          />
          <span
            className={`text-[8px] sm:text-[9.5px] uppercase font-bold tracking-[0.22em] leading-none whitespace-nowrap ${
              inverted ? 'text-blue-100' : 'text-slate-600'
            }`}
            style={{
              fontFamily: "'Montserrat', system-ui, sans-serif",
            }}
          >
            PERALATAN RUMAH TANGGA
          </span>
          <div
            className={`h-[1px] w-3 sm:w-5 ${
              inverted ? 'bg-white/60' : 'bg-[#0050EE]/60'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
