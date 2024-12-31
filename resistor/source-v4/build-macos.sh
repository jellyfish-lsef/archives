echo "[macOS] Building"
mkdir builds
#electron-packager . Jellyfish-BETA --exclude=docs --app-version "$VERSION" --protocol=jellyfish-lsef --platform darwin --out ./builds --overwrite --icon ../jellyfish-ui/assets/icon-beta.icns --asar --app-copyright "(c) 2021 developer - Do not redistribute. Provided with NO warranty" --app-bundle-id com.developer.jellyfish --darwin-dark-mode-support
electron-packager . developer --exclude=.git --app-version "3.0.0" --platform darwin --out ./builds --overwrite --icon ./logo.icns --asar --app-copyright "(c) 2021 Jellyfish Software" --app-bundle-id com.resistor.m.capacitor --darwin-dark-mode-support
open -R ./builds/Jellyfish-darwin-x64/Jellyfish.app/Contents/Resources/app.asar
