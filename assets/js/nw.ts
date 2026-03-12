gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function chairIntro() {
    // --- Setup and Constants ---
    const fgCanvas = document.getElementById("playCanvas");
    const ctx = fgCanvas.getContext("2d");
    const threeContainer = document.getElementById('three-container');
    const sections = gsap.utils.toArray('.section-home');
    const chairmansProfile = document.querySelector('.chairmans-profile');
    const patcher = document.querySelector('.patcher');

    let currentCanvasWidth, currentCanvasHeight;

    const svgPaths = [
        "../dist/images/intro-text.svg", // Section 1 (SVG)
        "../dist/images/section-2.svg", // Section 2 (SVG)
        "../dist/images/section-3.svg", // Section 3 (SVG)
        "../dist/images/section-4.svg" // Section 4 (SVG)
    ];
    const profilePath = "dist/images/chairmans-profile.png"; // Section 1 (PNG)

    const svgScaleFactor = 0.8;
    const particleSize = 1.2;
    const particleSpacing = 4;
    const maxParticles = 18000;
    const maxProfileParticles = 15000;
    const mouseRadius = 150;

    // FIX 1: Flag to control mouse interaction for section 1 particles
    let allowFgMouseInteraction = true; 
    // FIX 4: Particle optimization constant
    const PARTICLE_UPDATE_RATIO = 0.5; // Only update physics for 50% of particles per frame (Performance Fix)


    const mouse = {
        x: null,
        y: null,
        radius: mouseRadius,
        normX: 0,
        normY: 0
    };

    let fgParticlesArray = [];
    let isTransitioning = false;
    let currentSectionIndex = 0;
    let lastTime = 0;

    // --- Three.js Setup (3D Background Particles) ---
    let scene, camera, renderer, bgParticles, bgGeometry, bgMaterial;

    // Global variable to hold the texture for the disc
    const pointTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');


    function initThree() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 30;

        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = -2;
        threeContainer.appendChild(renderer.domElement);

        // Background Particle Setup
        const bgParticleCount = 4000;
        bgGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(bgParticleCount * 3);
        const sizes = new Float32Array(bgParticleCount);
        const randoms = new Float32Array(bgParticleCount);

        for (let i = 0; i < bgParticleCount; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

            sizes[i] = Math.random() * 2 + 0.5;
            randoms[i] = Math.random() * Math.PI * 2;
        }

        bgGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        bgGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        bgGeometry.setAttribute('random', new THREE.BufferAttribute(randoms, 1));

        bgMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: {
                    value: new THREE.Color(0xFFFFFF)
                },
                pointTexture: {
                    value: pointTexture
                },
                pixelRatio: {
                    value: window.devicePixelRatio
                },
                time: {
                    value: 0
                },
                mouseNorm: {
                    value: new THREE.Vector2(0, 0)
                }
            },
            vertexShader: `
                attribute float size;
                attribute float random;
                uniform float time;
                uniform vec2 mouseNorm;
                varying float vOpacity;
                
                void main() {
                    vec3 p = position;
                    
                    float distance = length(p.xz);
                    float orbitSpeed = 0.5 + p.y * 0.005;
                    float angle = atan(p.z, p.x) + time * orbitSpeed * 0.1 + random;
                    
                    p.x = cos(angle) * distance;
                    p.z = sin(angle) * distance;
                    
                    float parallaxFactor = p.z / 100.0;
                    p.x += mouseNorm.x * parallaxFactor * 5.0;
                    p.y += mouseNorm.y * parallaxFactor * 5.0;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;

                    vOpacity = 0.15 + (1.0 - abs(p.z) / 50.0) * 0.1;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                varying float vOpacity;
                void main() {
                    vec4 textureColor = texture2D(pointTexture, gl_PointCoord);
                    float finalOpacity = textureColor.a * vOpacity;

                    gl_FragColor = vec4(1.0, 1.0, 1.0, finalOpacity); 
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        bgParticles = new THREE.Points(bgGeometry, bgMaterial);
        scene.add(bgParticles);
    }

    // --- Combined Resize Function ---
    function resizeCanvas() {
        currentCanvasWidth = fgCanvas.width = window.innerWidth;
        currentCanvasHeight = fgCanvas.height = window.innerHeight;

        if (camera) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
        if (renderer) {
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        // Use a throttle if resize events are too frequent, but for this complexity, full re-init is safer.
        if (fgParticlesArray.length > 0) {
             // Reinitialize particles to adjust positions on screen resize
            initParticles(currentSectionIndex, false); 
        }
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial CSS setup
    gsap.set("#smooth-wrapper", {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        clipPath: 'circle(0% at 50% 50%)'
    });
    // FIX 1: Set a higher z-index for the canvas
    fgCanvas.style.zIndex = 5; 
    gsap.set(chairmansProfile, {
        opacity: 0
    });

    // --- Foreground 2D Particle Class ---
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
            this.originalColor = "#FFFFFF";
            this.color = this.originalColor;
            this.size = particleSize;
            this.density = Math.random() * 20 + 5;
            this.vx = 0;
            this.vy = 0;
            this.ease = 0.1;
            this.opacity = 0;
            // FIX 1: Flag to identify if a particle belongs to the chairman's profile
            this.isProfile = false; 
        }

        draw() {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        update(deltaTime) {
            
            // FIX 4: Optimization - skip physics update for a ratio of particles
            if (Math.random() > PARTICLE_UPDATE_RATIO) return; 

            // Mouse Interaction Logic
            // FIX 1: Chairman profile particles should not have mouse over movement.
            if (allowFgMouseInteraction && !this.isProfile && mouse.x !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let angle = Math.atan2(dy, dx);
                    let pushX = Math.cos(angle) * force * this.density;
                    let pushY = Math.sin(angle) * force * this.density;

                    this.vx -= pushX * 0.05;
                    this.vy -= pushY * 0.05;
                }
            }
            
            // Standard return-to-base logic
            let dxBase = this.baseX - this.x;
            let dyBase = this.baseY - this.y;

            if (!isTransitioning) {
                this.vx += dxBase * this.ease * 0.1;
                this.vy += dyBase * this.ease * 0.1;

                this.vx *= 0.8;
                this.vy *= 0.8;
            } else {
                this.vx *= 0.95;
                this.vy *= 0.95;
            }

            this.x += this.vx;
            this.y += this.vy;
        }

        setTarget(targetX, targetY, targetColor, isProfile = false) {
            this.baseX = targetX;
            this.baseY = targetY;
            this.originalColor = targetColor;
            this.isProfile = isProfile; // Set profile flag
        }
    }

    // --- Utility Functions ---

    threeContainer.addEventListener("mousemove", function(event) {
        // ... (Mouse movement logic for three.js remains unchanged) ...
        const rect = threeContainer.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;

        mouse.normX = (mouse.x / currentCanvasWidth) * 2 - 1;
        mouse.normY = -((mouse.y / currentCanvasHeight) * 2 - 1);

        if (bgMaterial) {
            gsap.to(bgMaterial.uniforms.mouseNorm.value, {
                x: mouse.normX * 0.5,
                y: mouse.normY * 0.5,
                duration: 1,
                ease: "power2.out"
            });
        }
    });

    threeContainer.addEventListener("mouseleave", function() {
        // ... (Mouse leave logic remains unchanged) ...
        mouse.x = null;
        mouse.y = null;
        if (bgMaterial) {
            gsap.to(bgMaterial.uniforms.mouseNorm.value, {
                x: 0,
                y: 0,
                duration: 1.5,
                ease: "power2.out"
            });
        }
    });

    // --- getParticleDataFromResource (Remains unchanged) ---
    async function getParticleDataFromResource(url, maxCount) {
        if (!url) return [];

        const isSVG = url.endsWith('.svg');
        const img = new Image();
        img.crossOrigin = 'Anonymous';

        if (isSVG) {
            try {
                const response = await fetch(url);
                const text = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "image/svg+xml");
                const svgElement = xmlDoc.documentElement;

                let viewBox = svgElement.getAttribute('viewBox');
                if (!viewBox) {
                    const bounds = svgElement.getBBox();
                    viewBox = `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`;
                }
                const svgString = new XMLSerializer().serializeToString(svgElement);
                img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
            } catch (error) {
                console.error("Error loading SVG:", error);
                return [];
            }
        } else {
            img.src = url;
        }

        return new Promise(resolve => {
            img.onload = () => {
                const imgW = img.naturalWidth || img.width;
                const imgH = img.naturalHeight || img.height;
                const ar = imgW / imgH;

                let targetW, targetH;
                if (currentCanvasWidth / currentCanvasHeight > ar) {
                    targetH = currentCanvasHeight * svgScaleFactor;
                    targetW = targetH * ar;
                } else {
                    targetW = currentCanvasWidth * svgScaleFactor;
                    targetH = targetW / ar;
                }

                const drawW = targetW;
                const drawH = targetH;
                const drawX = (currentCanvasWidth - drawW) / 2;
                const drawY = (currentCanvasHeight - drawH) / 2;

                const offscreenCanvas = document.createElement('canvas');
                offscreenCanvas.width = currentCanvasWidth;
                offscreenCanvas.height = currentCanvasHeight;
                const offscreenCtx = offscreenCanvas.getContext("2d");

                offscreenCtx.clearRect(0, 0, currentCanvasWidth, currentCanvasHeight);
                offscreenCtx.drawImage(img, drawX, drawY, drawW, drawH);

                const imageData = offscreenCtx.getImageData(0, 0, currentCanvasWidth, currentCanvasHeight).data;

                const sampledPoints = [];
                const randomPoints = [];

                for (let y = 0; y < currentCanvasHeight; y += particleSpacing) {
                    for (let x = 0; x < currentCanvasWidth; x += particleSpacing) {
                        const index = (Math.floor(y) * currentCanvasWidth + Math.floor(x)) * 4;
                        const alpha = imageData[index + 3];

                        if (alpha > 128) {
                            const r = imageData[index];
                            const g = imageData[index + 1];
                            const b = imageData[index + 2];

                            randomPoints.push({
                                x: x + (Math.random() - 0.5) * particleSpacing,
                                y: y + (Math.random() - 0.5) * particleSpacing,
                                color: `rgb(${r}, ${g}, ${b})`
                            });
                        }
                    }
                }

                gsap.utils.shuffle(randomPoints).slice(0, maxCount).forEach(point => sampledPoints.push(point));

                resolve(sampledPoints);
            };
            img.onerror = () => {
                console.error("Image load failed for resource:", url);
                resolve([]);
            };
        });
    }

    // --- initParticles (UPDATED to set isProfile flag) ---
    async function initParticles(sectionIndex, isInitialLoad = true) {
        if (sectionIndex >= svgPaths.length) return;

        let svgData = await getParticleDataFromResource(svgPaths[sectionIndex], maxParticles);
        let profileData = [];

        if (sectionIndex === 0) {
            profileData = await getParticleDataFromResource(profilePath, maxProfileParticles);
        }

        const newParticleData = svgData.concat(profileData);
        if (newParticleData.length === 0 && !isInitialLoad) return;

        if (isInitialLoad) {
            fgParticlesArray = [];

            const poolSize = Math.max(maxParticles + maxProfileParticles, newParticleData.length);

            for (let i = 0; i < poolSize; i++) {
                const targetIndex = i % newParticleData.length;
                const initialX = Math.random() * currentCanvasWidth;
                const initialY = Math.random() * currentCanvasHeight;
                const particle = new Particle(initialX, initialY);

                if (newParticleData[targetIndex]) {
                    const isProfile = targetIndex >= svgData.length; // True if particle is from profileData
                    particle.setTarget(
                        newParticleData[targetIndex].x,
                        newParticleData[targetIndex].y,
                        newParticleData[targetIndex].color,
                        isProfile // Pass the isProfile flag
                    );
                } else {
                    particle.baseX = currentCanvasWidth / 2;
                    particle.baseY = currentCanvasHeight / 2;
                }
                fgParticlesArray.push(particle);
            }
        } else {
            fgParticlesArray.forEach((particle, index) => {
                const targetIndex = index % newParticleData.length;

                if (newParticleData[targetIndex]) {
                    const isProfile = targetIndex >= svgData.length;
                    particle.setTarget(
                        newParticleData[targetIndex].x,
                        newParticleData[targetIndex].y,
                        newParticleData[targetIndex].color,
                        isProfile // Pass the isProfile flag
                    );
                } else {
                    const scatterX = Math.random() * currentCanvasWidth;
                    const scatterY = Math.random() * currentCanvasHeight;
                    // Particles that no longer have a target scatter/fade
                    particle.setTarget(scatterX, scatterY, 'rgba(255, 255, 255, 0)', false);
                }

            });
        }
    }

    // --- animateSectionTransition (Remains largely unchanged) ---
    async function animateSectionTransition(newSectionIndex) {
        if (isTransitioning || newSectionIndex === currentSectionIndex || newSectionIndex >= svgPaths.length) return;

        isTransitioning = true;
        currentSectionIndex = newSectionIndex;
        
        // FIX 1: Toggle foreground mouse interaction based on section
        allowFgMouseInteraction = newSectionIndex === 0;

        await initParticles(newSectionIndex, false);

        const tl = gsap.timeline({
            onStart: () => {
                // ... (Cleanup for programmatic navigation remains)
                const prevHeading = sections[currentSectionIndex === 0 ? 1 : currentSectionIndex - 1]?.querySelector('.main-heading');
                if (prevHeading && !sections[currentSectionIndex === 0 ? 1 : currentSectionIndex - 1]?.scrollTrigger.isActive) {
                    gsap.to(prevHeading, { opacity: 0, y: 20, duration: 0.5, ease: "power2.in" });
                }
                if (newSectionIndex !== 0) { // If leaving section 0
                    gsap.to(chairmansProfile, { opacity: 0, duration: 0.5, ease: "power2.in" });
                    gsap.to(patcher, { opacity: 0, duration: 0.5, ease: "power2.in" });
                }
            },
            onComplete: () => {
                isTransitioning = false;
            }
        });

        // Particle Morph/Scatter/Reform
        fgParticlesArray.forEach(particle => {
            const duration = 2.0 + Math.random() * 0.5;

            tl.to(particle, {
                x: particle.baseX,
                y: particle.baseY,
                color: particle.originalColor,
                opacity: (particle.originalColor.includes('0') ? 0 : 1), // Fade out scattered particles
                duration: duration,
                ease: "power3.inOut",
                stagger: {
                    each: 0.00005,
                    from: "random"
                }
            }, 0);
        });
    }

    // --- initialUnmask (Remains largely unchanged) ---
    function initialUnmask() {
        const center_x = currentCanvasWidth / 2;
        const center_y = currentCanvasHeight / 2;
        const maxRadius = Math.sqrt(currentCanvasWidth ** 2 + currentCanvasHeight ** 2) / 2;

        fgParticlesArray.forEach(particle => {
            const distance = Math.sqrt((particle.baseX - center_x) ** 2 + (particle.baseY - center_y) ** 2);
            const angle = Math.atan2(particle.baseY - center_y, particle.baseX - center_x);

            particle.x = center_x + Math.cos(angle) * (distance + 1500);
            particle.y = center_y + Math.sin(angle) * (distance + 1500);
            particle.opacity = 0;
        });

        sections.forEach(section => {
            const heading = section.querySelector('.main-heading');
            if (heading) gsap.set(heading, {
                opacity: 0,
                y: 20
            });
        });

        const tl = gsap.timeline({
            delay: 0.5,
            onStart: () => {
                isTransitioning = true;
            },
            onComplete: () => {
                isTransitioning = false;
                // Heading 1 will fade in via its ScrollTrigger on initial load (since top is in center range)
            }
        });

        // 1. Zoom/Unmask Effect 
        tl.to("#smooth-wrapper", {
            clipPath: `circle(${maxRadius * 1.5}px at 50% 50%)`,
            duration: 2.5,
            ease: "expo.inOut"
        }, 0);

        // 2. Move SVG particles into their Section 1 position (Intro Text)
        fgParticlesArray.forEach(particle => {
            tl.to(particle, {
                x: particle.baseX,
                y: particle.baseY,
                opacity: 1,
                duration: 2.0 + Math.random() * 1.0,
                ease: "power2.inOut",
                stagger: {
                    each: 0.00005,
                    from: "center"
                }
            }, 0.5); 
        });

        // 3. Zoom-out effect for chairmans-profile PNG
        tl.fromTo(chairmansProfile, {
            opacity: 0,
            scale: 0.5
        }, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
        }, 1.5);
    }

    // --- setupScrollLogic FIXES ---
    function setupScrollLogic() {
        // Pin the Three.js/2D canvas background layer
        ScrollTrigger.create({
            trigger: '.section-home-holder',
            start: 'top top',
            end: 'bottom bottom',
            pin: threeContainer,
            pinSpacing: false,
        });

        // Quick fade out for Section 1's profile image and patcher
        ScrollTrigger.create({
            trigger: sections[1], // #section-2
            start: "top bottom", 
            end: "top 75%", 
            scrub: true, // FIX 3: Reversible
            onUpdate: self => {
                if (currentSectionIndex !== 0) return; 

                const progress = self.progress;

                gsap.to([chairmansProfile, patcher], {
                    opacity: 1 - progress,
                    duration: 0.01 
                });
            },
            onEnter: () => {
                // Ensure state is clean when section 2 enters
                gsap.set([chairmansProfile, patcher], { opacity: 0 });
                allowFgMouseInteraction = false;
            },
            onLeaveBack: () => {
                 // Ensure state is restored when returning to section 1
                gsap.set([chairmansProfile, patcher], { opacity: 1 });
                allowFgMouseInteraction = true;
            }
        });


        // Setup ScrollTriggers for main section transitions (Particle morph)
        sections.forEach((section, i) => {
            if (i < svgPaths.length) {
                // Particle Morph Trigger
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center", // FIX: Trigger transition when top hits center
                    end: "bottom center",
                    onEnter: () => animateSectionTransition(i),
                    onEnterBack: () => animateSectionTransition(i), // FIX 3: Reversible
                });

                // FIX 2 & 3: Main Heading Fade In/Out Trigger
                const heading = section.querySelector('.main-heading');
                if (heading) {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top center+=20%", // Start fade-in slightly below center
                        end: "bottom center-=20%", // Start fade-out slightly above center
                        scrub: true, // FIX 3: Reversible
                        
                        // Use a simple timeline for the animation, scrub controls progress
                        animation: gsap.fromTo(heading, {
                            opacity: 0,
                            y: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            ease: "power2.out"
                        }),
                        
                        // Ensure fade out when leaving the active range
                        onLeave: () => {
                            gsap.to(heading, { opacity: 0, y: -20, duration: 0.3 });
                        },
                        onLeaveBack: () => {
                            gsap.to(heading, { opacity: 0, y: 20, duration: 0.3 });
                        },
                        onEnter: () => {
                             // Let the scrubbed animation handle the fade-in
                        },
                        onEnterBack: () => {
                            // Let the scrubbed animation handle the fade-in
                        }
                    });
                }
            }
        });
    }

    // --- Animation Loop ---
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime || 0;
        lastTime = currentTime;

        // 1. Clear Foreground 2D Canvas
        ctx.clearRect(0, 0, currentCanvasWidth, currentCanvasHeight);

        // 2. Update and Draw Foreground SVG/PNG particles
        // FIX 4: Optimization is inside Particle.update
        fgParticlesArray.forEach(p => {
            p.update(deltaTime);
            p.draw();
        });

        // 3. Update and Render 3D Background Particles
        if (bgMaterial) {
            bgMaterial.uniforms.time.value = currentTime * 0.001;
        }
        if (renderer) {
            renderer.render(scene, camera);
        }

        requestAnimationFrame(animate);
    }

    // --- Initialize ---
    async function init() {
        initThree();
        await initParticles(0, true);
        setupScrollLogic();
        animate(0);
        initialUnmask();
    }

    // Run the main initialization function
    init();
}

document.addEventListener('DOMContentLoaded', chairIntro);