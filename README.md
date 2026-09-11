# 🔥 RIZZ RATER — Kerala Gen-Z AI Chat Analyzer

> **"Upload the chat. We judge the game. 💀"**  
> *"Chat screenshot ഇങ്ങോട്ട് ഇട്... ബാക്കി ഞങ്ങൾ നോക്കിക്കോളാം 😎"*  
> **🌴 KERALA RIZZ ANALYSIS ENGINE™**

A humorous, futuristic Kerala-night themed web application that inspects WhatsApp, Instagram DM, or Messenger chat screenshots using client-side OCR, computes a dynamic **0.0 to 10.0** Rizz Score, generates a diagnostic report, and **speaks the verdict in Malayalam / Manglish audio** using the Web Speech API!

---

## 🌌 Features

1. **Futuristic Cyber-Kerala Aesthetics**:
   - Deep obsidian, nebula violet, neon pink, electric cyan, and cyber emerald palette.
   - Interactive canvas starfield with twinkling stars & glowing particle physics.
   - Floating Malayalam background words drifting gently: *"എടാ മോനെ"*, *"ഇത് എന്താ സംഭവം?"*, *"റിസ്സ് ഉണ്ടോ?"*, *"അയ്യോ"*, *"പൊളിച്ചു"*, *"ഫംബിൾ"*, *"ഡെലുലു"*, *"SCENE AANO?"*, *"DA MWONE"*, *"RIZZ"*.
   - Kerala coconut palm backwater silhouette backdrop.
   - Glassmorphism panels with multi-layered blur, glowing borders, and smooth hover effects.

2. **100% Client-Side Privacy & Free Browser OCR**:
   - Tesseract.js in-browser optical character recognition.
   - Canvas image preprocessing (grayscale, contrast stretching, noise reduction).
   - Zero servers, zero external API keys, zero image tracking. Your private chats never leave your browser.

3. **1-Click Instant Testing with Realistic Presets**:
   - 🔥 **Kochi Smooth Operator** (High Rizz, 8.7/10)
   - 💀 **Chaotic Delulu Fumble** (Low Rizz, 3.2/10)
   - 😎 **College Banter Rizz** (Decent Game, 7.5/10)
   - 👀 **Friendzone Warrior** (Average Bro, 5.4/10)
   - Or upload your own screenshot, drag-and-drop, or paste directly with `Ctrl+V`.

4. **Dynamic Rizz Score (Strictly 0.0 to 10.0)**:
   - Animated odometer count-up from `0.0` to final score.
   - Distinct score tiers with authentic Malayalam reactions:
     - `9.0–10.0`: 👑 **RIZZ GOD** (*"MWONEEE... ithu normal game alla 🔥"*)
     - `8.0–8.9`: 🔥 **SCENE AANU MONE** (*"Scene aanu bro... nee nannayi kalikkunnund."*)
     - `7.0–7.9`: 😎 **SMOOTH OPERATOR** (*"Not bad mone. Game undu."*)
     - `6.0–6.9`: 👀 **DECENT GAME** (*"Mosham alla bro. Kurachu polish koodi venam."*)
     - `5.0–5.9`: 💀 **AVERAGE BRO** (*"Rizz undennu parayam... pakshe evidence kuravaanu."*)
     - `4.0–4.9`: 😭 **TRYING TOO HARD** (*"Da mwone, onnu slow aakku."*)
     - `0.0–3.9`: 💀 **ITHU RIZZ ALLA MONE** (*"Ithu Rizz alla bro... ithoru rescue mission aanu."*)
   - Zero instances of `/100` scoring.

5. **6 Animated Detailed Attribute Cards (0.0 to 10.0)**:
   - 🔥 **Flirting**: Evaluates compliments, romantic cues, and charm.
   - 😂 **Banter**: Assesses witty roasts, comebacks, and laugh energy.
   - 👀 **Their Interest**: Gauges response warmth, reciprocation, and latency.
   - 😎 **Confidence**: Measures assertiveness, date planning, and directness.
   - 🤡 **Delulu**: Tracks overthinking, desperation, and unrequited heartbreaks.
   - 🚩 **Red Flags**: Flags dry replies ("k", "hmm"), "brother" tags, and evasions.

6. **🧬 RIZZ DNA & 🩺 CHAT DIAGNOSIS**:
   - Archetypes: *THE SMOOTH TALKER*, *THE CHAOTIC FLIRTER*, *THE LOWKEY RIZZLER*, *THE DELULU KING*, *THE ONE-LINER MERCHANT*, *THE FRIEND-ZONE WARRIOR*, *THE PROFESSIONAL FUMBLER*.
   - Entertainment Diagnoses: *MUTUAL VIBES*, *FLIRTING DETECTED*, *SITUATIONSHIP LOADING...*, *DELULU EMERGENCY*, *EMOTIONAL DAMAGE INCOMING*, etc.

7. **📈 RIZZ ARC & MOMENTS**:
   - Visual step-by-step timeline of the chat flow (`😐 → 👀 → 🔥 → 👑`).
   - 🏆 **Biggest W**: Highlights the chat's strongest move (*"Ee part aanu scene aakkiyathu bro 🔥"*).
   - 💀 **Biggest Fumble**: Pinpoints the most awkward turning point (*"Ivide aanu nee scene kalanjathu 😂"*).

8. **🎙️ Web Speech AI Voice Verdict & Audio Waveform**:
   - Auto-prioritizes Malayalam (`ml-IN`) and Indian English (`en-IN`) voices.
   - Animated SVG audio waveform during speech playback.
   - Immediate **⏹️ STOP** audio cancellation (`speechSynthesis.cancel()`).
   - Speed, Pitch, and Volume sliders.
   - Optional live voice commentary during OCR scan.

9. **🔄 Reset Workflow**:
   - Instant "TRY ANOTHER CHAT" resets previews, OCR caches, voice synthesis, and smoothly scrolls back to the top.

10. **❌ Zero Chaaya / Tea Policy**:
    - Completely free of any tea-related functionality or references.

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Simply double-click `launch.bat` or open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari, Brave).

### Option 2: Local HTTP Server
Run the PowerShell launcher script:
```powershell
powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```
Or use any static server of your choice:
```bash
npx serve .
# or
python -m http.server 5500
```
Then visit `http://localhost:5500/`.
