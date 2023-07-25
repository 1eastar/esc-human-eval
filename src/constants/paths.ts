import path from "path";

export const paths = {
  SCORES: path.join(process.cwd(), "/scores.json"),
  FiveShot: path.join(process.cwd(), "/results/5shot_result.json"),
  USR: path.join(process.cwd(), "/results/usr_result.json"),
  BOTH: path.join(process.cwd(), "/results/both_result.json"),
  GPT_OPT: path.join(process.cwd(), "/results/chatgpt_with_opt_results.json"),
  OPT: path.join(process.cwd(), "/results/opt_results.json"),
}

export const basePath = process.env.NODE_ENV == 'production' ? 'https://es-human-eval.vercel.app' : 'http://0.0.0.0:3000'
