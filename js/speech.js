/**
 * Web Speech API Controller for RIZZ RATER
 * Handles speech synthesis, voice detection (ml-IN, en-IN),
 * audio waveform visualization, immediate cancellation, and live commentary.
 */

class RizzVoiceEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.selectedVoice = null;
    this.rate = 0.95;
    this.pitch = 1.0;
    this.volume = 1.0;
    this.isSpeaking = false;
    this.analysisVoiceEnabled = false;

    // Callbacks
    this.onStartCallback = () => {};
    this.onEndCallback = () => {};

    if (this.synth) {
      this.initVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  isSupported() {
    return !!this.synth;
  }

  initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();

    // Prioritize Malayalam (ml-IN) or Indian English (en-IN)
    let bestVoice = this.voices.find(v => v.lang === 'ml-IN' || v.lang.startsWith('ml'));
    if (!bestVoice) {
      bestVoice = this.voices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india'));
    }
    if (!bestVoice) {
      bestVoice = this.voices.find(v => v.lang.startsWith('en'));
    }
    if (!bestVoice && this.voices.length > 0) {
      bestVoice = this.voices[0];
    }

    this.selectedVoice = bestVoice;
    this.populateVoiceSelect();
  }

  populateVoiceSelect() {
    const select = document.getElementById('voice-select');
    if (!select || this.voices.length === 0) return;

    select.innerHTML = '';
    this.voices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.value = index;
      let label = `${voice.name} (${voice.lang})`;
      if (voice.lang === 'ml-IN') label = `🌴 ${label} [Malayalam]`;
      if (voice.lang === 'en-IN') label = `🇮🇳 ${label} [Indian English]`;
      option.textContent = label;

      if (this.selectedVoice && voice.name === this.selectedVoice.name) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
      const idx = parseInt(e.target.value, 10);
      if (this.voices[idx]) {
        this.selectedVoice = this.voices[idx];
      }
    });
  }

  setRate(val) {
    this.rate = parseFloat(val) || 0.95;
  }

  setPitch(val) {
    this.pitch = parseFloat(val) || 1.0;
  }

  setVolume(val) {
    this.volume = parseFloat(val) || 1.0;
  }

  setAnalysisVoice(enabled) {
    this.analysisVoiceEnabled = !!enabled;
  }

  speakCommentary(phrase) {
    if (!this.analysisVoiceEnabled || !this.synth) return;
    this.speak(phrase, false);
  }

  speak(text, isMainVerdict = true) {
    if (!this.synth) {
      console.warn('Speech synthesis unavailable.');
      return;
    }

    // Cancel any ongoing audio to prevent overlapping speech
    this.synth.cancel();

    if (!text || !text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    utterance.onstart = () => {
      if (isMainVerdict) {
        this.isSpeaking = true;
        this.onStartCallback();
      }
    };

    utterance.onend = () => {
      if (isMainVerdict) {
        this.isSpeaking = false;
        this.onEndCallback();
      }
    };

    utterance.onerror = (err) => {
      console.warn('Speech synthesis error:', err);
      if (isMainVerdict) {
        this.isSpeaking = false;
        this.onEndCallback();
      }
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.onEndCallback();
    }
  }
}

window.RizzVoiceEngine = RizzVoiceEngine;
