/**
 * RIZZ RATER - Chat Analysis Engine
 * Evaluates conversations with Kerala Gen-Z heuristic NLP,
 * ALL SCORES ARE STRICTLY 0.0 TO 10.0.
 */

class RizzAnalyzer {
  constructor() {
    // Slang and keyword dictionaries
    this.manglishFlirtKeywords = [
      'sundari', 'sundaran', 'cute', 'sweet', 'hot', 'crush', 'vibe', 'love', 'umma',
      'kiss', 'date', 'meet', 'together', 'aura', 'handsome', 'gorgeous', 'pretty',
      'eyes', 'smile', 'look', 'chakkare', 'muth', 'heart', 'baby', 'darling',
      'special', 'thinking of you', 'miss you', 'scene set', 'glow'
    ];

    this.manglishBanterKeywords = [
      'haha', 'hehe', 'lmao', 'lol', 'rofl', 'scene', 'kali', 'alamb', 'comedy',
      'challenge', 'bet', 'treat', 'deal', 'kallan', 'kalli', 'potten', 'manda',
      'mandan', 'over', 'thallu', 'acting', 'dialogue', 'cinema', 'mass'
    ];

    this.interestSignalsKeywords = [
      'deal', 'free', 'weekend', 'sunday', 'saturday', 'tomorrow', 'sure', 'yes',
      'cool', 'ready', 'okay', 'njanum', 'varam', 'treat', 'ice cream', 'movie',
      'coffee', 'meet', 'call', 'talk', 'tell me', 'enthoke', 'vishesham', 'send'
    ];

    this.deluluKeywords = [
      'overthink', 'feelings', 'proposal', 'forever', 'soulmate', 'marry', 'kalyanam',
      'why no reply', 'busy aano', 'ignore', 'seen', 'blue tick', 'spam', 'don\'t leave',
      'cry', 'crying', 'block', 'sad', 'heartbroken', 'day 1'
    ];

    this.redFlagKeywords = [
      'brother', 'bro', 'friendzone', 'elder brother', 'busy', 'don\'t spam', 'bye',
      'leave me', 'stop', 'k', 'hmm', 'okda', 'boyfriend', 'crush und', 'committed',
      'father', 'brother vibe', 'chetta', 'brother aanu'
    ];

    this.flirtEmojis = ['❤️', '🔥', '😏', '🙈', '😍', '✨', '🥰', '😘', '😉', '💖', '👀'];
    this.banterEmojis = ['😂', '🤣', '💀', '😜', '😝', '😌', '😎'];
    this.deluluEmojis = ['🥺', '🤡', '💔', '😭', '🥲', '🙏'];
    this.redFlagEmojis = ['🥱', '🙄', '😐', '🛑', '❌'];
  }

