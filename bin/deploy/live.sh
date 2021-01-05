#!/usr/bin/env bash
##
#   Rebuild JS project in production mode.
##
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../" && pwd)}
DIR_THIS=$(cd "$(dirname "$0")" && pwd)
# include commons for standalone running
. "${DIR_ROOT}/bin/commons.sh"

if test -d "${DIR_ROOT}/node_modules"; then
  err "Project is already installed. Exiting."
  exit 255
fi


info "Copy local configuration to the project:"
SRC="${DIR_ROOT}../cfg/leana.sh"
TRG="${DIR_ROOT}/cfg/local.sh"
if test -f ! "${SRC}"; then
  err "Configuration file ${SRC} is missed. Exiting."
  exit 255
fi
info "  '${SRC}' to '${TRG}'"
cp "${SRC}" "${TRG}"

SRC="${DIR_ROOT}../cfg/leana.json"
TRG="${DIR_ROOT}/cfg/local.json"
if test -f ! "${SRC}"; then
  err "Configuration file ${SRC} is missed. Exiting."
  exit 255
fi
info "  '${SRC}' to '${TRG}'"
cp "${SRC}" "${TRG}"

info "Install NodeJS application."
cd "${DIR_ROOT}" || exit 255
npm install

info "Done."
