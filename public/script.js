
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const textInput = document.getElementById('textInput');
  const countBtn = document.getElementById('countBtn');
  const humanizeBtn = document.getElementById('humanizeBtn');
  const paraphraseBtn = document.getElementById('paraphraseBtn');
  const detectAIBtn = document.getElementById('detectAIBtn');
  const summarizeBtn = document.getElementById('summarizeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const themeToggle = document.getElementById('themeToggle');
  
  const countOutput = document.getElementById('countOutput');
  const humanizeOutput = document.getElementById('humanizeOutput');
  const paraphraseOutput = document.getElementById('paraphraseOutput');
  const aiDetectOutput = document.getElementById('aiDetectOutput');
  const summarizeOutput = document.getElementById('summarizeOutput');
  
  // Theme Toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-theme')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
  
  // Word Counter Function
  countBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) {
      showResult(countOutput, 'Please enter some text.');
      return;
    }
    
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s+/g, '').length;
    const paragraphs = text.split(/\n+/).filter(para => para.trim().length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(sent => sent.trim().length > 0).length;
    
    const result = `
      <p>Word count: <strong>${wordCount}</strong></p>
      <p>Character count: <strong>${charCount}</strong></p>
      <p>Character count (without spaces): <strong>${charNoSpaces}</strong></p>
      <p>Paragraphs: <strong>${paragraphs}</strong></p>
      <p>Sentences: <strong>${sentences}</strong></p>
    `;
    
    showResult(countOutput, result);
  });
  
  // Humanize Function - makes text more natural-sounding
  humanizeBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) {
      showResult(humanizeOutput, 'Please enter some text.');
      return;
    }
    
    // Simple humanizing by adding natural pauses and variations
    let humanized = text
      .replace(/\b(however|therefore|thus|consequently)\b/gi, ', $1,')
      .replace(/\b(additionally|furthermore|moreover)\b/gi, ', $1,')
      .replace(/\b(in conclusion|to summarize|to sum up)\b/gi, '\n$1,')
      .replace(/\b(for example|for instance)\b/gi, ', $1,')
      .replace(/\b(due to)\b/gi, 'because of')
      .replace(/\b(utilize)\b/gi, 'use')
      .replace(/\b(commence)\b/gi, 'begin')
      .replace(/\b(in order to)\b/gi, 'to')
      .replace(/\b(numerous)\b/gi, 'many')
      .replace(/\b(a large number of)\b/gi, 'many')
      .replace(/\b(a majority of)\b/gi, 'most')
      .replace(/\b(in the event that)\b/gi, 'if')
      .replace(/\b(has the ability to)\b/gi, 'can')
      .replace(/\b(at this point in time)\b/gi, 'now')
      .replace(/\b(it is important to note that)\b/gi, 'note that');
      
    showResult(humanizeOutput, humanized);
  });
  
  // Paraphrase Function - rewrites text with different words
  paraphraseBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) {
      showResult(paraphraseOutput, 'Please enter some text.');
      return;
    }
    
    // Simple replacements to demonstrate paraphrasing
    const commonPhrases = {
      'in addition': 'furthermore',
      'for example': 'for instance',
      'in other words': 'that is to say',
      'in conclusion': 'to summarize',
      'as a result': 'consequently',
      'because of': 'due to',
      'however': 'nevertheless',
      'therefore': 'thus',
      'important': 'significant',
      'show': 'demonstrate',
      'big': 'substantial',
      'small': 'minimal',
      'good': 'positive',
      'bad': 'negative',
      'hard': 'difficult',
      'easy': 'straightforward',
      'beautiful': 'attractive',
      'ugly': 'unappealing',
      'happy': 'pleased',
      'sad': 'unhappy',
      'fast': 'rapid',
      'slow': 'gradual',
      'interesting': 'engaging',
      'boring': 'tedious'
    };
    
    let paraphrased = text;
    for (const [phrase, replacement] of Object.entries(commonPhrases)) {
      const regex = new RegExp('\\b' + phrase + '\\b', 'gi');
      paraphrased = paraphrased.replace(regex, replacement);
    }
    
    // Shuffle word order in some sentences for variety
    paraphrased = paraphrased.split('. ').map(sentence => {
      if (Math.random() > 0.5 && sentence.split(' ').length > 5) {
        const words = sentence.split(' ');
        const firstPart = words.slice(0, Math.floor(words.length / 2));
        const secondPart = words.slice(Math.floor(words.length / 2));
        return secondPart.join(' ') + ' ' + firstPart.join(' ');
      }
      return sentence;
    }).join('. ');
    
    showResult(paraphraseOutput, paraphrased);
  });
  
  // AI Detector Function - detects potential AI-generated content
  detectAIBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) {
      showResult(aiDetectOutput, 'Please enter some text.');
      return;
    }
    
    // Simple heuristics for AI detection
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 20) {
      showResult(aiDetectOutput, 'Text is too short for reliable AI detection.');
      return;
    }
    
    const aiIndicators = [];
    
    // Check for varied sentence length (humans tend to vary more)
    const sentences = text.split(/[.!?]+/).filter(sent => sent.trim().length > 0);
    const sentLengths = sentences.map(s => s.split(/\s+/).length);
    const avgSentLength = sentLengths.reduce((acc, len) => acc + len, 0) / sentLengths.length;
    const sentVariation = sentLengths.map(len => Math.abs(len - avgSentLength)).reduce((acc, diff) => acc + diff, 0) / sentLengths.length;
    
    if (sentVariation < 2) {
      aiIndicators.push('Low sentence length variation');
    }
    
    // Check for repetitive phrases
    const phrases = [];
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length - 3; i++) {
      phrases.push(words.slice(i, i + 3).join(' ').toLowerCase());
    }
    
    const phraseCounts = {};
    phrases.forEach(phrase => {
      phraseCounts[phrase] = (phraseCounts[phrase] || 0) + 1;
    });
    
    const repeatedPhrases = Object.entries(phraseCounts)
      .filter(([_, count]) => count > 1)
      .length;
    
    const phraseRepetitionScore = repeatedPhrases / phrases.length;
    if (phraseRepetitionScore < 0.05) {
      aiIndicators.push('Unusually low phrase repetition');
    }
    
    // Check for sophisticated vocabulary (AI tends to use more varied vocabulary)
    const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, '')));
    const lexicalDiversity = uniqueWords.size / words.length;
    
    if (lexicalDiversity > 0.7) {
      aiIndicators.push('Unusually high lexical diversity');
    }
    
    // Check for common AI phrases and patterns
    const aiPhrases = [
      'as an ai',
      'as a language model',
      'i cannot provide',
      'i don\'t have personal',
      'i don\'t have the ability to',
      'i don\'t have access to',
      'i cannot browse',
      'i cannot access'
    ];
    
    const containsAIPhrases = aiPhrases.some(phrase => 
      text.toLowerCase().includes(phrase)
    );
    
    if (containsAIPhrases) {
      aiIndicators.push('Contains phrases commonly used by AI');
    }
    
    // Calculate final score
    let aiScore = Math.min(100, 
      Math.max(0, 
        50 + 
        (sentVariation < 2 ? 15 : 0) + 
        (phraseRepetitionScore < 0.05 ? 15 : 0) + 
        (lexicalDiversity > 0.7 ? 15 : 0) + 
        (containsAIPhrases ? 25 : 0)
      )
    );
    
    // Add some randomness to make it more realistic
    aiScore = Math.min(98, Math.max(2, aiScore + (Math.random() * 20 - 10)));
    
    let verdict = '';
    if (aiScore > 80) {
      verdict = 'Very likely AI-generated';
    } else if (aiScore > 60) {
      verdict = 'Possibly AI-generated';
    } else if (aiScore > 40) {
      verdict = 'Could be AI or human';
    } else if (aiScore > 20) {
      verdict = 'Likely human-written';
    } else {
      verdict = 'Very likely human-written';
    }
    
    const result = `
      <p><strong>AI Detection Score: ${Math.round(aiScore)}%</strong></p>
      <p><strong>Verdict:</strong> ${verdict}</p>
      <p><strong>Indicators:</strong></p>
      ${aiIndicators.length > 0 
        ? `<ul>${aiIndicators.map(ind => `<li>${ind}</li>`).join('')}</ul>` 
        : '<p>No clear AI indicators found.</p>'}
      <p><small>Note: This is a simplified detection method and not 100% accurate.</small></p>
    `;
    
    showResult(aiDetectOutput, result);
  });
  
  // Summarize Function - creates a summary of the text
  summarizeBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) {
      showResult(summarizeOutput, 'Please enter some text.');
      return;
    }
    
    if (text.split(/\s+/).length < 30) {
      showResult(summarizeOutput, 'Text is too short to summarize effectively.');
      return;
    }
    
    // Simple extractive summarization based on sentence scoring
    const sentences = text.split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
      
    // Convert text to lowercase for processing
    const processedText = text.toLowerCase();
    
    // Count word frequency
    const wordFreq = {};
    const words = processedText.match(/\b[a-z]{3,}\b/g) || [];
    
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Remove common stop words from frequency count
    const stopWords = ['the', 'and', 'that', 'this', 'with', 'for', 'was', 'were', 'are', 'have', 'has'];
    stopWords.forEach(word => {
      delete wordFreq[word];
    });
    
    // Score sentences based on word frequency
    const sentenceScores = sentences.map(sentence => {
      const sentenceWords = sentence.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
      let score = 0;
      
      sentenceWords.forEach(word => {
        if (wordFreq[word]) {
          score += wordFreq[word];
        }
      });
      
      // Normalize by sentence length to avoid bias toward longer sentences
      return {
        sentence,
        score: sentenceWords.length > 0 ? score / sentenceWords.length : 0
      };
    });
    
    // Sort sentences by their original order
    const orderedSentences = [...sentenceScores];
    
    // Determine how many sentences to include in summary (about 30% of original)
    const summaryLength = Math.max(1, Math.ceil(sentences.length * 0.3));
    
    // Sort by score and take the top sentences
    const topSentences = [...sentenceScores]
      .sort((a, b) => b.score - a.score)
      .slice(0, summaryLength);
    
    // Re-order the top sentences to match original document order
    const sortedTopSentences = orderedSentences
      .filter(sent => topSentences.some(topSent => topSent.sentence === sent.sentence));
    
    // Join the sentences to create the summary
    const summary = sortedTopSentences
      .map(sent => sent.sentence)
      .join('. ') + '.';
    
    showResult(summarizeOutput, summary);
  });
  
  // Clear all inputs and outputs
  clearBtn.addEventListener('click', () => {
    textInput.value = '';
    countOutput.innerHTML = '';
    humanizeOutput.innerHTML = '';
    paraphraseOutput.innerHTML = '';
    aiDetectOutput.innerHTML = '';
    summarizeOutput.innerHTML = '';
  });
  
  // Helper function to show results with animation
  function showResult(element, content) {
    element.innerHTML = content;
    element.classList.remove('animate-result');
    void element.offsetWidth; // Force reflow
    element.classList.add('animate-result');
  }
});
