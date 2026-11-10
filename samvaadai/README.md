# SamvaadAI

SamvaadAI is a two-person WebRTC calling experience that pairs an Indian Sign Language (ISL) communication workflow with readable captions and approved-message voice generation.

## Run

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`, then select **Create a meeting** from `/meet`. Use a second browser profile or device to join with the six-digit code.

## What works

- Socket.IO signaling, two-person room limit, offer/answer and ICE exchange.
- Camera/microphone permissions, local and remote video, mute/camera controls, elapsed duration, state feedback and ICE restart handling.
- Metered STUN/TURN configuration served from a server route; no TURN credential is shipped in browser source.
- Editable, explicitly approved ISL messages with real MediaPipe hand-landmark extraction. There is no claim of full ISL translation: without reviewed classifier weights, it remains a manual interpretation workflow.
- Browser live captions as a usable fallback and a server-side Prisma adapter ready for an account-specific official endpoint.
- Server-side Timbre adapter and replay controls for approved messages only.

## Important configuration

`.env.local` is ignored by Git. Configure the official endpoints supplied by Gnani for the account before enabling the providers:

```env
GNANI_TIMBRE_URL=
GNANI_PRISMA_URL=
```

The application intentionally does not guess provider endpoints or return fake AI results. Video, typed captions and approved text still work if either provider is unavailable. See `EXTERNAL_SETUP_GUIDE.md` for endpoint expectations and deployment notes.

## Limitations before production

Room metadata is in process memory. Run this custom Socket.IO server as a long-lived Node service; use persistent shared room state, authenticated signaling, rate limits and a managed TURN allocation flow for a multi-instance production deployment. Call media is peer-to-peer and is not recorded by this app.

# SamvaadAI — AI-Powered Indian Sign Language Video Communication Platform

**SamvaadAI** is an AI-powered, real-time video communication platform designed to bridge the communication gap between Deaf and hearing individuals. It leverages **Indian Sign Language (ISL) Recognition**, **Speech Recognition**, **Natural Language Processing**, and **Text-to-Speech (TTS)** technologies to enable seamless two-way communication.

The platform integrates real-time video calling with intelligent translation pipelines, allowing Deaf users to communicate through Indian Sign Language while hearing users can respond naturally through speech.

**Built with the vision of making communication accessible, inclusive, and barrier-free.**

---

## Table of Contents

1. Overview
2. Key Features
3. Architecture
4. Tech Stack
5. System Modules
6. Installation & Setup
7. Environment Configuration
8. Usage Guide
9. Project Structure
10. Testing
11. Security & Privacy
12. Future Improvements
13. Contributing
14. License

---

# Overview

**SignSaathi** aims to eliminate communication barriers between Deaf and hearing individuals through AI-powered, two-way translation during real-time video calls.

Unlike traditional sign-language recognition applications that focus only on isolated gestures, SignSaathi is designed as an integrated communication platform that combines video calling, sign recognition, speech processing, and multilingual intelligence.

The platform supports two independent communication workflows:

### 1. Indian Sign Language to Speech

A Deaf user communicates using Indian Sign Language (ISL).

- Captures live video through the user's camera.
- Extracts hand landmarks and body pose information.
- Processes visual movements through an extensible sign recognition pipeline.
- Converts recognized sign sequences into meaningful text.
- Displays translated captions to the hearing participant.
- Converts translated text into natural speech using Gnani Timbre.

### 2. Speech to Text

A hearing user communicates naturally through their microphone.

- Captures live audio.
- Processes speech using Gnani Prisma.
- Identifies spoken language where supported.
- Converts speech into text.
- Displays live captions to the Deaf participant.
- Optionally generates spoken output using text-to-speech.

Both communication pipelines operate independently and simultaneously, allowing participants to communicate naturally without requiring both individuals to know sign language.

> **SignSaathi is built to make digital communication more inclusive by combining real-time video calling with intelligent sign-language and speech translation.**

---

# Key Features

## Real-Time Video Calling

Built using **WebRTC** for peer-to-peer audio and video communication.

Features:

- Create a video call.
- Join calls using unique room IDs.
- Share invitation links.
- Live audio and video streaming.
- Camera on/off controls.
- Microphone mute/unmute.
- Switch camera.
- End call functionality.
- Connection status indicators.
- Responsive video-call interface.

---

## Indian Sign Language Recognition

An extensible AI-powered pipeline designed to interpret Indian Sign Language.

Features:

- Real-time camera frame processing.
- Hand landmark detection using MediaPipe.
- Body pose tracking.
- Facial expression and movement feature extraction where supported.
- Temporal sequence recognition.
- Sentence-level translation architecture.
- Confidence-based prediction handling.
- Recognition of supported sign vocabulary.
- Uncertain sign detection and clarification requests.

Technologies:

- OpenCV
- MediaPipe
- PyTorch
- LSTM / Transformer-based sequence recognition

**Note:** MediaPipe is used for visual landmark extraction, not direct sign-language translation. Actual ISL interpretation requires a separately trained or integrated recognition model. Translation capabilities depend on the available training dataset and implemented vocabulary.

---

## Speech Recognition — Gnani Prisma

Integrates **Gnani Prisma** for speech-to-text processing.

Features:

- Real-time speech processing where supported.
- Speech-to-text conversion.
- Partial transcription.
- Language identification where supported.
- Hindi, English, and Hinglish processing subject to API capabilities.
- Live caption delivery.
- Modular speech recognition architecture.

---

## Natural Text-to-Speech — Gnani Timbre

Uses **Gnani Timbre** to generate natural-sounding speech from translated text.

Features:

- Text-to-speech conversion.
- Natural voice output.
- Support for available Indian language voices.
- Optional spoken translation.
- Adjustable speech playback speed.
- Repeat translation functionality.

---

## AI-Powered Language Intelligence

Designed to support multilingual communication.

Target languages:

- English
- Hindi
- Hinglish
- Tamil
- Telugu
- Kannada
- Malayalam
- Bengali
- Marathi

Features:

- Automatic language detection where supported.
- Manual output language selection.
- Language switching during active calls.
- Mixed-language sentence handling.
- Preservation of names and numbers.
- Context-aware sentence processing.
- Modular LLM integration through Gnani Evon where available.

Language support depends on the capabilities of the configured AI services.

---

## Live Translation & Captions

Provides translated communication in real time.

Features:

- Live translated captions.
- Separate speech and sign translation displays.
- Original and translated conversation views.
- Detected language indicators.
- Translation status indicators.
- Confidence-based recognition feedback.
- Conversation history with timestamps.

---

## Smart Communication Repair

Designed to handle uncertain recognition results.

Features:

- Confidence-based prediction handling.
- Detection of incomplete signs.
- Repeat-sign prompts.
- Clarification requests.
- Text correction functionality.
- Prevention of fabricated translations.

When recognition confidence is insufficient, the system requests clarification instead of presenting an unreliable translation.

---

## Accessibility Features

Designed with accessibility as a core requirement.

Features:

- Adjustable caption font size.
- High-contrast mode.
- Customizable captions.
- Accessible interface controls.
- Large interactive buttons.
- Responsive desktop and mobile layouts.
- Adjustable speech speed.

---

## Conversation History

Maintains translated conversation messages during communication.

Features:

- Timestamped messages.
- Translated text history.
- Speech transcription history.
- Repeat last generated speech.
- Optional transcript saving.
- User-controlled conversation retention.

---

# Architecture

SignSaathi follows a modular, asynchronous architecture with independent pipelines for video communication, sign recognition, speech recognition, translation, and speech generation.

```text
              USER A (Deaf / ISL User)
                       |
                       |
                Camera + Microphone
                       |
                       v
              WebRTC Video Stream
                       |
                       v
             ISL Recognition Pipeline
                       |
              +------------------+
              | OpenCV           |
              | MediaPipe        |
              | PyTorch Model    |
              +------------------+
                       |
                       v
              Sign Sequence Recognition
                       |
                       v
              Translation Engine
                       |
                       v
                Translated Text
                       |
                       v
                 Gnani Timbre
                       |
                       v
                Generated Speech
                       |
                       v
              USER B (Hearing User)


              USER B (Hearing User)
                       |
                       |
                Microphone Input
                       |
                       v
                Gnani Prisma
                       |
                       v
               Speech Recognition
                       |
                       v
               Transcription Text
                       |
                       v
              Language Processing
                       |
                       v
                Translated Text
                       |
                       v
              WebSocket Communication
                       |
                       v
              USER A (Deaf User)
