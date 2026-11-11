SamvaadAI
Every Voice Deserves to Be Heard.

An AI-powered, two-way video communication platform connecting Indian Sign Language and spoken communication using Gnani AI.

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

Communication should never be limited by one's ability to speak.

SamvaadAI is a video calling platform designed to bridge the communication gap between non-speaking individuals who use Indian Sign Language (ISL) and individuals who communicate through speech.

Built around Gnani AI's speech and language technologies, SamvaadAI enables both participants to communicate naturally within a single video call.

The platform supports two communication directions:

1. Sign Language to Speech

The non-speaking participant communicates using Indian Sign Language. The sign-processing pipeline extracts hand landmarks and provides an interpretation workflow. The participant reviews and approves the resulting text before it is delivered to the other participant.

Gnani Timbre converts the approved text into AI-generated speech, allowing the speaking participant to receive both text and voice.

2. Speech to Text

The speaking participant communicates normally through their microphone. Gnani Prisma processes speech and converts it into text, which is displayed to the non-speaking participant in the video call.

The Core Idea

One video call. Two communication methods. No communication barrier.

Key Features
Real-Time Video Calling: Two-person video communication using WebRTC and Socket.IO.
ISL Processing: Webcam-based hand landmark extraction using MediaPipe.
Text Approval: Allows the non-speaking participant to review and approve interpreted messages.
Speech Recognition: Gnani Prisma integration for speech-to-text conversion.
AI Voice Generation: Gnani Timbre integration for converting approved text into speech.
Two-Way Communication: Connects sign-based communication with spoken communication.
Meeting Rooms: Create and join conversations using unique meeting codes.
Live Captions: Browser-based speech transcription fallback.
AI Reasoning: Optional integration architecture for Gnani Evon contextual refinement.
Connection Management: Camera, microphone, connection status and reconnection controls.
Tech Stack
Technology	Purpose
Next.js	Application framework
React	User interface
TypeScript	Type-safe development
WebRTC	Real-time audio and video
Socket.IO	Signaling and message delivery
MediaPipe	Hand landmark extraction
Gnani Prisma	Speech-to-text
Gnani Timbre	Text-to-speech
Gnani Evon	Contextual reasoning
STUN / TURN	WebRTC connectivity
System Modules

The application is organised into the following functional modules:

Module	Description
Video Communication	Establishes and manages real-time video calls.
Room Management	Handles meeting creation, joining and participant sessions.
Sign Processing	Captures webcam input and extracts hand landmarks.
Text Approval	Provides an editable message review and approval workflow.
Speech Processing	Converts spoken audio into text using Gnani Prisma.
Voice Generation	Converts approved text into speech using Gnani Timbre.
Real-Time Messaging	Delivers messages, transcriptions and generated audio between participants.
AI Reasoning	Provides an extension point for Gnani Evon integration.
Installation & Setup
Prerequisites
Node.js
npm
Gnani AI API credentials
TURN server credentials for reliable connectivity across different networks
1. Clone the Repository
bash
git clone https://github.com/dishadhikari/SamvaadAI.git
cd SamvaadAI/samvaadai

2. Install Dependencies
bash
npm install

3. Configure Environment Variables

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


Use authorised API endpoints and keep all credentials private. Never commit .env.local to the repository.

4. Run the Application
bash
npm run dev


Open http://localhost:3000 in your browser.

Usage Guide
Create a Meeting: The first participant creates a room and receives a unique meeting code.
Join a Meeting: The second participant enters the code to join the video call.
Sign-Based Communication: The non-speaking participant communicates using ISL through their webcam.
Review and Approve: The interpreted text is displayed for review before sending.
AI Voice Generation: The approved message is delivered as text and converted into speech through Gnani Timbre when configured.
Speech-Based Communication: The other participant replies normally, and Gnani Prisma converts their speech into text for the non-speaking participant.

Both participants remain connected through the same video call throughout the conversation.

Future Improvements
Integration of a validated pretrained Indian Sign Language recognition model.
Expansion of ISL vocabulary and dynamic sign recognition.
Improved sentence-level sign interpretation.
Deeper Gnani Evon integration for contextual language refinement.
Support for additional Indian languages.
Reduced latency in real-time transcription and voice generation.
Improved accessibility and multilingual communication.
Contributing

Contributions to SamvaadAI are welcome, particularly in sign language recognition, AI integration, accessibility and real-time communication.

Fork the repository.
Create a feature branch.
Implement and test your changes.
Submit a pull request with a clear description.

SamvaadAI — Building bridges between signs, speech and people.
