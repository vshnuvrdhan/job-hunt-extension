# Job Hunt Assistant – Chrome Extension

A Chrome extension that helps job seekers:
- ✉️ Reply professionally to received emails
- 🔔 Track job applications and generate follow-up emails

This project is currently at Phase 1 and is fully functional for local usage.

---

## Phase 1 – Features (Completed)

### Reply to Emails
- User pastes a received email
- Selects reply tone (Polite, Formal, Casual, Technical, Short, etc.)
- Adds optional instructions
- Chooses an LLM provider
- Backend builds a structured prompt and generates a reply using Groq (Free)
- Reply is displayed directly in the sidebar

### Follow-up Email Generator
- User can save job applications locally:
  - Company name
  - Role
  - HR email (optional)
  - Applied date
- Applications are stored using chrome.storage.local
- User selects a saved application
- Chooses follow-up intent (status check, reminder, post-interview, etc.)
- Backend generates a professional follow-up email using Groq

### Architecture Highlights
- Chrome Extension (Manifest v3)
- Popup → Sidebar workflow
- React-based sidebar UI (Vite)
- Node.js + Express backend
- Prompt-driven LLM interactions
- Clean separation of concerns (UI / Backend / Prompts / LLMs)

---

## Known Limitations (Phase 1)

- Backend must be run locally
- No authentication (single-user only)
- Data stored only in browser storage
- OpenAI option exists but is not implemented yet
- No database
- No reminders or notifications
- Manual copy-paste of emails

These limitations are intentional to keep Phase 1 simple and stable.

---

## How to Run Locally (Step-by-Step)

### 1. Clone the Repository
git clone https://github.com/vshnuvrdhan/job-hunt-extension.git
cd job-hunt-extension

### 2. Setup Backend
cd backend
npm install

Create a .env file inside the backend folder:

GROQ_API_KEY=your_groq_api_key_here

Start the backend:
npm start

Backend runs at:
http://localhost:5000

### 3. Build Sidebar React App
cd ../sidebar-react
npm install
npm run build


This generates the sidebar folder used by the extension.

### 4. Load Extension in Chrome

Open Chrome

Go to chrome://extensions

Enable Developer mode

Click Load unpacked

Select the root project folder (job-hunt-extension)

### 5. Use the Extension

Click the extension icon

Choose:

Reply Mail → Generate replies

Follow-up Mail → Save applications & generate follow-ups

Sidebar opens automatically

---

### Project Structure:
job-hunt-extension/
├── backend/ # Node.js backend
│ ├── llm/ # Groq/OpenAI integrations
│ │ ├── groq.js
│ │ ├── index.js
│ │ └── openai.js
│ ├── prompts/ # Prompt engineering logic
│ │ ├── followupPrompt.js
│ │ └── replyPrompt.js
│ ├── routes/ # API routes
│ │ ├── followup.js
│ │ └── generate.js
│ ├── package.json
│ └── server.js
├── background/ # Service worker
│ └── service-worker.js
├── popup/ # Popup UI
│ ├── popup.html
│ ├── popup.css
│ └── popup.js
├── sidebar-react/ # React source (Vite)
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── style.css
│ └── components/
│ ├── FollowUpForm.jsx
│ └── ReplyForm.jsx
├── sidebar/ # Built sidebar (generated)
├── manifest.json # Chrome extension config
└── .gitignore


---

## Phase 2 – Planned Enhancements

### Authentication & User Accounts
- OAuth (Google / GitHub)
- User-specific data
- Multi-user backend support

### Database Integration
- Add a database (PostgreSQL / MongoDB)
- Persist:
  - Job applications
  - Follow-up history
  - User preferences
- Replace `chrome.storage.local` as the primary data store

### Advanced Prompt Engineering
- Smarter tone detection
- Better context handling for long emails
- Prompt compression & refinement
- Reduced hallucinations
- Dynamic prompts based on email type and intent

### Advanced LLM Integrations
- Full OpenAI support (GPT-4 and newer models)
- Additional Groq models
- Intelligent model routing:
  - Free models for drafts
  - Premium models for final replies

### Platform Improvements
- Deploy backend (Render / Railway / Fly.io)
- Remove need for local backend
- Environment-based configs
- Rate limiting and retries

### UX & Productivity Features
- Editable drafts
- One-click copy
- Gmail integration
- Follow-up reminders and notifications
- History of generated emails

---

## Roadmap Status

| Phase | Status |
|-------|--------|
| Phase 1 | Completed |
| Phase 2 | Planned |
| Phase 3 | Research / Future ideas |

---

## Philosophy

This project is intentionally built in phases to remain:
- **Simple and debuggable**  
- **Scalable for future enhancements**  
- **User-focused and practical**  

Each phase adds only the features necessary to deliver value while keeping the architecture clean.

---

## License

MIT

---

Built with care to assist job seekers in managing communications and follow-ups efficiently.
