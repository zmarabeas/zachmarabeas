// Binary text animation utility functions

/**
 * Generates a random binary string of specified length
 */
export function generateBinaryString(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 2)).join('');
}

/**
 * Generates a random character from a set of characters
 */
export function generateRandomChar(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

/**
 * Class to handle the binary text animation
 */
export class BinaryTextAnimator {
  private element: HTMLElement;
  private finalText: string;
  private mainIntervalId: number | null = null;
  private characterIntervals: { [key: number]: number } = {};
  private frameDelay: number = 30;
  private cyclesPerChar: number = 10; // Number of character cycles before settling
  private binaryElements: HTMLSpanElement[] = [];
  private initialBinaryChars: string[] = [];
  private characterState: ('binary' | 'animating' | 'revealed')[] = [];
  private characterCycles: { [key: number]: number } = {};
  private onCompleteCallback: (() => void) | null = null;
  private initialDelay: number = 800; // Delay before starting the animation
  private staggerDelay: number = 100; // Delay between starting each character (0.1s)
  private activeAnimations: number = 0;
  private charLimit: number = 5; // Maximum characters animating simultaneously

  constructor(element: HTMLElement, finalText: string) {
    this.element = element;
    this.finalText = finalText;
    this.setup();
  }

  /**
   * Initialize the animation elements
   */
  private setup(): void {
    // Clear any existing content
    this.element.innerHTML = '';
    this.binaryElements = [];
    this.initialBinaryChars = [];
    this.characterState = [];
    this.characterCycles = {};
    this.characterIntervals = {};
    this.activeAnimations = 0;
    
    // Create binary placeholders for each character
    for (let i = 0; i < this.finalText.length; i++) {
      const span = document.createElement('span');
      span.className = 'binary-char';
      
      if (this.finalText[i] === ' ') {
        // Spaces are just spaces
        span.textContent = ' ';
        this.initialBinaryChars.push(' ');
        this.characterState.push('revealed');
      } else {
        // Use either 0 or 1 for the initial binary display
        const binaryChar = Math.random() > 0.5 ? '1' : '0';
        span.textContent = binaryChar;
        this.initialBinaryChars.push(binaryChar);
        this.characterState.push('binary');
        this.characterCycles[i] = 0;
      }
      
      this.element.appendChild(span);
      this.binaryElements.push(span);
    }
  }

  /**
   * Start the animation
   */
  public start(onComplete: () => void = () => {}): void {
    this.onCompleteCallback = onComplete;
    
    // Start the main animation loop after initial delay
    setTimeout(() => {
      console.log("Starting animation");
      
      // Keep the static binary characters updating
      this.mainIntervalId = window.setInterval(() => {
        // Just keep all binary characters static
        for (let i = 0; i < this.characterState.length; i++) {
          if (this.characterState[i] === 'binary') {
            this.binaryElements[i].textContent = this.initialBinaryChars[i];
          }
        }
        
        // Check if all animations are complete
        if (this.activeAnimations === 0 && this.isAllRevealed()) {
          this.stop();
        }
      }, 50);
      
      // Start each character animation with staggered timing
      this.startAllAnimationsWithStagger();
    }, this.initialDelay);
  }
  
  /**
   * Start all character animations with staggered timing
   */
  private startAllAnimationsWithStagger(): void {
    // For each character that should be animated
    for (let i = 0; i < this.characterState.length; i++) {
      if (this.characterState[i] === 'binary') {
        // Calculate delay based on character position
        const delay = i * this.staggerDelay;
        
        // Start this character's animation after its delay
        setTimeout(() => {
          // Only start if it's still in binary state
          if (this.characterState[i] === 'binary') {
            this.characterState[i] = 'animating';
            this.characterCycles[i] = 0;
            this.activeAnimations++;
            
            // Start the animation interval for this character
            this.characterIntervals[i] = window.setInterval(() => {
              this.updateCharacter(i);
            }, this.frameDelay);
          }
        }, delay);
      }
    }
  }
  
  /**
   * Check if all characters are revealed
   */
  private isAllRevealed(): boolean {
    for (let i = 0; i < this.characterState.length; i++) {
      if (this.characterState[i] === 'binary') {
        return false;
      }
    }
    return true;
  }
  
  /**
   * Start the next available character animation with sequential timing
   */
  private startNextCharacterAnimation(): void {
    // Find the next single character to animate
    for (let i = 0; i < this.characterState.length; i++) {
      if (this.characterState[i] === 'binary' && !this.characterIntervals[i]) {
        this.activeAnimations++;
        this.characterState[i] = 'animating';
        this.characterCycles[i] = 0;
        
        // Start animation for this character with sequential timing
        setTimeout(() => {
          this.characterIntervals[i] = window.setInterval(() => {
            this.updateCharacter(i);
          }, this.frameDelay);
        }, this.staggerDelay * (this.activeAnimations - 1));
        
        // Only start one character at a time, regardless of charLimit
        break;
      }
    }
  }

  /**
   * Update a specific character's animation
   */
  private updateCharacter(index: number): void {
    if (this.characterState[index] === 'animating') {
      // Character is in random character cycling phase
      if (this.characterCycles[index] < this.cyclesPerChar) {
        // Update with random character during cycling
        this.binaryElements[index].textContent = generateRandomChar();
        this.characterCycles[index]++;
      } else {
        // We've cycled enough, reveal the final character
        console.log(`Revealing character at index ${index}: ${this.finalText[index]}`);
        this.binaryElements[index].textContent = this.finalText[index];
        this.binaryElements[index].style.color = 'var(--primary)';
        
        // Flash animation
        setTimeout(() => {
          if (this.binaryElements[index]) {
            this.binaryElements[index].style.color = '';
          }
        }, 300);
        
        // Mark as revealed
        this.characterState[index] = 'revealed';
        
        // Clear this character's animation interval
        if (this.characterIntervals[index]) {
          clearInterval(this.characterIntervals[index]);
          delete this.characterIntervals[index];
        }
        
        // Decrease active animation count
        this.activeAnimations--;
      }
    }
  }

  /**
   * Stop the animation
   */
  private stop(): void {
    // Clear the main interval
    if (this.mainIntervalId !== null) {
      clearInterval(this.mainIntervalId);
      this.mainIntervalId = null;
    }
    
    // Clear all character intervals
    for (const indexStr in this.characterIntervals) {
      const index = parseInt(indexStr);
      if (this.characterIntervals[index]) {
        clearInterval(this.characterIntervals[index]);
        delete this.characterIntervals[index];
      }
    }
    
    // Call the completion callback
    if (this.onCompleteCallback) {
      this.onCompleteCallback();
    }
  }

  /**
   * Reset the animation
   */
  public reset(): void {
    this.stop();
    this.setup();
  }

  /**
   * Set animation speed parameters
   */
  public setSpeed(frameDelay: number, cyclesPerChar: number = 10, initialDelay: number = 800, staggerDelay: number = 100): void {
    this.frameDelay = frameDelay;
    this.cyclesPerChar = cyclesPerChar;
    this.initialDelay = initialDelay;
    this.staggerDelay = staggerDelay;
  }
  
  /**
   * Set the maximum number of characters animating simultaneously
   */
  public setCharLimit(limit: number): void {
    this.charLimit = limit;
  }
}

/**
 * Hook into the Intersection Observer API to trigger animations when elements
 * scroll into view
 */
export function setupScrollAnimations(): void {
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}