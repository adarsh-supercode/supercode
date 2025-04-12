import React, { useState, useEffect, useRef } from "react";
import { YcubeLogo } from "@/app/components/AnimationLOgo/CubeLogo";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import styles from "../page.module.css";
import { PointLight } from "three";
import { Observer } from "gsap/Observer";
import gsap from "gsap";

function CameraController() {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.set(-7.6, 7.1, 5);
  }, [camera]);

  return null;
}

export default function LoadModel({ whyJoinSupercode }) {
  let { marquee } = whyJoinSupercode || {};
  marquee = marquee?.length ? Array.from({ length: 2 }, () => marquee[0]) : [];

  const [lightPosition, setLightPosition] = useState({
    x: 10,
    y: 10,
    z: 10,
    intensity: 100,
  });

  const handleSliderChange = (axis, value) => {
    setLightPosition((prev) => {
      return {
        ...prev,
        [axis]: parseFloat(value),
      };
    });
  };

  const containerRef = useRef();
  const leftLogoRef = useRef();
  const container1Ref = useRef();
  const careerMainsecRef = useRef();
  useEffect(() => {
    if (containerRef.current) {
      // Select all the p tags within the containerRef
      const scrollingText = containerRef.current.querySelectorAll(
        `.${styles.careersAnimationText}`
      );

      if (scrollingText.length === 0) {
        console.error("No .careersAnimationText elements found!");
        return;
      }
      const speed = window.innerWidth <= 768 ? 1 : 5;
      // Create a horizontal loop animation
      const tl = horizontalLoop(scrollingText, { repeat: -1, speed });
      gsap
        .timeline({ defaults: { ease: "none" } })
        .to(tl, { timeScale: 1, duration: 0.3, overwrite: "auto" })
        .to(tl, { timeScale: 0.2, duration: 1, overwrite: "auto" }, "+=0.3");

      gsap.to(containerRef.current.querySelectorAll("span svg"), {
        rotation: `-=360`,
        duration: 5,
        repeat: -1,
        ease: "linear",
      });

      // observer
      gsap.registerPlugin(Observer);
      Observer.create({
        target: careerMainsecRef.current,
        type: "wheel,touch",
        onChangeY(self) {
          gsap.to(containerRef.current.querySelectorAll("span svg"), {
            rotation: `-=360`,
            duration: 5,
            repeat: -1,
            ease: "linear",
          });
          gsap
            .timeline({ defaults: { ease: "none" } })
            .to(tl, { timeScale: 1, duration: 0.3, overwrite: "auto" })
            .to(
              tl,
              { timeScale: 0.2, duration: 1, overwrite: "auto" },
              "+=0.3"
            );
        },
      });
    }
  }, []);
  useEffect(() => {
    if (container1Ref.current) {
      //  all the p tags within the containerRef
      const scrollingText = container1Ref.current.querySelectorAll(
        `.${styles.careersAnimationText}`
      );

      if (scrollingText.length === 0) {
        console.error("No .careersAnimationText elements found!");
        return;
      }
      const speed = window.innerWidth <= 768 ? 1 : 5;
      // horizontal loop animation
      const tl = horizontalLoop(scrollingText, { repeat: -1, speed});

      gsap
        .timeline({ defaults: { ease: "none" } })
        .to(tl, { timeScale: -1, duration: 0.3, overwrite: "auto" })
        .to(tl, { timeScale: -0.2, duration: 1, overwrite: "auto" }, "+=0.3");

      //logo rotation initial
      gsap.to(container1Ref.current.querySelectorAll("span svg"), {
        rotation: `+=360`,
        duration: 5,
        repeat: -1,
        ease: "linear",
      });
      gsap.registerPlugin(Observer);
      Observer.create({
        target: careerMainsecRef.current,
        type: "wheel,touch",
        onChangeY(self) {
          gsap.to(container1Ref.current.querySelectorAll("span svg"), {
            rotation: `+=360`,
            duration: 5,
            repeat: -1,
            ease: "linear",
          });
          gsap
            .timeline({ defaults: { ease: "none" } })
            .to(tl, { timeScale: -1, duration: 0.3, overwrite: "auto" })
            .to(
              tl,
              { timeScale: -0.2, duration: 1, overwrite: "auto" },
              "+=0.3"
            );
        },
      });
    }
  }, []);

  return (
    <div
      className={styles?.loadModelCube}
      ref={careerMainsecRef}
    >
      <Canvas
        style={{ width: "100%" }}
        camera={{ fov: 30, position: [0, 0, 5] }}
        data-cursor="rotationArrow"
      >
        <ambientLight intensity={2} />
        <CameraController />
        <pointLight position={[0, 0, 10]} intensity={100} />
        <pointLight position={[0, 20, 0]} intensity={100} />
        <pointLight position={[10, 0, 0]} intensity={100} />
        <directionalLight position={[14, 20, 20]} intensity={2} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        <YcubeLogo />
      </Canvas>
      <div>
        <div ref={containerRef} className={styles?.careersAnimationTextWrap}>
          <div className={styles?.TextContent}>
            {marquee?.map((item, index) => {
              return (
                <p className={styles?.careersAnimationText} key={index}>
                  {item?.title}
                  <span
                    ref={leftLogoRef}
                    className={styles?.careersAnimationTextLogo}
                    dangerouslySetInnerHTML={{ __html: item?.svg }}
                  />
                  {marquee?.title}
                </p>
              );
            })}
          </div>
        </div>
        <div
          ref={container1Ref}
          className={`${styles?.careersAnimationTextWrap} ${styles.careersAnimationTextWrapSecond}`}
        >
          <div className={styles?.TextContent}>
            {marquee?.map((item, index) => {
              return (
                <p className={styles?.careersAnimationText} key={index}>
                  {item?.title}
                  <span
                    ref={leftLogoRef}
                    className={styles?.careersAnimationTextLogo}
                    dangerouslySetInnerHTML={{ __html: item?.svg }}
                  />
                  {marquee?.title}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
// Horizontal Loop Function
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}
