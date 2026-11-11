SamvaadAI
Every Voice Deserves to Be Heard.

Breaking communication barriers through AI-powered, two-way video communication.

SamvaadAI is an AI-powered video calling platform designed to help non-speaking individuals who communicate using Indian Sign Language (ISL) connect effortlessly with people who communicate through speech.

By bringing together Gnani AI's speech and language technologies, sign recognition infrastructure, and real-time video communication, SamvaadAI aims to make conversations more inclusive, natural and accessible.

Table of Contents
Overview
Key Features
Tech Stack
System Modules
Installation & Setup
Usage Guide
Future Improvements
Contributing
Overview

Communication should never depend on one's ability to speak.

SamvaadAI creates a shared communication space where two people can interact through a regular video call, regardless of whether they communicate through signs or speech.

It enables two-way communication:

1. Indian Sign Language → Text → AI Voice

A non-speaking participant communicates using signs. The interpreted text is displayed on their screen for review and approval. Once approved, the message is delivered to the other participant as text and AI-generated speech using Gnani Timbre.

2. Speech → Text → Screen

The speaking participant talks normally. Gnani Prisma converts their speech into text, which is displayed to the non-speaking participant during the conversation.

The integration architecture also provides scope for Gnani Evon to assist with contextual language refinement.

The goal is simple: make two different ways of communicating feel like one natural conversation.

Key Features
Real-Time Video Calling: Two-person video communication using WebRTC and Socket.IO signaling.
ISL Communication Workflow: Webcam-based hand landmark extraction with a manual text approval workflow.
AI Speech-to-Text: Gnani Prisma integration for converting spoken communication into text.
AI Text-to-Speech: Gnani Timbre integration for converting approved messages into natural speech.
Message Approval: Ensures the non-speaking participant can review and approve interpreted text before sending.
Two-Way Communication: Supports both sign-to-speech and speech-to-text communication.
Secure Meeting Rooms: Create and join conversations using unique meeting codes.
Live Captions: Browser-based caption fallback when the AI transcription service is unavailable.
Connection Management: Camera and microphone controls, connection status and reconnection handling.
AI Reasoning Integration: Architecture for optional Gnani Evon-powered contextual refinement.
Tech Stack
Technology	Purpose
Next.js	Web application framework
React + TypeScript	Frontend development
WebRTC	Real-time audio and video
Socket.IO	Signaling and live message delivery
MediaPipe	Hand landmark extraction
Gnani Prisma	Speech-to-text
Gnani Timbre	Text-to-speech
Gnani Evon	Optional contextual reasoning
STUN / TURN	WebRTC connectivity
System Modules (Project Structure)

SamvaadAI is organised around the following core modules:

Module	Responsibility
Video Communication	Establishes and manages two-party video calls
Room Management	Creates meeting rooms and handles joining through room codes
Sign Processing	Captures webcam input and extracts hand landmarks
Text Approval	Displays interpreted text for review and approval
Speech Processing	Converts spoken audio into text using Prisma
Voice Generation	Converts approved text into speech using Timbre
Real-Time Messaging	Delivers transcriptions, approved messages and audio between participants
AI Reasoning	Provides an extension point for Evon-based contextual refinement
Installation & Setup

1. Clone the repository

bash
git clone https://github.com/dishadhikari/SamvaadAI.git
cd SamvaadAI/samvaadai


2. Install dependencies

bash
npm install


3. Configure environment variables

Create a .env.local file in the application root.

env
GNANI_API_KEY=your_gnani_api_key

GNANI_PRISMA_URL=your_prisma_endpoint
GNANI_TIMBRE_URL=your_timbre_endpoint

TURN_USERNAME=your_turn_username
TURN_PASSWORD=your_turn_password

TURN_URL=your_turn_url
NEXT_PUBLIC_STUN_URL=your_stun_url

EVON_ENABLED=false


Use the official Gnani API endpoint contracts and your account's authorised credentials. Never expose API keys or TURN passwords in frontend code or commit them to GitHub.

4. Start the development server

bash
npm run dev


5. Open the application

text
http://localhost:3000

Usage Guide (User Flow)

Step 1 — Create a Conversation

One participant creates a meeting room and shares the generated meeting code.

Step 2 — Join the Video Call

The second participant enters the code and joins the same video session.

Step 3 — Communicate Through Signs

The non-speaking participant uses Indian Sign Language in front of their webcam. The sign-processing workflow extracts hand landmarks and provides the available interpretation or manual text-entry option.

Step 4 — Review and Approve

The participant reviews and approves the message before it is sent.

Step 5 — AI Voice Generation

The approved text is delivered to the speaking participant and can be converted into AI-generated speech through Gnani Timbre when configured.

Step 6 — Receive Spoken Communication

The speaking participant replies normally. Gnani Prisma or the available caption fallback converts speech into text for the non-speaking participant.

And the conversation continues — both participants can communicate without needing to switch platforms.

Future Improvements
Integration of a validated, pretrained Indian Sign Language recognition model for automatic sign-to-text conversion.
Expansion of supported ISL vocabulary and dynamic sign recognition.
Deeper Gnani Evon integration for contextual interpretation and sentence refinement.
Improved multilingual speech recognition and voice generation.
More natural, low-latency, real-time AI communication.
Improved accessibility and support for more communication scenarios.
Contributing

Contributions that improve accessibility, sign recognition, AI integration and real-time communication are welcome.

Fork the repository.
Create a feature branch.
Make your changes.
Test your implementation.
Submit a pull request with a clear description.

Let's build technology that makes communication more inclusive.

SamvaadAI — Because every conversation deserves to be heard.
