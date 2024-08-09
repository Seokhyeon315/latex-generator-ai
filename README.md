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

## How to run this project in local environment?

1. Git clone the repository.
2. Since this project is using `pnpm`, you need to install dependencies by running `pnpm add`.
3. To use AI feature, create an `.env` file on root directory of this project, and add API Key wih `GOOGLE_GENERATIVE_AI_API_KEY="YOUR_API_KEY"`. You can refer `.env.example`.
4. To run on local developement server, `pnpm run dev`.

### Technical Challenges

1. The primary challenge lies in managing the LaTeX code response from the Gemini API. Frequently, the Gemini API returns responses with an excessive number of backslashes. To address this, I have developed distinct rendering functions for markdown, LaTeX code, and rendered mathematical equations. While this usually works well, issues arise with certain responses, such as `$$H = - \\nsum_{i=1}^n (p_i * log_2(p_i))$$`. In this example, the `\n` should be removed to correctly render the sigma symbol. However, using a global replacement like `replace(/\\n/g, '\n')` inadvertently affects other formulas, resulting in rendering issues. Therefore, a more nuanced solution is needed to handle such cases without compromising the overall quality of the rendered output.
2. In the multi-step search functionality, I have incorporated three elements into the `generateObject()` function provided by the Vercel AI SDK: `mode: auto`, `getMutableAIState()`, and `maxRetries`. Generally, this setup works well. However, issues arise when the Gemini API returns data in an incompatible format, leading to errors. To mitigate the impact on user experience, I have implemented a frontend error notification using `toast.error('There was an error on multi-step search. Please try again')`. Despite this, further improvements are necessary to enhance the robustness and reliability of the system.

   ```zsh
   AI_APICallError: Invalid JSON response
       at async $$ACTION_2 (./lib/actions.tsx:158:24)
   digest: "82194289"
   Cause: TypeValidationError [AI_TypeValidationError]: Type validation failed: Value: {"candidates":[{"finishReason":"RECITATION","index":0}],"usageMetadata":{"promptTokenCount":178,"totalTokenCount":178}}.
   Error message: [
   {
       "code": "invalid_type",
       "expected": "object",
       "received": "undefined",
       "path": [
       "candidates",
       0,
       "content"
       ],
       "message": "Required"
   },
   ```

3. Currently, I have added an 'experimental' badge next to the Convert navigation menu due to certain limitations. First, when an image is directly taken from an iPhone, it is usually in HEIC format and tends to be large because of Apple's resolution enhancement system. Initially, I attempted to implement an image conversion function to convert HEIC or other formats to PNG and reduce the image size for compatibility with the Gemini Vision API. However, I found that this additional function was redundant and negatively impacted the user experience, leading to its removal. Additionally, I explored using the GoogleAIFileManager, but due to my limited expertise, it disrupted the entire image conversion functionality.
4. Currently, the system performs optimally when handwritten equations are written on an iPad, successfully converting them to a digital format. This indicates strong potential, but there are still issues to address. When users attach images of handwritten equations on paper, errors occur, likely due to the images being too blurry or too large in size. For example, a common error is:

   ```zsh
   ⨯ SyntaxError: Unterminated string in JSON at position 1048576
       at JSON.parse (<anonymous>)
       at e.exports.emit (node:events:514:28)
       at IncomingMessage.emit (node:events:514:28)
       at HTTPParser.parserOnBody (node:_http_common:131:24)
   digest: "685094622"
   ```
