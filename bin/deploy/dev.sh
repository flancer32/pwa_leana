#!/usr/bin/env bash
##
#   Rebuild JS project with modules being placed to inner folders.
##
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../" && pwd)}

echo "Remove installed dependencies and lock file."
rm -fr "${DIR_ROOT}/node_modules" "${DIR_ROOT}/package-lock.json"

echo "Re-install JS project."
cd "${DIR_ROOT}" || exit 255
npm install

echo "Remove cloned dependencies (sources)."
rm -fr "${DIR_ROOT}/own_modules/@teqfw"
rm -fr "${DIR_ROOT}/own_modules/@flancer32"

echo "Clone dependencies from github to inner folders."
mkdir -p "${DIR_ROOT}/own_modules/@teqfw/"
mkdir -p "${DIR_ROOT}/own_modules/@flancer32/"
git clone https://github.com/teqfw/di.git "${DIR_ROOT}/own_modules/@teqfw/di"
git clone https://github.com/flancer32/pwa_leana_app.git "${DIR_ROOT}/own_modules/@flancer32/pwa_leana_app"

echo "Link dependencies to '/usr/lib/node_modules/'."
cd "${DIR_ROOT}/own_modules/@teqfw/di" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@flancer32/pwa_leana_app" || exit 255
sudo npm link

echo "Link dependencies to the project."
cd "${DIR_ROOT}" || exit 255
npm link "@teqfw/di"
npm link "@flancer32/pwa_leana_app"

echo "Done."
