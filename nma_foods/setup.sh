#!/bin/bash

# NMA Foods Website Setup Script
# This script helps you set up the NMA Foods website quickly

echo "🌟 NMA Foods Website Setup"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    echo "   Please update Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the nma_foods directory."
    exit 1
fi

echo "✅ Found package.json"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "⚙️  Creating environment configuration..."
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
    echo ""
    echo "🔧 IMPORTANT: Please edit the .env file with your configuration:"
    echo "   - Add your Supabase URL and anon key"
    echo "   - Add your Shopify store domain and token (optional)"
    echo "   - Add your Google Analytics measurement ID (optional)"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Check if Supabase configuration exists
echo ""
echo "🗄️  Database Setup Required:"
echo "   1. Create a Supabase project at https://supabase.com"
echo "   2. Run the SQL migrations from supabase/migrations/ folder"
echo "   3. Update your .env file with Supabase credentials"
echo ""

# Offer to start development server
echo "🚀 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Set up your Supabase database (run migrations)"
echo "3. Start development server: npm run dev"
echo "4. Build for production: npm run build"
echo ""

read -p "Would you like to start the development server now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🎉 Starting development server..."
    echo "   The website will be available at http://localhost:5173"
    echo "   Press Ctrl+C to stop the server"
    echo ""
    npm run dev
else
    echo "👍 You can start the development server later with: npm run dev"
fi

echo ""
echo "📚 For detailed setup instructions, see README.md"
echo "🌐 Live demo: https://rgrzbtrait.skywork.website"
echo ""
echo "Happy coding! 🎉"