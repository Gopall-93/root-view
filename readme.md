<div align="center">

  # 🟢 ROOT_VIEW 🟢
  
  ### *Turn your reality into digital rain.*
  
  <br />

  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5eXhmZ3Z5eXhmZ3Z5eXhmZ3Z5eXhmZ3Z5eXhmZ3Z5eXhmZ3Z5eXhmZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A06UFEx8jxEwU/giphy.gif" height="300" alt="Root View Demo" style="border-radius: 10px; border: 2px solid #00FF41;" />

  <br />
  <br />

  <a href="https://root-view-web.vercel.app">
    <img src="https://img.shields.io/badge/LIVE_DEMO-CLICK_HERE-00FF41?style=for-the-badge&logo=vercel&logoColor=black&labelColor=black" alt="Live Demo" />
  </a>
  <a href="https://github.com/Gopall-93/root-view/issues">
    <img src="https://img.shields.io/badge/Bug_Report-Red?style=for-the-badge&logo=github&logoColor=white&labelColor=black" alt="Bug Report" />
  </a>

</div>

<br />

## ⚡ About The Project

**Root View** is a retro-futuristic camera application that converts your live webcam feed into a real-time **ASCII Art stream**. Inspired by the cyberpunk aesthetic and *The Matrix*, it allows users to view their world through raw code.

It features a full-stack architecture with a **Monorepo** structure, secure authentication to save your favorite snapshots, and a built-in GIF recorder to capture moments in digital rain.

### 🔥 Key Features
* **Live ASCII Feed:** Real-time conversion of webcam pixel data to character strings.
* **Matrix Mode:** Distinctive "Hacker Green" aesthetic with phosphorescent decay effects.
* **GIF Recording:** Capture and export high-resolution ASCII animations (`.gif`).
* **Cloud Gallery:** Securely save snapshots to your personal cloud archive.
* **Secure Auth:** Full JWT-based Login/Signup system with HTTP-only cookies.
* **Responsive UI:** Cyberpunk HUD with modular controls and settings.

---

## 💻 Tech Stack

This project uses a modern **MERN** stack within a high-performance **Monorepo**.

<div align="center">

| **Category** | **Technologies** |
|:---:|:---|
| **Frontend** | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) |
| **Backend** | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) |
| **DevOps** | ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/Render-%2346E3B7.svg?style=for-the-badge&logo=render&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) |

</div>

---

## 🚀 Getting Started

To run **Root View** locally on your machine, follow these steps.

### Prerequisites
* Node.js (v18+)
* MongoDB URI

### Installation

1.  **Clone the Repo**
    ```bash
    git clone [https://github.com/Gopall-93/root-view.git](https://github.com/Gopall-93/root-view.git)
    cd root-view
    ```

2.  **Install Dependencies (Root)**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in `apps/api`:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    PORT=8080
    ```
    *(Frontend automatically connects to localhost:8080 in dev mode)*

4.  **Run Development Server**
    ```bash
    # Runs both Frontend and Backend concurrently
    npm run dev
    ```

5.  **Access the App**
    Open `http://localhost:5173` in your browser.

---

## 👤 Author

<div align="center">

**Gopall Sharma**

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/gopallsharma8) 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/gopall-sharma-64a559342) 
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/Gopall-93)

<br />
</div>

---

<div align="center">
  <i>Made with 💚 and digital rain.</i>
</div>
