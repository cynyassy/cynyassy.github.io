# Quick Start Guide

## ⚡ Get Started in 3 Steps

### 1. View the Portfolio
The portfolio is ready to run! No additional setup needed.

```bash
npm run dev
```

Then open your browser to the URL shown in the terminal (typically `http://localhost:5173`).

### 2. Customize Your Content

#### Update Personal Information
1. **Name & Bio**: Edit `/src/app/components/HeroSection.tsx`
2. **Contact Info**: Edit `/src/app/components/ContactSection.tsx`

#### Update Projects
Edit `/src/app/components/FeaturedWork.tsx` - Update the `projects` array with your work:
```typescript
{
  title: 'Your Project',
  category: 'Your Category',
  problem: 'What problem did you solve?',
  approach: 'How did you solve it?',
  outcome: 'What was the result?',
  tags: ['Skill 1', 'Skill 2', 'Skill 3'],
  illustration: <svg>...</svg>
}
```

#### Update Skills
Edit `/src/app/components/SkillsNetwork.tsx` - Modify the `skillNodes` array to match your expertise.

#### Update Clients
Edit `/src/app/components/ClientsCarousel.tsx` - Update the `clients` array with organizations you've worked with.

### 3. Deploy to GitHub Pages

#### Option A: Automatic (Recommended)
1. Push your code to GitHub
2. Create `.github/workflows/deploy.yml` (see README.md for template)
3. Enable GitHub Pages in repository settings
4. Done! Your site will auto-deploy on every push

#### Option B: Manual
```bash
npm run build
# Upload contents of /dist folder to your hosting
```

## 🎨 Quick Customizations

### Change Accent Color
Replace all instances of `#FF4400` with your preferred color:
```bash
# In your code editor, search and replace:
#FF4400 → #YourColor
```

### Remove Custom Cursor
In `/src/app/App.tsx`, remove this line:
```typescript
<CustomCursor />
```

### Remove Loading Screen
In `/src/app/App.tsx`, remove this line:
```typescript
<LoadingScreen />
```

## 📱 Test Responsiveness

1. **Desktop**: Default view (1920px+)
2. **Tablet**: Resize browser to ~768px
3. **Mobile**: Resize browser to ~375px

Or use browser dev tools (F12 → Toggle Device Toolbar)

## 🔍 Key Features to Explore

1. **Hero Section**: Scroll down or click "Explore My Work"
2. **Skills Network**: Hover over skill bubbles, click to see details
3. **Interactive Play**: Click the floating balloons
4. **Clients Carousel**: Scroll horizontally (desktop) or swipe (mobile)
5. **Navigation**: Use the top menu to jump between sections
6. **Scroll to Top**: Appears after scrolling down

## ⚙️ Common Issues

### Animations not working?
- Make sure all dependencies are installed: `npm install`
- Clear browser cache

### Custom cursor not appearing?
- Only works on desktop with mouse (not touch devices)
- Check browser console for errors

### Sections not scrolling smoothly?
- Ensure IDs match in Navigation.tsx and section wrappers

## 📚 Need More Help?

- See `README.md` for detailed setup
- See `PORTFOLIO_GUIDE.md` for complete documentation
- Check component files for inline comments

## 🚀 You're Ready!

Your portfolio includes:
- ✅ 9 main content sections
- ✅ Interactive skills network
- ✅ Playful personality elements
- ✅ 4 featured projects
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Custom cursor (desktop)
- ✅ Loading screen
- ✅ Navigation system

Now make it yours! Update the content and deploy.

---

**Pro Tip**: Start by updating the contact information and personal details first, then move to projects and clients. The visual design and interactions are already complete!
