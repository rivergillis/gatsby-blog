mogrify -strip -interlace Plane -sampling-factor 4:2:0 -define jpeg:dct-method=float -quality 85% static/assets/*.jpg
optipng -o7 static/assets/*.png
