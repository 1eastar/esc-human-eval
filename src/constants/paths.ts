import path from "path";

export const paths = {
  SCORES: path.join(process.cwd(), "/results/scores.json"),
  USR: path.join(process.cwd(), "/results/usr_result.json"),
  SYS: path.join(process.cwd(), "/results/sys_result.json"),
  BOTH: path.join(process.cwd(), "/results/both_result.json"),
}
