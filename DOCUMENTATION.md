# Portfolio Website Documentation

## Project Overview

This is a professional portfolio website built with React and Express. The site features a distinctive landing page with a binary decoding animation that gradually reveals text through a sequence of random character shuffling.

## Tech Stack

- **Frontend**: React with wouter for routing
- **UI Components**: Custom components with shadcn/ui
- **Styling**: Tailwind CSS
- **Backend**: Express server 
- **State Management**: React hooks and context
- **Data Fetching**: TanStack Query (React Query)

## Key Website Sections

### Navigation
- Responsive navbar with mobile toggle
- Links to all main sections of the site
- Smooth scrolling navigation

### Hero Section
- Features the distinctive binary text animation
- Name and title appear as binary characters and then transform
- "Learn more" button with smooth scroll to About section

### About Section
- Professional bio/description
- Professional image/avatar

### Skills Section
- List of technical skills with visual indicators
- Categorized by skill type (programming languages, frameworks, tools, etc.)

### Projects Section
- Grid of project cards with:
  - Project image
  - Title and description
  - Technologies used (tags)
  - Links to demo and source code
- Each project has a dedicated detail page accessible by clicking on the card

### Contact Section
- Contact form with fields for:
  - Name
  - Email
  - Message
- Form validation with zod
- Success/error notifications using Toast component

### Footer
- Social media links
- Copyright information
- Secondary navigation

## Routes

- `/` - Home page with all sections
- `/projects/:id` - Individual project detail pages

## Backend API Endpoints

- `GET /api/projects` - Retrieves all projects
- `GET /api/projects/:id` - Retrieves a specific project
- `POST /api/contact` - Handles contact form submissions

## Binary Animation Details

### Feature Overview

The binary animation is a distinctive visual element that transforms binary characters (0s and 1s) into readable text through a sequence of random character cycling. The animation starts with binary placeholders and then animates multiple characters simultaneously with a staggered timing effect.

### Implementation

The animation is implemented in the `BinaryTextAnimator` class located in `client/src/lib/animation.ts`. The class handles:

1. Creating binary placeholders for each character of the target text
2. Animating characters by cycling through random characters
3. Revealing the final character with a subtle glow effect
4. Managing the timing and sequence of animations

### Key Animation Parameters

The animation is highly configurable with these key parameters:

- `frameDelay`: Time in milliseconds between each animation frame (default: 30ms)
- `cyclesPerChar`: Number of random character cycles before revealing the final character (default: 10)
- `initialDelay`: Delay before starting the animation (default: 1000ms)
- `staggerDelay`: Time between starting each character's animation (default: 80ms for name, 60ms for title)

### Animation Process

1. **Initialization**: Text starts as binary characters (0s and 1s)
2. **Staggered Animation**: Characters start animating one after another at configurable intervals
3. **Random Character Cycling**: Each character cycles through random alphanumeric and special characters
4. **Reveal**: After a set number of cycles, the final character is revealed with a subtle glow effect

### Usage in Hero Component

The animation is used in the Hero component for both the name and title texts:

```tsx
// In Hero.tsx
useEffect(() => {
  setTimeout(() => {
    // Start animating the name
    if (nameRef.current) {
      const nameAnimator = new BinaryTextAnimator(nameRef.current, name);
      // Configure timing: 30ms between frames, 10 cycles per char
      // 1000ms initial delay, 80ms stagger between character starts
      nameAnimator.setSpeed(30, 10, 1000, 80);
      nameAnimator.start();
    }
    
    // Start animating the title
    if (titleRef.current) {
      const titleAnimator = new BinaryTextAnimator(titleRef.current, title);
      // Similar timing for title: 30ms between frames, 8 cycles per char
      // 1000ms initial delay, 60ms stagger between character starts
      titleAnimator.setSpeed(30, 8, 1000, 60);
      titleAnimator.start(() => {
        // Mark as complete when both are done
        setAnimationComplete(true);
      });
    }
  }, 600); // Initial delay before starting animations
}, [name, title]);
```

### CSS Styling for Animation

The animation styling is defined in `client/src/index.css`:

```css
.binary-char {
  @apply inline-block;
  transition: all 0.2s ease-in-out;
  position: relative;
  text-shadow: 0 0 5px rgba(0, 140, 255, 0.3);
}

.binary-char::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.binary-char[style*="color: var(--primary)"] {
  text-shadow: 0 0 8px var(--primary);
}

.binary-char[style*="color: var(--primary)"]::after {
  width: 100%;
}

.binary-container {
  font-family: 'Roboto Mono', monospace;
  letter-spacing: 0.05em;
}
```

## Project Structure

The project follows a standard structure:

```
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── Hero.tsx (Contains the binary animation)
│   │   │   ├── NavBar.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ui (shadcn components)
│   │   ├── hooks
│   │   │   └── use-mobile.tsx
│   │   ├── lib
│   │   │   ├── animation.ts (Binary animation implementation)
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   ├── ProjectDetail.tsx
│   │   │   └── not-found.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── index.html
├── server
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
└── shared
    └── schema.ts
```

## Future Enhancement Ideas

1. **Animation Improvements**:
   - Add more configuration options (easing, color settings)
   - Create variants for different animation styles
   - Add the option for the animation to trigger on scroll

2. **Performance Optimizations**:
   - Throttle animation frames for better performance on low-end devices
   - Add option to disable animation for accessibility or reduced motion preferences

3. **Interactive Elements**:
   - Make animation interactive (hover, click effects)
   - Add options for text to animate in different patterns (wave, cascade, etc.)

4. **Visual Enhancements**:
   - Add particle effects around characters as they transform
   - Experiment with 3D transform effects during character reveals

## How to Modify the Animation

### Changing Animation Speed

To adjust the speed and timing of the animation, edit the `setSpeed` parameters in `client/src/components/Hero.tsx`:

```tsx
// Make animation faster
nameAnimator.setSpeed(20, 8, 800, 50);  // 20ms frames, 8 cycles, 800ms delay, 50ms stagger

// Make animation slower
nameAnimator.setSpeed(60, 20, 1500, 150);  // 60ms frames, 20 cycles, 1500ms delay, 150ms stagger
```

### Changing the Animation Style

To modify the visual appearance of the animation, edit the CSS in `client/src/index.css`. For example:

```css
/* Add a color transition effect */
.binary-char {
  transition: all 0.3s ease-in-out;
  color: #888;
}

.binary-char[style*="color: var(--primary)"] {
  color: var(--primary);
  text-shadow: 0 0 12px var(--primary);
}
```

### Adding New Animation Features

To extend the animation with new features, modify the `BinaryTextAnimator` class in `client/src/lib/animation.ts`.