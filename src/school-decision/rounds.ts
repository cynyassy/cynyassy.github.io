interface RoundDefinition { date: string; title: string; intake: readonly number[]; message: string }
export const rounds: readonly RoundDefinition[] = [
  { date: 'July 2014', title: 'The first list.', intake: [], message: 'Select the four lowest-performing students for transfer to a Hindi-medium section.' },
  { date: 'November 2014', title: 'Another review. Another four names.', intake: [41,42,43,44], message: 'The previous transfers are recorded. Four new students have joined Class III A. Submit another four names for transfer using the latest marks.' },
  { date: 'March 2015', title: 'The instruction has not changed.', intake: [45,46,47,48], message: 'Another review is due. Four places are required again. Select four students for transfer and submit your list.' },
];
