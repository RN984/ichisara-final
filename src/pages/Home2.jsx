import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import humberger from "../assets/humberger.webp"; // 背景
import Home from "./Home.jsx";
import Layout from "../components/Layout.jsx";
import "./Home2.css";

export default function Home2() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const imgCtrl = useAnimation();
  const textCtrl = useAnimation();

  useEffect(() => {
    if (!inView) {
      imgCtrl.set({ opacity: 0, filter: "blur(0px)" });
      textCtrl.set({ opacity: 0, y: 10 });
      return;
    }
    (async () => {
      await imgCtrl.start({
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 2 },
      });
      await new Promise((r) => setTimeout(r, 200));
      await imgCtrl.start({
        filter: "blur(8px)",
        transition: { duration: 1, ease: "easeInOut" },
      });
      await textCtrl.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    })();
  }, [inView, imgCtrl, textCtrl]);

  return (
    <>
      {/* 1画面目：ヒーロー */}
      <section ref={ref} className="home2-section" aria-label="hero" >
        <motion.div className="home2-motion" initial={{ opacity: 0 }} animate={imgCtrl}>
          <img src={humberger} alt="Hero" className="home2-img" />
        </motion.div>

        <motion.h1 className="home2-title mincho" initial={{ opacity: 0, y: 10 }} animate={textCtrl}>
          ICHISARA DAINING HILLS CAFE
        </motion.h1>

      </section>
      <Layout>
        <div id="home-under-hero" >
        <Home />
      </div>
      </Layout>

    </>
  );
}
