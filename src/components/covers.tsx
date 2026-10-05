/** Generated cover art for essays, drawn on an 800 by 450 grid with one accent. */
function art(kind: string) {
  let a = '';
  if (kind === 'contour') {
    for (let i = 1; i <= 5; i++) a += `<ellipse class="s" cx="440" cy="235" rx="${i * 58}" ry="${i * 34}"/>`;
    a += '<path class="al" d="M170 90 L290 150 L250 196 L360 220 L338 240 L420 232"/><circle class="a" cx="440" cy="235" r="12"/>';
  }
  if (kind === 'tree') {
    a =
      '<rect class="s" x="150" y="190" width="90" height="70" rx="12"/><path class="s" d="M240 225H330"/><path class="s" d="M330 160h110l30 65-30 65H330z"/>' +
      '<path class="s" d="M470 225 C 530 225 530 130 590 130M470 225h120M470 225 C 530 225 530 320 590 320"/><rect class="s" x="590" y="108" width="80" height="44" rx="10"/>' +
      '<rect class="a" x="590" y="203" width="80" height="44" rx="10"/><rect class="s" x="590" y="298" width="80" height="44" rx="10"/>';
  }
  if (kind === 'bars') {
    const hs = [150, 210, 110, 250, 180, 270, 140, 220, 120];
    hs.forEach((h, i) => (a += `<rect class="${i === 5 ? 'a' : 's'}" x="${190 + i * 48}" y="${350 - h}" width="28" height="${h}" rx="6"/>`));
    a += '<path class="s" d="M160 350H640"/>';
  }
  if (kind === 'retry') {
    a = '<rect class="s" x="150" y="150" width="120" height="150" rx="16"/><rect class="s" x="530" y="150" width="120" height="150" rx="16"/>';
    for (let i = 0; i < 3; i++) a += `<path class="${i === 0 ? 'al' : 's'}" d="M270 ${180 + i * 45}H530"/>`;
    a += '<circle class="a" cx="590" cy="225" r="12"/>';
  }
  if (kind === 'clocks') {
    a =
      '<circle class="s" cx="280" cy="225" r="110"/><circle class="s" cx="520" cy="225" r="110"/><path class="al" d="M280 225V140M280 225l60 30"/>' +
      '<path class="s" d="M520 225V140M520 225l48 42"/><circle class="a" cx="280" cy="225" r="8"/>';
  }
  if (kind === 'roc') {
    a = '<path class="s" d="M220 370V80M220 370H600"/><path class="s" d="M220 370L600 80"/><path class="al" d="M220 370C230 190 330 100 600 80"/><circle class="a" cx="300" cy="150" r="9"/>';
  }
  if (kind === 'quant') {
    let d = 'M180 360';
    for (let i = 0; i < 8; i++) d += `H${180 + (i + 1) * 55}V${360 - (i + 1) * 34}`;
    a = `<path class="s" d="M180 360C300 330 420 140 620 90"/><path class="al" d="${d}"/>`;
  }
  if (kind === 'pixels') {
    const on = ['0,1', '0,2', '1,0', '1,1', '1,2', '1,3', '2,1', '2,2', '2,3', '3,2', '0,3', '2,0'];
    for (let i = 0; i < 16; i++) {
      const r = Math.floor(i / 4);
      const c = i % 4;
      a += `<rect class="${r === 1 && c === 2 ? 'a' : 's'}" x="${290 + c * 56}" y="${115 + r * 56}" width="44" height="44" rx="8"${on.includes(r + ',' + c) ? '' : ' opacity=".35"'}/>`;
    }
  }
  return a;
}

let grid = '';
for (let i = 0; i <= 800; i += 40) grid += `<path class="g" d="M${i} 0V450"/>`;
for (let i = 0; i <= 450; i += 40) grid += `<path class="g" d="M0 ${i}H800"/>`;

export function Cover({ kind }: { kind: string }) {
  return (
    <svg
      className="cover"
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: grid + art(kind) }}
    />
  );
}
