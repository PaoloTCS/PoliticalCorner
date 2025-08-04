# PoliticalCorner

A modern website dedicated to political philosophy discussions, organized by continents with a structured Thesis → Counter Thesis → Synthesis format.

## 🌍 About

PoliticalCorner is a platform for thoughtful political and economic discussions that follows a unique three-part structure:

- **Thesis**: Presenting the main argument or position
- **Counter Thesis**: Exploring opposing viewpoints and critiques  
- **Synthesis**: Finding common ground and balanced perspectives

The website is organized by geographic continents (Asia, Americas, Europe, Africa) to highlight how political and economic issues manifest differently across regions.

## ✨ Features

### 🎯 Structured Discussion Format
- Each topic follows the Thesis → Counter Thesis → Synthesis methodology
- Balanced presentation of multiple perspectives
- Encourages critical thinking and nuanced understanding

### 🌏 Geographic Organization
- **Asia**: Democracy models, economic development, regional cooperation
- **Americas**: Democratic systems, economic models, social justice
- **Europe**: Social democracy, EU integration, welfare states
- **Africa**: Post-colonial politics, economic development, Pan-Africanism

### 🎨 Modern Design
- Responsive design that works on all devices
- Clean, professional interface suitable for academic content
- Color-coded sections for easy navigation (Green for Thesis, Red for Counter Thesis, Blue for Synthesis)

### 📱 Technical Features
- Built with Next.js 14 and React 18
- TypeScript for type safety
- Tailwind CSS for styling
- Heroicons for consistent iconography
- Optimized for performance and SEO

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PaoloTCS/PoliticalCorner.git
cd PoliticalCorner
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
PoliticalCorner/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── methodology/       # Methodology explanation
│   └── continents/        # Continent pages
│       ├── asia/
│       ├── americas/
│       ├── europe/
│       └── africa/
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## 🎨 Design System

### Colors
- **Primary**: Blue shades for main actions and branding
- **Secondary**: Gray shades for text and backgrounds
- **Thesis**: Green for positive arguments
- **Counter Thesis**: Red for opposing viewpoints
- **Synthesis**: Blue for balanced conclusions

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Components
- **Cards**: Consistent card design with shadows and borders
- **Buttons**: Primary and secondary button styles
- **Navigation**: Clean header with continent navigation
- **Forms**: Styled contact forms with proper accessibility

## 🌐 Pages

### Homepage (`/`)
- Hero section with mission statement
- Overview of the three-part methodology
- Continent navigation cards
- Footer with links

### Methodology (`/methodology`)
- Detailed explanation of Thesis → Counter Thesis → Synthesis
- Benefits of the structured approach
- Example discussion format
- Call-to-action buttons

### Continent Pages (`/continents/[continent]`)
- **Asia**: Democracy in Asia, Economic Development Models
- **Americas**: Democratic Systems, Economic Models
- **Europe**: Social Democracy, EU Integration
- **Africa**: Post-Colonial Politics, Pan-Africanism

### About (`/about`)
- Mission and values
- Topics covered
- Approach to content
- Call-to-action

### Contact (`/contact`)
- Contact form
- FAQ section
- Contribution guidelines
- Contact information

## 🔧 Customization

### Adding New Discussions
1. Navigate to the appropriate continent page
2. Add a new discussion object to the `discussions` array
3. Follow the Thesis → Counter Thesis → Synthesis structure
4. Include points for each section

### Styling Changes
- Modify `tailwind.config.js` for color and spacing changes
- Update `app/globals.css` for custom component styles
- Adjust component classes for layout changes

### Adding New Continents
1. Create a new directory in `app/continents/`
2. Create a `page.tsx` file following the existing pattern
3. Add navigation links in other pages
4. Update the homepage continent cards

## 📝 Content Guidelines

### Discussion Structure
Each discussion should include:
- **Title**: Clear, descriptive title
- **Description**: Brief overview of the topic
- **Thesis**: Main argument with supporting points
- **Counter Thesis**: Opposing viewpoint with critiques
- **Synthesis**: Balanced conclusion with key insights

### Writing Style
- Academic but accessible
- Balanced and fair presentation
- Evidence-based arguments
- Clear, concise language

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Content Contributions
- Follow the Thesis → Counter Thesis → Synthesis format
- Ensure balanced perspectives
- Include proper citations and sources
- Maintain academic rigor

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**PaoloTCS** - [GitHub Profile](https://github.com/PaoloTCS)

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Tailwind CSS for the utility-first styling
- Heroicons for the beautiful icon set
- The political philosophy community for inspiration

---

**PoliticalCorner** - Where thoughtful political discussions meet structured analysis. 