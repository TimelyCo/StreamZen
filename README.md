# StreamZen - Modern Streaming Platform

StreamZen is a full-stack streaming platform built with the MERN stack (MongoDB, Express, React, Node.js) and Next.js. It provides a seamless experience for streaming movies and TV shows with a modern, responsive UI.

## Features

- 🎬 Browse and stream movies and TV shows
- 🔐 User authentication and authorization
- 📱 Responsive design for all devices
- ⭐ Personalized watchlist
- 🔍 Advanced search and filtering
- 🎨 Modern UI with smooth animations
- 🔒 Secure video streaming

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - React 18
  - Tailwind CSS
  - NextAuth.js
  - Zustand (State Management)
  - React Player

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT Authentication

## Prerequisites

- Node.js 18.x or later
- MongoDB
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/streamzen.git
   cd streamzen
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
streamzen/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── (routes)/          # Application routes
├── components/            # Reusable components
├── lib/                   # Utility functions
├── models/               # MongoDB models
├── public/               # Static assets
└── styles/              # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/) 