  analyze(messages, rawText = '') {
    // If no parsed messages, synthesize from raw text
    if (!messages || messages.length === 0) {
      if (rawText && rawText.trim().length > 0) {
        messages = [
          { sender: 'me', text: rawText, time: '10:00 PM' },
          { sender: 'them', text: 'Hmm ok', time: '10:05 PM' }
        ];
      } else {
        // Fallback default mock
        messages = [
          { sender: 'me', text: 'Hey, nice chat screenshot', time: '10:00 PM' }
        ];
      }
    }

    const fullText = (rawText + ' ' + messages.map(m => m.text).join(' ')).toLowerCase();
    const myMessages = messages.filter(m => m.sender === 'me');
    const theirMessages = messages.filter(m => m.sender === 'them');

    // 1. Calculate Sub-Scores (0.0 to 10.0)
    const flirting = this.calcFlirtingScore(fullText, myMessages);
    const banter = this.calcBanterScore(fullText, messages);
    const theirInterest = this.calcInterestScore(fullText, theirMessages);
    const confidence = this.calcConfidenceScore(fullText, myMessages);
    const delulu = this.calcDeluluScore(fullText, myMessages);
    const redFlags = this.calcRedFlagScore(fullText, theirMessages);

    // 2. Calculate Main Rizz Score (Weighted aggregate clamped strictly 0.0 - 10.0)
    // Positive drivers: flirting, banter, confidence, theirInterest
    // Negative penalties: delulu, redFlags
    let rawScore = (
      flirting * 0.24 +
      banter * 0.22 +
      confidence * 0.22 +
      theirInterest * 0.24 -
      (delulu * 0.08) -
      (redFlags * 0.12)
    );

    // Baseline boost if positive conversation
    if (theirInterest > 6.0 && redFlags < 4.0) {
      rawScore += 0.8;
    }

    // Clamp strictly between 0.0 and 10.0
    const finalScore = Math.max(0.1, Math.min(10.0, Math.round(rawScore * 10) / 10));

    // 3. Determine Personality Category & Reactions
    const personality = this.getScorePersonality(finalScore);

    // 4. Determine Rizz DNA Archetype
    const dna = this.determineRizzDNA(flirting, banter, confidence, delulu, redFlags);

    // 5. Determine Chat Diagnosis
    const diagnosis = this.determineDiagnosis(finalScore, delulu, redFlags, theirInterest);

    // 6. Identify Biggest W and Biggest Fumble
    const biggestW = this.findBiggestW(messages, flirting, confidence);
    const biggestFumble = this.findBiggestFumble(messages, delulu, redFlags);

    // 7. Generate Rizz Arc Stages
    const arc = this.generateRizzArc(messages, finalScore);

    // 8. Kerala Verdict & Cinematic Line
    const keralaVerdict = this.getKeralaVerdict(finalScore);
    const cinematicLine = this.getCinematicLine(finalScore);

    // 9. Generate Spoken Script for Web Speech
    const voiceScript = this.generateVoiceScript(finalScore, personality, flirting, banter, delulu, confidence);

    return {
      score: finalScore,
      personality,
      stats: {
        flirting: { score: flirting, explanation: this.getStatExplanation('flirting', flirting) },
        banter: { score: banter, explanation: this.getStatExplanation('banter', banter) },
        theirInterest: { score: theirInterest, explanation: this.getStatExplanation('interest', theirInterest) },
        confidence: { score: confidence, explanation: this.getStatExplanation('confidence', confidence) },
        delulu: { score: delulu, explanation: this.getStatExplanation('delulu', delulu) },
        redFlags: { score: redFlags, explanation: this.getStatExplanation('redFlags', redFlags) }
      },
      dna,
      diagnosis,
      biggestW,
      biggestFumble,
      arc,
      keralaVerdict,
      cinematicLine,
      voiceScript,
      messages
    };
  }

  calcFlirtingScore(text, myMessages) {
    let score = 4.0;
    this.manglishFlirtKeywords.forEach(word => {
      if (text.includes(word)) score += 0.9;
    });
    this.flirtEmojis.forEach(emoji => {
      if (text.includes(emoji)) score += 0.7;
    });
    // Compliments check
    if (/cute|pretty|sundari|sunset|dress|vibe|glow/.test(text)) score += 1.2;
    return Math.min(10.0, Math.max(0.5, Math.round(score * 10) / 10));
  }

  calcBanterScore(text, messages) {
    let score = 4.5;
    this.manglishBanterKeywords.forEach(word => {
      if (text.includes(word)) score += 0.8;
    });
    this.banterEmojis.forEach(emoji => {
      if (text.includes(emoji)) score += 0.6;
    });
    if (messages.length >= 5) score += 1.0;
    return Math.min(10.0, Math.max(0.5, Math.round(score * 10) / 10));
  }