```

### Real-Time Communication Layer

```text
              USER A
                 |
                 |
                 v
            WebRTC Client
                 |
                 |
          Signaling Server
                 |
                 |
                 v
            FastAPI Backend
                 |
                 |
          WebSocket Events
                 |
                 |
                 v
            WebRTC Client
                 |
                 |
              USER B
```

The signaling server coordinates connection establishment, while WebRTC handles real-time media transmission.

---

# Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, TypeScript, Tailwind CSS |
| **Backend** | Python, FastAPI |
| **Real-Time Communication** | WebRTC, WebSockets |
| **Sign Recognition** | MediaPipe, OpenCV, PyTorch |
| **Sequence Recognition** | LSTM, Transformers |
| **Speech Recognition** | Gnani Prisma |
| **Text-to-Speech** | Gnani Timbre |
| **Language Intelligence** | Gnani Evon / LLM |
| **Database** | PostgreSQL |
| **Caching** | Redis |
| **Authentication** | Secure Token-Based Authentication |
| **Deployment** | Docker |
| **Testing** | Pytest, Frontend Testing Tools |

---

# System Modules

| Module | Description |
|---|---|
| **Authentication Module** | Handles user authentication and authorization |
| **Video Calling Module** | Manages real-time video and audio communication |
| **Sign Recognition Module** | Extracts visual landmarks and recognizes supported ISL sequences |
| **Speech Recognition Module** | Converts spoken language into text using Gnani Prisma |
| **Translation Module** | Handles language processing and translated text generation |
| **Text-to-Speech Module** | Generates natural speech using Gnani Timbre |
| **Multilingual Module** | Handles supported Indian languages and language switching |
| **Conversation Module** | Manages live captions and conversation history |
| **Signaling Module** | Coordinates WebRTC connection establishment |
| **Security Module** | Handles access control, validation, and privacy |
| **Accessibility Module** | Provides customizable accessibility settings |

---

# Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/signsaathi.git

cd signsaathi
```

