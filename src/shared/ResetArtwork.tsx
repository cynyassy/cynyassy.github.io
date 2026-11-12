/** Cover illustration using the app's predefined choices, not participant results. */
export function ResetArtwork() {
  return <svg viewBox="0 0 1200 750" role="img" aria-label="Project RESET illustration: a personal check-in becomes a shared picture. Selected experiences on the left flow into a word cloud on the right." xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" fill="#1e1e1c"/>
    <g fontFamily="Helvetica,Arial,sans-serif">
      <text x="64" y="74" fill="#efb79e" fontSize="18" fontWeight="700" letterSpacing="3">PROJECT RESET</text>
      <text x="650" y="74" fill="#efb79e" fontSize="18" fontWeight="700" letterSpacing="3">THE LEARNING LAB</text>
      <text x="64" y="232" fill="#fff" fontSize="57" fontWeight="700" letterSpacing="-2">how do you</text>
      <text x="60" y="342" fill="#ff8851" fontSize="111" fontWeight="700" letterSpacing="-6">reset?</text>
      <g fill="none" stroke="#77605a" strokeWidth="2"><rect x="64" y="400" width="205" height="60" rx="30"/><rect x="64" y="477" width="264" height="60" rx="30"/></g>
      <g fill="#fff" fontSize="24"><text x="90" y="440">Exhausted ✓</text><text x="90" y="517">Overwhelmed ✓</text></g>
      <path d="M448 388h98m-16-15 16 15-16 15" fill="none" stroke="#efb79e" strokeWidth="3"/>
      <text x="64" y="662" fill="#c8c5c1" fontSize="16" letterSpacing="2">CHECK IN</text>
      <text x="650" y="662" fill="#c8c5c1" fontSize="16" letterSpacing="2">SEE THE SHARED PICTURE</text>
    </g>
    <g fontFamily="Georgia,serif" textAnchor="middle">
      <text x="859" y="250" fill="#efb79e" fontSize="61">Overwhelmed</text>
      <text x="859" y="318" fill="#ff8851" fontSize="61">Never enough</text>
      <text x="860" y="389" fill="#fff" fontSize="48" fontStyle="italic">Can’t sleep</text>
      <text x="859" y="457" fill="#dd5140" fontSize="64">Exhausted</text>
      <text x="859" y="520" fill="#efb79e" fontSize="42">Brain fog · Lonely</text>
      <text x="859" y="577" fill="#fff" fontSize="35" fontStyle="italic">Disconnected</text>
    </g>
    <g><rect y="738" width="240" height="12" fill="#46878a"/><rect x="240" y="738" width="240" height="12" fill="#80b9c4"/><rect x="480" y="738" width="240" height="12" fill="#dd5140"/><rect x="720" y="738" width="240" height="12" fill="#ff8851"/><rect x="960" y="738" width="240" height="12" fill="#d49632"/></g>
  </svg>;
}