  calcInterestScore(text, theirMessages) {
    let score = 4.0;
    const theirText = theirMessages.map(m => m.text.toLowerCase()).join(' ');

    this.interestSignalsKeywords.forEach(word => {
      if (theirText.includes(word)) score += 1.1;
    });

    if (theirText.includes('😍') || theirText.includes('🥰') || theirText.includes('✨') || theirText.includes('🙈')) {
      score += 1.6;
    }

    // Checking if they respond with single dry characters
    if (/^(k|ok|hmm|fine)$/i.test(theirText.trim())) {
      score -= 2.5;
    }

    if (theirMessages.length >= 3) score += 1.2;
    return Math.min(10.0, Math.max(0.5, Math.round(score * 10) / 10));
  }

  calcConfidenceScore(text, myMessages) {
    let score = 4.8;
    const myText = myMessages.map(m => m.text.toLowerCase()).join(' ');

    if (/pick cheyyaam|deal|date|sunday|let's meet|direct parayan|ice cream|challenge/.test(myText)) {
      score += 2.8;
    }

    // Double texting penalty
    if (/please reply|busy aano|urreengiyo|sorry sorry|thettu paranjoda/.test(myText)) {
      score -= 2.2;
    }

    return Math.min(10.0, Math.max(0.5, Math.round(score * 10) / 10));
  }

  calcDeluluScore(text, myMessages) {
    let score = 1.5;
    const myText = myMessages.map(m => m.text.toLowerCase()).join(' ');

    this.deluluKeywords.forEach(word => {
      if (myText.includes(word)) score += 1.5;
    });
    this.deluluEmojis.forEach(emoji => {
      if (myText.includes(emoji)) score += 1.2;
    });

    if (/feelings|day 1|overthink|marry/.test(myText)) {
      score += 2.5;
    }

    return Math.min(10.0, Math.max(0.2, Math.round(score * 10) / 10));
  }

  calcRedFlagScore(text, theirMessages) {
    let score = 1.2;
    const theirText = theirMessages.map(m => m.text.toLowerCase()).join(' ');

    this.redFlagKeywords.forEach(word => {
      if (theirText.includes(word)) score += 1.8;
    });

    if (theirText.includes('brother') || theirText.includes('chettan')) {
      score += 3.5;
    }

    if (theirText.includes('don\'t spam') || theirText.includes('boyfriend')) {
      score += 3.8;
    }

    return Math.min(10.0, Math.max(0.1, Math.round(score * 10) / 10));
  }

  getScorePersonality(score) {
    if (score >= 9.0) {
      return {
        title: '👑 RIZZ GOD',
        badge: 'RIZZ GOD',
        malayalamReaction: 'MWONEEE... ithu normal game alla 🔥',
        voiceLine: `MWONEEE! Ninakku ${score} out of 10! Rizz God territory aanu ithu!`
      };
    } else if (score >= 8.0) {
      return {
        title: '🔥 SCENE AANU MONE',
        badge: 'SCENE AANU MONE',
        malayalamReaction: 'Scene aanu bro... nee nannayi kalikkunnund.',
        voiceLine: `Scene aanu bro! ${score} out of 10. Nee nannayi kalikkunnund.`
      };
    } else if (score >= 7.0) {
      return {
        title: '😎 SMOOTH OPERATOR',
        badge: 'SMOOTH OPERATOR',
        malayalamReaction: 'Game undu mone... nice balance.',
        voiceLine: `Not bad mone. ${score} out of 10. Game undu.`
      };
    } else if (score >= 6.0) {
      return {
        title: '👀 DECENT GAME',
        badge: 'DECENT GAME',
        malayalamReaction: 'Mosham alla bro... kurachu polish koodi venam.',
        voiceLine: `${score} out of 10. Mosham alla bro. Kurachu polish koodi venam.`
      };
    } else if (score >= 5.0) {
      return {
        title: '💀 AVERAGE BRO',
        badge: 'AVERAGE BRO',
        malayalamReaction: 'Rizz undennu parayam... pakshe evidence kuravaanu.',
        voiceLine: `${score} out of 10. Rizz undennu parayam... pakshe evidence kuravaanu.`
      };
    } else if (score >= 4.0) {
      return {
        title: '😭 TRYING TOO HARD',
        badge: 'TRYING TOO HARD',
        malayalamReaction: 'Da mwone... onnu slow aakku.',
        voiceLine: `${score} out of 10. Da mwone, onnu slow aakku.`
      };
    } else {
      return {
        title: '💀 ITHU RIZZ ALLA MONE',
        badge: 'ITHU RIZZ ALLA MONE',
        malayalamReaction: 'Ithu Rizz alla bro... ithoru rescue mission aanu.',
        voiceLine: `${score} out of 10. Ithu Rizz alla bro... ithoru rescue mission aanu.`
      };
    }
  }

