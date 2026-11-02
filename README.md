# Keplix Website

> Drive Smarter. Book Faster. Trust Keplix.

A revolutionary automotive service platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- Modern, responsive design
- Interactive countdown timer for official launch
- Smooth animations and transitions
- Service booking and comparison
- Mobile-first approach

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🌐 Live Demo

Visit the live website: [https://yourusername.github.io/Keplix-website/](https://yourusername.github.io/Keplix-website/)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Keplix-website.git
cd Keplix-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment

1. Push your code to the `main` or `master` branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://yourusername.github.io/Keplix-website/`

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🛠️ Maintenance mode

`public/status.json` is the maintenance switch for **both** websites:

```json
{ "maintenance": true, "message": "Planned upgrade, back soon.", "until": "4:00 PM IST" }
```

- Edit it, then push to `main`. Vercel deploys in about a minute. Check https://keplix.co.in/status.json afterwards.
- On keplix.co.in, `src/components/MaintenanceBanner.tsx` shows a red banner above the header. It renders on the client only, so the prerendered HTML and SEO are unchanged.
- On partner.keplix.co.in, the portal (`keplix-webpage-vendors`) reads the same file and shows a full maintenance page.
- `vercel.json` serves the file with `no-store` and allows CORS only for `https://partner.keplix.co.in`.
- It fails open: only a literal `true` turns it on, and a broken or unreachable file means "off".
- Logic is in `src/lib/maintenanceStatus.js`. Run its test with `node --test src/lib/__tests__/maintenanceStatus.test.mjs`.
- The mobile apps use Firebase Remote Config instead. See `docs/maintenance-and-updates/` at the repo root.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Hero.tsx        # Landing section with countdown
│   ├── Header.tsx      # Navigation header
│   ├── Services.tsx    # Services section
│   ├── Process.tsx     # How it works
│   ├── Future.tsx      # Future features
│   ├── Contact.tsx     # Contact section
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── About.tsx       # About page
│   ├── Beta.tsx        # Beta testing page
│   ├── Blog.tsx        # Blog page
│   ├── Business.tsx    # Business solutions
│   └── ContactPage.tsx # Contact page
├── App.tsx             # Main app component
└── main.tsx           # Entry point
```

## 🎨 Customization

### Colors
The project uses a red and dark theme. Main colors:
- Primary Red: `#EF4444` (red-500)
- Dark Background: `#111827` (gray-900)
- Card Background: `#1F2937` (gray-800)

### Fonts
- Uses system fonts for optimal performance
- Bold weights for headings
- Regular weights for body text

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Set source to "GitHub Actions"
4. The site will be deployed automatically on every push to main/master

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Contact

For questions or support, please contact us through the website or open an issue on GitHub.

---

Built with ❤️ for the automotive community
# keplix-website
