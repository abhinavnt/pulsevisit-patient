import React from 'react';
import { motion } from 'motion/react';

interface AnimatedMapProps {
  type: 'doctor' | 'nurse' | 'ambulance' | 'lab' | 'medicine' | 'physio';
  className?: string;
}

export const AnimatedMap = ({ type, className = '' }: AnimatedMapProps) => {
  // Define icons for different types
  const icons: Record<string, string> = {
    doctor: '🩺',
    nurse: '💉',
    ambulance: '🚑',
    lab: '🔬',
    medicine: '💊',
    physio: '🧘',
  };

  // Define colors for different types
  const colors: Record<string, string> = {
    doctor: '#0F3D73',
    nurse: '#1FA97A',
    ambulance: '#EF4444',
    lab: '#0D9488',
    medicine: '#8B5CF6',
    physio: '#F59E0B',
  };


  const mainColor = colors[type] || '#0F3D73';

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gray-200 ${className}`}>
      {/* Map Placeholder Image */}
      <img 
        src="https://developers.google.com/static/maps/documentation/maps-static/images/map-warning.png" 
        alt="Map" 
        className="w-full h-full object-cover opacity-60" 
        referrerPolicy="no-referrer" 
      />

      {/* Animated Route SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none">
        {/* The Route Path */}
        <motion.path
          d="M 120 700 Q 150 500 80 400 T 250 150"
          stroke={mainColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="10 15"
          initial={{ pathLength: 1, opacity: 0.3 }}
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />

        {/* Home/Target Location Marker */}
        <g transform="translate(250, 150)">
          <motion.circle
            r="12"
            fill="#1FA97A"
            initial={{ scale: 1, opacity: 0.2 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <circle r="6" fill="#1FA97A" />
        </g>

        {/* Provider Vehicle Marker moving along path */}
        <motion.g
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          style={{
            offsetPath: "path('M 120 700 Q 150 500 80 400 T 250 150')",
            offsetRotate: "auto"
          }}
        >
          {/* Pulse Effect */}
          <motion.circle 
            r="24" 
            fill={mainColor} 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.2, 0], scale: [0.5, 1.5, 2] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          
          {/* Main Marker */}
          <motion.div 
            className="w-12 h-12 -ml-6 -mt-6 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl border-2"
            style={{ borderColor: mainColor }}
          >
             {icons[type]}
          </motion.div>
          {/* Since motion.div doesn't work inside SVG g directly without foreignObject or using motion.circle approach, let's use a simpler SVG group */}
          <circle r="18" fill="white" stroke={mainColor} strokeWidth="2" shadow="0 2px 4px rgba(0,0,0,0.2)" />
          <text 
            x="0" y="5" 
            textAnchor="middle" 
            fontSize="16" 
            style={{ userSelect: 'none' }}
          >
            {icons[type]}
          </text>
        </motion.g>
      </svg>

      {/* Overlay controls or labels */}
      <div className="absolute inset-0 pointer-events-none p-6">
         {/* Subtle Vignette */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
      </div>
    </div>
  );
};
