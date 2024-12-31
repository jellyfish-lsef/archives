echo "[macOS] Building"
mkdir builds
#electron-packager . Jellyfish-BETA --exclude=docs --app-version "$VERSION" --protocol=jellyfish-lsef --platform darwin --out ./builds --overwrite --icon ../jellyfish-ui/assets/icon-beta.icns --asar --app-copyright "(c) 2021 developer - Do not redistribute. Provided with NO warranty" --app-bundle-id com.developer.jellyfish --darwin-dark-mode-support
electron-packager . Fluidity --exclude=.git --app-version "3.0.0" --platform darwin --out ./builds --overwrite --icon ./logo.icns --asar --app-copyright "(c) " --app-bundle-id com.fluidity.m.capacitor --darwin-dark-mode-support
open -R ./builds/Fluidity-darwin-x64/Fluidity.app/Contents/Resources/app.asar
