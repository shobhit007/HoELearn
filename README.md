# HoELearn - LMS Mobile Application

A modern Learning Management System (LMS) mobile application built with Expo, React Native, TypeScript, Redux Toolkit, and Expo Router.

## Overview

HoELearn allows users to discover courses, bookmark content, enroll in courses, view course details, access learning content through WebView, and manage their profile. The application demonstrates modern mobile development practices including authentication, state management, API integration, offline awareness, local persistence, and native device capabilities.

---

## Features

### Authentication

- User Registration
- User Login
- Secure authentication token storage using Expo SecureStore
- Automatic session restoration on app launch
- Protected routes and authentication guards
- Logout functionality

### Course Management

- Browse available courses
- Search and filter courses
- Pull-to-refresh support
- View detailed course information
- Enroll in courses
- Bookmark courses for later access

### WebView Integration

- Course content displayed inside WebView
- Native to WebView communication
- WebView to Native communication

### User Profile

- Profile information display
- Profile image upload using Expo Image Picker
- Enrolled course statistics
- Bookmarked course statistics

### Notifications

- Local notifications using Expo Notifications
- Bookmark milestone notifications
- Scheduled reminder notifications

### Network Handling

- Axios-based API layer
- Request and response interceptors
- Timeout handling
- Retry mechanism for failed requests
- User-friendly error messages
- Offline connection awareness banner

---

## Technical Stack

### Frontend

- React Native
- Expo
- TypeScript
- Expo Router

### State Management

- Redux Toolkit
- React Redux

### Styling

- NativeWind (Tailwind CSS)

### Networking

- Axios

### Storage

- Expo SecureStore
- AsyncStorage

### Native Features

- Expo Notifications
- Expo Image Picker
- React Native WebView
- NetInfo

---

## Project Structure

```text
app/
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
│
├── (tabs)/
│   ├── home.tsx
│   ├── bookmarks.tsx
│   └── profile.tsx
│
├── course/
│   └── [id].tsx
│
├── mycourses.tsx
│
├── _layout.tsx
└── index.tsx

src/
├── components/
├── api/
├── hooks/
├── services/
├── store/
├── constants/
├── config/
└── utils/
```

---

## Architecture Highlights

### Authentication Flow

- Secure token storage using Expo SecureStore
- Redux state hydration on app launch
- Route protection using authentication guards
- Automatic user session restoration

### API Layer

- Centralized Axios instance
- Request interceptors for authentication
- Response interceptors for error handling
- Retry mechanism for failed requests
- Timeout management

### State Management

Redux Toolkit is used to manage:

- Authentication state
- Bookmarked courses
- Enrolled courses

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd HoELearn
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npx expo start
```

### Run Android

```bash
npx expo run:android
```

### Run iOS

```bash
npx expo run:ios
```

---

## Assumptions

- Public APIs are used to simulate LMS data.
- Course enrollment is maintained locally.
- Authentication is implemented using the provided API endpoints and persisted locally.
- Course content is simulated through WebView-rendered HTML.

---

## Author

Shobhit Saini

React Native Developer
