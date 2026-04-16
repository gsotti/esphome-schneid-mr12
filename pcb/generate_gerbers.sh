#!/usr/bin/env bash
# =============================================================================
# generate_gerbers.sh
# Generate Gerber files and drill files for the Schneid MR-12 RS485 Adapter PCB
# using kicad-cli (KiCad 8 command-line interface).
#
# Usage:
#   ./generate_gerbers.sh
#
# Requirements:
#   - KiCad 8 installed with kicad-cli in PATH
#     macOS:  /Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli
#     Linux:  kicad-cli (if installed system-wide)
#
# Output:
#   gerbers/   — all Gerber layers + drill files + job file
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PCB_FILE="${SCRIPT_DIR}/schneid-mr12-adapter.kicad_pcb"
OUTPUT_DIR="${SCRIPT_DIR}/gerbers"

# ---------------------------------------------------------------------------
# Locate kicad-cli
# ---------------------------------------------------------------------------
if command -v kicad-cli &>/dev/null; then
    KICAD_CLI="kicad-cli"
elif [ -x "/Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli" ]; then
    KICAD_CLI="/Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli"
elif [ -x "/usr/lib/kicad/bin/kicad-cli" ]; then
    KICAD_CLI="/usr/lib/kicad/bin/kicad-cli"
else
    echo "ERROR: kicad-cli not found. Please install KiCad 8 or add kicad-cli to your PATH." >&2
    exit 1
fi

echo "Using kicad-cli: ${KICAD_CLI}"
echo "PCB file:        ${PCB_FILE}"
echo "Output dir:      ${OUTPUT_DIR}"
echo ""

# ---------------------------------------------------------------------------
# Create output directory
# ---------------------------------------------------------------------------
mkdir -p "${OUTPUT_DIR}"

# ---------------------------------------------------------------------------
# Export Gerber layers
# ---------------------------------------------------------------------------
echo "Exporting Gerber layers..."
"${KICAD_CLI}" pcb export gerbers \
    --output "${OUTPUT_DIR}" \
    --layers "F.Cu,B.Cu,F.Paste,B.Paste,F.SilkS,B.SilkS,F.Mask,B.Mask,Edge.Cuts,F.CrtYd,F.Fab" \
    --use-drill-file-origin \
    --no-x2-attributes \
    --include-border-title \
    "${PCB_FILE}"

echo "Gerber layers exported."
echo ""

# ---------------------------------------------------------------------------
# Export drill files (Excellon format)
# ---------------------------------------------------------------------------
echo "Exporting drill files..."
"${KICAD_CLI}" pcb export drill \
    --output "${OUTPUT_DIR}/" \
    --format excellon \
    --drill-origin absolute \
    --excellon-separate-th \
    --generate-map \
    --map-format gerberx2 \
    "${PCB_FILE}"

echo "Drill files exported."
echo ""

# ---------------------------------------------------------------------------
# List output files
# ---------------------------------------------------------------------------
echo "Generated files in ${OUTPUT_DIR}:"
ls -lh "${OUTPUT_DIR}/"

echo ""
echo "Done. Verify with a Gerber viewer (e.g. gerbview or https://gerber.ucamco.com/) before submitting to fab."
echo ""
echo "Recommended fab stackup for this board:"
echo "  - 2-layer FR4"
echo "  - Board size: 65mm x 45mm"
echo "  - Thickness: 1.6mm"
echo "  - Copper: 1oz (35um)"
echo "  - Surface finish: HASL or ENIG"
echo "  - Solder mask: Green"
echo "  - Min trace/space: 0.2mm/0.2mm"
echo "  - Min via drill: 0.4mm"
