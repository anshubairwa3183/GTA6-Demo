import React, { useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'

function App() {
  let [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
    })
    .to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function() {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      }
    })
  });

  useGSAP(()=>{
    if  (!showContent) return;

    gsap.to(".main",{
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-0.5",
      ease: "Expo.easeInOut"
    })

    gsap.to(".sky", {
      scale: 1.3,
      rotate: 0,
      duration: 2,
      delay: "-0.3",
      ease: "Expo.easeInOut",
    });

    gsap.to(".building", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-0.3",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 0.7,
      rotate: 0,
      x: "-50%",
      bottom: "-30%",
      duration: 2,
      delay: "-0.1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-0.3",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main")

    main?.addEventListener('mousemove', function(e){
      const xMove = (e.clientX / window.innerWidth - .5) * 40;
      gsap.to(".main .text",{
        x: `${xMove * 0.3}%`
      })
      gsap.to(".main .sky",{
        x: `${xMove * 0.3}%`
      })  
      gsap.to(".main .building",{
        x: `${xMove * 0.1}%`
      })   
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./building.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full -rotate-20 scale-[1.7]">
          <div className="landing w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 w-full py-10 px-10 z-10">
              <div className="logo flex gap-10">
                <div className="lines flex flex-col gap-1">
                  <div className="line w-10 h-1 bg-white"></div>
                  <div className="line w-8 h-1 bg-white"></div>
                  <div className="line w-6 h-1 bg-white"></div>
                </div>
                <h3 className="text-5xl text-white leading-none -mt-[12px]">
                  Rockstar
                </h3>
              </div>
            </div>
            <div className="imagediv relative overflow-hidden h-screen w-full">
              <h3 className="absolute left-1/2 transform -translate-x-1/2 bottom-0 mb-10 text-5xl text-white z-50">
                &larr; Move Your Mouse &rarr;
              </h3>
              <img
                src="/sky.png"
                alt=""
                className="sky scale-[1.5] -rotate-3 absolute top-0 left-0 w-full h-full object-cover"
              />
              <img
                src="/building.png"
                alt=""
                className="building scale-[1.8] -rotate-3 absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="text absolute scale-[1.4] -rotate-10 flex flex-col gap-3 leading-none text-white top-0 left-1/2 -translate-x-1/2">
                <h1 className="text-[12rem] leading-none -ml-20">grand</h1>
                <h1 className="text-[12rem] leading-none ml-40">theft</h1>
                <h1 className="text-[12rem] leading-none -ml-20">auto</h1>
              </div>
              <img
                src="/character.png"
                alt=""
                className="absolute character scale-2 -rotate-10 bottom-[-170%] left-1/2 -translate-x-1/2 scale-[0.7] object-cover"
              />
            </div>

            <div className="bottomnav text-white absolute bottom-0 left-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-3xl ri-arrow-down-line"></i>
                <h3 className="text-2xl">Scroll down</h3>
                <img
                  src="/xbox.webp"
                  alt=""
                  className="absolute h-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="inner flex w-full items-center justify-center h-[80%] gap-30">
              <img src="/girl.png" alt="" className="scale-[60%]" />
              <div className="comming flex flex-col justify-center items-center -ml-[10%]">
                <h1 className="text-white text-8xl">Comming Soon</h1>
                <h1 className="text-white text-7xl">May 2027</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;