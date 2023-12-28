import path from "path";

export const paths = {
  DATA: path.join(process.cwd(), "/results/final.json"),
}

export const basePath = process.env.NODE_ENV == 'production' ? 'https://esc-human-eval.vercel.app' : 'http://0.0.0.0:3000'
