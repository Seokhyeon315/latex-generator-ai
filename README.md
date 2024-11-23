# STEM Hub

A comprehensive STEM platform powered by advanced AI technologies, offering tools for formula search, LaTeX generation, proof assistance, and scientific computing.

## Current Features

1. **Direct Search**: This feature is the application's foundational functionality. When a user types the name of a formula or theorem, the application returns a detailed description, a rendered version of the equation, its usage, and a copyable LaTeX code.
2. **Multi-step Search**: Following the implementation of the Direct Search feature, I recognized that users might not always remember or know the exact names of the equations or theorems they seek. To address this, I developed the Multi-step Search feature, which provides users with a series of options to refine their search within STEM fields, helping them locate the desired information more effectively.
3. **Convert**: This feature allows users to convert images of handwritten equations into a digital format suitable for journals and research articles. Initially, this functionality was not part of the original plan. However, based on my personal experience as an undergraduate aerospace engineering student, I realized the importance of including this feature to assist in the preparation of academic papers that often require precise mathematical equations to explain scientific concepts.

### Technical Challenges

1. The primary challenge lies in managing the LaTeX code response from the Gemini API. I've improved the handling of backslashes and special characters through better cleaning functions, though some edge cases still require attention. For example, certain mathematical notations like summations and integrals sometimes need special handling to render correctly.

2. I successfully resolved the deployment challenge by migrating to Railway, which provides more flexible serverless function execution times. This has significantly improved the reliability of the multi-step search functionality in production.

3. Currently, the Convert feature (marked as 'experimental') faces two main challenges:

   - Image format compatibility: While the system works well with digital inputs (e.g., iPad drawings), it has limitations with certain image formats and sizes, particularly with HEIC format from iPhones.
   - Processing large images: The system occasionally encounters JSON parsing errors when processing larger image files, indicating a need for better image preprocessing before sending to the Gemini Vision API.

4. Error Handling and User Experience: I've implemented a more robust error handling system with retry mechanisms and user-friendly error messages. The system now gracefully handles various error scenarios including invalid JSON responses and API timeouts, providing users with clear feedback and a simple "Try Again" option.

## Planned Features & Improvements

1. **Advanced AI Integration**

   - Multiple AI model support beyond Gemini
   - Specialized AI models for different STEM fields
   - Enhanced accuracy and capabilities

2. **Extended STEM Coverage**

   - Comprehensive resources for all STEM fields
   - Field-specific tools and calculators
   - Interactive simulations and visualizations

3. **Research Tools**

   - Academic paper integration
   - Citation management
   - Research collaboration features

4. **Educational Features**

   - Interactive learning modules
   - Problem-solving assistance
   - Step-by-step explanations

5. **Professional Tools**
   - Advanced computation capabilities
   - Data analysis and visualization
   - Project management features

## How to run this project in local environment?

1. Clone the repository: `git clone https://github.com/Seokhyeon315/latex-generator-ai.git
`
2. Install dependencies by running `pnpm install`.
3. To use AI features, create an `.env` file on root directory of this project, and add API Key wih `GOOGLE_GENERATIVE_AI_API_KEY="YOUR_API_KEY"`. You can refer `.env.example`.
4. To run on local developement server, `pnpm run dev`.