---

## 2. Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

---

## 5. Environment Configuration

Create a `.env` file in the backend directory.

```env
# Application Configuration
APP_ENV=development
SECRET_KEY=your_secret_key

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost/signsaathi

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# Gnani AI Configuration
GNANI_API_KEY=your_gnani_api_key
GNANI_PRISMA_API_URL=your_official_prisma_endpoint
GNANI_TIMBRE_API_URL=your_official_timbre_endpoint
GNANI_EVON_API_URL=your_official_evon_endpoint

# WebRTC Configuration
STUN_SERVER_URL=your_stun_server
TURN_SERVER_URL=your_turn_server
TURN_USERNAME=your_turn_username
TURN_PASSWORD=your_turn_password

# Security
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Important:**

- Never commit `.env` files to GitHub.
- Obtain API credentials from the official Gnani AI platform.
- Configure API endpoints according to official documentation.
- Never expose API keys in frontend code.
- Use mock AI adapters only for clearly labelled development environments.

---

## 6. Run the Backend

From the backend directory:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

## 7. Run the Frontend

From the frontend directory:

```bash
npm run dev
```

The frontend will run at the development URL provided by Vite.

---

# Usage Guide

### Step 1: Create an Account

- Open SignSaathi.
- Register or log in.
- Configure accessibility preferences.
- Select your preferred output language.

---

### Step 2: Create or Join a Video Call

- Click **Create Call** to generate a new room.
- Alternatively, enter an existing room ID.
- Share the invitation link with the other participant.
- Allow camera and microphone permissions.

---

### Step 3: Communicate Using Indian Sign Language

The Deaf participant can:

- Enable their camera.
- Communicate using supported ISL signs.
- Allow the recognition pipeline to process visual movements.
- View recognition results and translated captions.

The system generates spoken output for the hearing participant when the configured speech-generation service is available.

---

### Step 4: Respond Through Speech

The hearing participant can:

- Speak naturally through their microphone.
- Allow Gnani Prisma to process the speech.
- View generated transcription.
- Send translated text to the Deaf participant.

---

### Step 5: View Live Translations

Both participants can:

- View translated messages.
- Follow live captions.
- Check detected language.
- View conversation history.
- Correct recognized text.
- Request repetition when communication is unclear.

---

### Step 6: End the Call

- Click **End Call**.
- The WebRTC connection is closed.
- Temporary processing data is handled according to configured retention policies.
- Conversation transcripts are saved only when the relevant functionality and user consent are enabled.

---

# Project Structure

```text
SignSaathi/

