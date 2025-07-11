# PumpMaster

PumpMaster is an industrial pump monitoring platform built with React, TypeScript, and Vite. It simulates pump management and monitoring using mock data. Users can add, edit, delete, and view pump details. 

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/colinchan520/PumpMaster.git
```

### 2. Navigate to the Project Directory

```bash
cd PumpMaster/pumpmaster-frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open your browser and go to:

http://localhost:5173

## Login Information
Use the following login credentials:

Username: John
Password: password123

## Features
### Authentication
Login with username and password to access the pump overview.
Without login, users cannot access the overview page.
Logout clears the user session and redirects to the login page.

## Pumps Overview
Lists all pumps from mockData.json.
Search for a pump by ID using the search bar.
Click New Pump to add a new pump.
Click Edit to modify pump data using a modal form.
Click Delete to remove a pump.
Click on a pump name to view its details.

## Pump Detail Page
Displays detailed attributes of the selected pump:

Type
Area/Block
Latitude / Longitude
Flow Rate
Offset
Pressure values (Current, Min, Max)
Embedded Google Map showing the pump location based on latitude and longitude.
A pressure trend chart visualizing pressure over the last 24 hours.

## Data Source
All data is stored in the file:
```bash
src/assets/mockData.json
```
No backend service is required. All operations (add/edit/delete) modify in-memory data and reset on page refresh.

## Tech Stack
Frontend: React, TypeScript, Vite

State Management: Zustand

Styling: Tailwind CSS, Material-UI

Charts: Recharts

API Mocking: Custom middleware using mock data

Maps: Google Maps embedded via iframe

## Folder Structure
```bash
PumpMaster/
├── pumpmaster-frontend/      # Frontend source code
│   ├── public/                # Static files
│   ├── src/
│   │   ├── api/               # API abstraction
│   │   ├── assets/            # Mock data
│   │   ├── components/        # UI components
│   │   ├── pages/             # Application pages
│   │   ├── stores/            # Zustand store
│   │   └── main.tsx           # App entry point
```

## Limitations
No persistent database.

Data resets on page refresh.

Mocked API responses, not connected to a real backend.