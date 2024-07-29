# Pro Formula Project

This is a project that generates LaTeX code for you. It is powered by Gemini AI made by Google.

## Tech Stacks

- NextJS
- Typescript
- TailwindCSS
- Shadcn UI
- Google Gemini API
- Vercel AI SDK

## Features

1. User can search the equation/formula/theorem/law by typing the name of the formula in the direct search bar, and it returns the result including the name of the formula, the equation, the description of the formula, usage, and the latex code.
2. LATEX code is copyable and after user clicks the copy button, the website shows the notification that the code is copied.

### Challenges

1. For the direct search server action, I tried to use gemini-1.5-flash, but it has some limitations of resonse. For example, if I search about `Green's Theorem`, it won't return the result. So, I have to use the `gemini-1.5-pro` model.
2. The most annoying part was how to render the reponse from the gemini api. Since this web application is dealing with mathematical equations and Latex code, I had to find a way to render the response on the frontend side properly. I tried to modify system message, describe message of `streamObject()` function schema. Now, most of the time, it works well, but sometimes gemini api response is not the format that I expected.
