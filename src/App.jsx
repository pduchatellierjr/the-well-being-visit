import { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImg from './assets/hero.jpg';
import myStoryImg from './assets/my story.jpg';

// --- SHADER ANIMATION COMPONENT ---
export function ShaderAnimation() {
  const containerRef = useRef(null);
  const sceneRef = useRef({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    // Load Three.js dynamically
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js";
    script.onload = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS();
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return;

    const THREE = window.THREE;
    const container = containerRef.current;

    // Clear any existing content
    container.innerHTML = "";

    // Initialize camera
    const camera = new THREE.Camera();
    camera.position.z = 1;

    // Initialize scene
    const scene = new THREE.Scene();

    // Create geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    // Define uniforms
    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    };

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    // Fragment shader
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
        
      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }
      
      varying vec2 vUv;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);       
          
        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));        
          }
        }

        gl_FragColor = vec4(color[2],color[1],color[0],1.0);
      }
    `;

    // Create material
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: null,
    };

    // Handle resize
    const onWindowResize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    // Animation loop
    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };

    animate();
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 z-0 opacity-25 mix-blend-screen blur-[60px] pointer-events-none" 
    />
  );
}

// --- NAVBAR ---
const Navbar = () => {
  return (
    <nav className="w-full bg-transparent absolute top-0 left-0 z-50 pt-4">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="font-serif italic text-2xl text-cream tracking-wide flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-therapyRed shadow-[0_0_10px_rgba(232,72,85,0.8)]"></div>
          The Well-Being Visit
        </div>
        <div className="hidden md:flex gap-10 text-sm font-sans text-cream/70 tracking-wide">
          <a href="#approach" className="hover:text-cream transition-colors">Approach</a>
          <a href="#packages" className="hover:text-cream transition-colors">Packages</a>
          <a href="#story" className="hover:text-cream transition-colors">My Story</a>
        </div>
        <a href="https://my.practicebetter.io/#/6a060b207f0211c5a9119095/forms?f=6a0610b41d3c13bde41aefb9" target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Free Consultation
        </a>
      </div>
    </nav>
  );
};

// --- HERO ---
const Hero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["clarity.", "vitality.", "balance.", "energy.", "focus."],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="relative overflow-hidden pb-24 pt-32 px-6 min-h-[90vh] flex items-center">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://res.cloudinary.com/dxdo7bfpd/image/upload/v1779479629/wellbeing-silhouette-image-4k_hwzaff.jpg")' }}
      ></div>
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-deepBlack/95 via-deepBlack/80 to-deepPurple/80"></div>

      {/* Shader Animation Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <ShaderAnimation />
      </div>

      {/* Black & Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[80vw] md:h-[80vw] bg-gradient-radial from-neonPurple/20 via-therapyRed/10 to-transparent blur-[100px] pointer-events-none rounded-full z-0"></div>

      <div className="max-w-6xl mx-auto flex flex-col justify-center items-center text-center gap-10 relative z-10 w-full mt-10">
        <div className="space-y-8 max-w-3xl flex flex-col items-center">
          <p className="font-sans text-sm tracking-widest text-therapyRed uppercase font-semibold drop-shadow-[0_0_5px_rgba(232,72,85,0.5)]">
            Functional Health Coaching
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-tight flex flex-col items-center">
            <span>Healing through</span>
            <span className="relative overflow-hidden h-[1.5em] w-full px-8 py-2 mt-2">
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute inset-x-0 text-center italic text-transparent bg-clip-text bg-gradient-to-r from-therapyRed to-softCrimson drop-shadow-[0_0_15px_rgba(232,72,85,0.4)]"
                  initial={{ opacity: 0, y: "-100%" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? "-150%" : "150%", opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-cream/90 max-w-xl leading-relaxed font-light">
            Fix the root cause of gut and energy issues. Regain consistent energy and vitality without relying on quick fixes.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
            <a href="#packages" className="btn-primary">View Packages</a>
            <a href="#story" className="font-sans text-sm tracking-wide text-cream hover:text-therapyRed transition-colors flex items-center gap-2 group">
              Read My Story <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- APPROACH ---
const Approach = () => {
  return (
    <section id="approach" className="py-32 px-6 bg-cream relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <p className="font-sans text-sm tracking-widest text-therapyRed uppercase font-semibold mb-4">Our Method</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal max-w-2xl mx-auto leading-tight">
            A holistic path to feeling like yourself again.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-6 group">
            <div className="w-16 h-16 rounded-full bg-softCrimson flex items-center justify-center font-serif text-2xl text-therapyRed group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(232,72,85,0.2)]">1</div>
            <h3 className="font-sans font-medium text-xl text-charcoal">Discover</h3>
            <p className="text-softText text-base leading-relaxed">
              We delve deep into your physiological data, tracing symptoms like fatigue and bloat to their exact metabolic origins.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-6 group">
            <div className="w-16 h-16 rounded-full bg-softCrimson flex items-center justify-center font-serif text-2xl text-therapyRed group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(232,72,85,0.2)]">2</div>
            <h3 className="font-sans font-medium text-xl text-charcoal">Align</h3>
            <p className="text-softText text-base leading-relaxed">
              Bypass the guesswork. We map out a supportive, non-restrictive protocol to restore your natural energy pathways gently.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-6 group">
            <div className="w-16 h-16 rounded-full bg-softCrimson flex items-center justify-center font-serif text-2xl text-therapyRed group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(232,72,85,0.2)]">3</div>
            <h3 className="font-sans font-medium text-xl text-charcoal">Thrive</h3>
            <p className="text-softText text-base leading-relaxed">
              Rebuild without restriction. Enjoy consistent mental clarity, unshakeable confidence, and freedom from constant tracking.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <a href="https://my.practicebetter.io/#/6a060b207f0211c5a9119095/forms?f=6a0610b41d3c13bde41aefb9" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
            Start Your Recovery Today
          </a>
        </div>
      </div>
    </section>
  );
};

// --- MY STORY ---
const MyStory = () => {
  return (
    <section id="story" className="py-32 px-6 bg-sand relative overflow-hidden">
      {/* Subtle purple/red glow */}
      <div className="absolute bottom-0 left-0 w-[80vw] h-[40vh] bg-gradient-radial from-neonPurple/10 via-therapyRed/5 to-transparent blur-[80px] pointer-events-none translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">
        <div className="flex-1 w-full max-w-md relative order-2 md:order-1">
          <div className="aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-cream relative bg-deepBlack">
            <img 
              src={myStoryImg} 
              alt="Her Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-therapyRed/5 mix-blend-color-burn"></div>
          </div>
        </div>
        <div className="flex-1 space-y-8 order-1 md:order-2">
          <p className="font-sans text-sm tracking-widest text-therapyRed uppercase font-semibold">
            The Clinical Meets The Lived
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-charcoal leading-tight">
            Not Just Another Wellness Coach.
          </h2>
          <div className="space-y-6 text-lg text-softText leading-relaxed">
            <p>
              <strong>I’m an ER nurse who got sick because I ignored my own gut health.</strong> Working long shifts in survival mode, pushing through exhaustion, and ignoring the signs led to a cascade of issues.
            </p>
            <p>
              I witnessed firsthand the glaring gap in traditional medicine: the trap where <em>"normal labs mean you're fine,"</em> while you intuitively know you're not actually functioning.
            </p>
            <p>
              I've been in the burnout trap, and I climbed out. Now, working 1-on-1, I help high-achieving women do the exact same.
            </p>
          </div>
          <div className="pt-4 border-t border-charcoal/10">
            <span className="font-serif italic text-xl text-therapyRed block mb-2 mt-4">With care,</span>
            <span className="font-sans font-medium text-charcoal">Founder & ER Nurse</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PACKAGES ---
const Packages = () => {
  return (
    <section id="packages" className="py-32 px-6 bg-cream relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal max-w-2xl mx-auto leading-tight mb-6">
            Invest in your wellbeing.
          </h2>
          <p className="text-softText text-lg max-w-lg mx-auto">
            Choose the level of support that fits your needs. No complex contracts, just straightforward guidance toward feeling better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Package 1 */}
          <div className="bg-white border border-sand rounded-2xl p-10 flex flex-col hover:shadow-lg transition-shadow">
            <h3 className="font-serif text-2xl text-charcoal mb-4">The Kickstart: 4-Week Momentum Builder</h3>
            <p className="text-softText text-sm mb-8 flex-1">
              This is for the person who needs a clear map to get moving. We strip away the guesswork and build a sustainable routine that fits into a busy life. You get the blueprint; you just have to execute.
            </p>
            <ul className="space-y-4 mb-10 text-sm text-softText">
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>Custom Habit Framework:</strong> A lifestyle structure built around your specific daily schedule.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>Targeted Nutrition Strategy:</strong> Simple, effective eating guidelines that don't require a chemistry degree.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>Movement Standards:</strong> A clear plan for how to move your body to see actual progress.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>Strategy Session:</strong> One deep-dive coaching call to audit your performance and lock in your path.</span>
              </li>
            </ul>
            <a href="https://my.practicebetter.io/#/6a060b207f0211c5a9119095/forms?f=6a0610b41d3c13bde41aefb9" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full text-center block mt-auto">Book Free Call</a>
          </div>

          {/* Package 2 */}
          <div className="bg-white border-2 border-therapyRed rounded-2xl p-10 flex flex-col relative shadow-[0_15px_40px_rgba(232,72,85,0.15)] transform md:-translate-y-4">
            <div className="absolute top-0 right-10 bg-gradient-to-r from-therapyRed to-softCrimson text-white text-xs font-bold px-4 py-1.5 rounded-b-md shadow-[0_5px_15px_rgba(232,72,85,0.4)] tracking-wider">
              POPULAR
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-4">The Transformation: 12-Week Performance Standard</h3>
            <p className="text-softText text-sm mb-8 flex-1">
              This is the most popular choice for a reason. Twelve weeks is the sweet spot for seeing physical changes and cementing new identities. We move beyond "doing" and start "optimizing" with high-level accountability.
            </p>
            <ul className="space-y-4 mb-10 text-sm text-softText">
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-therapyRed/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-therapyRed"></div>
                </div>
                <span><strong>Complete Performance Audit:</strong> We establish your baseline metrics to track every win.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-therapyRed/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-therapyRed"></div>
                </div>
                <span><strong>Advanced Nutrition Programming:</strong> A precise strategy tailored to your metabolism and goals.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-therapyRed/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-therapyRed"></div>
                </div>
                <span><strong>Long-Term Roadmap:</strong> A vision for where you'll be in 3 months, not just 3 weeks.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-therapyRed/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-therapyRed"></div>
                </div>
                <span><strong>Bi-Weekly Coaching:</strong> Two deep-dive reviews per month to keep you on track.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-therapyRed/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-therapyRed"></div>
                </div>
                <span><strong>Priority Support:</strong> Direct messaging access for when life gets in the way.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-therapyRed/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-therapyRed"></div>
                </div>
                <span><strong>Medical Integration:</strong> I'll work alongside your lab results or doctors to ensure your health is the priority.</span>
              </li>
            </ul>
            <a href="https://my.practicebetter.io/#/6a060b207f0211c5a9119095/forms?f=6a0610b41d3c13bde41aefb9" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center block mt-auto">Get Started</a>
          </div>

          {/* Package 3 */}
          <div className="bg-white border border-sand rounded-2xl p-10 flex flex-col hover:shadow-lg transition-shadow">
            <h3 className="font-serif text-2xl text-charcoal mb-4">The Legacy: 24-Week Elite Mastery</h3>
            <p className="text-softText text-sm mb-8 flex-1">
              This is for the person who wants to master their body for good. We focus on independence and high-level recovery tactics. By the end of six months, you won't just be fit; you will have the skills to stay that way forever.
            </p>
            <ul className="space-y-4 mb-10 text-sm text-softText">
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>Hyper-Adaptive Planning:</strong> We pivot your plan in real time as your body and schedule change.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>Stress and Recovery Protocols:</strong> Advanced tactics to manage burnout and improve sleep quality.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>The Independence Skill-Set:</strong> Education focused on making you your own best coach.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>Weekly Accountability:</strong> Weekly 1:1 check-ins to ensure 100% alignment with your goals.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>Whoop Data Integration:</strong> We use your wearable tech to analyze strain and recovery daily.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={16} className="text-therapyRed shrink-0 mt-0.5" />
                <span><strong>Inner Circle Access:</strong> Priority messaging plus membership in our private community group.</span>
              </li>
            </ul>
            <a href="https://my.practicebetter.io/#/6a060b207f0211c5a9119095/forms?f=6a0610b41d3c13bde41aefb9" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full text-center block mt-auto">Get Started</a>
          </div>
        </div>
      </div>
    </section>
  );
};



// --- CTA SECTION ---
const CTASection = () => {
  return (
    <section className="py-32 px-6 bg-sand relative border-t border-cream">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
          Ready to feel like yourself again?
        </h2>
        <p className="text-softText text-lg mb-10 max-w-xl mx-auto">
          Take the first step by filling out our intake form. We'll review your details and reach out to schedule your consultation.
        </p>
        <a 
          href="https://my.practicebetter.io/#/6a060b207f0211c5a9119095/forms?f=6a0610b41d3c13bde41aefb9" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-primary inline-block text-lg px-10 py-4"
        >
          Complete Intake Form
        </a>
      </div>
    </section>
  );
};

// --- PRIVACY POLICY MODAL ---
const PrivacyPolicyModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-deepBlack/80 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="bg-cream w-full max-w-3xl rounded-2xl shadow-2xl relative my-auto" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-charcoal/50 hover:text-therapyRed transition-colors p-2 z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div className="p-10 md:p-14 max-h-[80vh] overflow-y-auto relative">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 border-b border-sand pb-4">Privacy Policy</h2>
          
          <div className="space-y-6 text-softText font-sans text-sm leading-relaxed">
            <p><strong>Last Updated: May 2026</strong></p>
            
            <p>The Well-Being Visit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our health coaching services.</p>

            <h3 className="text-xl font-serif text-charcoal pt-4">1. Information We Collect</h3>
            <p>We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services. This includes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and demographic information.</li>
              <li><strong>Health & Wellness Data:</strong> Information regarding your current symptoms, medical history, lifestyle habits, and goals provided during intake forms or consultations.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the website, such as your IP address, browser type, and access times.</li>
            </ul>

            <h3 className="text-xl font-serif text-charcoal pt-4">2. How We Use Your Information</h3>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized coaching experience. Specifically, we may use information collected about you to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Create and manage your personalized coaching protocol.</li>
              <li>Communicate with you regarding appointments, updates, and resources.</li>
              <li>Process payments and manage your account through our third-party provider (Practice Better).</li>
              <li>Improve our website functionality and coaching offerings.</li>
            </ul>

            <h3 className="text-xl font-serif text-charcoal pt-4">3. Disclosure of Your Information</h3>
            <p>We respect the sensitive nature of your health data. We do not sell, trade, or rent your personal information to others. We may share information with trusted third-party service providers (such as scheduling and payment processors like Practice Better) solely for the purpose of operating our business and providing services to you. These third parties are bound by strict confidentiality agreements.</p>

            <h3 className="text-xl font-serif text-charcoal pt-4">4. Security of Your Information</h3>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

            <h3 className="text-xl font-serif text-charcoal pt-4">5. Disclaimer</h3>
            <p>The Well-Being Visit provides functional health coaching and education. We do not provide medical diagnosis, treatment, or cure for any disease. The information shared during our sessions is not a substitute for professional medical advice from a licensed physician.</p>

            <h3 className="text-xl font-serif text-charcoal pt-4">6. Contact Us</h3>
            <p>If you have questions or comments about this Privacy Policy, please contact us via the contact form on our website or directly through your Practice Better client portal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FOOTER ---
const Footer = ({ onOpenPrivacy }) => {
  return (
    <footer className="bg-gradient-to-t from-deepBlack to-deepPurple pt-20 pb-10 px-6 text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-radial from-neonPurple/10 to-transparent blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
        <div>
          <div className="font-serif italic text-2xl mb-4 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(232,72,85,0.5)]">
            <div className="w-2 h-2 rounded-full bg-therapyRed"></div>
            The Well-Being Visit
          </div>
          <p className="text-cream/70 text-sm max-w-xs leading-relaxed font-light">
            Bridging traditional medicine and functional recovery without the guesswork.
          </p>
        </div>
        <div className="flex flex-col gap-4 font-sans text-sm font-light">
          <span className="font-medium text-therapyRed uppercase tracking-widest mb-2 text-xs drop-shadow-[0_0_5px_rgba(232,72,85,0.5)]">Navigation</span>
          <a href="#approach" className="text-cream/70 hover:text-white transition-colors">Approach</a>
          <a href="#packages" className="text-cream/70 hover:text-white transition-colors">Packages</a>
          <a href="#story" className="text-cream/70 hover:text-white transition-colors">My Story</a>
          <a href="https://my.practicebetter.io/#/6a060b207f0211c5a9119095/forms?f=6a0610b41d3c13bde41aefb9" target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-white transition-colors">Book Now</a>
        </div>
        <div className="flex flex-col gap-4 font-sans text-sm font-light">
          <span className="font-medium text-therapyRed uppercase tracking-widest mb-2 text-xs drop-shadow-[0_0_5px_rgba(232,72,85,0.5)]">Connect</span>
          <a href="https://www.instagram.com/jessicardona_" target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-white transition-colors">Instagram</a>
          <a href="#" className="text-cream/70 hover:text-white transition-colors">Contact</a>
          <button onClick={onOpenPrivacy} className="text-cream/70 hover:text-white transition-colors text-left">Privacy Policy</button>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 border-t border-neonPurple/20 text-center font-sans text-xs text-cream/40 relative z-10">
        © 2026 The Well-Being Visit. All rights reserved.
      </div>
    </footer>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="bg-cream min-h-screen text-charcoal">
      <Navbar />
      <Hero />
      <Approach />
      <Packages />
      <MyStory />
      <CTASection />
      <Footer onOpenPrivacy={() => setShowPrivacy(true)} />
      {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
    </div>
  );
}

export default App;
