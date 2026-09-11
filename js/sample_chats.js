/**
 * Pre-baked sample chats with SVG mock screenshot generation
 * Allows instantaneous 1-click testing with realistic Kerala chat screenshots.
 */

function createMockChatSVG(contactName, messages, headerColor = "#075e54", appType = "WhatsApp") {
  const width = 420;
  const height = 580;
  
  let bubblesSvg = '';
  let y = 100;
  
  messages.forEach(msg => {
    const isMe = msg.sender === 'me';
    const bubbleBg = isMe ? '#005c4b' : '#202c33';
    const textColor = '#e9edef';
    const timeColor = '#8696a0';
    
    // Approximate bubble sizing
    const lines = msg.text.match(/.{1,32}(\s|$)/g) || [msg.text];
    const bubbleHeight = Math.max(38, lines.length * 18 + 18);
    const bubbleWidth = Math.min(300, Math.max(140, ...lines.map(l => l.length * 8.5)) + 30);
    const x = isMe ? (width - bubbleWidth - 18) : 18;
    
    let textLinesSvg = '';
    lines.forEach((line, idx) => {
      textLinesSvg += `<text x="${x + 12}" y="${y + 20 + (idx * 18)}" fill="${textColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13.5">${escapeXml(line.trim())}</text>`;
    });

    bubblesSvg += `
      <g>
        <rect x="${x}" y="${y}" width="${bubbleWidth}" height="${bubbleHeight}" rx="12" fill="${bubbleBg}" />
        ${textLinesSvg}
        <text x="${x + bubbleWidth - 10}" y="${y + bubbleHeight - 6}" fill="${timeColor}" font-family="sans-serif" font-size="9.5" text-anchor="end">${msg.time}</text>
      </g>
    `;
    y += bubbleHeight + 14;
  });

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#0b141a" />
      
      <!-- Status bar -->
      <rect width="${width}" height="32" fill="#0b141a" />
      <text x="24" y="21" fill="#8696a0" font-family="sans-serif" font-size="11" font-weight="bold">10:42</text>
      <text x="${width - 24}" y="21" fill="#8696a0" font-family="sans-serif" font-size="10" text-anchor="end">📶 5G 🔋 88%</text>

      <!-- App Header -->
      <rect y="32" width="${width}" height="54" fill="${headerColor}" />
      <circle cx="38" cy="59" r="16" fill="#1f2c34" />
      <text x="38" y="64" fill="#ffffff" font-family="sans-serif" font-size="14" text-anchor="middle">👤</text>
      <text x="66" y="55" fill="#ffffff" font-family="sans-serif" font-size="15" font-weight="bold">${escapeXml(contactName)}</text>
      <text x="66" y="72" fill="#25d366" font-family="sans-serif" font-size="10">online</text>
      <text x="${width - 24}" y="63" fill="#ffffff" font-family="sans-serif" font-size="16" text-anchor="end">📹 📞 ⋮</text>

      <!-- Chat Canvas Background Subtle Pattern -->
      <g opacity="0.04">
        <pattern id="chatPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="#ffffff" />
          <circle cx="30" cy="30" r="2" fill="#ffffff" />
        </pattern>
        <rect y="86" width="${width}" height="${height - 86}" fill="url(#chatPattern)" />
      </g>

      <!-- Chat Bubbles -->
      ${bubblesSvg}
    </svg>
  `;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const SAMPLE_CHATS = [
  {
    id: 'kochi_smooth',
    label: '🔥 Kochi Smooth Operator',
    badge: 'High Rizz (8.7/10)',
    contact: 'Malavika ✨',
    messages: [
      { sender: 'me', text: 'Ninte insta story kandu... Kochi marine drive vibe set aayittundallo 😏', time: '10:14 PM' },
      { sender: 'them', text: 'Haha thank you! Weather super aayirunnu today 😍', time: '10:15 PM' },
      { sender: 'me', text: 'Weather mathram alla super... sunset il oru main character aura kaanunnund 🔥', time: '10:17 PM' },
      { sender: 'them', text: 'Ayyoo compliment aanennu thonnunnu! Aarelum ithrem smooth aayi parayumo 😂🙈', time: '10:19 PM' },
      { sender: 'me', text: 'Njan direct parayan aanu ishtam... next weekend sunset kanditt oru ice cream adikkan scene undo?', time: '10:21 PM' },
      { sender: 'them', text: 'Scene aano? Deal! But ice cream ninte vaka aayirikanam 🍦 Deal? ✨', time: '10:24 PM' },
      { sender: 'me', text: 'Double deal mwone. Sunday 5:30 pick cheyyaam 😎', time: '10:25 PM' }
    ]
  },
  {
    id: 'delulu_fumble',
    label: '💀 Chaotic Delulu Fumble',
    badge: 'Low Rizz (3.2/10)',
    contact: 'Anjali 🌸',
    messages: [
      { sender: 'me', text: 'Hii', time: '11:00 PM' },
      { sender: 'me', text: 'Urreengiyo?', time: '11:22 PM' },
      { sender: 'me', text: 'Busy aano? Njan morning send cheytha reel kandillalo 🥺 Reply tharumo?', time: '11:58 PM' },
      { sender: 'them', text: 'k', time: '01:14 AM' },
      { sender: 'me', text: 'Entha k mathram? Njan enthelum thettu paranjoda? Ninte dp kandappol thotte njan overthink cheyyuvaanu 😭', time: '01:16 AM' },
      { sender: 'them', text: 'Bro I was sleeping. Pls don\'t spam.', time: '01:25 AM' },
      { sender: 'me', text: 'Sorry sorry! Njan ninte best friend aavan mathram plan cheythilla... actually I had feelings since day 1 🤡💔', time: '01:26 AM' }
    ]
  },
  {
    id: 'college_banter',
    label: '😎 College Banter Rizz',
    badge: 'Decent Game (7.5/10)',
    contact: 'Rahul / Riya',
    messages: [
      { sender: 'me', text: 'Today class il vannappol njan kandu... front benchil irunnu full sleep mode 😂', time: '04:15 PM' },
      { sender: 'them', text: 'Eda shh! HOD notice cheytha njan theernnu 💀 nee mathram aano shradhikkunne?', time: '04:18 PM' },
      { sender: 'me', text: 'Pinne ninte thalayil flower clip vechitt ullappol nokkathe irikkan patto? Cute aayirunnu ketto 👀', time: '04:21 PM' },
      { sender: 'them', text: 'Ente ponno... flattering skills level up aayo? 🙈 Exam notes thannal njan oru treat tharam!', time: '04:25 PM' },
      { sender: 'me', text: 'Notes free, pakshe treat ninte koode date aayi maariyaal mathi! Entha opinion? 😏', time: '04:28 PM' },
      { sender: 'them', text: 'Haha okay mastermind, challenge accepted 😌🔥', time: '04:30 PM' }
    ]
  },
  {
    id: 'friendzone_crisis',
    label: '👀 Friendzone Warrior',
    badge: 'Average Bro (5.4/10)',
    contact: 'Sneha',
    messages: [
      { sender: 'me', text: 'Hey Sneha! Project documentation full ready aakki kando?', time: '06:10 PM' },
      { sender: 'them', text: 'Aww thank you da bro! You are literally like an elder brother to me! 🥰❤️', time: '06:12 PM' },
      { sender: 'me', text: 'Brother aano... haha okay... anyway njan evening oru movie ticket eduthitund... free aano?', time: '06:15 PM' },
      { sender: 'them', text: 'Sure da, njan ente boyfriend nodum parayam, avanum join cheyyum! Super aayirikkum! 🥳', time: '06:18 PM' },
      { sender: 'me', text: 'Aaha... boyfriend um varumo... adipoli... scene illa mone 🥲', time: '06:20 PM' }
    ]
  }
];

// Attach generated images to each preset
SAMPLE_CHATS.forEach(sample => {
  sample.image = createMockChatSVG(sample.contact, sample.messages);
  sample.rawText = sample.messages.map(m => `${m.time} - ${m.sender === 'me' ? 'You' : sample.contact}: ${m.text}`).join('\n');
});

window.SAMPLE_CHATS = SAMPLE_CHATS;
