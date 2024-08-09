# Pro Formula Project

This project is an entry for the [2024 Gemini API Developer Competition](https://ai.google.dev/competition).

## Tech Stacks

- NextJS 14
- Typescript
- TailwindCSS
- Shadcn UI
- Google Gemini API
- Vercel AI SDK

## Features

1. **Direct Search**: This feature is the application's foundational functionality. When a user types the name of a formula or theorem, the application returns a detailed description, a rendered version of the equation, its usage, and a copyable LaTeX code.
2. **Multi-step Search**: Following the implementation of the Direct Search feature, I recognized that users might not always remember or know the exact names of the equations or theorems they seek. To address this, I developed the Multi-step Search feature, which provides users with a series of options to refine their search within STEM fields, helping them locate the desired information more effectively.
3. **Convert**: This feature allows users to convert images of handwritten equations into a digital format suitable for journals and research articles. Initially, this functionality was not part of the original plan. However, based on my personal experience as an undergraduate aerospace engineering student, I realized the importance of including this feature to assist in the preparation of academic papers that often require precise mathematical equations to explain scientific concepts.

### Future Project Plans

1. **Enhance Multistep Search Functionality:** Add a "Request More" button at the bottom of the output display in the Multistep Search feature, allowing users to retrieve additional theorems or formulas that may not have been included in the initial results.
2. **Integrate User Formula Management:** Implement DrizzleORM, Turso, and Lucia Auth (or an alternative authentication system) to enable users to save formulas or theorems they search for or select in both Direct Search and Multistep Search. These saved items will be stored in a personalized formula space within the user dashboard, allowing users to curate their own custom formula sheets.
3. **Integrate Google Scholar Links:** Enhance both the Direct Search and Multistep Search features by providing relevant journal articles or research papers linked to the search results. By integrating Google Scholar links with SERPAPI, users can easily access academic resources that correspond to the formulas or theorems they searched for, offering deeper insights and further reading.
4. **Leverage Google DeepMind Technologies:** Integrate cutting-edge technologies from Google's 'AlphaProof' and 'AlphaGeometry2' projects to transform the platform into a leading-edge research tool in STEM fields. This collaboration will provide unparalleled support for complex scientific and mathematical research, making the tool indispensable for researchers.

## How to run this project in local environment?

1. Clone the repository: `git clone https://github.com/Seokhyeon315/latex-generator-ai.git
`
2. Install dependencies by running `pnpm install`.
3. To use AI features, create an `.env` file on root directory of this project, and add API Key wih `GOOGLE_GENERATIVE_AI_API_KEY="YOUR_API_KEY"`. You can refer `.env.example`.
4. To run on local developement server, `pnpm run dev`.

### Technical Challenges

1. The primary challenge lies in managing the LaTeX code response from the Gemini API. Frequently, the Gemini API returns responses with an excessive number of backslashes. To address this, I have developed distinct rendering functions for markdown, LaTeX code, and rendered mathematical equations. While this usually works well, issues arise with certain responses, such as `$$H = - \\nsum_{i=1}^n (p_i * log_2(p_i))$$`. In this example, the `\n` should be removed to correctly render the sigma symbol. However, using a global replacement like `replace(/\\n/g, '\n')` inadvertently affects other formulas, resulting in rendering issues. Therefore, a more nuanced solution is needed to handle such cases without compromising the overall quality of the rendered output.
2. I initially chose to deploy it on Vercel using their Free plan. This seemed like a suitable option for production at first. However, I soon encountered a significant limitation: the Free plan enforces a 10-second timeout on serverless functions. Given that the multi-step search process often requires more than 10 seconds to retrieve and return the necessary data, this timeout led to frequent failures in production. To handle these errors, I implemented a frontend error notification using toast.error('There was an error on multi-step search. Please try again'), which alerts users when the search fails due to the timeout. Interestingly, when running the project locally, the multi-step search completed without any issues, as there were no such time constraints. Realizing that the timeout issue on Vercel was a significant roadblock, I decided to switch the deployment to Railway. Although Railway is not a free service, it offers more flexibility and does not impose the same strict timeout limits on serverless functions, allowing the multi-step search functionality to work smoothly in a production environment.

3. Currently, I have added an 'experimental' badge next to the Convert navigation menu due to certain limitations. First, when an image is directly taken from an iPhone, it is usually in HEIC format and tends to be large because of Apple's resolution enhancement system. Initially, I attempted to implement an image conversion function to convert HEIC or other formats to PNG and reduce the image size for compatibility with the Gemini Vision API. However, I found that this additional function was redundant and negatively impacted the user experience, leading to its removal. Additionally, I explored using the GoogleAIFileManager, but due to my limited expertise, it disrupted the entire image conversion functionality. The system performs optimally when handwritten equations are written on an iPad, successfully converting them to a digital format. This indicates strong potential, but there are still issues to address. When users attach images of handwritten equations on paper, errors occur, likely due to the images being too blurry or too large in size. For example, a common error is:

   ```zsh
   ⨯ SyntaxError: Unterminated string in JSON at position 1048576
       at JSON.parse (<anonymous>)
       at e.exports.emit (node:events:514:28)
       at IncomingMessage.emit (node:events:514:28)
       at HTTPParser.parserOnBody (node:_http_common:131:24)
   digest: "685094622"
   ```