│── README.md
│── .gitignore
│── docker-compose.yml
│── .env.example
│
├── frontend/
│   │── package.json
│   │── tsconfig.json
│   │── vite.config.ts
│   │
│   ├── public/
│   │
│   └── src/
│       │── App.tsx
│       │── main.tsx
│       │
│       ├── components/
│       │   ├── VideoCall.tsx
│       │   ├── VideoPlayer.tsx
│       │   ├── CallControls.tsx
│       │   ├── LiveCaptions.tsx
│       │   ├── TranslationPanel.tsx
│       │   └── LanguageSelector.tsx
│       │
│       ├── pages/
│       │   ├── LandingPage.tsx
│       │   ├── Login.tsx
│       │   ├── Signup.tsx
│       │   ├── Dashboard.tsx
│       │   ├── JoinCall.tsx
│       │   └── Settings.tsx
│       │
│       ├── services/
│       │   ├── webrtc.ts
│       │   ├── websocket.ts
│       │   └── api.ts
│       │
│       ├── hooks/
│       │   ├── useWebRTC.ts
│       │   ├── useSignRecognition.ts
│       │   └── useSpeechRecognition.ts
│       │
│       └── styles/
│           └── globals.css
│
├── backend/
│   │── requirements.txt
│   │── .env.example
│   │
│   └── app/
│       │── main.py
│       │── config.py
│       │── database.py
│       │
│       ├── routes/
│       │   ├── auth.py
│       │   ├── rooms.py
│       │   ├── signaling.py
│       │   ├── speech.py
│       │   └── translation.py
│       │
│       ├── services/
│       │   ├── webrtc_service.py
│       │   ├── room_service.py
│       │   ├── conversation_service.py
│       │   └── privacy_service.py
│       │
│       ├── ai/
│       │   ├── speech_recognition.py
│       │   ├── sign_recognition.py
│       │   ├── translation.py
│       │   ├── text_to_speech.py
│       │   └── language_detection.py
│       │
│       ├── providers/
│       │   ├── gnani_prisma.py
│       │   ├── gnani_timbre.py
│       │   ├── gnani_evon.py
│       │   └── mock_provider.py
│       │
│       ├── models/
│       │   ├── user.py
│       │   ├── room.py
│       │   └── conversation.py
│       │
│       └── security/
│           ├── authentication.py
│           ├── authorization.py
│           └── rate_limiter.py
│
├── ml/
│   ├── datasets/
│   ├── models/
│   ├── preprocessing/
│   │   ├── landmark_extraction.py
│   │   └── frame_processing.py
│   │
│   ├── training/
│   │   ├── train.py
│   │   └── evaluate.py
│   │
│   └── inference/
│       └── predict.py
│
├── tests/
│   ├── test_auth.py
│   ├── test_sign_recognition.py
│   ├── test_speech_recognition.py
│   ├── test_translation.py
│   ├── test_rooms.py
│   └── test_websocket.py
│
└── docs/
    ├── architecture.md
    ├── api_documentation.md
    └── setup_guide.md
```

*Note: This structure represents the proposed modular architecture. Actual files and implemented modules may vary during development.*

---

# Testing

Run backend tests using:

```bash
pytest
```

Run frontend tests using:

```bash
npm run test
```

Testing areas include:

- User authentication.
- Room creation and joining.
- WebRTC signaling.
- WebSocket communication.
- Camera and microphone permissions.
- ISL landmark extraction.
- Sign recognition confidence handling.
- Speech recognition integration.
- Translation pipeline.
- Text-to-speech generation.
- Multilingual processing.
- Privacy and authorization controls.

Performance testing should measure actual:

- Speech recognition latency.
- Sign recognition latency.
- Translation latency.
- Text-to-speech startup latency.
- End-to-end communication latency.

No performance or recognition accuracy claims should be made without measured test results.

---

# Security & Privacy

SignSaathi follows a privacy-first approach.

Security measures include:

- Secure user authentication.
- HTTPS/TLS communication.
- WebRTC DTLS-SRTP media encryption.
- Short-lived room access tokens.
- Random and difficult-to-guess room IDs.
- Room access authorization.
- Input validation.
- API rate limiting.
- Secure environment-based secret management.
- Protection against unauthorized room access.
- Safe error handling.
- No API credentials in frontend code.

### Privacy Measures

- No call recording by default.
- No permanent raw video or audio storage by default.
- User-controlled transcript saving.
- Temporary processing data deletion according to configured policies.
- Consent-based conversation history.
- No sensitive information in application logs.

**Note:** Encryption during transport does not automatically provide end-to-end encryption. Media processing by backend AI services must be considered when defining the platform's privacy guarantees.

---

# Future Improvements

- Advanced sentence-level ISL recognition.
- Larger Indian Sign Language datasets.
- Transformer-based sign sequence recognition.
- Improved facial expression and body movement analysis.
- Continuous multilingual speech translation.
- More Indian language voices.
- Advanced contextual language processing.
- AI-powered communication repair.
- Sign language learning module.
- Group video calling.
- Mobile application for Android and iOS.
- Offline sign recognition.
- Improved network adaptation.
- Cloud deployment and scalability.
- Advanced accessibility customization.
- Optional encrypted transcript storage.
- Real-time communication analytics.

---

# Contributing

Contributions are always welcome!

To contribute:

1. Fork the repository.

2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

Please ensure that new AI integrations, recognition models, and language capabilities are properly tested and documented before submitting contributions.

---

# License

This project is intended to promote accessibility, inclusion, and innovation in assistive communication technology.

Feel free to use, modify, and distribute this project according to the terms of the repository's selected open-source license.

---

# Our Vision

**SignSaathi — Breaking Communication Barriers, One Conversation at a Time.**

We believe that language differences and hearing disabilities should never prevent people from connecting, sharing ideas, or building meaningful relationships.

Through Artificial Intelligence, Indian Sign Language recognition, and real-time speech communication, SignSaathi aims to make digital conversations more accessible to everyone.

**Technology should adapt to people, not the other way around.**
