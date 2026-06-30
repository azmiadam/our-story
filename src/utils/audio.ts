let slideAudioCtx: AudioContext | null = null;

export const playSlideSound = () => {
  try {
    if (!slideAudioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) slideAudioCtx = new AudioContextClass();
    }
    
    if (!slideAudioCtx) return;
    
    if (slideAudioCtx.state === 'suspended') {
      slideAudioCtx.resume();
    }

    const osc = slideAudioCtx.createOscillator();
    const gainNode = slideAudioCtx.createGain();
    
    // Create a very short, soft "tick" or "pop" sound
    osc.type = 'sine';
    
    // Start at a high frequency and drop very quickly (like a soft pop/click)
    osc.frequency.setValueAtTime(600, slideAudioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, slideAudioCtx.currentTime + 0.05);
    
    // Quick fade out
    gainNode.gain.setValueAtTime(0.15, slideAudioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, slideAudioCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(slideAudioCtx.destination);
    
    osc.start(slideAudioCtx.currentTime);
    osc.stop(slideAudioCtx.currentTime + 0.05);
  } catch (e) {
    console.warn("Audio error (slide sound):", e);
  }
};