  getStatExplanation(type, score) {
    switch (type) {
      case 'flirting':
        return score >= 8.0
          ? 'Smooth aanu... Kochi marine drive level charm detected 🔥'
          : score >= 5.0
          ? 'Decent signals, but sometimes Google Translate vibe und.'
          : 'Dry dialogue delivery. Romantic vocabulary missing.';
      case 'banter':
        return score >= 8.0
          ? 'Comedy department approved 😂 Peak back-and-forth energy!'
          : score >= 5.0
          ? 'Safe jokes. Not tragic, but not trending either.'
          : 'Strict official communication vibe. Siri speaks with more emotion.';
      case 'interest':
        return score >= 8.0
          ? 'Suspiciously positive signals detected 👀 Quick replies & warmth.'
          : score >= 5.0
          ? 'Mild engagement observed. Neither sold nor blocked.'
          : 'One-word energy detected. Emotionally running on 2% battery.';
      case 'confidence':
        return score >= 8.0
          ? 'Bro knows what he is doing. Direct & unbothered.'
          : score >= 5.0
          ? 'Calculated approach. Playing it safe in the middle.'
          : 'Trembling text detected. Apologizing before even texting.';
      case 'delulu':
        return score >= 7.0
          ? 'Reality completely left the chat 🤡 Marriage playlist already prepared.'
          : score >= 4.0
          ? 'Mild hallucinations. Over-analyzing commas and blue ticks.'
          : 'Grounded in reality. Mental health intact.';
      case 'redFlags':
        return score >= 6.5
          ? 'Emergency sirens blasting 🚨 Friendzone / "elder brother" trap detected.'
          : score >= 3.5
          ? 'Minor roadblocks ahead. Proceed with caution.'
          : 'Warning lights mostly sleeping. Smooth sailing ahead.';
      default:
        return 'Standard metric analysis.';
    }
  }

  determineRizzDNA(flirting, banter, confidence, delulu, redFlags) {
    if (delulu > 6.5) {
      return {
        name: 'THE DELULU KING',
        badge: '👑 CERTIFIED DELULU',
        desc: 'Bro has already planned 3 kids and a house in Kakkanad based on a single "Haha" reply. Reality is merely an optional DLC for you.'
      };
    }
    if (redFlags > 6.0) {
      return {
        name: 'THE FRIEND-ZONE WARRIOR',
        badge: '🛡️ VALIANT BRO-ZONE HERO',
        desc: 'She called you "like an elder brother" and you thanked her for the opportunity. You will carry everyone\'s luggage to their wedding with a smile.'
      };
    }
    if (confidence < 4.0 && delulu > 4.5) {
      return {
        name: 'THE PROFESSIONAL FUMBLER',
        badge: '💀 ALL-TIME FUMBLE MASTER',
        desc: 'Given an open goal, you managed to kick the ball out of the stadium and apologize to the grass. Spectacular self-sabotage.'
      };
    }
    if (flirting > 8.0 && confidence > 7.5) {
      return {
        name: 'THE SMOOTH TALKER',
        badge: '🔥 KOCHI CASANOVA',
        desc: 'Effortlessly switching between subtle teasing and cinematic confidence. Even the keyboard felt the rizz flowing through the screen.'
      };
    }
    if (banter > 7.5 && flirting > 6.0) {
      return {
        name: 'THE CHAOTIC FLIRTER',
        badge: '⚡ CHAOS ENGINE',
        desc: 'Roasting them, flirting with them, confusing them, and making them laugh all in one breath. Dangerous unpredictability.'
      };
    }
    if (confidence > 7.0 && banter < 6.0) {
      return {
        name: 'THE ONE-LINER MERCHANT',
        badge: '🎯 DIRECT HIT SPECIALIST',
        desc: 'No unnecessary small talk. You drop one punchline, set the time and date, and close the application. Pure efficiency.'
      };
    }
    return {
      name: 'THE LOWKEY RIZZLER',
      badge: '👀 SUBTLE VIBES',
      desc: 'Quietly executing sensible moves without drawing too much attention. Undercover game that works surprisingly well.'
    };
  }

