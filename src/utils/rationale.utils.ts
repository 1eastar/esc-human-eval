

export function makePatientDataSimple(patientData: string) {
  const [base, MRIData] = patientData.split('Also, based on their MRI scans:')
  const simplifiedMRIData = MRIData.replaceAll('This patient has ', "")
  return base + "\nAlso, based on their MRI scans:" + simplifiedMRIData
}
