# Cynyassy - Interactive Portfolio

An interactive portfolio for Shashank Sharma (Cynyassy), presenting a multidisciplinary storyteller, systems thinker, and builder through a black-and-white comic-inspired visual language.

## 🎨 Design Philosophy

- **Visual Language**: Black and white comic-inspired design with minimal accent color (#FF4400) for interactions
- **User Experience**: Guided exploration through sections that build a narrative
- **Interactions**: Subtle animations, hover states, and playful elements
- **Aesthetic**: Hand-drawn, slightly imperfect, human-centered design

## 🏗️ Structure

The portfolio flows through these sections:

1. **Hero** - Strong identity and positioning statement
2. **Skills Network** - Interactive visualization of interconnected capabilities
3. **About** - Concise, thoughtful introduction
4. **Clients** - Horizontal carousel establishing credibility
5. **Interactive Play** - Personality-revealing playful section
6. **Featured Work** - Case studies with problem → approach → outcome
7. **How I Work** - Process diagram showing methodology
8. **Current Focus** - What's happening now
9. **Contact** - Direct call to action

## 🚀 Technologies

- **React** 18.3.1 - Component-based UI
- **Motion** (formerly Framer Motion) - Smooth animations
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Fast build tool
- **TypeScript** - Type-safe code

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deployment to GitHub Pages

The portfolio uses a two-folder workflow:

1. Build and edit in `Interactive_Portfolio_Design`.
2. Sync the source into the local `cynyassy.github.io` repository.
3. Commit and push from `cynyassy.github.io`.
4. GitHub Actions builds and publishes the live site.

## 🎯 Features

### Interactive Skills Network
- Click on skill nodes to see details
- Hover to highlight connections
- Dynamic SVG visualization

### Playful Interactions
- Clickable floating balloons revealing personality insights
- Smooth animations throughout
- Responsive to user interactions

### Featured Work
- Project case studies with visual diagrams
- Problem-approach-outcome structure
- Hand-drawn SVG illustrations

### Smooth Navigation
- Fixed navigation bar
- Smooth scroll between sections
- Mobile-responsive menu
- Scroll-to-top button

## 🎨 Customization

### Colors
The primary accent color is defined as `#FF4400`. To change:
- Update hex values in component files
- Search for `#FF4400` and replace globally

### Content
Update content in these files:
- `SkillsNetwork.tsx` - Skills and clusters
- `ClientsCarousel.tsx` - Client list
- `FeaturedWork.tsx` - Project case studies
- `CurrentFocus.tsx` - Current projects
- `ContactSection.tsx` - Contact information

### Illustrations
SVG illustrations are inline in components. Customize by:
- Editing SVG paths directly
- Maintaining the black/white aesthetic
- Keeping the hand-drawn style

## 📱 Responsive Design

The portfolio is fully responsive:
- Desktop: Full interactive experience
- Tablet: Adapted layouts
- Mobile: Optimized navigation and stacked sections

## 🔧 Performance

- Lightweight components
- Optimized animations (60fps)
- Lazy loading where applicable
- Minimal external dependencies

## 📄 License

Copyright © 2026 Shashank Sharma / Cynyassy. All rights reserved.

## 🤝 Contact

For inquiries about this portfolio or collaborations:
- Email: shashank@cynyassy.com
- Website: Built with Figma Make

---

Built with attention to detail, systems thinking, and a love for clean design.
