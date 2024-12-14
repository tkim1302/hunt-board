# HuntBoard

A powerful tool to track your job applications.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo: See HuntBoard in Action](#demo-see-huntboard-in-action)
- [Usage](#usage)
- [Tech Stack](#tech-stack)

## Overview

In today's competitive job market, keeping track of multiple applications, interviews, and follow-ups can be overwhelming. **HuntBoard** simplifies this process by offering an interactive and visually appealing platform inspired by Trello's drag-and-drop design. With HuntBoard, users can :

- Track application statuses (e.g., Applied, Interview, Offer, Rejected).
- View progress at a glance using an intuitive dashboard with drag-and-drop feature.
- Add, edit, delte and organize job applications.
- Customize stages to fit all individuals' workflows.

## Demo: See HuntBoard in Action

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Usage

### Signing In

1. Click `LET'S GET STARTED` button to sign in.
2. Sign in with either Google or Github.

### Adding Job Cards(Applications)

1. Click the `+` button below each stage title to create a new job entry.
2. Fill in the job details(Job title and Company are required) and save.

### Managing Applications

1. Drag and drop applications across different stages (e.g., from `Applied` to `Interview`) based on their current status.
2. Click on a Job Card to edit or see details.
3. Hover on a Job Card to see delete button.

### Changing Themes

1. Click the theme button on the top right corner to switch between light / dark mode.

### Signing Out

1. Click profile on the top right corner to see Sign out option.

## Tech Stack

### Frontend

- React
- Typescript
- Tailwind CSS
- Framer Motion

### Backend

- Next.js

### Database

- MongoDB

### Authentication

- NextAuth.js (Google / Github Authentication)
