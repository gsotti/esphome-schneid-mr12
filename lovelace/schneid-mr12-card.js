/**
 * schneid-mr12-card.js  —  Custom Home Assistant Lovelace Card
 * ================================================================
 *
 * Displays a live SVG system diagram of a Fernwärme (district heating)
 * transfer station with Heizkreis 1 and Boilerkreis 1.
 *
 * Installation
 * ────────────
 * 1. Copy this file to your HA configuration www directory:
 *      <ha-config>/www/schneid-mr12-card.js
 *
 * 2. Register it as a Lovelace resource:
 *      Settings → Dashboards → ⋮ (top-right menu) → Resources
 *      → + Add Resource
 *        URL:  /local/schneid-mr12-card.js
 *        Type: JavaScript Module
 *
 * 3. Add the card to a dashboard view (Raw YAML editor or UI):
 *      type: custom:schneid-mr12-card
 *      entity_prefix: heating_schneid_mr_12   # optional — this is the default
 *      title: Fernwärme Übergabestation        # optional
 *
 * Entity requirements
 * ───────────────────
 * All entities live under the prefix  sensor.<entity_prefix>_*  or
 * binary_sensor.<entity_prefix>_*  as listed in the card source below.
 *
 * No external dependencies — pure vanilla JS, Shadow DOM, inline SVG.
 */

