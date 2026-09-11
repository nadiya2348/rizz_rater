/**
 * Main Application Orchestrator for RIZZ RATER
 * Pairs UI interactions, Canvas background FX, client-side OCR,
 * Kerala Gen-Z heuristic analysis, and Web Speech synthesis.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Instances
  const ocrEngine = new RizzOCR();
  const analyzer = new RizzAnalyzer();
  const voiceEngine = new RizzVoiceEngine();

  // State
  let currentImageSource = null;
  let currentAnalysisResult = null;
  let ocrProgressTimer = null;

  // DOM Elements - Hero & Visuals
  const starCanvas = document.getElementById('star-canvas');
  const floatingWordsContainer = document.getElementById('floating-words');

  // DOM Elements - Upload & Preview
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const previewContainer = document.getElementById('preview-container');
  const previewImg = document.getElementById('preview-img');
  const btnReupload = document.getElementById('btn-reupload');
  const btnRemoveImg = document.getElementById('btn-remove-img');
  const sampleChipsContainer = document.getElementById('sample-chips');
  const btnAnalyze = document.getElementById('btn-analyze');
  const toggleLiveVoice = document.getElementById('toggle-live-voice');

  // DOM Elements - Processing Overlay
  const processingOverlay = document.getElementById('processing-overlay');
  const processStepTitle = document.getElementById('process-step-title');
  const processStepMl = document.getElementById('process-step-ml');
  const cyberProgressFill = document.getElementById('cyber-progress-fill');
  const processStatusText = document.getElementById('process-status-text');

  // DOM Elements - Detected Chat
  const detectedChatPanel = document.getElementById('detected-chat-panel');
  const accordionHeader = document.getElementById('accordion-header');
  const ocrConfidenceBadge = document.getElementById('ocr-confidence-badge');
  const chatBubbleStream = document.getElementById('chat-bubble-stream');
  const lowConfidenceBanner = document.getElementById('low-confidence-banner');
  const ocrRawText = document.getElementById('ocr-raw-text');

  // DOM Elements - Results Section
  const resultsSection = document.getElementById('results-section');
  const scoreNumber = document.getElementById('score-number');
  const personalityBadge = document.getElementById('personality-badge');
  const scoreMlReaction = document.getElementById('score-ml-reaction');

  // DOM Elements - 6 Stats
  const statFlirtVal = document.getElementById('stat-flirt-val');
  const statFlirtBar = document.getElementById('stat-flirt-bar');
  const statFlirtDesc = document.getElementById('stat-flirt-desc');

  const statBanterVal = document.getElementById('stat-banter-val');
  const statBanterBar = document.getElementById('stat-banter-bar');
  const statBanterDesc = document.getElementById('stat-banter-desc');

  const statInterestVal = document.getElementById('stat-interest-val');
  const statInterestBar = document.getElementById('stat-interest-bar');
  const statInterestDesc = document.getElementById('stat-interest-desc');

  const statConfVal = document.getElementById('stat-conf-val');
  const statConfBar = document.getElementById('stat-conf-bar');
  const statConfDesc = document.getElementById('stat-conf-desc');

  const statDeluluVal = document.getElementById('stat-delulu-val');
  const statDeluluBar = document.getElementById('stat-delulu-bar');
  const statDeluluDesc = document.getElementById('stat-delulu-desc');

  const statFlagsVal = document.getElementById('stat-flags-val');
  const statFlagsBar = document.getElementById('stat-flags-bar');
  const statFlagsDesc = document.getElementById('stat-flags-desc');

  // DOM Elements - DNA, Diagnosis, Arc, W & Fumble, Verdict
  const dnaName = document.getElementById('dna-name');
  const dnaDesc = document.getElementById('dna-desc');
  const diagnosisTitle = document.getElementById('diagnosis-title');
  const diagnosisDesc = document.getElementById('diagnosis-desc');
  const arcTimelineContainer = document.getElementById('arc-timeline-container');
  const biggestWQuote = document.getElementById('biggest-w-quote');
  const biggestWReaction = document.getElementById('biggest-w-reaction');
  const biggestFumbleQuote = document.getElementById('biggest-fumble-quote');
  const biggestFumbleReaction = document.getElementById('biggest-fumble-reaction');
  const keralaVerdictText = document.getElementById('kerala-verdict-text');
  const cinematicQuote = document.getElementById('cinematic-quote');

  // DOM Elements - Audio Verdict & Controls
  const voiceScriptBox = document.getElementById('voice-script-box');
  const btnAudioPlay = document.getElementById('btn-audio-play');
  const btnAudioStop = document.getElementById('btn-audio-stop');
  const audioIcon = document.getElementById('audio-icon');
  const audioLabel = document.getElementById('audio-label');
  const waveformVisualizer = document.getElementById('waveform-visualizer');

  // DOM Elements - Voice Settings
  const voiceSettingsToggle = document.getElementById('voice-settings-toggle');
  const voiceControlsGrid = document.getElementById('voice-controls-grid');
  const voiceSpeed = document.getElementById('voice-speed');
  const speedVal = document.getElementById('speed-val');
  const voicePitch = document.getElementById('voice-pitch');
  const pitchVal = document.getElementById('pitch-val');
  const voiceVolume = document.getElementById('voice-volume');
  const volVal = document.getElementById('vol-val');
  const voiceUnavailableAlert = document.getElementById('voice-unavailable-alert');

  // DOM Elements - Reset
  const btnReset = document.getElementById('btn-reset');

  /* =========================================================
     1. BACKGROUND EFFECTS: STARFIELD & FLOATING MALAYALAM
     ========================================================= */
  function initStarfield() {
    if (!starCanvas) return;
    const ctx = starCanvas.getContext('2d');
    let width = starCanvas.width = window.innerWidth;
    let height = starCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = starCanvas.width = window.innerWidth;
      height = starCanvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    }));

    function render() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        star.alpha += star.speed * star.direction;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.direction *= -1;
        }
        ctx.fillStyle = `rgba(180, 200, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(render);
    }
    render();
  }

  function initFloatingMalayalamText() {
    if (!floatingWordsContainer) return;
    const words = [
      "എടാ മോനെ",
      "ഇത് എന്താ സംഭവം?",
      "റിസ്സ് ഉണ്ടോ?",
      "അയ്യോ",
      "പൊളിച്ചു",
      "ഫംബിൾ",
      "ഡെലുലു",
      "SCENE AANO?",
      "DA MWONE",
      "RIZZ"
    ];

    function spawnWord() {
      const el = document.createElement('div');
      el.className = 'floating-word';
      el.textContent = words[Math.floor(Math.random() * words.length)];
      
      const left = Math.random() * 90;
      const duration = Math.random() * 16 + 18; // 18s - 34s drift
      const size = Math.random() * 1.1 + 1.1; // 1.1rem to 2.2rem

      el.style.left = `${left}%`;
      el.style.fontSize = `${size}rem`;
      el.style.animationDuration = `${duration}s`;

      floatingWordsContainer.appendChild(el);

      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, duration * 1000);
    }

    // Initial batch
    for (let i = 0; i < 6; i++) {
      setTimeout(spawnWord, i * 2200);
    }
    // Recurring spawn
    setInterval(spawnWord, 4500);
  }

  /* =========================================================
     2. PRESET SAMPLE CHATS RENDERING
     ========================================================= */
  function initSampleChips() {
    if (!sampleChipsContainer || !window.SAMPLE_CHATS) return;
    sampleChipsContainer.innerHTML = '';

    window.SAMPLE_CHATS.forEach(sample => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'sample-chip';
      chip.innerHTML = `${sample.label} <span style="font-size:0.75rem; color:var(--neon-cyan); opacity:0.8;">(${sample.badge})</span>`;
      
      chip.addEventListener('click', () => {
        loadPresetSample(sample);
      });

      sampleChipsContainer.appendChild(chip);
    });
  }

  function loadPresetSample(sample) {
    window.CURRENT_PRESET_RAW_TEXT = sample.rawText;
    currentImageSource = sample.image;
    
    previewImg.src = sample.image;
    previewContainer.classList.add('active');
    btnAnalyze.disabled = false;
    
    // Auto scroll slightly to preview
    previewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* =========================================================
     3. DRAG & DROP / FILE INPUT / CLIPBOARD PASTE
     ========================================================= */
  function initUploadHandlers() {
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleSelectedImage(file);
    });

    ['dragenter', 'dragover'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleSelectedImage(file);
      }
    });

    // Support clipboard paste (Ctrl+V)
    window.addEventListener('paste', (e) => {
      const items = (e.clipboardData || e.originalEvent.clipboardData).items;
      for (const item of items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          handleSelectedImage(file);
          break;
        }
      }
    });

    btnReupload.addEventListener('click', () => fileInput.click());
    btnRemoveImg.addEventListener('click', clearImageUpload);
  }

  function handleSelectedImage(file) {
    window.CURRENT_PRESET_RAW_TEXT = null; // User's own custom image
    const reader = new FileReader();
    reader.onload = (e) => {
      currentImageSource = e.target.result;
      previewImg.src = currentImageSource;
      previewContainer.classList.add('active');
      btnAnalyze.disabled = false;
    };
    reader.readAsDataURL(file);
  }

  function clearImageUpload() {
    currentImageSource = null;
    window.CURRENT_PRESET_RAW_TEXT = null;
    fileInput.value = '';
    previewImg.src = '';
    previewContainer.classList.remove('active');
    btnAnalyze.disabled = true;
  }

  /* =========================================================
     4. OCR & ANALYSIS PIPELINE
     ========================================================= */
  btnAnalyze.addEventListener('click', async () => {
    if (!currentImageSource) return;

    btnAnalyze.disabled = true;
    processingOverlay.classList.add('active');
    detectedChatPanel.style.display = 'none';
    resultsSection.classList.remove('active');

    // Update speech engine analysis toggle
    voiceEngine.setAnalysisVoice(toggleLiveVoice.checked);

    try {
      voiceEngine.speakCommentary('Screenshot received. Chat scan cheyyunnu.');

      const ocrResult = await ocrEngine.recognize(currentImageSource, (percent, msg) => {
        cyberProgressFill.style.width = `${percent}%`;
        processStatusText.textContent = msg;

        if (percent < 30) {
          processStepTitle.textContent = 'Preprocessing Chat Image...';
          processStepMl.textContent = 'Evidence collect cheyyunnu... 🔍';
        } else if (percent < 70) {
          processStepTitle.textContent = 'Recognizing Messages & Text...';
          processStepMl.textContent = 'Flirting signals check cheyyunnu... 👀';
          if (percent === 50) voiceEngine.speakCommentary('Flirting signals check cheyyunnu.');
        } else {
          processStepTitle.textContent = 'Synthesizing Chat Patterns...';
          processStepMl.textContent = 'Red flags nokkunnu... final verdict ready aakunnu 🔥';
          if (percent === 75) voiceEngine.speakCommentary('Red flags nokkunnu.');
        }
      });

      cyberProgressFill.style.width = '100%';
      processStatusText.textContent = 'Analysis complete!';
      voiceEngine.speakCommentary('Final verdict ready.');

      await new Promise(r => setTimeout(r, 450));
      processingOverlay.classList.remove('active');

      // Parse messages
      const rawText = ocrResult.text || '';
      const messages = ocrEngine.parseChatBubbles(rawText);

      // Render Detected Chat section
      renderDetectedChat(rawText, messages, ocrResult.confidence);

      // Run Heuristic Analysis
      currentAnalysisResult = analyzer.analyze(messages, rawText);

      // Render Results
      renderResults(currentAnalysisResult);

    } catch (err) {
      console.error('Analysis error:', err);
      processingOverlay.classList.remove('active');
      btnAnalyze.disabled = false;
      alert('Encountered an issue processing screenshot. Please try again!');
    }
  });

  /* =========================================================
     5. RENDER DETECTED CHAT
     ========================================================= */
  function renderDetectedChat(rawText, messages, confidence) {
    detectedChatPanel.style.display = 'block';
    ocrConfidenceBadge.textContent = `OCR: ${confidence}% Confident`;
    ocrRawText.value = rawText;

    if (confidence < 40 && (!messages || messages.length === 0)) {
      lowConfidenceBanner.classList.add('active');
    } else {
      lowConfidenceBanner.classList.remove('active');
    }

    chatBubbleStream.innerHTML = '';
    if (messages.length > 0) {
      messages.forEach(msg => {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${msg.sender === 'me' ? 'sender' : 'receiver'}`;
        bubble.innerHTML = `
          <div>${escapeHtml(msg.text)}</div>
          <div class="bubble-time">${msg.time || ''}</div>
        `;
        chatBubbleStream.appendChild(bubble);
      });
    } else {
      chatBubbleStream.innerHTML = `<div style="color: var(--text-dim); text-align: center; padding: 1rem;">No clear chat bubbles detected. Showing raw transcript below.</div>`;
    }
  }

  // Accordion toggle
  accordionHeader.addEventListener('click', () => {
    detectedChatPanel.classList.toggle('expanded');
  });

  // Allow re-analyzing if user edits raw OCR text
  ocrRawText.addEventListener('change', () => {
    const updatedText = ocrRawText.value;
    const updatedMessages = ocrEngine.parseChatBubbles(updatedText);
    currentAnalysisResult = analyzer.analyze(updatedMessages, updatedText);
    renderResults(currentAnalysisResult);
  });

  /* =========================================================
     6. RENDER RESULTS & ANIMATED SCORES (0.0 to 10.0 strictly)
     ========================================================= */
  function renderResults(result) {
    resultsSection.classList.add('active');
    btnAnalyze.disabled = false;

    // Smooth scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Animate Main Score Odometer from 0.0 -> final score
    animateOdometer(scoreNumber, 0.0, result.score, 1200);

    // Personality Badge & Malayalam reaction
    personalityBadge.textContent = result.personality.title;
    scoreMlReaction.textContent = `"${result.personality.malayalamReaction}"`;

    // 6 Stats Cards
    const stats = result.stats;

    animateStatCard(statFlirtVal, statFlirtBar, statFlirtDesc, stats.flirting);
    animateStatCard(statBanterVal, statBanterBar, statBanterDesc, stats.banter);
    animateStatCard(statInterestVal, statInterestBar, statInterestDesc, stats.theirInterest);
    animateStatCard(statConfVal, statConfBar, statConfDesc, stats.confidence);
    animateStatCard(statDeluluVal, statDeluluBar, statDeluluDesc, stats.delulu);
    animateStatCard(statFlagsVal, statFlagsBar, statFlagsDesc, stats.redFlags);

    // Rizz DNA
    dnaName.textContent = result.dna.name;
    dnaDesc.textContent = result.dna.desc;

    // Chat Diagnosis
    diagnosisTitle.textContent = result.diagnosis.title;
    diagnosisDesc.textContent = result.diagnosis.explanation;

    // Rizz Arc
    renderRizzArc(result.arc);

    // Biggest W & Fumble
    biggestWQuote.textContent = result.biggestW.text;
    biggestWReaction.textContent = result.biggestW.reaction;

    biggestFumbleQuote.textContent = result.biggestFumble.text;
    biggestFumbleReaction.textContent = result.biggestFumble.reaction;

    // Kerala Verdict & Cinematic Line
    keralaVerdictText.textContent = `"${result.keralaVerdict}"`;
    cinematicQuote.innerHTML = `<span>🎬</span> "${result.cinematicLine}"`;

    // AI Voice Verdict Script
    voiceScriptBox.textContent = result.voiceScript;
  }

  function animateStatCard(valEl, barEl, descEl, statData) {
    const target = statData.score.toFixed(1);
    valEl.textContent = `${target} / 10`;
    descEl.textContent = statData.explanation;

    // Animate progress bar (percentage internally, but visible score is strictly /10)
    const pct = Math.min(100, Math.max(5, statData.score * 10));
    barEl.style.width = '0%';
    setTimeout(() => {
      barEl.style.width = `${pct}%`;
    }, 150);
  }

  function animateOdometer(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * ease;
      el.textContent = current.toFixed(1);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = end.toFixed(1);
      }
    }
    requestAnimationFrame(update);
  }

  function renderRizzArc(arcSteps) {
    // Preserve background line
    arcTimelineContainer.innerHTML = '<div class="arc-timeline-line"></div>';
    arcSteps.forEach(step => {
      const stepEl = document.createElement('div');
      stepEl.className = 'arc-step';
      stepEl.innerHTML = `
        <div class="arc-step-node">${step.node}</div>
        <div class="arc-step-title">${step.title}</div>
        <div class="arc-step-desc">${step.desc}</div>
      `;
      arcTimelineContainer.appendChild(stepEl);
    });
  }

  /* =========================================================
     7. WEB SPEECH AUDIO VERDICT CONTROLS
     ========================================================= */
  if (!voiceEngine.isSupported()) {
    voiceUnavailableAlert.style.display = 'block';
  }

  btnAudioPlay.addEventListener('click', () => {
    if (!currentAnalysisResult) return;
    voiceEngine.speak(currentAnalysisResult.voiceScript, true);
  });

  btnAudioStop.addEventListener('click', () => {
    voiceEngine.stop();
  });

  voiceEngine.onStartCallback = () => {
    btnAudioPlay.classList.add('speaking');
    audioIcon.textContent = '🔊';
    audioLabel.textContent = 'SPEAKING...';
    waveformVisualizer.classList.add('active');
  };

  voiceEngine.onEndCallback = () => {
    btnAudioPlay.classList.remove('speaking');
    audioIcon.textContent = '🔊';
    audioLabel.textContent = 'HEAR MY RIZZ';
    waveformVisualizer.classList.remove('active');
  };

  // Voice Settings Sliders
  voiceSpeed.addEventListener('input', (e) => {
    speedVal.textContent = e.target.value;
    voiceEngine.setRate(e.target.value);
  });

  voicePitch.addEventListener('input', (e) => {
    pitchVal.textContent = e.target.value;
    voiceEngine.setPitch(e.target.value);
  });

  voiceVolume.addEventListener('input', (e) => {
    volVal.textContent = Math.round(e.target.value * 100);
    voiceEngine.setVolume(e.target.value);
  });

  // Voice Settings Drawer Toggle
  voiceSettingsToggle.addEventListener('click', () => {
    if (voiceControlsGrid.style.display === 'none') {
      voiceControlsGrid.style.display = 'grid';
      voiceSettingsToggle.innerHTML = '<span>⚙️</span> VOICE SETTINGS ▲';
    } else {
      voiceControlsGrid.style.display = 'none';
      voiceSettingsToggle.innerHTML = '<span>⚙️</span> VOICE SETTINGS ▼';
    }
  });

  /* =========================================================
     8. RESET WORKFLOW ("TRY ANOTHER CHAT")
     ========================================================= */
  btnReset.addEventListener('click', () => {
    // 1. Cancel audio immediately
    voiceEngine.stop();

    // 2. Hide results & detected panels
    resultsSection.classList.remove('active');
    detectedChatPanel.style.display = 'none';
    detectedChatPanel.classList.remove('expanded');

    // 3. Clear upload & previews
    clearImageUpload();

    // 4. Reset scores
    scoreNumber.textContent = '0.0';

    // 5. Scroll smoothly back to hero
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =========================================================
     INITIALIZE
     ========================================================= */
  initStarfield();
  initFloatingMalayalamText();
  initSampleChips();
  initUploadHandlers();

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
