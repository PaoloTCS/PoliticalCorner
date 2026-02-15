# PoliticalCorner

**PoliticalCorner** - Where thoughtful political discussions meet structured analysis.

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
- (Optional) PostgreSQL database for production durability

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

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set:
- **Required for production**: `SESSION_SECRET` (long random string)
- **Optional AI providers**: `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- **Optional Turnstile**: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`
- **Optional database**: `DATABASE_URL` (PostgreSQL connection string)
- **Policy settings**: `ANON_DAILY_QUERY_LIMIT`, `KNOWLEDGE_THREAD_THRESHOLD`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
## Online Test Configuration

Before public testing, copy `.env.example` to `.env.local` and set values.

### Policy behavior implemented

- Everyone can view pages and `/threads`
- Anonymous users can ask up to `ANON_DAILY_QUERY_LIMIT` questions/day
- After limit, users must register/login to continue
- Permanent thread creation unlocks at `KNOWLEDGE_THREAD_THRESHOLD`
- Admin role bypasses the threshold
- Turnstile verification is enforced when `TURNSTILE_SECRET_KEY` is set

### Important production note

**Data persistence options:**

This project supports two storage modes:

1. **JSON File Storage (default for development)**
   - Data stored in `data/` directory (auto-created on first run)
   - Files: `users.json`, `usage.json`, `threads.json`, `philosophies.json`
   - ⚠️ Not suitable for production (no concurrency safety, no durability guarantees)

2. **PostgreSQL Database (recommended for production)**
   - Set `DATABASE_URL` environment variable (e.g., Railway Postgres, Supabase, Neon)
   - Schema auto-initializes on first connection
   - Provides durability, concurrency safety, and scalability
   - Example: `DATABASE_URL=postgresql://user:pass@host:5432/dbname`
   - Set `DATABASE_SSL=disable` only if your DB doesn't require SSL

**Migration from JSON to Database:**
- When you set `DATABASE_URL`, the app automatically switches to database mode
- Existing JSON files are ignored (not automatically migrated)
- For data migration, manually export/import using custom scripts or SQL
