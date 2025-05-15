import '../animatedbackground/AnimatedBackground.css'

function AnimatedBackground() {
  return (
    <div className="animated-background">
      <div className="circle small shade1"></div>
      <div className="circle medium shade2"></div>
      <div className="circle medium shade3" style={{ left: '70vw', bottom: '10vh' }}></div>
      <div className="circle medium shade3" style={{ left: '70vw', bottom: '10vh' }}></div>
      <div className="circle medium shade3" style={{ left: '70vw', bottom: '10vh' }}></div>
      <div className="circle small shade2" style={{ left: '20vw', bottom: '50vh' }}></div>
      <div className="circle small shade2" style={{ left: '20vw', bottom: '50vh' }}></div>
    </div>

  );

}

export default AnimatedBackground;