# Payment Groups Web App

## Vercel Deployment

### Prerequisites
- Vercel account
- Node.js 18.x

### Deployment Steps
1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Deploy directly from GitHub:
- Connect your GitHub repository to Vercel
- Select this project
- Vercel will automatically detect the configuration

### Local Development
1. Install dependencies:
```bash
npm install
```

2. Start local server:
```bash
npm start
```

### Project Structure
- `server.js`: Express server with API endpoints
- `public/`: Frontend static files
- `vercel.json`: Vercel deployment configuration

### Deployment Configuration
- Runtime: Node.js 18.x
- Serverless Functions: Supported
- Static File Hosting: Enabled