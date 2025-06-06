# Zachary Marabeas - Portfolio Website

A professional portfolio website showcasing skills, projects, and experience as a Computer Science student and freelance software developer.

## Features

- **Interactive Binary Animation**: Hero section with custom binary decoding text animation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Project Showcase**: Dynamic project cards with detailed views
- **Resume Integration**: HTML resume view with PDF download functionality
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Smooth Navigation**: Hash-based navigation with scroll position restoration

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion, custom binary text animations
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect the configuration and deploy

### Manual Deployment

1. Build the project
```bash
npm run build
```

2. The built files will be in the `dist` directory

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express server
├── public/                 # Static assets
├── shared/                 # Shared schemas and types
└── vercel.json            # Vercel deployment configuration
```

## Key Features

### Binary Text Animation
Custom TypeScript class that creates a matrix-style binary decoding effect for text reveals.

### Resume System
- HTML-rendered resume with professional formatting
- Direct PDF download functionality
- Accurate professional experience and education details

### Navigation System
- Smooth scrolling to page sections
- Cross-page navigation with hash support
- Scroll position restoration for project browsing

### Project Showcase
- Dynamic project cards with hover effects
- Detailed project pages with navigation
- Integration with authentic project data

## Environment Variables

No environment variables are required for basic functionality. All data is embedded in the application.

## Contributing

This is a personal portfolio website. If you'd like to use this as a template:

1. Fork the repository
2. Update the personal information in the components
3. Replace project data with your own
4. Update the resume content
5. Customize the styling to match your preferences

## License

MIT License - feel free to use this code for your own portfolio website.

## Contact

- **Email**: zmarabeas@gmail.com
- **GitHub**: github.com/zmarabeas
- **Phone**: 734-751-0417

v1.0

