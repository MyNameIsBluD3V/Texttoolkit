
document.addEventListener('DOMContentLoaded', function() {
  const textInput = document.getElementById('text-input');
  const charCount = document.getElementById('char-count');
  const wordCount = document.getElementById('word-count');
  const sentenceCount = document.getElementById('sentence-count');
  const paragraphCount = document.getElementById('paragraph-count');
  const humanizedText = document.getElementById('humanized-text');
  const themeToggle = document.getElementById('theme-toggle');
  
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
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
  
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
    
    // Humanize the text
    humanizeText(text);
  });
  
  // Humanizer functionality
  function humanizeText(text) {
    if (!text.trim()) {
      humanizedText.textContent = 'Your humanized text will appear here';
      return;
    }
    
    // Basic humanizing features
    let humanized = text;
    
    // 1. Capitalize the first letter of each sentence
    humanized = humanized.replace(/(^\s*|[.!?]\s+)([a-z])/g, (match, p1, p2) => {
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
      humanized = humanized.replace(regex, typos[typo]);
    });
    
    // 3. Ensure single space after periods
    humanized = humanized.replace(/\.\s{2,}/g, '. ');
    
    // 4. Remove duplicate spaces
    humanized = humanized.replace(/\s{2,}/g, ' ');
    
    // Display the humanized text
    humanizedText.textContent = humanized;
  }
  
  // Check for dark mode preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDarkMode.matches && !localStorage.getItem('theme')) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});