class SchneidMr12Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // ── Lovelace lifecycle ──────────────────────────────────────────────────────

  setConfig(config) {
    this._config = {
      title: 'Fernwärme Übergabestation',
      entity_prefix: 'heating_schneid_mr_12',
      ...config,
    };
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() { return 7; }

  // ── Entity helpers ──────────────────────────────────────────────────────────

  /** Read a numeric sensor value. Returns null when unavailable/unknown. */
  _v(name, domain = 'sensor') {
    if (!this._hass) return null;
    const eid = `${domain}.${this._config.entity_prefix}_${name}`;
    const st  = this._hass.states[eid];
    if (!st || st.state === 'unavailable' || st.state === 'unknown') return null;
    const v = parseFloat(st.state);
    return isNaN(v) ? null : v;
  }

  /** Read a binary_sensor; returns true when state === 'on'. */
  _isOn(name) {
    if (!this._hass) return false;
    const eid = `binary_sensor.${this._config.entity_prefix}_${name}`;
    return this._hass.states[eid]?.state === 'on';
  }

  // ── Format helpers ──────────────────────────────────────────────────────────

  /** Format temperature: "XX.X°"  or '--' when null. */
  _ft(val, dec = 1) {
    if (val === null || val === undefined) return '--';
    return val.toFixed(dec) + '°';
  }

  /** Map temperature value → display colour. */
  _tc(t) {
    if (t === null || t === undefined) return '#455a64';
    if (t > 70) return '#c62828';
    if (t > 60) return '#e63946';
    if (t > 50) return '#f4511e';
    if (t > 40) return '#fb8c00';
    if (t > 30) return '#f9a825';
    if (t > 20) return '#43a047';
    return '#0288d1';
  }

  /** Numeric operating-mode status → German label. */
  _statusLabel(v) {
    if (v === null || v === undefined) return '--';
    const map = { 0: 'AUS', 1: 'EIN', 3: 'RL-Begr.', 4: 'Hand', 9: 'Auto' };
    return map[Math.round(v)] ?? String(Math.round(v));
  }

  /** Numeric mixer status → label. */
  _mixerLabel(v) {
    if (v === null || v === undefined) return '--';
    const map = { 0: 'STAND', 1: 'AUF \u25b2', 2: 'ZU \u25bc' };
    return map[Math.round(v)] ?? String(Math.round(v));
  }

  /** Format power in W or kW. */
  _fLeistung(v) {
    if (v === null || v === undefined) return '--';
    if (Math.abs(v) >= 1000) return (v / 1000).toFixed(2) + '\u202fkW';
    return v.toFixed(0) + '\u202fW';
  }

  /** Format energy in kWh or MWh. */
  _fEnergie(v) {
    if (v === null || v === undefined) return '--';
    if (Math.abs(v) >= 1000) return (v / 1000).toFixed(2) + '\u202fMWh';
    return v.toFixed(1) + '\u202fkWh';
  }

  /** Format volumetric flow in l/h. */
  _fDurchfluss(v) {
    if (v === null || v === undefined) return '--';
    return v.toFixed(0) + '\u202fl/h';
  }

  // ── SVG pump symbol ─────────────────────────────────────────────────────────

  /**
   * Returns an SVG <g> string for a spinning pump, centred at (cx, cy).
   * Active:   green fill, glow filter, animated rotating impeller blades.
   * Inactive: grey fill, static blades.
   */
  _pump(cx, cy, active) {
    const bg     = active ? '#00c853' : '#37474f';
    const stroke = active ? '#00e676' : '#546e7a';
    const blade  = active ? 'white'   : '#78909c';
    const lc     = active ? '#00e676' : '#546e7a';
    const filt   = active ? ' filter="url(#glow)"' : '';
    const spin   = active
      ? `<animateTransform attributeName="transform" attributeType="XML" ` +
        `type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite"/>`
      : '';
    return (
      `<g transform="translate(${cx},${cy})">` +
        `<circle r="17" fill="${bg}" stroke="${stroke}" stroke-width="2"${filt}/>` +
        `<g>${spin}` +
          `<path d="M0,-11 L7,5 L-7,5Z" fill="${blade}"/>` +
          `<path d="M0,-11 L7,5 L-7,5Z" fill="${blade}" transform="rotate(120)"/>` +
          `<path d="M0,-11 L7,5 L-7,5Z" fill="${blade}" transform="rotate(240)"/>` +
        `</g>` +
        `<circle r="4" fill="${bg}"/>` +
        `<text y="30" text-anchor="middle" font-size="9" font-weight="bold" fill="${lc}">${active ? 'ON' : 'OFF'}</text>` +
      `</g>`
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────

  _render() {
    if (!this._config) return;

    // ── Read all sensor values ────────────────────────────────────────────────
    const tAussen     = this._v('aussentemperatur');
    const tMittel     = this._v('aussentemperatur_mittel');
    const tRlPrim     = this._v('rl_primar_t7');
    const tVlSek      = this._v('vl_sekundar_t8');
    const tSollVlSek  = this._v('solltemperatur_vl_sekundar');
    const tMaxRl      = this._v('max_rucklauftemperatur_primar');
    const stUST       = this._v('status_ubergabestation');
    const tVlHK1      = this._v('vl_heizkreis_1');
    const tSollHK1    = this._v('solltemperatur_heizkreis_1');
    const stHK1       = this._v('status_heizkreis_1');
    const stMixHK1    = this._v('status_mischer_heizkreis_1');
    const tBoilerTop  = this._v('speicher_1_oben_t9');
    const tSollBoiler = this._v('solltemperatur_vl_boiler_1');
    const stBoiler    = this._v('status_boilerkreis_1');
    const leistung    = this._v('leistung');
    const durchfluss  = this._v('durchfluss');
    const energie     = this._v('warmemenge');
    const wmzVL       = this._v('wmz_vorlauftemperatur');
    const wmzRL       = this._v('wmz_rucklauftemperatur');

    // ── Read all binary sensors ───────────────────────────────────────────────
    const pumpeHK1    = this._isOn('pumpe_heizkreis_1');
    const pumpeBoiler = this._isOn('pumpe_boiler_1');
    const zubringer   = this._isOn('zubringpumpe');

    // ── Derived values ────────────────────────────────────────────────────────
    // Spreizung WMZ = wmzVL − wmzRL  (spec: NOT wmzVL − rlPrim)
    const spreizWMZ = (wmzVL !== null && wmzRL !== null) ? wmzVL - wmzRL : null;
    // Spreizung ÜST = T8 − T7
    const spreizUST = (tVlSek !== null && tRlPrim !== null) ? tVlSek - tRlPrim : null;
    // Delta HK1 = VL − Soll  (positive = too hot, negative = too cold)
    const deltaHK1  = (tVlHK1 !== null && tSollHK1 !== null) ? tVlHK1 - tSollHK1 : null;

    // Circuit active states
    const ustActive    = stUST    !== null && stUST    > 0;
    const hk1Active    = stHK1    !== null && stHK1    > 0;
    const boilerActive = stBoiler !== null && stBoiler > 0;

    // ── Tank fill (fills from BOTTOM) ─────────────────────────────────────────
    // ratio = T9/80, clamped to [0.05, 1.0]
    const tankRatio = tBoilerTop !== null
      ? Math.max(0.05, Math.min(1.0, tBoilerTop / 80))
      : 0.05;
    const TX = 650, TY = 252, TW = 70, TH = 228;  // tank outer rect
    const innerH  = TH - 8;                         // 4 px inset top + bottom
    const fillPx  = Math.max(8, Math.round(innerH * tankRatio));
    const fillTop = TY + TH - 4 - fillPx;           // bottom-anchored fill

    // ── Colour lookups ────────────────────────────────────────────────────────
    const cRlPrim = this._tc(tRlPrim);
    const cVlSek  = this._tc(tVlSek);
    const cVlHK1  = this._tc(tVlHK1);
    const cWmzVL  = this._tc(wmzVL);
    const cWmzRL  = this._tc(wmzRL);
    const cBoiler = this._tc(tBoilerTop);

    const deltaColor = (deltaHK1 !== null && Math.abs(deltaHK1) > 3) ? '#fb8c00' : '#43a047';
    const deltaText  = deltaHK1 !== null
      ? (deltaHK1 >= 0 ? '+' : '') + deltaHK1.toFixed(1) + '\u00b0'
      : '--';

    // ── Theme colours per circuit ─────────────────────────────────────────────
    const ustDot  = ustActive    ? '#4caf50' : '#546e7a';
    const ustHdr  = ustActive    ? '#1b5e20' : '#37474f';
    const ustText = ustActive    ? '#a5d6a7' : '#90a4ae';
    const ustLbl  = this._statusLabel(stUST);

    const hk1Dot  = hk1Active    ? '#00e676' : '#546e7a';
    const hk1Hdr  = hk1Active    ? '#1b5e20' : '#37474f';
    const hk1Text = hk1Active    ? '#a5d6a7' : '#90a4ae';
    const hk1SBg  = hk1Active    ? '#1b5e20' : '#37474f';
    const hk1SCol = hk1Active    ? '#69f0ae' : '#78909c';
    const hk1Lbl  = this._statusLabel(stHK1);
    const mixLbl  = this._mixerLabel(stMixHK1);

    const bkDot   = boilerActive ? '#f48fb1' : '#546e7a';
    const bkHdr   = boilerActive ? '#880e4f' : '#37474f';
    const bkText  = boilerActive ? '#f8bbd0' : '#90a4ae';
    const bkSBg   = boilerActive ? '#880e4f' : '#37474f';
    const bkSCol  = boilerActive ? '#f8bbd0' : '#78909c';
    const bkLbl   = this._statusLabel(stBoiler);

    // Pipe opacity: dim when the circuit is inactive
    const opHK1 = hk1Active    ? '0.85' : '0.28';
    const opBK  = boilerActive ? '0.85' : '0.28';

    const title = this._config.title;

    // ── Build the HTML (style + SVG) ──────────────────────────────────────────
    const html = `
<style>
  :host   { display: block; }
  svg     { display: block; width: 100%; height: auto; }
  @keyframes flowR { from { stroke-dashoffset: 24; }  to { stroke-dashoffset:   0; } }
  @keyframes flowL { from { stroke-dashoffset:  0; }  to { stroke-dashoffset: -24; } }
  @keyframes pulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
  .fr { animation: flowR 1s linear       infinite; }
  .fl { animation: flowL 1s linear       infinite; }
  .pu { animation: pulse 2s ease-in-out  infinite; }
</style>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 575"
     font-family="'Segoe UI',Arial,sans-serif" font-size="12">
  <defs>
    <!-- Background & card gradients -->
    <linearGradient id="bg"   x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#1a1a2e"/>
      <stop offset="100%" stop-color="#16213e"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#1f2940"/>
      <stop offset="100%" stop-color="#172033"/>
    </linearGradient>
    <!-- Header accent bar -->
    <linearGradient id="hbar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#e63946"/>
      <stop offset="50%"  stop-color="#ff6b35"/>
      <stop offset="100%" stop-color="#e63946"/>
    </linearGradient>
    <!-- Glow filter — used on large numbers and active pump circles -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- Drop-shadow for cards -->
    <filter id="shadow">
      <feDropShadow dx="2" dy="3" stdDeviation="4"
                    flood-color="#000000" flood-opacity="0.4"/>
    </filter>
    <!-- Subtle inner shadow for temperature badges -->
    <filter id="innerShadow">
      <feDropShadow dx="0" dy="1" stdDeviation="2"
                    flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- ══════════════════════════ BACKGROUND ══════════════════════════════════ -->
  <rect width="1050" height="575" fill="url(#bg)" rx="12"/>

  <!-- ══════════════════════════ HEADER (y 0–56) ═════════════════════════════ -->
  <rect x="0"   y="0"  width="1050" height="56" fill="#0d1321" rx="12"/>
  <rect x="0"   y="28" width="1050" height="28" fill="#0d1321"/>
  <!-- Accent bar -->
  <rect x="15"  y="16" width="6"    height="26" rx="3" fill="url(#hbar)"/>
  <!-- Title -->
  <text x="30"  y="37" font-size="18" font-weight="bold" fill="#e0e0e0">${title}</text>
  <!-- Outdoor temperature — header centre -->
  <text x="525" y="21" text-anchor="middle" font-size="9"
        fill="#546e7a" letter-spacing="1">AUSSENTEMPERATUR</text>
  <text x="525" y="46" text-anchor="middle" font-size="22"
        font-weight="bold" fill="#48cae4"
        filter="url(#glow)">${tAussen !== null ? tAussen.toFixed(1) : '--'}°</text>
  <!-- ÜST status — right of header -->
  <circle cx="862" cy="28" r="5" fill="${ustDot}" class="pu"/>
  <text x="874"  y="33" font-size="10" fill="${ustText}">ÜST: ${ustLbl}</text>
  <text x="1038" y="20" text-anchor="end" font-size="9"  fill="#546e7a">schneid-mr12.local</text>
  <text x="1038" y="34" text-anchor="end" font-size="8"  fill="#37474f">Modbus 0x01 | 19200 Bd</text>
  <text x="1038" y="49" text-anchor="end" font-size="8"  fill="#263238">ESP32-C3</text>

  <!-- ═══════════════════════ LEFT COLUMN (x 15–205) ═════════════════════════ -->

  <!-- ── Außentemperatur card (y 65–187) ─────────────────────────────────── -->
  <rect x="15" y="65" width="190" height="122" rx="10"
        fill="url(#card)" filter="url(#shadow)" stroke="#263238" stroke-width="1"/>
  <text x="110" y="86"  text-anchor="middle" font-size="10" fill="#90a4ae"
        font-weight="bold" letter-spacing="1">AUSSENTEMPERATUR</text>
  <text x="110" y="132" text-anchor="middle" font-size="44"
        font-weight="bold" fill="#48cae4"
        filter="url(#glow)">${tAussen !== null ? tAussen.toFixed(1) : '--'}°</text>
  <text x="110" y="153" text-anchor="middle" font-size="10"
        fill="#546e7a">Mittel: ${tMittel !== null ? tMittel.toFixed(1) + '°' : '--'}</text>
  <text x="110" y="170" text-anchor="middle" font-size="8"
        fill="#37474f">T6 · sensor.aussentemperatur</text>

  <!-- ── Wärmemengenzähler card (y 197–505) ───────────────────────────────── -->
  <rect x="15" y="197" width="190" height="308" rx="10"
        fill="url(#card)" filter="url(#shadow)" stroke="#263238" stroke-width="1"/>
  <!-- Header tint + label -->
  <rect x="15" y="197" width="190" height="26" rx="10" fill="#f57f17" opacity="0.12"/>
  <rect x="15" y="213" width="190" height="10" fill="url(#card)"/>
  <text x="110" y="214" text-anchor="middle" font-size="10"
        fill="#ffd54f" font-weight="bold" letter-spacing="1">WÄRMEMENGENZÄHLER</text>

  <!-- Leistung — 24 px, amber glow -->
  <text x="110" y="238" text-anchor="middle" font-size="9" fill="#78909c">Leistung</text>
  <text x="110" y="265" text-anchor="middle" font-size="24"
        font-weight="bold" fill="#ffd54f"
        filter="url(#glow)">${this._fLeistung(leistung)}</text>

  <line x1="25" y1="275" x2="195" y2="275" stroke="#263238" stroke-width="1"/>

  <!-- Durchfluss -->
  <text x="30"  y="291" font-size="9"  fill="#78909c">Durchfluss</text>
  <text x="197" y="291" text-anchor="end" font-size="11"
        font-weight="bold" fill="#b0bec5">${this._fDurchfluss(durchfluss)}</text>

  <line x1="25" y1="300" x2="195" y2="300" stroke="#263238" stroke-width="1"/>

  <!-- WMZ VL / RL — coloured by temperature -->
  <text x="30"  y="316" font-size="9" fill="#78909c">WMZ Vorlauf</text>
  <text x="197" y="316" text-anchor="end" font-size="12"
        font-weight="bold" fill="${cWmzVL}">${this._ft(wmzVL)}</text>
  <text x="30"  y="334" font-size="9" fill="#78909c">WMZ Rücklauf</text>
  <text x="197" y="334" text-anchor="end" font-size="12"
        font-weight="bold" fill="${cWmzRL}">${this._ft(wmzRL)}</text>

  <line x1="25" y1="343" x2="195" y2="343" stroke="#263238" stroke-width="1"/>

  <!-- Spreizung = wmzVL − wmzRL -->
  <text x="30"  y="359" font-size="9" fill="#78909c">Spreizung</text>
  <text x="197" y="359" text-anchor="end" font-size="12"
        font-weight="bold" fill="#fb8c00">${spreizWMZ !== null ? spreizWMZ.toFixed(1) + ' K' : '--'}</text>

  <line x1="25" y1="368" x2="195" y2="368" stroke="#263238" stroke-width="1"/>

  <!-- Energie total — 22 px, green glow -->
  <text x="110" y="387" text-anchor="middle" font-size="9" fill="#78909c">Energie gesamt</text>
  <text x="110" y="415" text-anchor="middle" font-size="22"
        font-weight="bold" fill="#81c784"
        filter="url(#glow)">${this._fEnergie(energie)}</text>
  <text x="110" y="432" text-anchor="middle" font-size="8" fill="#37474f">kumuliert</text>

  <line x1="25" y1="442" x2="195" y2="442" stroke="#263238" stroke-width="1"/>

  <!-- Circuit status summary -->
  <text x="30"  y="457" font-size="9" fill="#78909c">Status ÜST</text>
  <text x="197" y="457" text-anchor="end" font-size="10"
        font-weight="bold" fill="${ustActive ? '#69f0ae' : '#78909c'}">${ustLbl}</text>
  <text x="30"  y="476" font-size="9" fill="#78909c">Zubringpumpe</text>
  <text x="197" y="476" text-anchor="end" font-size="10"
        font-weight="bold" fill="${zubringer ? '#00e676' : '#546e7a'}">${zubringer ? 'EIN' : 'AUS'}</text>

  <!-- ════════════════════ CENTRE — ÜBERGABESTATION (x 215–473) ══════════════ -->
  <rect x="215" y="65" width="258" height="440" rx="10"
        fill="url(#card)" filter="url(#shadow)" stroke="#263238" stroke-width="1"/>

  <!-- Header row -->
  <rect x="215" y="65"  width="258" height="26" rx="10" fill="${ustHdr}" opacity="0.30"/>
  <rect x="215" y="81"  width="258" height="10" fill="url(#card)"/>
  <circle cx="233" cy="78" r="5" fill="${ustDot}" class="pu"/>
  <text x="246" y="83" font-size="11" fill="${ustText}"
        font-weight="bold" letter-spacing="1">ÜBERGABESTATION</text>
  <text x="464" y="83" text-anchor="end" font-size="9"
        fill="${ustActive ? '#4caf50' : '#546e7a'}"
        font-weight="bold">${ustLbl}</text>

  <!-- Heat exchanger icon — alternating hot/cold striped rect -->
  <rect x="228" y="101" width="83" height="72" rx="6" fill="none"
        stroke="#ff6b35" stroke-width="1.5" opacity="0.50"/>
  <line x1="238" y1="113" x2="301" y2="113" stroke="#e63946" stroke-width="2.0" opacity="0.75"/>
  <line x1="238" y1="123" x2="301" y2="123" stroke="#48cae4" stroke-width="2.0" opacity="0.65"/>
  <line x1="238" y1="133" x2="301" y2="133" stroke="#e63946" stroke-width="2.0" opacity="0.55"/>
  <line x1="238" y1="143" x2="301" y2="143" stroke="#48cae4" stroke-width="2.0" opacity="0.65"/>
  <line x1="238" y1="153" x2="301" y2="153" stroke="#e63946" stroke-width="1.5" opacity="0.38"/>
  <line x1="238" y1="163" x2="301" y2="163" stroke="#48cae4" stroke-width="1.5" opacity="0.38"/>
  <text x="269" y="180" text-anchor="middle" font-size="9"
        fill="#546e7a" font-weight="bold">WT</text>

  <!-- RL Primär T7 badge (right of HX) -->
  <text x="388" y="106" text-anchor="middle" font-size="9" fill="#78909c">RL Primär (T7)</text>
  <rect x="323" y="110" width="130" height="28" rx="6"
        fill="${cRlPrim}22" stroke="${cRlPrim}" stroke-width="1"
        filter="url(#innerShadow)"/>
  <text x="388" y="129" text-anchor="middle" font-size="17"
        font-weight="bold" fill="${cRlPrim}">${this._ft(tRlPrim)}</text>

  <!-- VL Sekundär T8 badge -->
  <text x="388" y="150" text-anchor="middle" font-size="9" fill="#78909c">VL Sekundär (T8)</text>
  <rect x="323" y="154" width="130" height="28" rx="6"
        fill="${cVlSek}22" stroke="${cVlSek}" stroke-width="1"
        filter="url(#innerShadow)"/>
  <text x="388" y="173" text-anchor="middle" font-size="17"
        font-weight="bold" fill="${cVlSek}">${this._ft(tVlSek)}</text>

  <!-- Soll / Max RL sub-labels -->
  <text x="326" y="193" font-size="9" fill="#546e7a">Soll:&#160;<tspan
        font-weight="bold" fill="#90a4ae">${this._ft(tSollVlSek)}</tspan></text>
  <text x="326" y="207" font-size="9" fill="#546e7a">Max RL:&#160;<tspan
        font-weight="bold" fill="#90a4ae">${this._ft(tMaxRl)}</tspan></text>

  <!-- ── Data rows ── -->
  <line x1="225" y1="215" x2="463" y2="215" stroke="#263238" stroke-width="1"/>
  <text x="234" y="231" font-size="9"  fill="#78909c">Spreizung (T8 – T7)</text>
  <text x="460" y="231" text-anchor="end" font-size="12"
        font-weight="bold" fill="#fb8c00">${spreizUST !== null ? spreizUST.toFixed(1) + ' K' : '--'}</text>

  <line x1="225" y1="239" x2="463" y2="239" stroke="#263238" stroke-width="1"/>
  <text x="234" y="255" font-size="9"  fill="#78909c">Leistung</text>
  <text x="460" y="255" text-anchor="end" font-size="12"
        font-weight="bold" fill="#ffd54f">${this._fLeistung(leistung)}</text>

  <line x1="225" y1="263" x2="463" y2="263" stroke="#263238" stroke-width="1"/>
  <text x="234" y="279" font-size="9"  fill="#78909c">Durchfluss</text>
  <text x="460" y="279" text-anchor="end" font-size="12"
        font-weight="bold" fill="#b0bec5">${this._fDurchfluss(durchfluss)}</text>

  <line x1="225" y1="287" x2="463" y2="287" stroke="#263238" stroke-width="1"/>
  <text x="234" y="303" font-size="9"  fill="#78909c">Energie</text>
  <text x="460" y="303" text-anchor="end" font-size="12"
        font-weight="bold" fill="#81c784">${this._fEnergie(energie)}</text>

  <line x1="225" y1="311" x2="463" y2="311" stroke="#263238" stroke-width="1"/>
  <text x="234" y="327" font-size="9"  fill="#78909c">Status ÜST</text>
  <text x="460" y="327" text-anchor="end" font-size="12"
        font-weight="bold" fill="${ustActive ? '#69f0ae' : '#78909c'}">${ustLbl}</text>

  <line x1="225" y1="335" x2="463" y2="335" stroke="#263238" stroke-width="1"/>

  <!-- Zubringpumpe row with spinning pump icon -->
  <text x="234" y="358" font-size="9" fill="#78909c">Zubringpumpe</text>
  ${this._pump(435, 356, zubringer)}

  <line x1="225" y1="390" x2="463" y2="390" stroke="#263238" stroke-width="1"/>

  <!-- Pumpe status rows -->
  <text x="234" y="407" font-size="9"  fill="#78909c">Pumpe HK1</text>
  <text x="460" y="407" text-anchor="end" font-size="10"
        font-weight="bold" fill="${pumpeHK1 ? '#00e676' : '#546e7a'}">${pumpeHK1 ? 'EIN' : 'AUS'}</text>
  <text x="234" y="425" font-size="9"  fill="#78909c">Pumpe Boiler</text>
  <text x="460" y="425" text-anchor="end" font-size="10"
        font-weight="bold" fill="${pumpeBoiler ? '#f48fb1' : '#546e7a'}">${pumpeBoiler ? 'EIN' : 'AUS'}</text>

  <!-- ═══════════════════ DISTRIBUTION PIPES (x 487/504, y 88–505) ═══════════ -->

  <!-- VL — hot supply, flows downward -->
  <line x1="487" y1="88" x2="487" y2="505" stroke="#e63946" stroke-width="5" opacity="0.85"/>
  <line x1="487" y1="88" x2="487" y2="505" stroke="#ff6b35" stroke-width="3"
        stroke-dasharray="12,12" class="fr" opacity="0.50"/>
  <!-- RL — cooled return, flows upward -->
  <line x1="504" y1="88" x2="504" y2="505" stroke="#0077b6" stroke-width="5" opacity="0.85"/>
  <line x1="504" y1="88" x2="504" y2="505" stroke="#48cae4" stroke-width="3"
        stroke-dasharray="12,12" class="fl" opacity="0.50"/>
  <!-- Pipe direction labels -->
  <text x="487" y="84" text-anchor="middle" font-size="8"
        fill="#e63946" font-weight="bold">VL</text>
  <text x="504" y="84" text-anchor="middle" font-size="8"
        fill="#48cae4" font-weight="bold">RL</text>
  <!-- Mid-pipe identification badges -->
  <rect x="461" y="396" width="52" height="16" rx="3" fill="#0d1321"
        stroke="#e63946" stroke-width="1" opacity="0.80"/>
  <text x="487" y="408" text-anchor="middle" font-size="7"
        fill="#e63946">VORLAUF</text>
  <rect x="479" y="416" width="52" height="16" rx="3" fill="#0d1321"
        stroke="#48cae4" stroke-width="1" opacity="0.80"/>
  <text x="505" y="428" text-anchor="middle" font-size="7"
        fill="#48cae4">RÜCKLAUF</text>

  <!-- ÜST ↔ Distribution — short horizontal connector segments -->
  <!-- VL Sekundär (T8) exits ÜST right edge → VL dist at y=166 -->
  <line x1="473" y1="166" x2="487" y2="166" stroke="#e63946" stroke-width="3" opacity="0.85"/>
  <line x1="473" y1="166" x2="487" y2="166" stroke="#ff6b35" stroke-width="2"
        stroke-dasharray="6,5" class="fr" opacity="0.70"/>
  <!-- Secondary return from RL dist → enters ÜST at y=355 -->
  <line x1="473" y1="355" x2="504" y2="355" stroke="#0077b6" stroke-width="3" opacity="0.85"/>
  <line x1="473" y1="355" x2="504" y2="355" stroke="#48cae4" stroke-width="2"
        stroke-dasharray="6,5" class="fl" opacity="0.70"/>

  <!-- ═══════════════════════ HEIZKREIS 1 (x 520–1035, y 65–202) ═══════════ -->
  <rect x="520" y="65" width="515" height="137" rx="10"
        fill="url(#card)" filter="url(#shadow)" stroke="#263238" stroke-width="1"/>

  <!-- HK1 header row -->
  <rect x="520" y="65"  width="515" height="26" rx="10" fill="${hk1Hdr}" opacity="0.30"/>
  <rect x="520" y="81"  width="515" height="10" fill="url(#card)"/>
  <circle cx="537" cy="78" r="5" fill="${hk1Dot}" class="pu"/>
  <text x="549" y="83" font-size="12" fill="${hk1Text}"
        font-weight="bold" letter-spacing="1">HEIZKREIS 1</text>
  <rect  x="966" y="69" width="64" height="18" rx="4" fill="${hk1SBg}"/>
  <text x="998" y="82" text-anchor="middle" font-size="9"
        fill="${hk1SCol}" font-weight="bold">${hk1Lbl}</text>

  <!-- HK1 VL pipe — dist x=487 at y=127, runs right across card -->
  <line x1="487" y1="127" x2="1035" y2="127"
        stroke="#e63946" stroke-width="3" opacity="${opHK1}"/>
  ${hk1Active ? `<line x1="487" y1="127" x2="1035" y2="127" stroke="#ff6b35" stroke-width="2" stroke-dasharray="8,8" class="fr" opacity="0.60"/>` : ''}

  <!-- HK1 RL pipe — runs back from card right to dist x=504 at y=170 -->
  <line x1="504" y1="170" x2="1035" y2="170"
        stroke="#0077b6" stroke-width="3" opacity="${opHK1}"/>
  ${hk1Active ? `<line x1="504" y1="170" x2="1035" y2="170" stroke="#48cae4" stroke-width="2" stroke-dasharray="8,8" class="fl" opacity="0.60"/>` : ''}

  <!-- Pipe stub labels -->
  <text x="514" y="122" font-size="7" fill="#e63946" opacity="0.80">VL</text>
  <text x="514" y="180" font-size="7" fill="#48cae4" opacity="0.80">RL</text>

  <!-- Mixer box -->
  <rect x="536" y="113" width="72" height="30" rx="6" fill="#263238"
        stroke="${hk1Active ? '#2e7d32' : '#546e7a'}" stroke-width="1"/>
  <text x="572" y="124" text-anchor="middle" font-size="8"  fill="#78909c">MISCHER</text>
  <text x="572" y="137" text-anchor="middle" font-size="10"
        font-weight="bold" fill="${hk1Active ? '#66bb6a' : '#78909c'}">${mixLbl}</text>

  <!-- Pump HK1 — sits on the VL line -->
  ${this._pump(660, 127, pumpeHK1)}

  <!-- VL temperature badge -->
  <text x="762" y="108" text-anchor="middle" font-size="8" fill="#78909c">VORLAUF</text>
  <rect x="712" y="111" width="100" height="30" rx="6"
        fill="${cVlHK1}1a" stroke="${cVlHK1}" stroke-width="1"
        filter="url(#innerShadow)"/>
  <text x="762" y="131" text-anchor="middle" font-size="17"
        font-weight="bold" fill="${cVlHK1}">${this._ft(tVlHK1)}</text>

  <!-- Soll badge -->
  <text x="873" y="108" text-anchor="middle" font-size="8" fill="#78909c">SOLL</text>
  <rect x="823" y="111" width="100" height="30" rx="6"
        fill="#26323866" stroke="#37474f" stroke-width="1"/>
  <text x="873" y="131" text-anchor="middle" font-size="17"
        font-weight="bold" fill="#90a4ae">${this._ft(tSollHK1)}</text>

  <!-- Delta badge (+X.X° or −X.X°) — orange if |Δ|>3, else green -->
  <text x="979" y="108" text-anchor="middle" font-size="8" fill="#78909c">DELTA</text>
  <rect x="929" y="111" width="100" height="30" rx="6"
        fill="${deltaColor}1a" stroke="${deltaColor}" stroke-width="1"/>
  <text x="979" y="131" text-anchor="middle" font-size="17"
        font-weight="bold" fill="${deltaColor}">${deltaText}</text>

  <!-- ══════════════════════ BOILERKREIS 1 (x 520–1035, y 218–500) ══════════ -->
  <rect x="520" y="218" width="515" height="282" rx="10"
        fill="url(#card)" filter="url(#shadow)" stroke="#263238" stroke-width="1"/>

  <!-- Boiler header row -->
  <rect x="520" y="218" width="515" height="26" rx="10"
        fill="${bkHdr}" opacity="${boilerActive ? '0.30' : '0.15'}"/>
  <rect x="520" y="234" width="515" height="10" fill="url(#card)"/>
  <circle cx="537" cy="231" r="5" fill="${bkDot}" class="pu"/>
  <text x="549" y="236" font-size="12" fill="${bkText}"
        font-weight="bold" letter-spacing="1">BOILERKREIS 1</text>
  <rect  x="966" y="222" width="64" height="18" rx="4" fill="${bkSBg}"/>
  <text x="998" y="235" text-anchor="middle" font-size="9"
        fill="${bkSCol}" font-weight="bold">${bkLbl}</text>

  <!-- Boiler VL — dist x=487 at y=295 → tank left -->
  <line x1="487" y1="295" x2="${TX}" y2="295"
        stroke="#e63946" stroke-width="3" opacity="${opBK}"/>
  ${boilerActive ? `<line x1="487" y1="295" x2="${TX}" y2="295" stroke="#ff6b35" stroke-width="2" stroke-dasharray="8,8" class="fr" opacity="0.60"/>` : ''}

  <!-- Boiler RL — tank left at y=455 → dist x=504 -->
  <line x1="504" y1="455" x2="${TX}" y2="455"
        stroke="#0077b6" stroke-width="3" opacity="${opBK}"/>
  ${boilerActive ? `<line x1="504" y1="455" x2="${TX}" y2="455" stroke="#48cae4" stroke-width="2" stroke-dasharray="8,8" class="fl" opacity="0.60"/>` : ''}

  <!-- Pipe stub labels -->
  <text x="514" y="290" font-size="7" fill="#e63946" opacity="0.80">VL</text>
  <text x="514" y="465" font-size="7" fill="#48cae4" opacity="0.80">RL</text>

  <!-- Pump Boiler — sits on VL line -->
  ${this._pump(612, 295, pumpeBoiler)}

  <!-- Heating coil hint — dashed vertical inside tank left edge -->
  <line x1="${TX + 7}" y1="295" x2="${TX + 7}" y2="455"
        stroke="#e63946" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.30"/>

  <!-- ── Tank visualization ── -->
  <!-- Outer shell -->
  <rect x="${TX}"   y="${TY}"   width="${TW}"   height="${TH}"   rx="9"
        fill="#111827" stroke="#546e7a" stroke-width="2"/>
  <!-- Inner background (empty) -->
  <rect x="${TX+4}" y="${TY+4}" width="${TW-8}" height="${TH-8}" rx="5"
        fill="#0d1321"/>
  <!-- Fill from BOTTOM — colour follows temperature -->
  <rect x="${TX+4}" y="${fillTop}" width="${TW-8}" height="${fillPx}" rx="3"
        fill="${cBoiler}" opacity="0.45"/>
  <!-- Water-level line -->
  <line x1="${TX+4}" y1="${fillTop}" x2="${TX+TW-4}" y2="${fillTop}"
        stroke="${cBoiler}" stroke-width="1.5" opacity="0.70" stroke-dasharray="4,3"/>
  <!-- Dome cap -->
  <ellipse cx="${TX + TW/2}" cy="${TY}" rx="${TW/2 - 1}" ry="7"
           fill="#1a2235" stroke="#546e7a" stroke-width="1.5"/>
  <!-- Tank labels -->
  <text x="${TX + TW/2}" y="${TY + 18}" text-anchor="middle"
        font-size="8" fill="#90a4ae" font-weight="bold">SP1</text>
  <text x="${TX + TW/2}" y="${TY + TH - 8}" text-anchor="middle"
        font-size="8" fill="#546e7a">${Math.round(tankRatio * 100)}%</text>
  <!-- Pipe connection dots on tank wall -->
  <circle cx="${TX}" cy="295" r="5" fill="#e63946" opacity="0.80"/>
  <circle cx="${TX}" cy="455" r="5" fill="#0077b6" opacity="0.80"/>

  <!-- ── Right info panel ── -->

  <!-- T9 Oben — large display, pink -->
  <text x="875" y="265" text-anchor="middle" font-size="9"
        fill="#f48fb1" letter-spacing="1">T9 OBEN (SPEICHER)</text>
  <rect x="733" y="271" width="284" height="50" rx="8"
        fill="#4a142833" stroke="#880e4f" stroke-width="1.5"
        filter="url(#innerShadow)"/>
  <text x="875" y="311" text-anchor="middle" font-size="34"
        font-weight="bold" fill="#f8bbd0"
        filter="url(#glow)">${this._ft(tBoilerTop)}</text>

  <!-- Soll Boiler badge -->
  <text x="875" y="337" text-anchor="middle" font-size="9" fill="#78909c">SOLLTEMPERATUR</text>
  <rect x="733" y="343" width="284" height="40" rx="6"
        fill="#1f294066" stroke="#37474f" stroke-width="1.5"/>
  <text x="875" y="373" text-anchor="middle" font-size="28"
        font-weight="bold" fill="#90a4ae">${this._ft(tSollBoiler, 0)}</text>

  <!-- Status + Pumpe row -->
  <text x="775" y="401" text-anchor="middle" font-size="9" fill="#78909c">STATUS</text>
  <rect x="733" y="407" width="130" height="28" rx="5"
        fill="${bkSBg}44" stroke="${bkHdr}" stroke-width="1"/>
  <text x="798" y="426" text-anchor="middle" font-size="14"
        font-weight="bold" fill="${bkSCol}">${bkLbl}</text>

  <text x="903" y="401" text-anchor="middle" font-size="9" fill="#78909c">PUMPE</text>
  <rect x="873" y="407" width="144" height="28" rx="5"
        fill="${pumpeBoiler ? '#00c85322' : '#37474f33'}"
        stroke="${pumpeBoiler ? '#00c853' : '#546e7a'}" stroke-width="1"/>
  <text x="945" y="426" text-anchor="middle" font-size="14"
        font-weight="bold" fill="${pumpeBoiler ? '#00e676' : '#546e7a'}">${pumpeBoiler ? 'EIN' : 'AUS'}</text>

  <!-- Mischer HK1 note inside boiler card -->
  <text x="875" y="455" text-anchor="middle" font-size="9" fill="#78909c">Mischer HK1:&#160;<tspan
        font-weight="bold" fill="${hk1Active ? '#66bb6a' : '#78909c'}">${mixLbl}</tspan></text>

  <!-- ═══════════════════════ STATUS BAR (y 512–562) ═════════════════════════ -->
  <rect x="15" y="512" width="1020" height="50" rx="10"
        fill="url(#card)" filter="url(#shadow)" stroke="#263238" stroke-width="1"/>

  <!-- ESP32-C3 chip icon -->
  <rect x="27" y="522" width="34" height="32" rx="4"
        fill="#263238" stroke="#4caf50" stroke-width="1.5"/>
  <text x="44" y="534" text-anchor="middle" font-size="7"
        fill="#4caf50" font-weight="bold">ESP32</text>
  <text x="44" y="546" text-anchor="middle" font-size="6" fill="#4caf50">C3</text>

  <!-- Host / bus info -->
  <text x="70" y="530" font-size="11" fill="#b0bec5" font-weight="bold">schneid-mr12.local</text>
  <text x="70" y="547" font-size="9"  fill="#546e7a">GPIO4=TX · GPIO3=RX · GPIO2=DE/RE · MAX485 · 19200 Bd</text>

  <!-- Status pulsing dots — Modbus + WiFi -->
  <circle cx="612" cy="526" r="5" fill="#4caf50" class="pu"/>
  <text   x="624" y="530" font-size="10" fill="#81c784">Modbus OK</text>
  <circle cx="706" cy="526" r="5" fill="#4caf50" class="pu"/>
  <text   x="718" y="530" font-size="10" fill="#81c784">WiFi OK</text>

  <!-- Per-circuit status dots -->
  <circle cx="612" cy="547" r="4" fill="${ustDot}" class="pu"/>
  <text   x="622" y="551" font-size="9" fill="${ustText}">ÜST: ${ustLbl}</text>
  <circle cx="700" cy="547" r="4" fill="${hk1Dot}" class="pu"/>
  <text   x="710" y="551" font-size="9" fill="${hk1Text}">HK1: ${hk1Lbl}</text>
  <circle cx="788" cy="547" r="4" fill="${bkDot}" class="pu"/>
  <text   x="798" y="551" font-size="9" fill="${bkText}">BK1: ${bkLbl}</text>
  <circle cx="876" cy="547" r="4"
          fill="${zubringer ? '#00e676' : '#546e7a'}" class="pu"/>
  <text   x="886" y="551" font-size="9"
          fill="${zubringer ? '#81c784' : '#546e7a'}">Zubringer: ${zubringer ? 'EIN' : 'AUS'}</text>

  <text x="1030" y="551" text-anchor="end" font-size="9" fill="#37474f">ESPHome</text>

</svg>`;

    this.shadowRoot.innerHTML = html;
  }
}

// ── Custom Element registration ───────────────────────────────────────────────

customElements.define('schneid-mr12-card', SchneidMr12Card);

window.customCards = window.customCards || [];
window.customCards.push({
  type:        'schneid-mr12-card',
  name:        'Fernwärme MR-12',
  description: 'Übergabestation Heizkreis 1 + Boilerkreis 1',
});
