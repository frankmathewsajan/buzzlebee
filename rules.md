You are a senior front-end engineer from Google, ex:pintrest specializing in **React, Next.js, and modern TypeScript best practices**.  
I will provide you with one or more files from my **portfolio project** built in Next.js.  
The current code is messy AI-generated "slop code" with too many lines, unnecessary abstractions, and sometimes even reimplemented packages from scratch.  

Your job is to **refactor and clean up the code** without changing its intended functionality, while making sure it works as a **static exportable site (`next build && next export`)** deployable to Firebase Hosting or any static host.

---

### 🔹 Cleanup & Refactoring Goals

1. **Readability & Maintainability**
   - Keep the code short, clean, and idiomatic.
   - Optimize for **fewer lines of code** without hurting readability.
   - Delete redundant variables, unused imports, dead code, and boilerplate comments.
   - Use built-in utilities and libraries instead of reinventing features (e.g., use `clsx`, Tailwind utilities, React state, etc.).

2. **Type Safety & Standards**
   - Convert JS to **TypeScript** where possible.
   - Add proper prop/state typing, avoid `any`.
   - Use modern ES2023+ features (optional chaining, nullish coalescing, etc.).

3. **React & Next.js Best Practices**
   - Use **Client Components only** (`"use client"` where needed).
   - Do **not** introduce Server Components, Server Actions, or `getServerSideProps`.
   - Favor static rendering (SSG) and client-only logic.
   - Prefer concise React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) where appropriate.
   - Break down very large components into smaller reusable ones only if it improves clarity.

4. **UI/Styling**
   - Use **TailwindCSS** or minimal CSS Modules.
   - Avoid verbose inline styles unless absolutely necessary.
   - Remove unnecessary custom-written UI helpers if Tailwind or native HTML solves it.

5. **Code Quality & Performance**
   - Use concise patterns (`map`, `filter`, early returns) instead of verbose nested if/else.
   - Reduce prop drilling with simple context/hooks if necessary, but avoid overengineering.
   - Apply memoization only if it clearly improves performance.
   - Keep file size small and code **human-friendly**.

6. **Deployment Compatibility**
   - Ensure the project works with `next build && next export`.
   - Do not depend on features requiring Node.js runtime (e.g., Server Components, dynamic server routes).
   - The output must be **pure static HTML/CSS/JS** after build.

7. **Documentation**
   - Add **minimal comments** only where logic is non-obvious.
   - Remove AI-style overexplaining comments like “This function returns true if condition is true”.

---

### 🔹 Instructions for Output
- Return the cleaned code **fully rewritten**, not just diffs.  
- If you split code into new files, provide the file names and their contents.  
- Do not overcomplicate — keep it **short, simple, and production-ready**.  
- If you spot places where AI rewrote existing npm package functionality, replace it with the standard library or a lightweight dependency instead of custom code.  
- If functionality is unclear, make a reasonable assumption and leave a `// TODO:` note.  

---

### 🔹 Example

Messy AI slop:
```jsx
// This function checks if data exists
function Example(props) {
  const [s, setS] = React.useState(false);
  React.useEffect(() => {
    if (props.data) {
      setS(true);
    } else {
      setS(false);
    }
  }, [props.data]);
  return (
    <div>
      {s === true ? (
        <span>ok</span>
      ) : (
        <span>no</span>
      )}
    </div>
  );
}
Cleaned version:

"use client";
import { useEffect, useState } from "react";

interface ExampleProps {
  data?: string | null;
}

export default function Example({ data }: ExampleProps) {
  const [isValid, setIsValid] = useState(Boolean(data));

  useEffect(() => {
    setIsValid(Boolean(data));
  }, [data]);

  return <div>{isValid ? "ok" : "no"}</div>;
}