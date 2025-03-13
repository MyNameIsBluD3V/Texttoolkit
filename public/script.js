
document.addEventListener('DOMContentLoaded', function() {
  const textInput = document.getElementById('text-input');
  const charCount = document.getElementById('char-count');
  const wordCount = document.getElementById('word-count');
  const sentenceCount = document.getElementById('sentence-count');
  const paragraphCount = document.getElementById('paragraph-count');
  const humanizedText = document.getElementById('humanized-text');
  const themeToggle = document.getElementById('theme-toggle');
  const aiScoreElement = document.getElementById('ai-score');
  
  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update the icon
    if (document.body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Word counter functionality
  textInput.addEventListener('input', () => {
    const text = textInput.value;
    
    // Count characters (including spaces)
    charCount.textContent = text.length;
    
    // Count words
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    wordCount.textContent = words.length;
    
    // Count sentences (split by '.', '!', or '?')
    const sentences = text === '' ? [] : text.split(/[.!?]+/).filter(Boolean);
    sentenceCount.textContent = sentences.length;
    
    // Count paragraphs (split by new lines)
    const paragraphs = text === '' ? [] : text.split(/\n+/).filter(Boolean);
    paragraphCount.textContent = paragraphs.length;
    
    // Paraphrase and humanize the text
    paraphraseText(text);
    
    // Detect AI content
    detectAIContent(text);
  });
  
  // AI Content Detection
  function detectAIContent(text) {
    if (!text.trim()) {
      aiScoreElement.textContent = '0%';
      return;
    }
    
    // Simplified AI detection algorithm (for demonstration purposes)
    // Real AI detection would be more complex
    
    let score = 0;
    
    // Check for common AI patterns
    const aiIndicators = [
      /\b(however|therefore|thus|consequently)\b/gi,
      /\b(in conclusion|to summarize|in summary)\b/gi,
      /\b(as previously mentioned|as noted above)\b/gi,
      /\b(furthermore|moreover|additionally)\b/gi,
      /\b(it is \w+ that|it can be \w+ that)\b/gi,
      // Repetitive structures
      /\b(firstly|secondly|thirdly|finally)\b/gi,
      // Overly formal expressions
      /\b(optimal|utilize|implementation)\b/gi,
      // Perfect transitions
      /\b(on the other hand|in contrast|similarly)\b/gi
    ];
    
    // Check sentence length variation (AI text tends to have consistent sentence lengths)
    const sentLengths = text.split(/[.!?]+\s/).map(s => s.trim().length).filter(l => l > 0);
    let sentVariation = 0;
    
    if (sentLengths.length > 1) {
      const avg = sentLengths.reduce((a, b) => a + b, 0) / sentLengths.length;
      const variance = sentLengths.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / sentLengths.length;
      const stdDev = Math.sqrt(variance);
      
      // Low sentence variation increases AI score
      sentVariation = Math.min(stdDev / avg, 1);
      score += (1 - sentVariation) * 20;
    }
    
    // Check for AI indicators
    aiIndicators.forEach(pattern => {
      const matches = (text.match(pattern) || []).length;
      score += matches * 5;
    });
    
    // Adjust based on text length (more text = more accurate)
    const lengthFactor = Math.min(text.length / 500, 1);
    score *= lengthFactor;
    
    // Cap at 100%
    score = Math.min(Math.round(score), 100);
    
    aiScoreElement.textContent = `${score}%`;
    
    // Update display based on score
    if (score > 80) {
      aiScoreElement.classList.add('high-ai');
      aiScoreElement.classList.remove('medium-ai', 'low-ai');
    } else if (score > 40) {
      aiScoreElement.classList.add('medium-ai');
      aiScoreElement.classList.remove('high-ai', 'low-ai');
    } else {
      aiScoreElement.classList.add('low-ai');
      aiScoreElement.classList.remove('high-ai', 'medium-ai');
    }
  }
  
  // Paraphrasing functionality
  function paraphraseText(text) {
    if (!text.trim()) {
      humanizedText.textContent = 'Your paraphrased text will appear here';
      return;
    }
    
    // Basic humanizing features
    let paraphrased = text;
    
    // 1. Capitalize the first letter of each sentence
    paraphrased = paraphrased.replace(/(^\s*|[.!?]\s+)([a-z])/g, (match, p1, p2) => {
      return p1 + p2.toUpperCase();
    });
    
    // 2. Fix common typos
    const typos = {
      ' i ': ' I ',
      'dont': 'don\'t',
      'cant': 'can\'t',
      'wont': 'won\'t',
      'im ': 'I\'m ',
      'ive': 'I\'ve',
      'id ': 'I\'d ',
      'didnt': 'didn\'t',
      'hasnt': 'hasn\'t',
      'havent': 'haven\'t',
      'couldnt': 'couldn\'t',
      'shouldnt': 'shouldn\'t',
      'wouldnt': 'wouldn\'t',
      'isnt': 'isn\'t',
      'arent': 'aren\'t'
    };
    
    Object.keys(typos).forEach(typo => {
      const regex = new RegExp(`\\b${typo}\\b`, 'gi');
      paraphrased = paraphrased.replace(regex, typos[typo]);
    });
    
    // 3. Paraphrase by replacing common words with synonyms
    const synonyms = {
      'good': ['great', 'excellent', 'wonderful', 'fantastic', 'superb'],
      'bad': ['poor', 'terrible', 'awful', 'subpar', 'disappointing'],
      'big': ['large', 'massive', 'huge', 'substantial', 'enormous'],
      'small': ['tiny', 'little', 'miniature', 'compact', 'modest'],
      'happy': ['joyful', 'delighted', 'pleased', 'content', 'thrilled'],
      'sad': ['unhappy', 'sorrowful', 'dejected', 'gloomy', 'melancholic'],
      'smart': ['intelligent', 'clever', 'bright', 'brilliant', 'wise'],
      'stupid': ['foolish', 'unintelligent', 'dim', 'dense', 'dull'],
      'interesting': ['engaging', 'captivating', 'intriguing', 'fascinating', 'compelling'],
      'boring': ['dull', 'tedious', 'monotonous', 'uninteresting', 'dreary'],
      'beautiful': ['gorgeous', 'stunning', 'attractive', 'lovely', 'exquisite'],
      'ugly': ['unattractive', 'unsightly', 'hideous', 'grotesque', 'displeasing'],
      'important': ['crucial', 'vital', 'essential', 'significant', 'key'],
      'fast': ['quick', 'rapid', 'swift', 'speedy', 'brisk'],
      'slow': ['sluggish', 'unhurried', 'leisurely', 'gradual', 'plodding'],
      'easy': ['simple', 'straightforward', 'effortless', 'uncomplicated', 'painless'],
      'difficult': ['challenging', 'hard', 'complicated', 'complex', 'demanding'],
      'old': ['ancient', 'aged', 'elderly', 'vintage', 'antique'],
      'new': ['recent', 'modern', 'fresh', 'novel', 'latest'],
      'like': ['enjoy', 'appreciate', 'adore', 'fancy', 'admire'],
      'hate': ['dislike', 'detest', 'loathe', 'despise', 'abhor'],
      'say': ['mention', 'state', 'declare', 'express', 'articulate'],
      'show': ['display', 'demonstrate', 'exhibit', 'present', 'reveal'],
      'use': ['utilize', 'employ', 'apply', 'implement', 'operate'],
      'make': ['create', 'produce', 'construct', 'build', 'develop'],
      'see': ['observe', 'notice', 'spot', 'witness', 'perceive'],
      'think': ['believe', 'consider', 'reckon', 'contemplate', 'ponder'],
      'know': ['understand', 'comprehend', 'recognize', 'acknowledge', 'grasp'],
      'find': ['discover', 'locate', 'uncover', 'detect', 'identify'],
      'get': ['obtain', 'acquire', 'gain', 'receive', 'procure']
    };
    
    Object.keys(synonyms).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      paraphrased = paraphrased.replace(regex, () => {
        // Randomly select a synonym from the list
        const replacements = synonyms[word];
        return replacements[Math.floor(Math.random() * replacements.length)];
      });
    });
    
    // 4. Change sentence structure for some sentences
    // Split into sentences
    let sentences = paraphrased.split(/(?<=[.!?])\s+/);
    sentences = sentences.map((sentence, index) => {
      // Only apply to some sentences to maintain naturalness
      if (index % 3 === 0 && sentence.length > 10) {
        // Passive to active or vice versa
        if (sentence.match(/\bwas\b|\bis\b|\bare\b|\bwere\b/)) {
          // This is a very simple transformation and not a true passive-to-active conversion
          return sentence.replace(/\b(was|is|are|were)\b\s+(\w+ed\b)/, 'someone $2');
        }
        
        // Add or remove transitional phrases
        if (Math.random() > 0.5) {
          const transitions = ['Moreover, ', 'Furthermore, ', 'In addition, ', 'Besides, ', 'Actually, '];
          const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
          return randomTransition + sentence.charAt(0).toLowerCase() + sentence.slice(1);
        }
      }
      return sentence;
    });
    
    paraphrased = sentences.join(' ');
    
    // 5. Ensure single space after periods
    paraphrased = paraphrased.replace(/\.\s{2,}/g, '. ');
    
    // 6. Remove duplicate spaces
    paraphrased = paraphrased.replace(/\s{2,}/g, ' ');
    
    // Display the paraphrased text
    humanizedText.textContent = paraphrased;
  }
  
  // Check for dark mode preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDarkMode.matches && !localStorage.getItem('theme')) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});
