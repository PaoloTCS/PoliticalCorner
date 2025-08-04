# PoliticalCorner Deployment Guide

## 🚀 Deployment to Cloudflare Pages

Your PoliticalCorner website is now connected to your GitHub repository and ready for deployment to Cloudflare Pages.

### 📋 Prerequisites

1. **Cloudflare Account**: You need a Cloudflare account
2. **Cloudflare API Token**: Required for automated deployments
3. **Cloudflare Account ID**: Your Cloudflare account identifier

### 🔧 Setup Steps

#### 1. Get Your Cloudflare Account ID
1. Log in to your Cloudflare dashboard
2. Go to the right sidebar and click on your account name
3. Your Account ID will be displayed (it's a 32-character hexadecimal string)

#### 2. Create a Cloudflare API Token
1. In your Cloudflare dashboard, go to "My Profile" → "API Tokens"
2. Click "Create Token"
3. Use the "Custom token" template
4. Configure the token with these permissions:
   - **Account**: Cloudflare Pages (Edit)
   - **Zone**: Cloudflare Pages (Edit)
5. Set the Account Resources to "Include - All accounts"
6. Set the Zone Resources to "Include - All zones"
7. Click "Continue to summary" and then "Create Token"
8. **Copy the token** - you'll need it for the next step

#### 3. Add Secrets to GitHub Repository
1. Go to your GitHub repository: https://github.com/PaoloTCS/PoliticalCorner
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add these two secrets:
   - **Name**: `CLOUDFLARE_API_TOKEN`
     **Value**: Your Cloudflare API token
   - **Name**: `CLOUDFLARE_ACCOUNT_ID`
     **Value**: Your Cloudflare Account ID

#### 4. Create Cloudflare Pages Project
1. In your Cloudflare dashboard, go to "Pages"
2. Click "Create a project"
3. Choose "Connect to Git"
4. Select your GitHub repository: `PaoloTCS/PoliticalCorner`
5. Configure the build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (leave empty)
6. Click "Save and Deploy"

### 🔄 Automatic Deployment

Once set up, your website will automatically deploy:
- **On every push to main branch**: Production deployment
- **On pull requests**: Preview deployments

### 🌐 Custom Domain (Optional)

1. In your Cloudflare Pages project settings
2. Go to "Custom domains"
3. Add your domain (e.g., `politicalcorner.com`)
4. Follow the DNS configuration instructions

### 📊 Monitoring

- **Deployment Status**: Check the "Deployments" tab in your Cloudflare Pages project
- **GitHub Actions**: Monitor deployment progress in the "Actions" tab of your GitHub repository
- **Analytics**: Available in your Cloudflare dashboard

### 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 📁 Project Structure

```
PoliticalCorner/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── resources/         # Resources section
│   ├── authors/           # Author pages
│   ├── continents/        # Geographic sections
│   └── ...
├── .github/workflows/     # GitHub Actions
├── _headers              # Cloudflare security headers
├── wrangler.toml         # Cloudflare configuration
└── ...
```

### 🔒 Security Features

The deployment includes:
- **Security Headers**: X-Frame-Options, CSP, etc.
- **HTTPS**: Automatic SSL certificates
- **DDoS Protection**: Cloudflare's global network
- **CDN**: Global content delivery

### 🚨 Troubleshooting

#### Common Issues:

1. **Build Failures**:
   - Check GitHub Actions logs
   - Verify Node.js version compatibility
   - Ensure all dependencies are in package.json

2. **Deployment Issues**:
   - Verify API token permissions
   - Check account ID is correct
   - Ensure repository secrets are set

3. **Domain Issues**:
   - Verify DNS configuration
   - Check SSL certificate status
   - Ensure domain is properly configured in Cloudflare

### 📞 Support

- **Cloudflare Support**: https://support.cloudflare.com
- **GitHub Issues**: Create issues in your repository
- **Next.js Documentation**: https://nextjs.org/docs

---

**Your PoliticalCorner website is now ready for deployment!** 🎉

Follow the setup steps above to get your website live on Cloudflare Pages. 