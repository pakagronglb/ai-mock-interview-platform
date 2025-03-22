# AI Mock Interview Platform 🎯

An intelligent interview preparation platform that leverages AI to help you practice and improve your interviewing skills. Built with modern web technologies and AI integration.

[View Demo](https://ai-mock-interview-platform.vercel.app)

![PrepWise Platform](public/preview.png)

## ✨ Features

- **AI-Powered Interviews**: Dynamic interview sessions with an AI interviewer
- **Real-time Feedback**: Get instant feedback on your responses
- **Performance Analytics**: Track your progress with detailed scoring
- **Custom Interview Types**: Practice for different roles and industries
- **Secure Authentication**: Firebase-based user management
- **Responsive Design**: Seamless experience across all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Firebase (Authentication & Firestore)
- **AI Integration**: Vapi.ai, Google Gemini
- **Styling**: Tailwind CSS, Shadcn UI
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Firebase account
- Vapi.ai account
- Google Cloud account (for Gemini API)

### Installation

1. Clone the repository
```bash
git clone https://github.com/pakagrong/ai-mock-interview-platform.git
cd ai-mock-interview-platform
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=

# Base URL
NEXT_PUBLIC_BASE_URL=
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📱 Core Features

### Interview Generation
- AI-powered interview question generation
- Role-specific questions
- Difficulty levels

### Interview Session
- Real-time voice interaction
- Natural conversation flow
- Session recording

### Feedback System
- Detailed performance analysis
- Improvement suggestions
- Score breakdown by categories:
  - Communication Skills
  - Technical Knowledge
  - Problem-Solving
  - Cultural & Role Fit
  - Confidence & Clarity

## 🔐 Authentication Features

- Email/Password authentication
- Session management
- Protected routes
- User profile management

## 📊 Database Schema

### Users Collection
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}
```

### Interviews Collection
```typescript
interface Interview {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  finalized: boolean;
}
```

### Feedback Collection
```typescript
interface Feedback {
  id: string;
  interviewId: string;
  userId: string;
  totalScore: number;
  categoryScores: {
    communicationSkills: number;
    technicalKnowledge: number;
    problemSolving: number;
    culturalFit: number;
    confidenceClarity: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Tutorial inspiration: [JavaScript Mastery](https://www.youtube.com/watch?v=8GK8R77Bd7g)
- UI Components: [Shadcn UI](https://ui.shadcn.com/)
- AI Integration: [Vapi.ai](https://vapi.ai)
- Font: Mona Sans by GitHub
- Icons: Lucide Icons

## 📞 Contact

Pakagrong - [@pakagrong](https://twitter.com/pakagrong)

Project Link: [https://github.com/pakagrong/ai-mock-interview-platform](https://github.com/pakagrong/ai-mock-interview-platform) 