  determineDiagnosis(score, delulu, redFlags, interest) {
    if (delulu > 7.0) {
      return {
        title: '🤡 DELULU EMERGENCY',
        explanation: 'Patient is exhibiting acute fantasy projection. Immediate cold water splash recommended.'
      };
    }
    if (redFlags > 6.5) {
      return {
        title: '🚨 EMOTIONAL DAMAGE INCOMING',
        explanation: 'Severe friend-zone radiation detected. Evacuate immediately before you get asked for homework notes.'
      };
    }
    if (score < 4.0) {
      return {
        title: '💀 PROFESSIONAL FUMBLER',
        explanation: 'The conversation was alive until clinical overthinking terminated all vital signs.'
      };
    }
    if (score >= 8.5 && interest >= 8.0) {
      return {
        title: '❤️ MUTUAL VIBES',
        explanation: 'Unusually high resonance detected. Both parties are actively matching game.'
      };
    }
    if (score >= 7.5) {
      return {
        title: '🔥 FLIRTING DETECTED',
        explanation: 'Clear conversational tension and playful signals exchanging successfully.'
      };
    }
    if (score >= 6.5) {
      return {
        title: '👀 SITUATIONSHIP LOADING...',
        explanation: 'Ambiguous chemistry progressing along a standard Kerala Gen-Z timeline.'
      };
    }
    return {
      title: '😂 CHAOTIC ENERGY',
      explanation: 'Unpredictable exchange. Neither winning nor losing, just vibes and jokes.'
    };
  }

  findBiggestW(messages, flirting, confidence) {
    const myMessages = messages.filter(m => m.sender === 'me');
    if (myMessages.length === 0) {
      return {
        text: 'You initiated the conversation with confidence.',
        reaction: 'Ee part aanu scene aakkiyathu bro 🔥'
      };
    }

    // Find the best line with flirt / plan cues
    let best = myMessages[0].text;
    for (const msg of myMessages) {
      if (/sunset|pick cheyyaam|deal|date|ice cream|cute|sundari|main character|direct/.test(msg.text.toLowerCase())) {
        best = msg.text;
        break;
      }
    }

    return {
      text: `"${best}"`,
      reaction: 'Ee part aanu scene aakkiyathu bro 🔥'
    };
  }

