import path from "path";

export const paths = {
  RATIOANLES: path.join(process.cwd(), "/results/rationales.json"),
}

export const basePath = process.env.NODE_ENV == 'production' ? 'https://mr-human-eval.vercel.app' : 'http://0.0.0.0:3000'
