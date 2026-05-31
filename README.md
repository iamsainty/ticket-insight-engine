# Ticket Insight Engine

A full stack AI-powered analytics platform that transforms raw ticketing and support datasets into structured insights, semantic clusters, and downloadable business reports.

The system allows to upload Excel datasets containing customer tickets, complaints, issues, or support logs. The backend preprocesses the data, generates semantic embeddings using AI models, performs clustering and insight extraction, and finally produces an easy-to-understand analytical report.

The project is designed to help teams quickly identify recurring issues, customer pain points, operational bottlenecks, and trend patterns from large datasets without manually reading thousands of rows.

---

# Features

## File Upload & Validation

- Upload `.xlsx` and `.xls` files
- File validation before processing
- Secure backend upload handling
- Drag and drop upload support

## Data Preprocessing

- Cleans raw ticket data
- Removes empty and invalid rows
- Mask PII data
- Standardizes text
- Prepares content for AI processing

## AI Embedding Generation

- Converts ticket text into semantic vector embeddings
- Uses transformer-based embedding models
- Captures contextual meaning of ticket descriptions

## Intelligent Clustering

- Groups semantically similar tickets
- Detects recurring issue patterns
- Identifies common categories automatically

## Report Generation

- Creates downloadable reports
- Structured insight summaries

## Modern Frontend Experience

- Minimal and responsive UI
- Real-time upload flow
- Loading states and progress feedback
- Clean report visualization

---

# Tech Stack

## Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- React Icons

### Frontend Responsibilities

- File upload interface
- Drag-and-drop handling
- API communication
- Report visualization
- Download functionality
- User interaction states

---

## Backend

- FastAPI
- Python
- Uvicorn

### Backend Responsibilities

- File validation
- Data preprocessing
- AI pipeline orchestration
- Embedding generation
- Clustering
- Report creation
- API management

---

## AI & Data Processing

### Embedding Model

The system uses transformer-based embeddings to convert textual ticket descriptions into high-dimensional semantic vectors.

These embeddings help the system understand:

- Similar meaning
- Contextual relationships
- Intent similarity
- Complaint patterns

### Clustering

Clustering algorithms group similar tickets together automatically.

The clustering layer helps identify:

- Repeated operational issues
- High-frequency customer problems
- Department-wise patterns
- Emerging issue trends

### Preprocessing Pipeline

The preprocessing stage:

- Cleans text
- Removes unnecessary characters
- Mask PII data
- Handles missing values
- Normalizes ticket content
- Prepares structured input for embedding generation

---

# Project Architecture

## High-Level Flow

```text
User Uploads Excel File
            ↓
Frontend Sends File to Backend API
            ↓
Backend Validates File
            ↓
Excel Parsing
            ↓
Data Preprocessing
            ↓
AI Embedding Generation
            ↓
Semantic Clustering
            ↓
Insight Extraction
            ↓
Report Generation
            ↓
Frontend Displays Results
            ↓
User Downloads Report
```

---

# Local Setup Guide

# Prerequisites

Make sure the following are installed on your system:

- Node.js
- npm or pnpm
- Python 3.10+
- pip
- Git

---

# Clone Repository

```bash
git clone https://github.com/iamsainty/ticket-insight-engine
cd ticket-insight-engine
```

---

# Frontend Setup

Navigate to the frontend directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# Backend Setup

Navigate to backend directory:

```bash
cd server
```

Create virtual environment:

## Windows

```bash
python -m venv venv
venv\Scripts\activate
```

## macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend server:

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

# Environment Variables

## Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Backend `.env`

```env
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_DEPLOYMENT=
AZURE_OPENAI_API_VERSION=
```

---

# Supported File Formats

- `.xlsx`
- `.xls`

---

# Development Notes

## Frontend Development

The frontend is designed with:

- Component-based architecture
- Reusable UI patterns
- Minimal and clean interface design
- Responsive layouts

## Backend Development

The backend follows:

- Modular service architecture
- Separated business logic
- Scalable API structure
- Async processing patterns

---

# Use Cases

This platform can be used for:

- Customer support analytics
- Helpdesk issue analysis
- Complaint trend monitoring
- IT service management
- Product issue identification
- Operations analysis
- Customer experience insights

---

# Contributing

Contributions are welcome.

To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push branch
5. Open a pull request

---

# License

This project is licensed under the MIT License.

---

# Author

Designed and Developed with &hearts; by Priyanshu Chaurasiya.

- GitHub: https://github.com/iamsainty
- LinkedIn: https://linkedin.com/in/iamsainty
- Website: https://www.heysainty.com/
