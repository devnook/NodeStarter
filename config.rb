preferred_syntax = :scss
http_path = '/'
css_dir = (environment == :production) ? 'public/css' : 'frontend/app/css'
sass_dir = 'frontend/app/sass'
#images_dir = 'assets/images'
#javascripts_dir = 'assets/javascripts'
#relative_assets = true
# output_style = :compressed
output_style = (environment == :production) ? :compressed : :expanded