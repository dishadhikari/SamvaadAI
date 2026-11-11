
# SamvaadAI
### Every Voice Deserves to Be Heard.

**An AI-powered communication platform bridging Indian Sign Language and spoken communication through Gnani AI.**

SamvaadAI enables non-speaking individuals to communicate effortlessly with people who speak normally through a shared, real-time video calling experience.
Demo Video- https://drive.google.com/file/d/1YVckQVy5MBim6qPXXN49KbhueaLKFwez/view?usp=sharing
Github Repository- https://github.com/dishadhikari/SamvaadAI

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Modules (Project Structure)](#system-modules-project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide (User Flow)](#usage-guide-user-flow)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

---

## Overview

### The Problem

Millions of people with speech disabilities face communication barriers in everyday conversations. While they may communicate through Indian Sign Language (ISL), most people they interact with do not understand it.

Existing video calling platforms provide connectivity, but not necessarily accessibility between different communication methods.

### Our Solution

SamvaadAI bridges this gap using artificial intelligence.

It combines real-time video calling with Gnani AI's speech technologies to enable two-way communication between non-speaking and speaking individuals.

### How It Works

#### Direction 1: Indian Sign Language to AI Voice

| Stage | Process |
|---|---|
| **Input** | Non-speaking user communicates through ISL |
| **Processing** | MediaPipe extracts hand landmarks |
| **Interpretation** | Sign recognition produces text |
| **Approval** | User reviews and approves the message |
| **Speech** | Gnani Timbre generates AI voice |
| **Output** | Speaking user receives text and audio |

#### Direction 2: Speech to Text

| Stage | Process |
|---|---|
| **Input** | Speaking user talks normally |
| **Processing** | Audio is captured from the microphone |
| **Recognition** | Gnani Prisma converts speech into text |
| **Delivery** | Transcribed text is sent through the video call |
| **Output** | Non-speaking user reads the response |

> **One video call. Two communication methods. A more inclusive conversation.**

---

## Key Features

### Real-Time Communication

- Two-person video calling using WebRTC.
- Meeting creation and joining through unique room codes.
- Live audio and video communication.
- Connection status and reconnection handling.

### Sign Language Communication

- Webcam-based hand landmark extraction using MediaPipe.
- Sign-to-text processing workflow.
- User approval before message delivery.
- Architecture ready for integration with a trained ISL recognition model.

### Gnani AI Integration

| Gnani Model | Role in SamvaadAI |
|---|---|
| **Prisma** | Speech-to-text transcription |
| **Timbre** | Text-to-speech generation |
| **Evon** | Contextual reasoning and language refinement |

---

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Real-Time Communication | WebRTC |
| Signaling and Messaging | Socket.IO |
| Computer Vision | MediaPipe |
| Speech-to-Text | Gnani Prisma |
| Text-to-Speech | Gnani Timbre |
| Language Reasoning | Gnani Evon |
| Network Connectivity | STUN and TURN |

---

## System Modules (Project Structure)

SamvaadAI is organised into interconnected modules responsible for communication, AI processing and accessibility.

| Module | Responsibility |
|---|---|
| **Room Management** | Creates and manages meeting rooms |
| **Video Communication** | Handles real-time audio and video |
| **Sign Processing** | Extracts hand landmarks from webcam input |
| **Text Interpretation** | Converts available sign recognition output into text |
| **Message Approval** | Allows users to review and approve messages |
| **Speech Recognition** | Processes spoken audio using Gnani Prisma |
| **Voice Generation** | Generates speech using Gnani Timbre |
| **Real-Time Messaging** | Transfers messages between participants |
| **AI Reasoning** | Provides an extension point for Gnani Evon |

---

## Installation & Setup

### Prerequisites

- Node.js
- npm
- Gnani AI API credentials
- TURN server credentials for cross-network video communication

### 1. Clone the Repository

```bash
git clone https://github.com/dishadhikari/SamvaadAI.git
cd SamvaadAI/samvaadai
```

### 2. Install Dependencies

```bash
npm install
```


### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Visit:

```text
http://localhost:3000
```

---

## Usage Guide (User Flow)

### Step 1: Create a Meeting

The first participant creates a meeting room and receives a unique meeting code.

### Step 2: Join the Meeting

The second participant enters the meeting code and joins the same video call.

### Step 3: Start Communicating

The non-speaking participant communicates using Indian Sign Language, while the other participant speaks normally.

### Step 4: Interpret and Approve

The sign-processing workflow produces text for the non-speaking participant to review and approve.

### Step 5: Deliver the Message

The approved message is delivered to the speaking participant as text and, when configured, as AI-generated speech through Gnani Timbre.

### Step 6: Receive a Response

The speaking participant replies normally. Gnani Prisma transcribes their speech and displays the resulting text to the non-speaking participant.

**The conversation continues in both directions without leaving the video call.**

---

## Future Improvements

- Expansion of supported ISL vocabulary.
- Deeper Gnani Evon integration for contextual language refinement.
- Dynamic sign recognition and sentence-level interpretation.
- Support for multiple Indian languages.
- Improved real-time speech and voice processing.
- Enhanced accessibility and multilingual communication.

---

## Contributing

Contributions are welcome in areas including:

- Indian Sign Language recognition.
- Computer vision and machine learning.
- AI and speech technology integration.
- Real-time communication.
- Accessibility and inclusive design.

### Contribution Steps

1. Fork the repository.
2. Create a new feature branch.
3. Implement your changes.
4. Test your implementation.
5. Submit a pull request with a clear description.

---

## Our Vision

> Communication is a basic human right. It should never be limited by one's ability to speak.

SamvaadAI aims to make conversations more accessible by bringing together signs, speech and artificial intelligence.

---

### SamvaadAI

**Every Voice Deserves to Be Heard.**
