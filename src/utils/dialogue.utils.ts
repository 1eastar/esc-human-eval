// import { Tab } from "@/constants/tabs"

export interface Scores {
//   [Tab.USR]: number
//   [Tab.BOTH]: number
//   [Tab.GOLD]: number
//   [Tab.FIVESHOT]: number
//   [Tab.GPT_OPT]: number
//   [Tab.OPT]: number
//   // baseline: number
}

interface ContextElement {
  speaker: 'seeker' | 'supporter'
  response: string
}

export function splitContext(ctx: string) {
  const split_ctx = ctx.trim().split('\n')
  console.log(split_ctx)
  const result: ContextElement[] = split_ctx.map(res => {
    if (res.includes('seeker:')) {
      return {
        speaker: 'seeker',
        response: res.replace('seeker: ', '')
      }
    } else {
      return {
        speaker: 'supporter',
        response: res.replace('supporter: ', '')
      }
    }
  })
  console.log(result)
  return result
}