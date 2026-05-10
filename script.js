document.addEventListener('DOMContentLoaded', () => {

    // --- 0. HELIX SPIRAL FLOW (VOLUMETRIC) ---
    const helixSvg = d3.select("#helix-svg");
    const vanillaPath = helixSvg.append("path").attr("class", "helix-path").attr("stroke", "#ffffff");
    const chocolatePath = helixSvg.append("path").attr("class", "helix-path").attr("stroke", "#5d4037");

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
        const bar = document.getElementById("reading-progress");
        if (bar) bar.style.width = (scrolled * 100) + "%";
        updateHelix(scrolled);
    });

    function updateHelix(progress) {
        const width = 140;
        const height = window.innerHeight * 0.95;
        const points = 100;
        const currentPoints = Math.floor(points * progress);
        const line = d3.line().x(d => d.x).y(d => d.y).curve(d3.curveBasis);

        const dataV = [];
        const dataC = [];
        const baseWidth = 15;
        const maxWidth = 55;
        const currentHelixWidth = baseWidth + (progress * (maxWidth - baseWidth));

        for(let i=0; i<=currentPoints; i++) {
            const y = (i / points) * height;
            const angle = (i / points) * Math.PI * 14; 
            dataV.push({ x: (width/2) + Math.cos(angle) * currentHelixWidth, y: y });
            dataC.push({ x: (width/2) + Math.cos(angle + Math.PI) * currentHelixWidth, y: y });
        }

        vanillaPath.attr("d", line(dataV)).attr("stroke-width", 12 + (progress * 28));
        chocolatePath.attr("d", line(dataC)).attr("stroke-width", 12 + (progress * 28));
    }

    // --- 1. OPENER LOGIC (REFINED PHYSICS) ---
    window.dispenseSequence = () => {
        const lever = document.getElementById('lever-assembly');
        const stream = document.getElementById('stream-flow');
        const status = document.getElementById('machine-status');

        lever.style.transform = 'rotate(20deg)';
        status.innerText = "DISPENSING...";

        setTimeout(() => {
            stream.setAttribute('height', '80');
            setTimeout(() => { animateGrowthSmooth('swirl-layer-1', 28); }, 200);
            setTimeout(() => { animateGrowthSmooth('swirl-layer-2', 22); }, 600);
            setTimeout(() => { animateGrowthSmooth('swirl-layer-3', 16); }, 1000);
            
            setTimeout(() => {
                stream.setAttribute('height', '0');
                lever.style.transform = 'rotate(0)';
                status.innerText = "SUCCESS";

                setTimeout(() => {
                    const overlay = document.getElementById('opener-overlay');
                    overlay.style.opacity = '0';
                    setTimeout(() => { overlay.style.display = 'none'; }, 800);
                }, 1000);
            }, 2500);
        }, 400);
    };

    const animateGrowthSmooth = (id, targetR) => {
        const s = document.getElementById(id);
        if (!s) return;
        let r = 0;
        const interval = setInterval(() => {
            if(r >= targetR) clearInterval(interval);
            else { r += 0.5; s.setAttribute('r', r); } 
        }, 15);
    };

    // --- 2. RUPTURE SIMULATION ---
    let ruptureClicks = 0;
    window.runRuptureSim = () => {
        ruptureClicks++;
        const status = document.getElementById('sim-status-label');
        const reveal = document.getElementById('sim-reveal-area');
        const btn = document.getElementById('btn-serve-sim');

        if(ruptureClicks === 1) status.innerText = "TICKET #001: SUCCESS";
        if(ruptureClicks === 2) status.innerText = "TICKET #002: CLEANING CYCLE...";
        if(ruptureClicks === 3) status.innerText = "TICKET #003: HEAT WARNING [STANDBY]";
        if(ruptureClicks >= 4) {
            status.innerText = "FATAL ERROR: LOCKOUT ACTIVE";
            status.style.color = "var(--mcd-red)";
            reveal.classList.remove('hidden');
            btn.style.display = 'none';
        }
        };

        // --- 3. TAB NAVIGATION (WITH FADE) ---
        window.switchTab = (tab) => {
        const article = document.getElementById('tab-article');
        const map = document.getElementById('tab-map');

        if(tab === 'map') {
            article.classList.remove('active');
            setTimeout(() => {
                map.style.opacity = '0';
                map.style.display = 'block';
                map.classList.add('active');
                initMap();
                // Trigger reflow for transition
                setTimeout(() => { map.style.opacity = '1'; }, 50);
            }, 400);
        } else {
            map.classList.remove('active');
            setTimeout(() => {
                article.classList.add('active');
            }, 400);
        }
        };
    // --- 4. UNIFIED HOVER TOOLTIP ---
    const tooltip = document.getElementById('unified-tooltip');
    const chicagoNotes = {
        "1": "Karl Marx, 'Estranged Labour,' in Economic and Philosophical Manuscripts of 1844, trans. Martin Milligan (Moscow: Progress Publishers, 1959).",
        "2": "McDonald's USA, 'Vanilla Cone,' Nutrition & Ingredients, accessed May 9, 2026, https://www.mcdonalds.com/us/en-us/product/vanilla-cone.html.",
        "3": "Ice Cream Manufacturing: Principles and Methods Explained (New York: Springer, 2024).",
        "4": "United States Department of Agriculture, 'Cold Chain Food Flows,' Food Safety and Inspection Service, 2023.",
        "5": "Claire Mayhew and Michael Quinlan, 'Fordism in the Fast Food Industry,' Sociology of Health & Illness 24, no. 3 (2002): 261-284.",
        "6": "Taylor Company, Model C602 Combination Shake/Soft Serve Freezer Manual (Rockton, IL: Taylor Company, n.d.).",
        "7": "Langdon Winner, 'Do Artifacts Have Politics?' in The Whale and the Reactor (Chicago: University of Chicago Press, 1986).",
        "8": "Johnny Harris, 'The Real Reason McDonald’s Ice Cream Machines Are Always Broken,' YouTube video, April 20, 2021, https://www.youtube.com/watch?v=SrDEtSlqJC4.",
        "9": "Jane Bennett, Vibrant Matter: A Political Ecology of Things (Durham, NC: Duke University Press, 2010).",
        "10": "Maria Kaika, City of Flows: Modernity, Nature, and the City (New York: Routledge, 2005).",
        "11": "Emeka W. Dumbili, 'McDonaldization and Modern society,' 2020.",
        "12": "United States Environmental Protection Agency, Proceedings Eighth National Symposium on Food Processing Wastes (1977)."
    };

    const showTip = (content, e) => {
        tooltip.innerHTML = content;
        tooltip.classList.remove('hidden');
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX + 20) + 'px';
        tooltip.style.top = (e.clientY + 20) + 'px';
    };

    const hideTip = () => { tooltip.classList.add('hidden'); tooltip.style.display = 'none'; };

    document.querySelectorAll('.glossary').forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const content = `<div style="color:var(--mcd-gold); font-family:'Bungee'; font-size:0.6rem; margin-bottom:8px;">DEFINITION</div>${e.target.dataset.def}`;
            showTip(content, e);
        });
        item.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.clientX + 20) + 'px';
            tooltip.style.top = (e.clientY + 20) + 'px';
        });
        item.addEventListener('mouseleave', hideTip);
    });

    document.querySelectorAll('.fn').forEach(trigger => {
        trigger.addEventListener('mouseenter', (e) => {
            const id = trigger.dataset.fn;
            const content = `<div style="color:var(--mcd-red); font-family:'Bungee'; font-size:0.65rem; margin-bottom:8px;">CHICAGO CITATION</div>${chicagoNotes[id]}`;
            showTip(content, e);
        });
        trigger.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.clientX + 20) + 'px';
            tooltip.style.top = (e.clientY + 20) + 'px';
        });
        trigger.addEventListener('mouseleave', hideTip);
    });

    // --- 5. NETWORK MAP (D3) ---
    const essayParagraphs = {
        Cow: "The vanilla soft-serve cone handed to a customer is embedded in an extraction network that spans dairy production, industrial processing, refrigeration, transportation, franchise labor, machine design, maintenance, and consumer standards.",
        Milk: "A McDonald’s vanilla cone is not simply milk from a cow. Each ingredient links the restaurant to dairy farms, sugar and corn production, stabilizer manufacturing, food science, and distribution.",
        Sugar: "The ingredient list for McDonald’s vanilla reduced-fat ice cream includes many items: milk, sugar, cream, corn syrup... each ingredient links the restaurant to dairy farms, sugar and corn production.",
        Plant: "Industrial ice cream production requires mixing, pasteurization, homogenization, aging, and freezing before the product reaches the customer in its final form. Each stage is formed by food science.",
        Logistics: "The USDA defines cold-chain food flows as temperature-controlled delivery from producer to end consumer by refrigerated trucks. The cold chain is part of the product’s infrastructure.",
        Freezer: "Standardized, refrigerated, franchise-based systems rapidly produce identical commodities at multiple locations. Efficiency is defined by speed, uniformity, and managerial control.",
        Taylor: "In this partnership, franchises bear the heavy cost of these repairs while McDonald's benefits a larger corporation, Taylor, rather than the consumer. This proprietary arrangement discourages innovation and makes it difficult to repair the machines through lockouts via verification codes. Consequently, all roads lead to 'call the guy,' allowing Taylor to generate 25% of its business revenue strictly from repairs, a statistic documented in Johnny Harris's investigative reporting on the machine's proprietary repair lockouts.",
        Staff: "The worker becomes the visible representative of an invisible system. Workers dispense cones, clean machines, but do not control products, machines, contracts, prices, recipes, or sales value.",
        Corp: "McDonald's further reinforces this by locking franchises out of any other equipment deals, illustrating how the machine's technical lockout is a tool of economic and political authority. Greater control resides with corporate policies, technicians, and managers.",
        Rupture: "When the machine is “broken,” both forms of alienation meet. The consumer’s desire confronts the worker’s limited power. The worker becomes the visible representative of an invisible system."
    };

    function initMap() {
        const svgCont = d3.select("#interactive-map");
        svgCont.selectAll("*").remove(); // Clear previous

        const mapNodes = [
            { id: "Cow", x: 100, y: 300, img: "https://cdn-icons-png.flaticon.com/512/2395/2395796.png", l: "Dairy Extraction", t: essayParagraphs.Cow },
            { id: "Milk", x: 220, y: 200, img: "https://cdn-icons-png.flaticon.com/512/3703/3703253.png", l: "Milk Input", t: essayParagraphs.Milk },
            { id: "Sugar", x: 220, y: 400, img: "https://cdn-icons-png.flaticon.com/512/4710/4710046.png", l: "Sugar / Corn", t: essayParagraphs.Sugar },
            { id: "Plant", x: 400, y: 300, img: "https://cdn-icons-png.flaticon.com/512/1047/1047460.png", l: "Industrial Mix", t: essayParagraphs.Plant },
            { id: "Truck", x: 550, y: 300, img: "https://cdn-icons-png.flaticon.com/512/2830/2830305.png", l: "Cold Chain", t: essayParagraphs.Logistics },
            { id: "Store", x: 710, y: 200, img: "https://cdn-icons-png.flaticon.com/512/811/811311.png", l: "Storage", t: essayParagraphs.Freezer },
            { id: "Taylor", group: "Control", x: 710, y: 420, img: "", l: "Taylor Machine", t: essayParagraphs.Taylor, isTaylor: true },
            { id: "Worker", x: 860, y: 300, img: "https://cdn-icons-png.flaticon.com/512/1041/1041893.png", l: "Staff", t: essayParagraphs.Staff },
            { id: "Policy", x: 860, y: 100, img: "https://cdn-icons-png.flaticon.com/512/2942/2942125.png", l: "Corp Policy", t: essayParagraphs.Corp },
            { id: "Lockout", group: "Error", x: 1010, y: 400, img: "https://cdn-icons-png.flaticon.com/512/4201/4201973.png", l: "System Rupture", t: essayParagraphs.Rupture }
        ];

        const mapLinks = [
            { source: "Cow", target: "Milk" }, { source: "Milk", target: "Plant" }, { source: "Sugar", target: "Plant" },
            { source: "Plant", target: "Truck" }, { source: "Truck", target: "Store" }, { source: "Store", target: "Taylor" },
            { source: "Taylor", target: "Worker" }, { source: "Taylor", target: "Lockout" }, { source: "Policy", target: "Taylor" }
        ];

        const svg = svgCont.append("svg").attr("width", "100%").attr("height", "100%").attr("viewBox", "0 0 1100 650");
        const container = svg.append("g");

        svg.call(d3.zoom().scaleExtent([0.5, 4]).on("zoom", (e) => container.attr("transform", e.transform)));

        container.append("g").selectAll("line").data(mapLinks).enter().append("line")
            .attr("x1", d => mapNodes.find(n => n.id === d.source).x).attr("y1", d => mapNodes.find(n => n.id === d.source).y)
            .attr("x2", d => mapNodes.find(n => n.id === d.target).x).attr("y2", d => mapNodes.find(n => n.id === d.target).y)
            .attr("stroke", "#ddd").attr("stroke-width", 3).attr("opacity", 0.5);

        const gNodes = container.append("g").selectAll("g").data(mapNodes).enter().append("g")
            .attr("class", "node-group")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("cursor", "pointer")
            .on("mouseenter", function(e, d) {
                d3.select(this).transition().duration(200).attr("transform", `translate(${d.x}, ${d.y}) scale(1.6)`);
                const content = `<div style="color:var(--mcd-gold); font-family:'Bungee'; font-size:0.7rem; margin-bottom:10px;">ELEMENT: ${d.l}</div>${d.t}`;
                showTip(content, e);
            })
            .on("mouseleave", function(e, d) {
                d3.select(this).transition().duration(200).attr("transform", `translate(${d.x}, ${d.y}) scale(1)`);
                hideTip();
            });

        gNodes.each(function(d) {
            if (d.isTaylor) {
                d3.select(this).append("text").text("⚙️").attr("font-size", "50px").attr("dx", -25).attr("dy", 15);
            } else {
                const emojiMap = {
                    Cow: "🐄", Milk: "🥛", Sugar: "🌽", Plant: "🧪", 
                    Truck: "🚛", Store: "🏪", Worker: "👷", 
                    Policy: "📜", Lockout: "🔒"
                };
                d3.select(this).append("text")
                    .text(emojiMap[d.id] || "❓")
                    .attr("font-size", "50px")
                    .attr("text-anchor", "middle")
                    .attr("dy", 15);
            }
        });
        gNodes.append("text").text(d => d.l).attr("class", "map-label").style("font-family", "Courier New").attr("dy", 55).attr("text-anchor", "middle");
    }
});