  findBiggestFumble(messages, delulu, redFlags) {
    // Check if there was an awkward apology, double text, or dry response
    const myMessages = messages.filter(m => m.sender === 'me');
    const awkward = myMessages.find(m => /sorry|feelings|busy aano|urreengiyo|thettu|best friend/.test(m.text.toLowerCase()));
    
    if (awkward) {
      return {
        text: `"${awkward.text}"`,
        reaction: 'Ivide aanu nee scene kalanjathu 😂'
      };
    }

    // Check if other person dropped a dry reply or brother tag
    const them = messages.find(m => m.sender === 'them' && /brother|k|don\'t spam|bye|busy/.test(m.text.toLowerCase()));
    if (them) {
      return {
        text: `"${them.text}" (Direct Hit)`,
        reaction: 'Bro had the opportunity and took critical damage 💀'
      };
    }

    return {
      text: '"Overthinking the follow-up response timing"',
      reaction: 'Ivide aanu nee scene kalanjathu 😂'
    };
  }

  generateRizzArc(messages, score) {
    if (score >= 8.0) {
      return [
        { node: '😐', title: 'Start', desc: 'Chat opened' },
        { node: '👀', title: 'Hook', desc: 'Compliment landed' },
        { node: '🔥', title: 'Peak Rizz', desc: 'Banter flowing' },
        { node: '👑', title: 'Victory', desc: 'Scene set & locked' }
      ];
    } else if (score >= 6.0) {
      return [
        { node: '😐', title: 'Start', desc: 'Casual greeting' },
        { node: '😂', title: 'Banter', desc: 'Jokes exchanged' },
        { node: '👀', title: 'Signals', desc: 'Interest detected' },
        { node: '😎', title: 'Ending', desc: 'Decent standing' }
      ];
    } else {
      return [
        { node: '😐', title: 'Start', desc: 'Hopeful opening' },
        { node: '😂', title: 'Fumble', desc: 'Awkward transition' },
        { node: '😬', title: 'Panic', desc: 'Double texting' },
        { node: '💀', title: 'Flatline', desc: 'Sent to friendzone' }
      ];
    }
  }

  getKeralaVerdict(score) {
    if (score >= 8.5) {
      const highReactions = [
        'Da mwone... ithu kollam ketto 🔥',
        'Scene aanu bro. Continue.',
        'Nee nannayi kalikkunnund 😎',
        'Ivide nee alla samsarikkunnath... ninte AURA aanu.'
      ];
      return highReactions[Math.floor(Math.random() * highReactions.length)];
    } else if (score >= 6.0) {
      const medReactions = [
        'Mosham alla mone 👀',
        'Ivide entho undu...',
        'Game undu bro, kurachu polish koodi venam.'
      ];
      return medReactions[Math.floor(Math.random() * medReactions.length)];
    } else {
      const lowReactions = [
        'Ayyo... ivide oru fumble nadannu 💀',
        'Da mwone, onnu slow aakku 😂',
        'Ithu kandittu algorithm thanne "eda venda" enn paranju.'
      ];
      return lowReactions[Math.floor(Math.random() * lowReactions.length)];
    }
  }

  getCinematicLine(score) {
    const lines = [
      'Da... ini kali maarum.',
      'Scene ivide thudangunnu.',
      'Game over alla... interval mathram.',
      'Ini oru fumble koodi vannal pani paalum.',
      'Ee case serious aanu mone.',
      'Evidence vere aanu bro.'
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }

  generateVoiceScript(score, personality, flirting, banter, delulu, confidence) {
    const intros = [
      'Da mwone...',
      'Eda bro...',
      'Okay... listen carefully.',
      'Bro, njan chat full kandittu...',
      'Da, situation serious aanu.',
      'Okay mone, verdict ready aanu.',
      'Rizz department report vannittundu.',
      'Bro... evidence analyse cheythu kazhinju.'
    ];
    const intro = intros[Math.floor(Math.random() * intros.length)];

    let commentary = '';
    if (score >= 8.0) {
      commentary = `Ninte total Rizz score ${score} out of 10 aanu.\nScene aanu bro!\nFlirting game nannayittundu.\nBanter um kollam.\nOverall verdict... keep cooking bro!`;
    } else if (score >= 6.0) {
      commentary = `Ninte total score ${score} out of 10 aanu.\nMosham alla mone.\nGame undu, pakshe kurachu polish koodi venam.\nOver aakkalle!`;
    } else {
      commentary = `Ninte total score ${score} out of 10 aanu.\nIthu Rizz alla mone, ithoru rescue mission aanu!\nDelulu level high aanu.\nDa mwone, onnu slow aakku!`;
    }

    return `${intro}\n${commentary}`;
  }
}

window.RizzAnalyzer = RizzAnalyzer;
