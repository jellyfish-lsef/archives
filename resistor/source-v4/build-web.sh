cd html;
rm -rf assets/bin assets/index.cs*
tsc --watch &
sass --watch sass/index.scss assets/index.css 