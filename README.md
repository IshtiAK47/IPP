# IPP - Personality and Stand Test Website

IPP is a web application built to provide users with two engaging tests: a **Personality Test** based on the MBTI framework and a **Stand Reveal Test** inspired by JoJo's Bizarre Adventure to determine a suitable Stand based on a simple multiple-choice quiz. The results are calculated using the Gemini API for enhanced accuracy and dynamic responses.

## Features
- **Personality Test (MBTI)**: A questionnaire to determine your MBTI personality type.
- **Stand Reveal Test**: A fun MCQ-based test to reveal which JoJo Stand suits you.
- **Gemini API Integration**: Leverages Google's Gemini API for result calculations and analysis.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
- **Type-Safe Code**: Uses TypeScript for robust development and ESLint for code quality.

## Tech Stack
- **Framework**: Next.js (React-based)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Code Quality**: ESLint
- **AI Integration**: Genkit, GenAI, Gemini API

## Prerequisites
- Node.js (v18 or higher)
- A Gemini API key (obtain from [Google's Gemini API](https://ai.google.dev/))

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/IshtiAK47/ipp.git
   cd ipp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Navigate to the homepage to choose between the **Personality Test** or **Stand Reveal Test**.
- Complete the respective MCQ-based test.
- Results are generated using the Gemini API and displayed dynamically.

## Building for Production
To build the project for production:
```bash
npm run build
npm run start
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, feel free to reach out via GitHub Issues.
