'use client'

const DIYA_POSITIONS = [
  { left: '10%', top: '10%' }, { left: '30%', top: '20%' },
  { left: '50%', top: '15%' }, { left: '70%', top: '25%' },
  { left: '90%', top: '10%' }, { left: '20%', top: '40%' },
  { left: '40%', top: '35%' }, { left: '60%', top: '45%' },
  { left: '80%', top: '30%' }, { left: '15%', top: '60%' },
  { left: '35%', top: '55%' }, { left: '55%', top: '65%' },
  { left: '75%', top: '50%' }, { left: '25%', top: '80%' },
  { left: '45%', top: '75%' }, { left: '65%', top: '85%' },
  { left: '85%', top: '70%' }, { left: '5%', top: '90%' },
  { left: '95%', top: '95%' }, { left: '50%', top: '90%' }
];

export default function DiwaliLights() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 to-indigo-950">
      <div 
        className="rangoli"
        style={{ 
          backgroundImage: `radial-gradient(circle at center, 
            #FF9933 2px, /* Orange */
            #FF1493 4px, /* Pink */
            #FFD700 6px, /* Gold */
            transparent 6px)`,
          backgroundSize: '60px 60px'
        }} 
      />
      
      {DIYA_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="diya"
          style={{
            ...pos,
            background: 'radial-gradient(circle at center, #FFA500, #FF4500)'
          }}
        />
      ))}
    </div>
  )
}

// Add these animations to your globals.css
const cssToAdd = `
@keyframes twinkle {
  0% { opacity: 0.2; }
  100% { opacity: 0.4; }
}

@keyframes float-0 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(10px, -10px); }
}

@keyframes float-1 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-15px, -5px); }
}

@keyframes float-2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(5px, -15px); }
}

@keyframes glow {
  0% { box-shadow: 0 0 20px #FFD700, 0 0 40px #FF6347; }
  100% { box-shadow: 0 0 30px #FFD700, 0 0 60px #FF6347; }
}` 