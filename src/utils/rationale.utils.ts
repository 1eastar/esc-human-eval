import { ModelResponse } from "../../pages/home";


export function makePatientDataSimple(patientData: string) {
  // const [base, MRIData] = patientData.split('Also, based on their MRI scans:')
  // const simplifiedMRIData = MRIData.replaceAll('This patient has ', "")
  // return base + "\nAlso, based on their MRI scans:" + simplifiedMRIData
  return patientData
}

export function makeRationaleDataSimple(modelResponse: ModelResponse): string[] {
  return [
    '- stage: ' + modelResponse.stage,
    '\n',
    modelResponse.feedback.replace('[STRG FEEDBACK] ', '- strategy feedback:\n').replace('[UTT FEEDBACK] ', '\n- utterance feedback:\n'),
  ]
}